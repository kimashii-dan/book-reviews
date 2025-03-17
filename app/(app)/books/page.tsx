import SearchComponent from "@/components/SearchComponent";
import SearchedBooks from "@/components/SearchedBooks";
import { SkeletonBookList } from "@/components/SkeletonBookList";

import React, { Suspense } from "react";

export default async function Books(props: {
  searchParams?: Promise<{
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";

  return (
    <div className="flex flex-col justify-center items-center w-4/6 mx-auto gap-10 ">
      <SearchComponent />

      {search && (
        <div className="w-full text-gray-500 ">
          <p>
            Results for &quot;
            <em>
              <b>{search}</b>
            </em>
            &quot;:
          </p>
        </div>
      )}

      <Suspense key={search} fallback={<SkeletonBookList />}>
        <SearchedBooks search={search} />
      </Suspense>
    </div>
  );
}
