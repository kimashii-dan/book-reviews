import { SkeletonBookList } from "@/components/loadingUI/SkeletonBookList";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import MainBooksComponent from "@/components/pages/MainBooksComponent";

const SearchComponent = dynamic(() => import("@/components/SearchComponent"), {
  loading: () => (
    <div className="h-12 w-full max-w-md bg-gray-800 rounded animate-pulse" />
  ),
});

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

      <Suspense
        key={`${searchBy}-${query}-${page}`}
        fallback={<SkeletonBookList />}
      >
        <MainBooksComponent query={query} page={page} searchBy={searchBy} />
      </Suspense>
    </div>
  );
}
