/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import prisma from "@/lib/db";
import { BookWithReviewsType, CreateReviewType, Session } from "./types";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getServerSession = async (): Promise<Session | null> => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return null;
    }
    return session;
  } catch (error) {
    return null;
  }
};

export async function submitReview(
  bookData: BookWithReviewsType,
  reviewData: CreateReviewType
) {
  console.log(reviewData);
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

    let oldRating = 0;

    if (reviewData.id) {
      const existingReview = await prisma.review.findUnique({
        where: { id: reviewData.id },
      });
      if (!existingReview) throw new Error("Review not found");
      oldRating = existingReview.rating;

      await prisma.review.update({
        where: { id: reviewData.id },
        data: { ...reviewData, updatedAt: new Date() },
      });
    } else {
      await prisma.review.create({
        data: {
          userId: reviewData.userId,
          comment: reviewData.comment,
          rating: reviewData.rating,
          status: reviewData.status,
          bookId: book.id,
          isFavourite: reviewData.isFavourite,
          updatedAt: reviewData.updatedAt,
          createdAt: reviewData.createdAt,
        },
      });

      await prisma.book.update({
        where: { id: book.id },
        data: { reviewCount: { increment: 1 } },
      });
    }

    const ratingDifference = reviewData.rating - oldRating;

    await prisma.book.update({
      where: { id: book.id },
      data: {
        totalRating: { increment: ratingDifference },
        averageRating: {
          set: reviewData.id
            ? (book.totalRating + ratingDifference) / book.reviewCount
            : (book.totalRating + reviewData.rating) / (book.reviewCount + 1),
        },
      },
    });

    // let toInvalidate = "";

    // if (reviewData.status === "reading") {
    //   toInvalidate = "reading";
    // } else {
    //   toInvalidate = "haveRead";
    // }

    // try {
    //   await prisma.$accelerate.invalidate({
    //     tags: ["book"],
    //   });
    // } catch (e) {
    //   if (e instanceof Prisma.PrismaClientKnownRequestError) {
    //     // The .code property can be accessed in a type-safe manner
    //     if (e.code === "P6003") {
    //       console.log(
    //         "You've reached the cache invalidation rate limit. Please try again shortly."
    //       );
    //     }
    //   }
    //   throw e;
    // }

    revalidatePath(`/${reviewData.status}`);
    revalidatePath(`/book/${bookData.id}`);
    revalidatePath("/favourites");
    revalidatePath("/books");

    return {
      success: true,
      message: "Review submitted successfully!",
    };
  } catch (error) {
    console.error("Error submitting review:", error);
    return { success: false, message: "Failed to submit review." };
  }
}

export async function saveChanges(userId: string, formData: FormData) {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: formData.get("name") as string,
        bio: formData.get("bio") as string,
      },
    });

    revalidatePath("/profile");

    return {
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    };
  } catch (error) {
    console.error("Error updating profile: ", error);
    return { success: false, message: "Failed to update profile" };
  }
}
