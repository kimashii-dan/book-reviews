import { SkeletonBookList } from "@/components/loadingUI/SkeletonBookList";
import React, { Suspense } from "react";
import prisma from "@/lib/db";

import { UserBooksType, Session } from "@/app/types";
import { getServerSession } from "@/app/actions";
import { redirect } from "next/navigation";
import UserBookCard from "@/components/UserBookCard";

export default function FavouritePage() {
  return (
    <div className="flex flex-col  w-9/12 mx-auto gap-8 ">
      <h1 className="text-left w-full mt-10 text-4xl font-bold">
        🌟Favourite books
      </h1>

      <Suspense fallback={<SkeletonBookList />}>
        <FavouriteComponent />
      </Suspense>
    </div>
  );
}

async function FavouriteComponent() {
  const session: Session | null = await getServerSession();
  if (!session) return redirect("/sign-in");
  const reviews = await prisma.review.findMany({
    where: {
      isFavourite: true,
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
    cacheStrategy: { ttl: 20, swr: 60 },
  });

  if (reviews.length === 0)
    return (
      <div className="h-[50vh] flex items-center justify-center text-center">
        You don&apos;t have favourite books yet.
      </div>
    );

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 w-full">
        {reviews.map((review: UserBooksType, index) => (
          <div key={index} className="max-w-[350px] mx-auto w-full">
            <UserBookCard review={review} />
          </div>
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
