import { authClient } from "@/lib/auth-client";
import { Prisma } from "@prisma/client";

interface BookAPIType {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year: string;
  cover_i?: string;
}

type BookWithReviewsType = Prisma.BookGetPayload<{
  include: { reviews: { include: { user: true } } };
}>;

type CreateReviewType = Prisma.ReviewCreateManyInput;

type SessionUser = typeof authClient.$Infer.Session.user;

export type { CreateReviewType, BookWithReviewsType, BookAPIType, SessionUser };
