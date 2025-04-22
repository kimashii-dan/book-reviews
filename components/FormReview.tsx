"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import StarRating from "./RatingStar";
import { Textarea } from "./ui/textarea";
import StatusSelector from "./SelectorStatus";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { submitReview } from "@/app/actions";
import { Button } from "./ui/button";
import { Loader2, Heart } from "lucide-react";
import {
  BookWithReviewsType,
  CreateReviewType,
  FormReviewType,
} from "@/app/types";

export default function FormReview({
  book,
  editReview,
  userId,
}: {
  book: BookWithReviewsType;
  editReview?: CreateReviewType | null;
  userId: string | undefined;
}) {
  const router = useRouter();
  const [review, setReview] = useState<FormReviewType>({
    rating: editReview?.rating ?? 0,
    comment: editReview?.comment ?? "",
    status: editReview?.status ?? "reading",
    isFavourite: editReview?.isFavourite ?? false,
  });

  const [isPending, startTransition] = useTransition();

  const handleChange = (
    name: keyof FormReviewType,
    value: string | number | boolean
  ) => {
    setReview((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log(review);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!userId) return null;
    event.preventDefault();

    const bookData = {
      id: book.id,
      title: book.title,
      author: book.author,
      publishDate: book.publishDate,
      description: book.description,
      cover: book.cover,
      totalRating: book.totalRating,
      reviewCount: book.reviewCount,
      averageRating: book.averageRating,
      reviews: book.reviews,
    };

    const reviewData = {
      id: editReview?.id,
      userId: userId,
      comment: review.comment,
      rating: review.rating,
      status: review.status,
      bookId: book.id,
      isFavourite: review.isFavourite,
      createdAt: editReview?.createdAt ?? new Date(),
      updatedAt: new Date(),
    };

    console.log("book:", bookData, "review", reviewData);

    startTransition(async () => {
      const result = await submitReview(bookData, reviewData);

      if (result.success) {
        toast.success(result.message);
        router.push("/books");
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="flex w-full justify-center items-center my-10">
      <Card className="w-full bg-[#1c1f26] text-[#e4e6eb] border-[#292e38] border-2">
        <form onSubmit={handleSubmit}>
          <CardHeader className="gap-0 mb-10">
            <CardTitle className="text-2xl m-0">
              {editReview ? "Update review" : "Your review"}
            </CardTitle>
            <CardDescription>Rate this book</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-10">
            <div className="flex flex-row justify-between items-center">
              <StarRating rating={review.rating} handleChange={handleChange} />
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleChange("isFavourite", !review.isFavourite)}
              >
                {review.isFavourite ? (
                  <Heart size={24} color="red" fill="red" />
                ) : (
                  <Heart size={24} color="red" />
                )}
                <label htmlFor="favourite">Add to favourite list</label>
              </div>
            </div>

            <Textarea
              className="h-28 border-[#242b38] border-3"
              placeholder="Write comment..."
              onChange={(e) => handleChange("comment", e.target.value)}
              value={review.comment}
              autoFocus={false}
            />
            <div className="flex justify-between">
              <StatusSelector
                status={review.status}
                handleChange={handleChange}
              />
              <Button
                className="primary-button"
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
