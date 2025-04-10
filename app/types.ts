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
  };
}

type BookWithReviewsType = Prisma.BookGetPayload<{
  include: { reviews: { include: { user: true } } };
}>;

type ReviewWithBookType = Prisma.ReviewGetPayload<{
  include: {
    user: true;
  };
}>;

type CreateReviewType = Prisma.ReviewCreateManyInput;

type Session = {
  user: {
    userId: string;
    userImage: string | null | undefined;
    userName: string;
    userEmail: string;
    userIsVerified: boolean;
  };
  session: {
    id: string;
  };
};

type UserBooksType = Prisma.ReviewGetPayload<{
  select: {
    book: {
      select: {
        id: true;
        title: true;
        author: true;
        publishDate: true;
        cover: true;
        averageRating: true;
      };
    };
  };
}>;

type Filter = "rating" | "reviewCount" | "publishedDate" | "";

export type {
  CreateReviewType,
  BookWithReviewsType,
  BookAPIType,
  BookGoogleAPIType,
  Session,
  Filter,
  UserBooksType,
  ReviewWithBookType,
};
