"use client";

import { Loader2, Search } from "lucide-react";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useTransition, useState } from "react";
import BackButton from "./BackButton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function SearchComponent({
  query: initialQuery,
  searchBy: initialSearchBy,
}: {
  query: string;
  searchBy: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [search, setSearch] = useState({
    query: initialQuery,
    searchBy: initialSearchBy || "title",
  });

  const handleSearch = useDebouncedCallback((updated: typeof search) => {
    if (hasUserInteracted || updated.query) {
      startTransition(() => {
        router.push(
          `/books?searchBy=${updated.searchBy}&query=${updated.query}&page=1`
        );
      });
    }
  }, 400);

  return (
    <>
      <div className="flex lg:flex-row gap-5 flex-col justify-between items-center w-full mt-10">
        <h1 className="text-4xl font-bold w-[30%]">Library</h1>
        <div className="flex flex-row gap-5 lg:w-[60%] w-full">
          <div className="flex flex-row gap-2 w-full relative">
            <Input
              name="query"
              type="text"
              placeholder={`Search for any book by ${search.searchBy}`}
              className="p-4 pr-12 text-base placeholder:text-base border-[#292e38] border-2 placeholder:text-[#a0a8b7]"
              value={search.query}
              onChange={(e) => {
                const updated = { ...search, query: e.target.value };
                setSearch(updated);
                setHasUserInteracted(true);
                handleSearch(updated);
              }}
            />
            <div className="absolute right-3 top-2">
              {isPending ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <Search color="gray" size={20} />
              )}
            </div>
          </div>
          <Select
            onValueChange={(value) => {
              const updated = { ...search, searchBy: value };
              setSearch(updated);
              setHasUserInteracted(true);
              if (search.query) {
                handleSearch(updated);
              }
            }}
            value={search.searchBy}
          >
            <SelectTrigger className="w-[100px] border-[#242b38] border-2 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1c1f26] text-white border-[#242b38]">
              <SelectGroup>
                <SelectLabel className="font-bold">Search by</SelectLabel>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="author">Author</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {search.searchBy && search.query && (
        <div className="w-full text-left">
          <BackButton />
        </div>
      )}
    </>
  );
}
