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
import { BookType, CurrentUser } from "@/app/types";
export default async function Book({
  id,
  author,
  user,
}: {
  id: string | undefined;
  author: string;
  user: CurrentUser | undefined;
}) {
  if (!id || !author) return <div>Book not found</div>;

  const [book, reviews] = await Promise.all([
    prisma.book.findUnique({ where: { id } }),
    prisma.review.findMany({
      where: { bookId: id },
      include: { user: true },
      orderBy: { reviewDate: "desc" },
    }),
  ]);

  let preparedBook: BookType | null = book;

  if (!book) {
    preparedBook = await findBookById(id);
  }

  if (!preparedBook) return <div>Book not found</div>;

  reviews.sort((a, b) =>
    a.userId === user?.id ? -1 : b.userId === user?.id ? 1 : 0
  );

  const hasUserPostedReview = reviews.some(
    (review) => review.userId === user?.id
  );

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <Card className="flex flex-row justify-between items-center gap-4">
          <CardContent className=" w-1/2 flex justify-center">
            <Image
              src={preparedBook.cover || "/images/cover.jpg"}
              alt="book cover"
              width={300}
              height={500}
              quality={50}
              className=""
              placeholder="blur"
              blurDataURL="/images/placeholder.jpg"
            />
          </CardContent>
          <div className="flex flex-col w-1/2">
            <CardHeader className="">
              <CardTitle className="text-3xl">{preparedBook.title}</CardTitle>
              <CardDescription>
                {author} ({preparedBook.publishDate})
              </CardDescription>
              <CardContent className="p-0 my-4">
                {preparedBook.description}
              </CardContent>
            </CardHeader>
            {reviews.length !== 0 ? (
              <Carousel
                opts={{
                  align: "start",
                }}
                orientation="vertical"
                className="w-full"
              >
                <CarouselContent className="my-5 h-[200px] mb-3">
                  {reviews.map((review) => (
                    <CarouselItem
                      key={review.id}
                      className="md:basis-1/2 mx-4 "
                    >
                      <Card className="gap-0">
                        <CardHeader>
                          {review.user.id === user?.id ? (
                            <CardTitle className="text-xl">
                              Your review
                            </CardTitle>
                          ) : (
                            <>
                              <CardTitle>{review.user.name}</CardTitle>
                              <CardDescription>
                                {review.user.email}
                              </CardDescription>{" "}
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
                          <CardTitle>{review.comment}</CardTitle>
                          <div className="flex gap-3 text-lg -500 mt-3">
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
                  <CarouselPrevious className="relative top-0 transform-none left-40" />
                  <CarouselNext className="relative top-0 transform-none left-40" />
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

      <div className="w-full relative">
        <div className={`${!user || hasUserPostedReview ? "blur-sm" : ""}`}>
          <ReviewForm book={preparedBook} author={author} />
        </div>

        {!user && (
          <div className="absolute inset-0 flex items-center justify-center">
            <Button asChild className="py-6 px-4 text-base">
              <Link href="/sign-in">Please login to post a review</Link>
            </Button>
          </div>
        )}
        {hasUserPostedReview && (
          <div className="absolute inset-0 flex items-center justify-center  rounded-lg">
            <p className="text-black text-lg font-semibold">
              You have already posted a review for this book.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
