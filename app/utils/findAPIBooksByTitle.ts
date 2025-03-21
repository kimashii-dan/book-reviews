import { Book } from "@prisma/client";
import { BookAPIType, BookGoogleAPIType } from "../types";
import prisma from "@/lib/db";

export async function findAPIBooksByTitle(
  title: string,
  offset: number
): Promise<{ books: Book[] | null; totalResults: number }> {
  if (!title || offset === null) return { books: null, totalResults: 0 };

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
        title
      )}&startIndex=${offset}&maxResults=6&fields=items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/publishedDate,volumeInfo/imageLinks/thumbnail),totalItems&key=${
        process.env.GOOGLE_API_KEY as string
      }`
    );

    if (!response.ok)
      throw new Error(`API request failed: ${response.statusText}`);

    const { items, totalItems } = await response.json();

    if (!items?.length) return { books: null, totalResults: totalItems || 0 };

    const googleIds = items.map((book: BookGoogleAPIType) => book.id);
    const ratings = await prisma.book.findMany({
      where: { id: { in: googleIds } },
      select: { id: true, averageRating: true },
    });

    const ratingMap = new Map(ratings.map((b) => [b.id, b.averageRating]));

    const books = items.map((book: BookGoogleAPIType) => ({
      id: book.id,
      title: book.volumeInfo.title || "Unknown Title",
      author: book.volumeInfo.authors?.[0] || "Unknown Author",
      publishDate:
        book.volumeInfo.publishedDate?.substring(0, 4) || "Unknown Year",
      cover:
        book.volumeInfo.imageLinks?.thumbnail?.replace("http://", "https://") ||
        "/default-cover.jpg",
      description: book.volumeInfo.description || "",
      reviewCount: 0,
      totalRating: 0,
      averageRating: ratingMap.get(book.id) || 0,
    }));

    return { books, totalResults: totalItems };
  } catch (error) {
    console.error("Error in findBooksByTitle:", error);
    return { books: null, totalResults: 0 };
  }
}

// open library API
export async function findBooksByTitle(
  title: string,
  offset: number
): Promise<{ books: Book[] | null; totalResults: number }> {
  if (!title || offset === null) return { books: null, totalResults: 0 };

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(
        title
      )}&fields=key,title,author_name,first_publish_year,cover_i&offset=${offset}&limit=6`
    );

    if (!response.ok)
      throw new Error(`API request failed: ${response.statusText}`);

    const { docs, numFound } = await response.json();
    if (!docs.length) return { books: null, totalResults: 0 };

    const openLibraryIds = docs.map(
      (book: BookAPIType) => book.key.split("/").pop() || ""
    );

    const ratings = await prisma.book.findMany({
      where: { id: { in: openLibraryIds } },
      select: { id: true, averageRating: true },
    });

    const ratingMap = new Map(ratings.map((b) => [b.id, b.averageRating]));

    const books = docs.map((book: BookAPIType) => {
      const bookId = book.key.split("/").pop() || "";
      return {
        id: bookId,
        title: book.title,
        author: book.author_name?.[0] || "Unknown Author",
        publishDate: book.first_publish_year?.toString() || "Unknown Year",
        cover: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : "/default-cover.jpg",
        description: "",
        reviewCount: 0,
        totalRating: 0,
        averageRating: ratingMap.get(bookId) || 0,
      };
    });

    return { books, totalResults: numFound };
  } catch (error) {
    console.error("Error in findBooksByTitle:", error);
    return { books: null, totalResults: 0 };
  }
}
