import prisma from "@/lib/db";
import { cache } from "react";

export const getCachedReviews = cache(async (userId: string | undefined) => {
  if (!userId) return [];
  try {
    return await prisma.review.findMany({
      where: { userId },
      include: { book: true },
      orderBy: { reviewDate: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return [];
  }
});
