"use client";
import React, { useTransition } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function ButtonToAuthor({ author }: { author: string }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  function handleClick() {
    startTransition(() => {
      router.push(`/books?searchBy=author&query=${author}&page=1`);
    });
  }

  return (
    <Button
      variant="ghost"
      className="hover:bg-transparent hover:text-slate-400 text-lg font-semibold italic text-slate-400 underline"
      onClick={() => handleClick()}
    >
      {author}
    </Button>
  );
}
