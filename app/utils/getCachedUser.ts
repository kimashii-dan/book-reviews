import prisma from "@/lib/db";
import { User } from "@prisma/client";
import { cache } from "react";

export const getCachedUser = cache(
  async (id: string | undefined): Promise<User | null | undefined> => {
    try {
      return await prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  }
);
