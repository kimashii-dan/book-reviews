"use client";
import Image from "next/image";
import AutoScroll from "embla-carousel-auto-scroll";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const images = [
  "/images/harry_potter.jpg",
  "/images/harry_potter_2.jpg",
  "/images/lebron_james.jpg",
  "/images/react.jpg",
  "/images/sherlock_holmes.jpg",
  "/images/war_and_peace.jpg",
];

export default function SliderInfinite() {
  return (
    <Carousel
      plugins={[
        AutoScroll({
          speed: 2,
          direction: "forward",
          stopOnInteraction: false,
          stopOnMouseEnter: false,
          playOnInit: true,
        }),
      ]}
      opts={{
        loop: true,
        dragFree: true,
        align: "center",
      }}
      className="w-full max-w-xl"
    >
      <CarouselContent className="-ml-1">
        {images.map((image, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="p-0">
                <CardContent className="flex aspect-2/3 items-center justify-center p-6 relative ">
                  <Image
                    src={image}
                    alt="image"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    quality={100}
                    loading="lazy"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
