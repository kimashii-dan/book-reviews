import { findAPIBooksByTitle } from "@/app/utils/findAPIBooksByTitle";
import prisma from "@/lib/db";
import { Book } from "@prisma/client";
import { PaginationComponent } from "../PaginationComponent";
import LibraryBookCard from "../LibraryBookCard";

export default async function BooksComponent({
  search,
  page,
}: {
  search?: string;
  page?: number;
}) {
  let books: Book[] | null = null;
  let totalResults = 0;
  const limit = 6;

  if (search && page) {
    const offset = (page - 1) * limit;
    const data = await findAPIBooksByTitle(search, offset);
    books = data?.books || null;
    totalResults = data?.totalResults || 0;
  } else {
    books = await prisma.book.findMany({
      orderBy: {
        title: "asc",
      },
    });
  }

  if (!books)
    return (
      <div className="h-[50vh] flex items-center justify-center text-center">
        Books with &quot;{search}&quot; title don&apos;t exist {":("}
      </div>
    );

  return (
    <>
      {search && (
        <div className="w-full text-gray-500 ">
          <p>
            {totalResults} results for &quot;
            <em>
              <b className="text-white">{search}</b>
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
      {search && (
        <PaginationComponent
          totalPages={totalResults / limit}
          currentPage={Number(page)}
          baseUrl={`/books?search=${search}`}
        />
      )}
    </>
  );
}
