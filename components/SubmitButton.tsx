/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Loader2 } from "lucide-react";

export function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  let defaultState: any = text;
  if (text === "search") {
    defaultState = <Search />;
  }
  return (
    <Button className="cursor-pointer" type="submit" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" size={48} /> : defaultState}
    </Button>
  );
}
