"use server";
import prisma from "@/lib/db";
import { BookWithReviewsType, CreateReviewType, Session } from "./types";

import { revalidatePath } from "next/cache";
import { userService } from "./services/user.service";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { extractPublicId } from "./utils/extractPublicId";
import cloudinary from "@/lib/cloudinary";
import { User } from "@prisma/client";

export async function getServerSession(): Promise<Session | null> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    console.log(session);
    if (!session) {
      return null;
    }
    return session;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

export async function saveAvatar(url: string, user: User | null) {
  "use server";
  if (user?.image) {
    const publicId = extractPublicId(user.image);
    if (!publicId) return "Error deleting old image from storage";
    await cloudinary.uploader.destroy(publicId);
  }
  const updatedUser = await userService.updateProfileImage(user?.id, url);

  revalidatePath("/profile");

  console.log(updatedUser);
}

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
    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;
    const updatedUser = await userService.updateNameAndBio(userId, name, bio);

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
