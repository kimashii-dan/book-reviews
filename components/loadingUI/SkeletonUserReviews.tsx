import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function SkeletonUserReviews() {
  const skeletonItems = Array.from({ length: 3 });

  return (
    <div className="flex flex-col justify-center items-center w-9/12 mx-auto py-8 gap-5">
      <div className="mb-10 mt-5 w-full">
        <div className="h-8 w-1/4 bg-gray-200 rounded animate-pulse" />
        <div className="h-6 w-1/3 bg-gray-200 rounded mt-2 animate-pulse" />
      </div>
      <Carousel
        opts={{ align: "start" }}
        className="w-full max-w-4xl overflow-visible pb-16"
      >
        <CarouselContent className="overflow-visible pb-10">
          {skeletonItems.map((_, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 min-w-[400px] mx-4 mb-6"
            >
              <div
                className="border p-8 rounded-2xl flex flex-col items-start gap-6 shadow-2xl bg-white animate-pulse"
                aria-hidden="true"
              >
                <div className="w-full h-64 bg-gray-200 rounded-xl" />
                <div className="flex flex-col w-full gap-2">
                  <div className="h-6 w-3/4 bg-gray-200 rounded" />
                  <div className="h-5 w-1/2 bg-gray-200 rounded" />
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-5 w-5 bg-gray-200 rounded-full" />
                  ))}
                </div>
                <div className="w-full">
                  <div className="h-4 w-full bg-gray-200 rounded" />
                  <div className="h-4 w-3/4 bg-gray-200 rounded mt-2" />
                </div>
                <div className="flex gap-3 w-full">
                  <div className="h-4 w-1/4 bg-gray-200 rounded" />
                  <div className="h-4 w-1/4 bg-gray-200 rounded" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious aria-label="Previous review" disabled />
        <CarouselNext aria-label="Next review" disabled />
      </Carousel>
    </div>
  );
}
