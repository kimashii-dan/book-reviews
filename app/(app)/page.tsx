// import { Suspense } from "react";
// import SkeletonUserReviews from "@/components/loadingUI/SkeletonUserReviews";
import HomeComponent from "@/components/suspended/HomeComponent";

export default async function Page() {
  return (
    // <Suspense fallback={<SkeletonUserReviews />}>
    //   <HomeComponent />
    // </Suspense>

    <HomeComponent />
  );
}
