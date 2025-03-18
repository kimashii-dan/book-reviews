"use client";
import { Loader2, Search } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useTransition } from "react";
import BackButton from "./ui/BackButton";
export default function SearchComponent({ search }: { search: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useDebouncedCallback((term) => {
    startTransition(() => {
      router.push(`/books?search=${term}&page=1`);
    });
  }, 400);

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full mt-10">
        <div className="">
          <h1 className="text-4xl font-bold">Books</h1>
        </div>

        <div className="flex flex-row gap-2 w-[43%] relative">
          <Input
            name="search"
            type="text"
            placeholder="Search for any book"
            className="p-4 text-base placeholder:text-base"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />

          {isPending ? (
            <Loader2
              className="absolute right-3 top-2 animate-spin"
              size={20}
            />
          ) : (
            <Search className="absolute right-3 top-2" color="gray" size={20} />
          )}
        </div>
      </div>
      {search && (
        <div className="w-full text-left">
          <BackButton />
        </div>
      )}
    </>
  );
}
