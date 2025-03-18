"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Loader2 } from "lucide-react";

export function SearchButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="animate-spin" size={48} /> : <Search />}
    </Button>
  );
}
