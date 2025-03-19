import UserReviews from "@/components/UserReviews";
import { checkServerSession } from "../actions";
import { SessionUser } from "../types";
import SkeletonUserReviews from "@/components/SkeletonUserReviews";
import { Suspense } from "react";

export default async function Page() {
  const user: SessionUser | undefined = await checkServerSession();
  return (
    <Suspense fallback={<SkeletonUserReviews />}>
      <UserReviews user={user} />
    </Suspense>
  );
}
