import { SkeletonBookList } from "@/components/loadingUI/SkeletonBookList";
import React, { Suspense } from "react";
import SearchFilter from "@/components/SearchFilter";
import Books from "@/components/pages/Books";

export default async function BooksPage(props: {
  searchParams?: Promise<{
    searchBy?: string;
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const searchBy = searchParams?.searchBy || "";
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page || 1);

  return (
    <div className="flex flex-col justify-center items-center w-9/12 mx-auto gap-8 ">
      <SearchFilter query={query} searchBy={searchBy} />

      <Suspense
        key={`${searchBy}-${query}-${page}`}
        fallback={<SkeletonBookList />}
      >
        <Books query={query} page={page} searchBy={searchBy} />
      </Suspense>
    </div>
  );
}
