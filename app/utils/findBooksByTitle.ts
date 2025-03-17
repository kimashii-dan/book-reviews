import { Book } from "@prisma/client";
import { BookAPIType } from "../types";

export async function findBooksByTitle(title?: string): Promise<Book[] | null> {
  if (!title) return null;

  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(
        title
      )}&limit=5&fields=key,title,author_name,first_publish_year,cover_i`
    );

    if (!response.ok)
      throw new Error(`Failed to fetch data: ${response.statusText}`);

    const { docs } = await response.json();
    if (!docs.length) return null;

    return docs.map((book: BookAPIType) => ({
      id: book.key.split("/").pop(),
      title: book.title,
      author: book.author_name?.[0] || "Unknown",
      publishDate: book.first_publish_year || "Unknown",
      cover: book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : "",
      description: "",
      reviewCount: 0,
      totalRating: 0,
    }));
  } catch (error) {
    console.error("Error fetching book data:", error);
    return null;
  }
}
