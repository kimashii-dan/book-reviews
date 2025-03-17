"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import StarRating from "./StarRating";
import { Textarea } from "./ui/textarea";
import StatusSelector from "./StatusSelector";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { submitReview } from "@/app/actions";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { BookWithReviewsType } from "@/app/types";

export type ReviewFormType = {
  rating: number;
  comment: string;
  status: string;
};

export default function ReviewForm({
  book,
  author,
}: {
  book: BookWithReviewsType;
  author: string;
}) {
  const router = useRouter();
  const [review, setReview] = useState<ReviewFormType>({
    rating: 0,
    comment: "",
    status: "reading",
  });

  const [isPending, startTransition] = useTransition();

  const handleChange = (name: keyof ReviewFormType, value: string | number) => {
    setReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { data: session } = authClient.useSession();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!session) return null;
    event.preventDefault();

    const bookData = {
      id: book.id,
      title: book.title,
      author: author,
      publishDate: book.publishDate,
      description: book.description,
      cover: book.cover,
      totalRating: book.totalRating,
      reviewCount: book.reviewCount,
      averageRating: book.averageRating,
      reviews: book.reviews,
    };

    const reviewData = {
      userId: session.user.id,
      comment: review.comment,
      rating: review.rating,
      status: review.status,
      bookId: book.id,
    };

    console.log("book:", bookData, "review", reviewData);

    startTransition(async () => {
      const result = await submitReview(bookData, reviewData);

      if (result.success) {
        toast.success(result.message);
        router.push("/");
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="flex w-full justify-center items-center my-10">
      <Card className="w-full">
        <form onSubmit={handleSubmit}>
          <CardHeader className="gap-0 mb-10">
            <CardTitle className="text-2xl m-0">Your review</CardTitle>
            <CardDescription>Rate this book</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-10">
            <StarRating rating={review.rating} handleChange={handleChange} />
            <Textarea
              className="h-28"
              placeholder="Write comment..."
              onChange={(e) => handleChange("comment", e.target.value)}
              autoFocus={false}
            />
            <div className="flex justify-between">
              <StatusSelector
                status={review.status}
                handleChange={handleChange}
              />
              <Button
                className="cursor-pointer"
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="animate-spin" size={48} />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
