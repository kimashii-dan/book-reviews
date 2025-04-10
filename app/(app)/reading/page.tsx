import { SkeletonBookList } from "@/components/loadingUI/SkeletonBookList";
import React, { Suspense } from "react";
import { UserBooksType, Session } from "@/app/types";
import { redirect } from "next/navigation";
import UserBookCard from "@/components/UserBookCard";
import { bookService } from "@/app/services/book.service";
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
  if (!session) return redirect("/sign-in");
  const reviews = await bookService.getBooksWithReadingStatus(session.user.id);

  if (reviews.length === 0)
    return (
      <div className="h-[50vh] flex items-center justify-center text-center">
        You have no books you are currently reading.
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
    </>
  );
}
