import UserReviews from "@/components/suspended/UserReviewsComponent";
import { Suspense } from "react";
import SkeletonUserReviews from "@/components/loadingUI/SkeletonUserReviews";

export default async function Page() {
  return (
    <Suspense fallback={<SkeletonUserReviews />}>
      <UserReviews />
    </Suspense>
  );
}
