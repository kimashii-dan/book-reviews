"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      className="bg-[#1e2531] text-white border-none"
      onClick={() => router.back()}
      variant="outline"
    >
      ← Back
    </Button>
  );
}
