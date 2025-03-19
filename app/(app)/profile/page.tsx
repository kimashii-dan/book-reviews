import React, { Suspense } from "react";

import ProfileComponent from "@/components/suspended/ProfileComponent";
import SkeletonProfile from "@/components/loadingUI/SkeletonProfile";

export default async function ProfilePage() {
  return (
    <Suspense fallback={<SkeletonProfile />}>
      <ProfileComponent />
    </Suspense>
  );
}
