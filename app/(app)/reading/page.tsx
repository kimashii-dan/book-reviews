import { SkeletonBookList } from "@/components/loadingUI/SkeletonBookList";
import React, { Suspense } from "react";
import prisma from "@/lib/db";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { ReadingNowBooksType, Session } from "@/app/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getServerSession } from "@/app/actions";
export default function ReadingNowPage() {
  return (
    <div className="flex flex-col  w-9/12 mx-auto gap-8 ">
      <h1 className="text-left w-full mt-10 text-4xl font-bold">Reading now</h1>

      <Suspense fallback={<SkeletonBookList />}>
        <ReadingNowComponent />
      </Suspense>
    </div>
  );
}

async function ReadingNowComponent() {
  const session: Session | null = await getServerSession();
  const reviews = await prisma.review.findMany({
    where: {
      status: "reading",
      userId: session?.user.id,
    },
    select: {
      book: {
        select: {
          id: true,
          title: true,
          author: true,
          publishDate: true,
          cover: true,
          averageRating: true,
        },
      },
    },
    cacheStrategy: { swr: 60 },
  });

  if (reviews.length === 0)
    return (
      <div className="h-[50vh] flex items-center justify-center text-center">
        You have no books you are currently reading.
      </div>
    );

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
        {reviews.map((review: ReadingNowBooksType, index) => (
          <Card
            key={index}
            className="flex flex-col items-center p-4 gap-4 max-w-[300px] mb-4"
          >
            <div className="w-full text-center">
              <CardTitle className="text-xl truncate">
                {review.book.title}
              </CardTitle>
              <CardDescription className="text-base truncate">
                {review.book.author} ({review.book.publishDate})
              </CardDescription>
            </div>

            <div className="relative w-full pb-[150%]">
              <Image
                src={review.book.cover || "/images/cover.jpg"}
                alt={`Cover of ${review.book.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                quality={100}
                placeholder="blur"
                blurDataURL="/images/placeholder.jpg"
                loading="lazy"
              />
            </div>

            <div
              className={"w-full flex flex-row justify-between items-center"}
            >
              <Button asChild className="w-full max-w-[70%]">
                <Link href={`/books/${review.book.id}`}>Go to book page</Link>
              </Button>
              <p className="text-gray-600">
                {review.book.averageRating.toFixed(1)}
                <span className="text-yellow-500 ml-1">★</span>
              </p>
            </div>
          </Card>
        ))}
      </div>
      {/* {search && (
        <PaginationComponent
          totalPages={totalResults / limit}
          currentPage={Number(page)}
          baseUrl={`/books?search=${search}`}
        />
      )} */}
    </>
  );
}
