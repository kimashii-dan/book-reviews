/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import prisma from "@/lib/db";
import { BookWithReviewsType, CreateReviewType, SessionUser } from "./types";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export async function submitReview(
  bookData: BookWithReviewsType,
  reviewData: CreateReviewType
) {
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
        totalRating: { increment: reviewData.rating },
        reviewCount: { increment: 1 },
        averageRating: {
          set: (book.totalRating + reviewData.rating) / (book.reviewCount + 1),
        },
      },
    });

    revalidatePath(`/books/${book.id}`);
    return {
      success: true,
      message: "Review submitted successfully!",
      averageRating: updatedBook.averageRating,
    };
  } catch (error) {
    console.error("Error submitting review:", error);
    return { success: false, message: "Failed to submit review." };
  }
}

export const checkServerSession = async (): Promise<
  SessionUser | undefined
> => {
  "use server";
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session?.user;
  } catch (error) {
    return undefined;
  }
};
