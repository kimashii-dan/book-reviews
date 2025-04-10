import { SkeletonBookList } from "@/components/loadingUI/SkeletonBookList";
import React, { Suspense } from "react";
import { Book } from "@prisma/client";
import LibraryBookCard from "@/components/LibraryBookCard";
import { bookService } from "@/app/services/book.service";
import dynamic from "next/dynamic";

const SearchComponent = dynamic(() => import("@/components/SearchComponent"), {
  loading: () => <div>Loading search input...</div>,
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
        <BooksComponent query={query} page={page} searchBy={searchBy} />
      </Suspense>
    </div>
  );
}

const PaginationComponent = dynamic(
  () => import("@/components/PaginationComponent"),
  {
    loading: () => <div>Loading pagination...</div>,
  }
);

async function BooksComponent({
  searchBy,
  query,
  page,
}: {
  searchBy?: string;
  query?: string;
  page?: number;
}) {
  let books: Book[] | null = null;
  let totalResults = 0;
  const limit = 6;

  if (searchBy && query && page) {
    const offset = (page - 1) * limit;
    const data = await bookService.findAPIBooksByTitle(searchBy, query, offset);
    books = data?.books || null;
    totalResults = data?.totalResults || 0;
  } else {
    books = await bookService.getAllBooks();
  }

  if (!books)
    return (
      <div className="h-[50vh] flex items-center justify-center text-center">
        {searchBy} with &quot;{query}&quot; title don&apos;t exist {":("}
      </div>
    );

  return (
    <>
      {query && (
        <div className="w-full text-gray-500 ">
          <p>
            {totalResults} results for &quot;
            <em>
              <b className="text-white">{query}</b>
            </em>
            &quot;:
          </p>
        </div>
      )}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 w-full">
        {books?.map((book: Book, index) => (
          <div key={index} className="max-w-[350px] mx-auto w-full">
            <LibraryBookCard book={book} />
          </div>
        ))}
      </div>
      {query && (
        <PaginationComponent
          totalPages={totalResults / limit}
          currentPage={Number(page)}
          baseUrl={`/books?searchBy=${searchBy}&query=${query}`}
        />
      )}
    </>
  );
}
