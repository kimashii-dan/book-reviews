import { SessionUser } from "@/app/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import prisma from "@/lib/db";
import { Button } from "./ui/button";
import Link from "next/link";
export default async function UserReviews({
  user,
}: {
  user: SessionUser | undefined;
}) {
  const reviews = await prisma.review.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      book: true,
    },
    orderBy: {
      reviewDate: "desc",
    },
  });

  if (reviews.length === 0)
    return (
      <div className="flex flex-col justify-center items-center w-4/6 mx-auto py-8 gap-5">
        <div className="w-full h-[65vh] flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome to Book Reviews</h1>
            <p className="text-gray-600 mt-1 mb-5">
              Find any book you want and post personal reviews
            </p>
            <Button asChild className="px-8 py-6 text-xl ">
              <Link href="/books">Get started</Link>
            </Button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col justify-center items-center w-4/6 mx-auto py-8 gap-5">
      <div className="mb-10 mt-5 w-full">
        <h1 className="text-3xl font-bold">Welcome {user?.name}, </h1>
        <h2 className="text-2xl">Here&apos;s your reviews</h2>
      </div>
      <Carousel
        opts={{ align: "start" }}
        className="w-full max-w-4xl overflow-visible pb-16"
      >
        <CarouselContent className="overflow-visible pb-10">
          {reviews.map((review) => (
            <CarouselItem
              key={review.id}
              className="md:basis-1/2 lg:basis-1/3 min-w-[400px] mx-4 my-6"
            >
              <Link
                className="cursor-pointer"
                href={`/books/${review.book.author}/${review.book.id}`}
              >
                <div className="border p-8 rounded-2xl text-left flex flex-col items-start gap-6 shadow-2xl bg-white transition-all duration-300 transform hover:scale-103">
                  <Image
                    src={review.book.cover || "/images/cover.jpg"}
                    alt={`Cover of ${review.book.title}`}
                    className="w-full h-64 object-cover rounded-xl"
                    width={400}
                    height={500}
                    quality={50}
                    placeholder="blur"
                    blurDataURL="/images/placeholder.jpg"
                    loading="lazy"
                  />
                  <div className="flex flex-col w-full">
                    <h3 className="font-bold text-2xl">{review.book.title}</h3>
                    <p className="text-lg text-gray-600">
                      {review.book.author}
                    </p>
                    <div className="mt-3 flex items-center">
                      <span className="text-yellow-500 text-xl">
                        {"★".repeat(review.rating)}
                      </span>
                      <span className="text-gray-400 text-xl">
                        {"★".repeat(5 - review.rating)}
                      </span>
                    </div>
                    <p className="text-lg mt-3">{review.comment}</p>
                    <div className="flex gap-3 text-lg text-gray-500 mt-3">
                      <span>{review.status}</span>
                      {review.status === "reading" && (
                        <span className="text-blue-500">•</span>
                      )}
                      {review.status === "completed" && (
                        <span className="text-green-500">•</span>
                      )}
                      {review.status === "dropped" && (
                        <span className="text-red-500">•</span>
                      )}
                      <span>
                        {new Date(review.reviewDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious aria-label="Previous review" />
        <CarouselNext aria-label="Next review" />
      </Carousel>
    </div>
  );
}
