import { Book } from "@prisma/client";
import { BookAPIType } from "../types";

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
      throw new Error(`Failed to fetch data: ${response.statusText}`);

    const { docs, numFound } = await response.json();
    if (!docs.length) return { books: null, totalResults: 0 };

    const books = docs.map((book: BookAPIType) => ({
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

    return { books, totalResults: numFound };
  } catch (error) {
    console.error("Error fetching book data:", error);
    return { books: null, totalResults: 0 };
  }
}
