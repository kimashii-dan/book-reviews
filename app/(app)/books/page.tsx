import SearchedBooks from "@/components/SearchedBooks";
import { SkeletonBookList } from "@/components/SkeletonBookList";

import React, { Suspense } from "react";

export default async function Books({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { search } = await searchParams;

  return (
    <>
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

      <Suspense fallback={<SkeletonBookList />}>
        <SearchedBooks searchParam={search} />
      </Suspense>
    </>
  );
}
