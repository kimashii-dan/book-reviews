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
            <div className="border p-8 rounded-2xl flex flex-col items-start gap-6 shadow-2xl bg-white animate-pulse">
              <div className="w-full h-64 bg-gray-200 rounded-xl" />
              <div className="flex flex-col w-full gap-2">
                <div className="h-6 w-1/2 bg-gray-200 rounded" />
                <div className="h-5 w-1/3 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="flex gap-3 mt-3">
                  <div className="h-4 w-1/4 bg-gray-200 rounded" />
                  <div className="h-4 w-1/4 bg-gray-200 rounded" />
                  <div className="h-4 w-1/4 bg-gray-200 rounded" />
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
