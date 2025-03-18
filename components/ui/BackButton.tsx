"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      className="cursor-pointer"
      onClick={() => router.back()}
      variant="outline"
    >
      ← Back
    </Button>
  );
}
