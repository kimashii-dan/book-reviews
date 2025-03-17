import SearchComponent from "@/components/SearchComponent";
import SearchedBooks from "@/components/SearchedBooks";
import { SkeletonBookList } from "@/components/SkeletonBookList";

import React, { Suspense } from "react";

export default async function Books(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const page = Number(searchParams?.page || 1);
  console.log("page:", page);
  console.log("search:", search);

  return (
    <div className="flex flex-col justify-center items-center w-4/6 mx-auto gap-10 ">
      <SearchComponent />

      <Suspense key={search && page} fallback={<SkeletonBookList />}>
        <SearchedBooks search={search} page={page} />
      </Suspense>
    </div>
  );
}
