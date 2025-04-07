import SearchComponent from "@/components/SearchComponent";
import { SkeletonBookList } from "@/components/loadingUI/SkeletonBookList";
import React, { Suspense } from "react";
import BooksComponent from "@/components/suspended/BooksComponent";

export default async function Books(props: {
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
      <SearchComponent query={query} searchBy={searchBy} />

      <Suspense key={`${query}-${page}`} fallback={<SkeletonBookList />}>
        <BooksComponent query={query} page={page} searchBy={searchBy} />
      </Suspense>
    </div>
  );
}
