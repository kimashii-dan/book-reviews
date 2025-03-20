import Loading from "@/components/loadingUI/Loading";
import ResetPasswordComponent from "@/components/suspended/ResetPasswordComponent";
import React, { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordComponent />
    </Suspense>
  );
}
