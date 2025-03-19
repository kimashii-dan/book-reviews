import SearchComponent from "@/components/SearchComponent";
import { SkeletonBookList } from "@/components/loadingUI/SkeletonBookList";
import React, { Suspense } from "react";
import BooksComponent from "@/components/suspended/BooksComponent";

export default async function Books(props: {
  searchParams?: Promise<{
    search?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const page = Number(searchParams?.page || 1);

  return (
    <div className="flex flex-col justify-center items-center w-4/6 mx-auto gap-8 ">
      <SearchComponent search={search} />

      <Suspense key={`${search}-${page}`} fallback={<SkeletonBookList />}>
        <BooksComponent search={search} page={page} />
      </Suspense>
    </div>
  );
}
