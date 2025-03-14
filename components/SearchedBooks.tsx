import { BookType } from "@/app/types";
import { findBooksByTitle } from "@/app/utils/findBooksByTitle";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
export default async function SearchedBooks({
  searchParam,
}: {
  searchParam?: string | undefined;
}) {
  let books: BookType[] | null = await prisma.book.findMany({
    orderBy: {
      title: "asc",
    },
  });

  if (searchParam) {
    books = await findBooksByTitle(searchParam || undefined);
  }

  if (!books)
    return (
      <div className="h-[50vh] flex items-center">
        Books with &quot;{searchParam}&quot; title don&apos;t exist {":("}
      </div>
    );

  return (
    <div className="grid grid-cols-2 gap-10 w-full justify-center items-center mb-10">
      {books?.map((book: BookType, index) => (
        <Card key={index} className="flex flex-col items-center p-4 gap-3">
          <div className="w-full text-center my-4">
            <CardTitle className="text-xl">{book.title}</CardTitle>
            <CardDescription className="text-base">
              {book.author} ({book.publishDate})
            </CardDescription>
          </div>

          <div className="relative w-[225px] h-[350px] mb-4">
            <Image
              src={book.cover || "/images/cover.jpg"}
              alt={`Cover of ${book.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
              quality={50}
              placeholder="blur"
              blurDataURL="/images/placeholder.jpg"
            />
          </div>

          <Button asChild className="w-[225px] mb-4">
            <Link href={`/books/${book.author}/${book.id}`}>
              Go to book page
            </Link>
          </Button>
        </Card>
      ))}
    </div>
  );
}
