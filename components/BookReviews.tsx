import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { ReviewWithBookType } from "@/app/types";
export default function BookReviews({
  sortedReviews,
  userId,
}: {
  sortedReviews: ReviewWithBookType[];
  userId: string | undefined;
}) {
  return (
    <Carousel
      opts={{ align: "start" }}
      orientation="vertical"
      className="w-full duration-100"
    >
      <CarouselContent className="my-5 h-[225px] mb-3">
        {sortedReviews.map((review) => (
          <CarouselItem key={review.id} className="basis-1/2 ">
            <Card className="h-full gap-3 bg-[#1c1f26] border-[#292e38] border-2 text-[#e4e6eb]">
              <CardHeader>
                {review.user.id === userId ? (
                  <CardTitle className="text-xl">Your review</CardTitle>
                ) : (
                  <div className="flex flex-row items-center gap-4">
                    <div className="w-15 h-15 rounded-full overflow-hidden relative">
                      <Image
                        src={review.user.image || "/user.svg"}
                        alt="Your avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="">
                      <CardTitle className="w-full truncate">
                        {review.user.name}
                      </CardTitle>
                      <CardDescription className="w-full truncate">
                        {review.user.email}
                      </CardDescription>
                    </div>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="my-1 flex items-center">
                  <span className="text-yellow-500 text-xl">
                    {"★".repeat(review.rating)}
                  </span>
                  <span className="text-[#a0a8b7] text-xl">
                    {"★".repeat(5 - review.rating)}
                  </span>
                </div>
                <CardTitle className="w-full truncate">
                  {review.comment}
                </CardTitle>
                <div className="flex gap-3 text-lg mt-3 flex-wrap">
                  <span className="text-[#a0a8b7]">{review.status}</span>
                  {review.status === "reading" && (
                    <span className="text-blue-500">•</span>
                  )}
                  {review.status === "completed" && (
                    <span className="text-green-500">•</span>
                  )}
                  {review.status === "dropped" && (
                    <span className="text-red-500">•</span>
                  )}
                  <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center gap-4 mt-4">
        <CarouselPrevious className="relative top-0 transform-none left-35 bg-[#0d0f15]" />
        <CarouselNext className="relative top-0 transform-none left-35 bg-[#0d0f15]" />
      </div>
    </Carousel>
  );
}
