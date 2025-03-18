import prisma from "@/lib/db";
import { BookWithReviewsType } from "../types";

export async function findBookById(
  key: string | undefined
): Promise<BookWithReviewsType | null> {
  if (key === undefined) return null;

  try {
    const data = await fetch(`https://openlibrary.org/works/${key}.json`);
    if (!data.ok) throw new Error("Failed to fetch data");

    const bookDetails = await data.json();

    if (!bookDetails) return null;
    return {
      id: key,
      title: bookDetails.title,
      author: "",
      publishDate: bookDetails.first_publish_year || "Unknown date",
      cover:
        bookDetails.covers && bookDetails.covers.length > 0
          ? `https://covers.openlibrary.org/b/id/${bookDetails.covers[0]}-L.jpg`
          : "",
      description: fix_desc(bookDetails),
      reviewCount: 0,
      totalRating: 0,
      averageRating: 0,
      reviews: [],
    };
  } catch (error) {
    console.error("Error fetching book data:", error);
    return null;
  }
}

function fix_desc(info: string | { description?: string | { value: string } }) {
  if (typeof info === "object" && info !== null && "description" in info) {
    const description = info.description;
    if (typeof description === "string") {
      return description.split("\r\n")[0];
    } else if (typeof description === "object" && "value" in description) {
      return description.value.split("\r\n")[0];
    }
  }
  return "No description available";
}

export async function findGoogleBookById(
  id: string | undefined
): Promise<BookWithReviewsType | null> {
  if (!id) return null;

  try {
    const [apiResponse, dbData] = await Promise.all([
      fetch(`https://www.googleapis.com/books/v1/volumes/${id}`),
      prisma.book.findUnique({
        where: { id },
        include: { reviews: { include: { user: true } } },
      }),
    ]);

    if (!apiResponse.ok) throw new Error("Failed to fetch book data");

    const bookDetails = await apiResponse.json();
    if (!bookDetails) return null;

    const volumeInfo = bookDetails.volumeInfo || {};
    return {
      ...(dbData || {
        id,
        reviewCount: 0,
        totalRating: 0,
        averageRating: 0,
        reviews: [],
      }),
      title: volumeInfo.title || "Unknown Title",
      author: volumeInfo.authors?.[0] || "Unknown Author",
      description:
        convertIntoText(volumeInfo.description) || "No description available",
      cover:
        volumeInfo.imageLinks?.thumbnail?.replace("http://", "https://") || "",
      publishDate: volumeInfo.publishedDate?.substring(0, 4) || "Unknown Year",
    };
  } catch (error) {
    console.error("Error fetching book data:", error);
    return null;
  }
}

function convertIntoText(htmlText: string): string {
  const plainText = htmlText.replace(/<[^>]+>/g, "");

  const decodedText = plainText
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

  const sentences = decodedText.split(/(?<=[.!?])\s+/).slice(0, 3);

  return sentences.join(" ");
}
