import { bookService } from "@/app/services/book.service";
import { Book } from "@prisma/client";
import BookCard from "../BookCard";
import PaginationBooks from "../PaginationBooks";

export default async function Books({
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
            <BookCard book={book} />
          </div>
        ))}
      </div>
      {query && (
        <PaginationBooks
          totalPages={totalResults / limit}
          currentPage={Number(page)}
          baseUrl={`/books?searchBy=${searchBy}&query=${query}`}
        />
      )}
    </>
  );
}
