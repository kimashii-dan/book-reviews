import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Book } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function LibraryBookCard({ book }: { book: Book }) {
  return (
    <Card className="flex flex-col items-center p-4 gap-4 w-full mb-4 text-[#e4e6eb] bg-[#1c1f26] border-[#292e38] border-2">
      <div className="w-full text-center">
        <CardTitle className="text-xl truncate 	text-[#e4e6eb]">
          {book.title}
        </CardTitle>
        <CardDescription className="text-base truncate text-[#a0a8b7]">
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
        <Button
          asChild
          className="w-full max-w-[225px] bg-[#2563eb] text-white"
        >
          <Link href={`/books/${book.id}`}>Go to book page</Link>
        </Button>
      ) : (
        <div className={"w-full flex flex-row justify-between items-center"}>
          <Button
            asChild
            className="w-full max-w-[70%] bg-[#2563eb] text-white"
          >
            <Link href={`/books/${book.id}`}>Go to book page</Link>
          </Button>
          <p className="text-[#a0a8b7]">
            {book.averageRating.toFixed(1)}
            <span className="text-yellow-500 ml-1">★</span>
          </p>
        </div>
      )}
    </Card>
  );
}
