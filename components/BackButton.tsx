"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      className="secondary-button"
      onClick={() => router.back()}
      variant="default"
    >
      ← Back
    </Button>
  );
}
