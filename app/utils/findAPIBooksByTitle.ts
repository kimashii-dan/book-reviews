import { Book } from "@prisma/client";
import { BookAPIType, BookGoogleAPIType } from "../types";
import prisma from "@/lib/db";

export async function findAPIBooksByTitle(
  searchBy: string,
  query: string,
  offset: number
): Promise<{ books: Book[] | null; totalResults: number }> {
  if (!query) return { books: null, totalResults: 0 };

  try {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) throw new Error("Google API key not configured");

    const apiUrl = new URL("https://www.googleapis.com/books/v1/volumes");

    apiUrl.search = new URLSearchParams({
      q: `in${searchBy}:${query}`,
      startIndex: offset.toString(),
      maxResults: "6",
      fields:
        "items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/publishedDate,volumeInfo/description,volumeInfo/imageLinks/thumbnail),totalItems",
      key: apiKey,
    }).toString();

    const response = await fetch(apiUrl.toString());

    if (!response.ok)
      throw new Error(`API request failed: ${response.statusText}`);

    const { items, totalItems } = await response.json();
    if (!items?.length) return { books: null, totalResults: totalItems || 0 };

    const googleIds = items.map((book: BookGoogleAPIType) => book.id);
    const ratings = await prisma.book.findMany({
      where: { id: { in: googleIds } },
      select: { id: true, averageRating: true, reviewCount: true },
    });

    const ratingLookup = Object.fromEntries(
      ratings.map(({ id, averageRating, reviewCount }) => [
        id,
        { averageRating: averageRating ?? 0, reviewCount: reviewCount ?? 0 },
      ])
    );

    const books = items.map((book: BookGoogleAPIType) => {
      const volumeInfo = book.volumeInfo;
      const publishedYear = volumeInfo.publishedDate?.split("-")[0] || "0000";

      return {
        id: book.id,
        title: volumeInfo.title || "Unknown Title",
        author: volumeInfo.authors?.[0] || "Unknown Author",
        publishDate: publishedYear,
        cover:
          volumeInfo.imageLinks?.thumbnail?.replace(/^http:/i, "https:") ||
          "/images/cover.jpg",
        description: volumeInfo.description || "",
        reviewCount: ratingLookup[book.id]?.reviewCount ?? 0,
        averageRating: ratingLookup[book.id]?.averageRating ?? 0,
      };
    });

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

// export async function findFilterAPIBooksByTitle(
//   title: string,
//   offset: number,
//   sortBy: "rating" | "reviewCount" | "publishedDate"
// ): Promise<{ books: Book[] | null; totalResults: number }> {
//   if (!title) return { books: null, totalResults: 0 };

//   try {
//     const orderBy = sortBy === "publishedDate" ? "newest" : "relevance";
//     const apiUrl = new URL("https://www.googleapis.com/books/v1/volumes");

//     apiUrl.search = new URLSearchParams({
//       q: title,
//       startIndex: offset.toString(),
//       maxResults: "6",
//       orderBy,
//       fields:
//         "items(id,volumeInfo/title,volumeInfo/authors,volumeInfo/publishedDate,volumeInfo/description,volumeInfo/imageLinks/thumbnail),totalItems",
//       key: process.env.GOOGLE_API_KEY as string,
//     }).toString();

//     const response = await fetch(apiUrl.toString());

//     if (!response.ok) {
//       throw new Error(
//         `API request failed: ${response.statusText} (${response.status})`
//       );
//     }

//     const { items, totalItems } = await response.json();
//     if (!items?.length) return { books: null, totalResults: totalItems || 0 };

//     // Fetch ratings in single query
//     const googleIds = items.map((book: BookGoogleAPIType) => book.id);
//     const ratings = await prisma.book.findMany({
//       where: { id: { in: googleIds } },
//       select: { id: true, averageRating: true, reviewCount: true },
//     });

//     // Create lookup maps in single pass
//     const ratingMap = new Map();
//     const reviewCountMap = new Map();
//     ratings.forEach((book) => {
//       ratingMap.set(book.id, book.averageRating ?? 0);
//       reviewCountMap.set(book.id, book.reviewCount ?? 0);
//     });

//     const books = items.map((book: BookGoogleAPIType) => {
//       const volumeInfo = book.volumeInfo;
//       const publishedYear = volumeInfo.publishedDate?.split("-")[0] || "0000";

//       return {
//         id: book.id,
//         title: volumeInfo.title || "Unknown Title",
//         author: volumeInfo.authors?.[0] || "Unknown Author",
//         publishDate: publishedYear,
//         cover:
//           volumeInfo.imageLinks?.thumbnail
//             ?.replace(/^http:/, "https:")
//             .replace("http://", "https://") || "/default-cover.jpg",
//         description: volumeInfo.description || "",
//         reviewCount: reviewCountMap.get(book.id) ?? 0,
//         totalRating: 0,
//         averageRating: ratingMap.get(book.id) ?? 0,
//       };
//     });

//     switch (sortBy) {
//       case "rating":
//         books.sort((a: Book, b: Book) => b.averageRating - a.averageRating);
//         break;
//       case "reviewCount":
//         books.sort((a: Book, b: Book) => b.reviewCount - a.reviewCount);
//         break;
//     }

//     return { books, totalResults: totalItems };
//   } catch (error) {
//     console.error("Error in findAPIBooksByTitle:", error);
//     return { books: null, totalResults: 0 };
//   }
// }
