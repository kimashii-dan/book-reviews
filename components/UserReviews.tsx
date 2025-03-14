import { CurrentUser } from "@/app/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import prisma from "@/lib/db";
export default async function UserReviews({
  user,
}: {
  user: CurrentUser | undefined;
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
    return <div className="">You have no reviews yet</div>;

  return (
    <Carousel
      opts={{ align: "start" }}
      className="w-full max-w-4xl overflow-visible pb-16"
    >
      <CarouselContent className="overflow-visible pb-10">
        {reviews.map((review) => (
          <CarouselItem
            key={review.id}
            className="md:basis-1/2 lg:basis-1/3 min-w-[400px] mx-4 mb-6"
          >
            <div className="border p-8 rounded-2xl text-left flex flex-col items-start gap-6 shadow-2xl bg-white">
              <Image
                src={review.book.cover || "/images/cover.jpg"}
                alt={review.book.title}
                className="w-full h-64 object-cover rounded-xl"
                width={400}
                height={500}
              />
              <div className="flex flex-col w-full">
                <h3 className="font-bold text-2xl">{review.book.title}</h3>
                <p className="text-lg text-gray-600">{review.book.author}</p>
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
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious aria-label="Previous review" />
      <CarouselNext aria-label="Next review" />
    </Carousel>
  );
}
