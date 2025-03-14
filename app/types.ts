interface BookType {
  id: string;
  title: string;
  author: string;
  publishDate: string | null;
  description?: string | null;
  cover?: string | null;
}

interface ReviewType {
  userId: string;
  comment: string;
  rating: number;
  status: string;
  bookId: string;
}

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined;
}

export type { BookType, ReviewType, CurrentUser };
