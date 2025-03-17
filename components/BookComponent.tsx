import { findBookById } from "@/app/utils/findBookById";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import ReviewForm from "./ReviewForm";
import prisma from "@/lib/db";
import Link from "next/link";
import { Button } from "./ui/button";
import { BookWithReviewsType, SessionUser } from "@/app/types";
import { checkServerSession } from "@/app/actions";

export default async function BookComponent({
  id,
  author,
}: {
  id: string | undefined;
  author: string;
}) {
  if (!id || !author) return <div>Book not found</div>;

  const [currentUser, bookWithReviews]: [
    SessionUser | undefined,
    BookWithReviewsType | null
  ] = await Promise.all([
    checkServerSession(),
    prisma.book.findUnique({
      where: { id },
      include: {
        reviews: {
          include: { user: true },
          orderBy: { reviewDate: "desc" },
        },
      },
    }),
  ]);

  const book: BookWithReviewsType | null =
    bookWithReviews || (await findBookById(id));

  if (!book) return <div>Book not found</div>;

  const sortedReviews = book.reviews.sort((a, b) =>
    a.userId === currentUser?.id ? -1 : b.userId === currentUser?.id ? 1 : 0
  );
  const hasUserPostedReview = book?.reviews.some(
    (review) => review.userId === currentUser?.id
  );

  return (
    <>
      <div className="w-full max-w-[1800px] mx-auto p-4">
        <Card className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 items-start p-4">
          <CardContent className="relative w-full pb-[150%] mb-4">
            <Image
              src={book.cover || "/images/cover.jpg"}
              alt={`Cover of ${book.title}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              quality={75}
              placeholder="blur"
              blurDataURL="/images/placeholder.jpg"
            />
          </CardContent>

          <div className="w-full">
            <CardHeader>
              <CardTitle className="text-3xl w-full truncate">
                {book.title}
              </CardTitle>
              <CardDescription className="w-full">
                {author} ({book.publishDate})
              </CardDescription>
              <CardContent className="p-0 my-4 w-full">
                {book.description}
              </CardContent>
            </CardHeader>

            {book.reviews.length !== 0 ? (
              <Carousel
                opts={{ align: "start" }}
                orientation="vertical"
                className="w-full"
              >
                <CarouselContent className="my-5 h-[225px] mb-3">
                  {sortedReviews.map((review) => (
                    <CarouselItem key={review.id} className="basis-1/2">
                      <Card className="h-full">
                        <CardHeader>
                          {review.user.id === currentUser?.id ? (
                            <CardTitle className="text-xl">
                              Your review
                            </CardTitle>
                          ) : (
                            <>
                              <CardTitle className="w-full truncate">
                                {review.user.name}
                              </CardTitle>
                              <CardDescription className="w-full truncate">
                                {review.user.email}
                              </CardDescription>
                            </>
                          )}
                        </CardHeader>
                        <CardContent>
                          <div className="my-1 flex items-center">
                            <span className="text-yellow-500 text-xl">
                              {"★".repeat(review.rating)}
                            </span>
                            <span className="text-gray-400 text-xl">
                              {"★".repeat(5 - review.rating)}
                            </span>
                          </div>
                          <CardTitle className="w-full truncate">
                            {review.comment}
                          </CardTitle>
                          <div className="flex gap-3 text-lg mt-3 flex-wrap">
                            <span className="text-gray-600">
                              {review.status}
                            </span>
                            {review.status === "reading" && (
                              <span className="text-blue-500">•</span>
                            )}
                            {review.status === "completed" && (
                              <span className="text-green-500">•</span>
                            )}
                            {review.status === "dropped" && (
                              <span className="text-red-500">•</span>
                            )}
                            <span>
                              {new Date(review.reviewDate).toLocaleDateString()}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-4 mt-4">
                  <CarouselPrevious className="relative top-0 transform-none left-35" />
                  <CarouselNext className="relative top-0 transform-none left-35" />
                </div>
              </Carousel>
            ) : (
              <div className="px-6 mt-4 text-lg text-gray-600">
                <p>There&apos;s no reviews yet. Be first to post a review!</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="w-full max-w-[1800px] mx-auto p-4 relative">
        <div
          className={`${!currentUser || hasUserPostedReview ? "blur-sm" : ""}`}
        >
          <ReviewForm book={book} author={author} />
        </div>

        {!currentUser && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              asChild
              className="py-6 px-4 text-base w-full max-w-[300px]"
            >
              <Link href="/sign-in">Please login to post a review</Link>
            </Button>
          </div>
        )}
        {hasUserPostedReview && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg">
            <p className="text-black text-lg font-semibold text-center w-full">
              You have already posted a review for this book.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
