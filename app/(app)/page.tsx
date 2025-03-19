import UserReviews from "@/components/suspended/UserReviewsComponent";
import { Suspense } from "react";
import Loading from "@/components/loadingUI/Loading";

export default async function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <UserReviews />
    </Suspense>
  );
}
