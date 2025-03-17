import UserReviews from "@/components/UserReviews";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { checkServerSession } from "../actions";
import { SessionUser } from "../types";

export default async function Page() {
  const user: SessionUser | undefined = await checkServerSession();

  if (user) {
    return <UserReviews user={user} />;
  } else {
    return (
      <div className="flex flex-col justify-center items-center w-4/6 mx-auto py-8 gap-5">
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
      </div>
    );
  }
}
