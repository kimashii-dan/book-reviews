import prisma from "@/lib/db";
import { Book } from "@prisma/client";
import { BookWithReviewsType, UserBooksType } from "../types";
import { BookGoogleAPIType } from "../types";
import convertIntoText from "../utils/convertIntoText";
class BookService {
  cacheStrategy = { ttl: 20, swr: 60 };

  async getAllBooks(): Promise<Book[]> {
    return await prisma.book.findMany({
      orderBy: {
        title: "asc",
      },
      cacheStrategy: this.cacheStrategy,
    });
  }

  async getBookWithReviewsById(
    id: string
  ): Promise<BookWithReviewsType | null> {
    return await prisma.book.findUnique({
      where: { id },
      include: {
        reviews: {
          include: { user: true },
          orderBy: { createdAt: "desc" },
        },
      },
      cacheStrategy: this.cacheStrategy,
    });
  }

  async getFavouriteBooks(userId: string): Promise<UserBooksType[]> {
    return await prisma.review.findMany({
      where: {
        isFavourite: true,
        userId,
      },
      select: {
        book: {
          select: {
            id: true,
            title: true,
            author: true,
            publishDate: true,
            cover: true,
            averageRating: true,
          },
        },
      },
      cacheStrategy: this.cacheStrategy,
    });
  }

  async getBooksWithReadingStatus(userId: string): Promise<UserBooksType[]> {
    return await prisma.review.findMany({
      where: {
        status: "reading",
        userId,
      },
      select: {
        book: {
          select: {
            id: true,
            title: true,
            author: true,
            publishDate: true,
            cover: true,
            averageRating: true,
          },
        },
      },
      cacheStrategy: this.cacheStrategy,
    });
  }

  async getBooksWithHaveReadStatus(userId: string): Promise<UserBooksType[]> {
    return await prisma.review.findMany({
      where: {
        status: "completed",
        userId,
      },
      select: {
        book: {
          select: {
            id: true,
            title: true,
            author: true,
            publishDate: true,
            cover: true,
            averageRating: true,
          },
        },
      },
      cacheStrategy: this.cacheStrategy,
    });
  }

  async findAPIBooksByTitle(
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
      console.error("Error in findAPIBooksByTitle:", error);
      return { books: null, totalResults: 0 };
    }
  }

  async findAPIBookById(
    id: string | undefined
  ): Promise<BookWithReviewsType | null> {
    if (!id) return null;

    try {
      const apiResponse = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${id}`
      );

      if (!apiResponse.ok) throw new Error("Failed to fetch data");

      const bookDetails = await apiResponse.json();
      if (!bookDetails) return null;

      const volumeInfo = bookDetails.volumeInfo || {};
      return {
        id,
        reviewCount: 0,
        totalRating: 0,
        averageRating: 0,
        reviews: [],
        title: volumeInfo.title || "Unknown Title",
        author: volumeInfo.authors?.[0] || "Unknown Author",
        description:
          convertIntoText(volumeInfo.description) || "No description available",
        cover:
          volumeInfo.imageLinks?.thumbnail?.replace("http://", "https://") ||
          "",
        publishDate:
          volumeInfo.publishedDate?.substring(0, 4) || "Unknown Year",
      };
    } catch (error) {
      console.error("Error fetching book data:", error);
      return null;
    }
  }
}

export const bookService = new BookService();
