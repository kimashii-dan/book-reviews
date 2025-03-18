import { authClient } from "@/lib/auth-client";
import { Prisma } from "@prisma/client";

interface BookAPIType {
  key: string;
  title: string;
  author_name: string[];
  first_publish_year: string;
  cover_i?: string;
}

interface BookGoogleAPIType {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    imageLinks?: {
      thumbnail?: string;
    };
    industryIdentifiers?: Array<{
      type: string;
      identifier: string;
    }>;
    categories?: string[];
    publisher?: string;
  };
}

type BookWithReviewsType = Prisma.BookGetPayload<{
  include: { reviews: { include: { user: true } } };
}>;

type CreateReviewType = Prisma.ReviewCreateManyInput;

type SessionUser = typeof authClient.$Infer.Session.user;

export type {
  CreateReviewType,
  BookWithReviewsType,
  BookAPIType,
  SessionUser,
  BookGoogleAPIType,
};
