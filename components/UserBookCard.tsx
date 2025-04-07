import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { UserBooksType } from "@/app/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UserBookCard({ review }: { review: UserBooksType }) {
  return (
    <Card className="flex flex-col items-center p-4 gap-4 w-full mb-4 text-[#e4e6eb] bg-[#1c1f26] border-[#292e38] border-2">
      <div className="w-full text-center">
        <CardTitle className="text-xl truncate 	text-[#e4e6eb]">
          {review.book.title}
        </CardTitle>
        <CardDescription className="text-base truncate text-[#a0a8b7]">
          {review.book.author} ({review.book.publishDate})
        </CardDescription>
      </div>

      <div className="relative w-full pb-[150%]">
        <Image
          src={review.book.cover || "/images/cover.jpg"}
          alt={`Cover of ${review.book.title}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          quality={100}
          placeholder="blur"
          blurDataURL="/placeholder.svg"
          loading="lazy"
        />
      </div>

      <div className={"w-full flex flex-row justify-between items-center"}>
        <Button
          asChild
          className="w-full max-w-[70%] bg-[#2563eb] hover:bg-[#1644a8] text-white"
        >
          <Link href={`/books/${review.book.id}`}>Go to book page</Link>
        </Button>
        <p className="text-[#a0a8b7]">
          {review.book.averageRating.toFixed(1)}
          <span className="text-yellow-500 ml-1">★</span>
        </p>
      </div>
    </Card>
  );
}
