"use server";
import prisma from "@/lib/db";
import { BookType, ReviewType } from "./types";

export async function submitReview(bookData: BookType, reviewData: ReviewType) {
  try {
    const book = await prisma.book.upsert({
      where: { id: bookData.id },
      update: {
        title: bookData.title,
        author: bookData.author,
        publishDate: bookData.publishDate || "Unknown Date",
        description: bookData.description || "",
        cover: bookData.cover || "",
      },
      create: {
        id: bookData.id,
        title: bookData.title,
        author: bookData.author,
        publishDate: bookData.publishDate || "Unknown Date",
        description: bookData.description || "",
        cover: bookData.cover || "",
      },
    });

    await prisma.review.create({
      data: {
        userId: reviewData.userId,
        comment: reviewData.comment,
        rating: reviewData.rating,
        status: reviewData.status,
        bookId: book.id,
      },
    });

    const updatedBook = await prisma.book.update({
      where: { id: book.id },
      data: {
        totalRating: {
          increment: reviewData.rating,
        },
        reviewCount: {
          increment: 1,
        },
      },
    });

    const averageRating = updatedBook.totalRating / updatedBook.reviewCount;
    const flooredRating = Math.floor(averageRating);

    await prisma.book.update({
      where: { id: book.id },
      data: {
        totalRating: flooredRating,
      },
    });

    return { success: true, message: "Review submitted successfully!" };
  } catch (error) {
    console.error("Error submitting review:", error);
    return { success: false, message: "Failed to submit review." };
  }
}
