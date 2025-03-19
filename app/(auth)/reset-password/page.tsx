import ResetPasswordComponent from "@/components/suspended/ResetPasswordComponent";
import React, { Suspense } from "react";

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordComponent />
    </Suspense>
  );
}
