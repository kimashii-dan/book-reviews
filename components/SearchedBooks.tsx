import { findBooksByTitle } from "@/app/utils/findBooksByTitle";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";
import { Book } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default async function SearchedBooks({
  search,
}: {
  search?: string | undefined;
}) {
  let books: Book[] | null = await prisma.book.findMany({
    orderBy: {
      title: "asc",
    },
  });

  if (search) {
    books = await findBooksByTitle(search || undefined);
  }

  if (!books)
    return (
      <div className="h-[50vh] flex items-center justify-center text-center">
        Books with &quot;{search}&quot; title don&apos;t exist {":("}
      </div>
    );

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 w-full p-4">
      {books?.map((book: Book, index) => (
        <Card
          key={index}
          className="flex flex-col items-center p-4 gap-4 w-full"
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
              quality={75}
              placeholder="blur"
              blurDataURL="/images/placeholder.jpg"
              loading="lazy"
            />
          </div>

          <Button asChild className="w-full max-w-[225px]">
            <Link href={`/books/${book.author}/${book.id}`}>
              Go to book page
            </Link>
          </Button>
        </Card>
      ))}
    </div>
  );
}
