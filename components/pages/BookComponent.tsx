import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";
import { BookWithReviewsType, Session } from "@/app/types";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { bookService } from "@/app/services/book.service";
import BookReviews from "@/components/BookReviews";
import { getServerSession } from "@/app/actions";
import dynamic from "next/dynamic";
import ButtonToAuthor from "@/components/ButtonToAuthor";

const ReviewForm = dynamic(() => import("@/components/ReviewForm"), {
  loading: () => <div>Loading review form...</div>,
});

export default async function BookComponent({
  params,
}: {
  params: Promise<{ [key: string]: string | undefined }>;
}) {
  const { id } = await params;
  if (!id) return <div>Book not found</div>;

  const [session, bookWithReviews]: [
    Session | null,
    BookWithReviewsType | null
  ] = await Promise.all([
    getServerSession(),
    bookService.getBookWithReviewsById(id),
  ]);

  const book: BookWithReviewsType | null =
    bookWithReviews || (await bookService.findAPIBookById(id));
  if (!book) return <div>Book not found</div>;

  let editReview = null;
  let sortedReviews = null;
  let isFavourite = null;

  if (session) {
    editReview = book.reviews.find(
      (review) => review.userId === session?.user.id
    );
    sortedReviews = book.reviews.sort((a, b) =>
      a.userId === session?.user.id ? -1 : b.userId === session?.user.id ? 1 : 0
    );

    isFavourite = book.reviews.some(
      (review) => review.userId === session?.user.id && review.isFavourite
    );
  } else {
    sortedReviews = book.reviews;
  }

  return (
    <>
      <div className="w-full max-w-[1800px] mx-auto">
        <Card className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 items-start p-4 bg-[#1c1f26] border-[#292e38] border-2 text-[#e4e6eb]">
          <CardContent className="relative w-full pb-[150%] mb-4">
            <Image
              src={book.cover || "/images/cover.jpg"}
              alt={`Cover of ${book.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              quality={100}
              placeholder="blur"
              blurDataURL="/placeholder.svg"
              loading="lazy"
            />
          </CardContent>

          <div className="w-full flex flex-col justify-around h-full">
            <CardHeader className=" p-0 flex flex-col gap-5 md:text-base">
              <CardTitle className="text-3xl w-full">
                {book.title} ({book.publishDate})
              </CardTitle>
              {isFavourite && (
                <div className="text-red-500 flex flex-row gap-2 items-center">
                  <p>In favourites</p>
                  <span>
                    <Heart color="red" fill="red" size={15} />
                  </span>
                </div>
              )}
              <CardDescription className="w-full ">
                <ButtonToAuthor author={book.author} />
              </CardDescription>
              <CardContent className="p-0 w-full flex justify-between  text-lg">
                <div className="flex items-center gap-2">
                  <p>Average rating:</p>
                  <p className="font-semibold">
                    {book.averageRating.toFixed(1)}
                    <span className="text-yellow-500 ml-1">★</span>
                  </p>
                </div>
                <p>
                  Total reviews: <span>{book.reviewCount}</span>
                </p>
              </CardContent>
            </CardHeader>

            <CardContent className="p-0 w-full">{book.description}</CardContent>

            {book.reviews.length !== 0 ? (
              <BookReviews
                sortedReviews={sortedReviews}
                userId={session?.user.id}
              />
            ) : (
              <div className="px-6 mt-4 text-lg text-[#a0a8b7]">
                <p>There are no reviews yet. Be first to review!</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="w-full max-w-[1800px] mx-auto  relative">
        <div className={`${!session ? "blur-sm" : ""}`}>
          <ReviewForm
            book={book}
            editReview={editReview}
            userId={session?.user.id}
          />
        </div>

        {!session && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              asChild
              className="py-6 px-4 text-base w-full max-w-[300px]"
            >
              <Link href="/sign-in">Please login to post a review</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
