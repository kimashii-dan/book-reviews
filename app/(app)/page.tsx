import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";
import UserReviews from "@/components/UserReviews";
import SkeletonUserReviews from "@/components/SkeletonUserReviews";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  return (
    <div className="flex flex-col justify-center items-center w-4/6 mx-auto py-8 gap-5">
      {user ? (
        <>
          <div className="mb-10 mt-5 w-full">
            <h1 className="text-3xl font-bold">Welcome {user?.name}, </h1>
            <h2 className="text-2xl">Here&apos;s your reviews</h2>
          </div>
          <Suspense fallback={<SkeletonUserReviews />}>
            <UserReviews user={user} />
          </Suspense>{" "}
        </>
      ) : (
        <div className="w-full h-[65vh] flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome to Book Reviews</h1>
            <p className="text-gray-600 mt-1 mb-5">
              Find any book you want and post personal reviews
            </p>
            <Button asChild className="px-8 py-6 text-xl ">
              <Link href="/books">Get started</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
