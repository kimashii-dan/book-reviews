import { findGoogleBooksByTitle } from "@/app/utils/findBooksByTitle";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";
import { Book } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { PaginationComponent } from "../PaginationComponent";

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
    const data = await findGoogleBooksByTitle(search, offset);
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
              <b>{search}</b>
            </em>
            &quot;:
          </p>
        </div>
      )}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 w-full">
        {books?.map((book: Book, index) => (
          <Card
            key={index}
            className="flex flex-col items-center p-4 gap-4 w-full mb-4"
          >
            <div className="w-full text-center">
              <CardTitle className="text-xl truncate">{book.title}</CardTitle>
              <CardDescription className="text-base truncate">
                {book.author} ({book.publishDate})
              </CardDescription>
            </div>

            <div className="relative w-full pb-[150%]">
              <Image
                src={book.cover || "/images/cover.jpg"}
                alt={`Cover of ${book.title}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                quality={100}
                placeholder="blur"
                blurDataURL="/images/placeholder.jpg"
                loading="lazy"
              />
            </div>

            {!book.averageRating ? (
              <Button asChild className="w-full max-w-[225px]">
                <Link href={`/books/${book.id}`}>Go to book page</Link>
              </Button>
            ) : (
              <div
                className={"w-full flex flex-row justify-between items-center"}
              >
                <Button asChild className="w-full max-w-[80%]">
                  <Link href={`/books/${book.id}`}>Go to book page</Link>
                </Button>
                <p className="text-gray-600">
                  {book.averageRating}
                  <span className="text-yellow-500 ml-1">★</span>
                </p>
              </div>
            )}
          </Card>
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
