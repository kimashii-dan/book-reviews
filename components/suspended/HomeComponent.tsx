// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
import Image from "next/image";
// import { Button } from "../ui/button";
import Link from "next/link";
import { TextEffect } from "../motion-primitives/text-effect";
// import { Magnetic } from "../motion-primitives/magnetic";
import { InfiniteSliderBasic } from "../InfiniteSlider";
import { ChevronDown } from "lucide-react";
// import prisma from "@/lib/db";
// import { getServerSession } from "@/app/actions";
// import { Session } from "@/app/types";
export default async function HomeComponent() {
  // const springOptions = { bounce: 0.1 };
  // const session: Session | null = await getServerSession();
  // if (!session?.user) {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-9/12 mx-auto py-8 gap-5 relative">
        <div className="w-full h-[85vh] flex flex-col justify-center items-center">
          <div className="text-center mb-16">
            <TextEffect
              per="char"
              preset="fade"
              className="text-5xl font-extrabold 	text-[#e4e6eb] "
            >
              Welcome to Book Reviews
            </TextEffect>

            <p className="text-[#a0a8b7] text-lg mt-2">
              Find any book you want and post personal reviews
            </p>
          </div>
          <div className="flex items-center w-[700px] justify-center">
            <InfiniteSliderBasic />
          </div>
        </div>
        <div className="absolute bottom-0 left-[50%] transform -translate-x-1/2">
          <Link href="#usage" className="animate-bounce cursor-pointer">
            <ChevronDown color="white" size={35} />
          </Link>
        </div>
      </div>

      {/* <Magnetic
              intensity={0.2}
              springOptions={springOptions}
              actionArea="global"
              range={200}
            >
              <Button
                asChild
                className="px-8 py-6 text-xl bg-[#1c1f26] text-white hover:bg-[#292e38] mt-10 mb-15"
              >
                <Link href="/books">Get started</Link>
              </Button>
            </Magnetic> */}

      {/* <Instructions /> */}
      <section
        id="usage"
        className="flex flex-col justify-center items-center w-11/12 md:w-10/12 mx-auto my-16 md:my-32 gap-5"
      >
        <div className="flex flex-col lg:flex-row h-auto lg:h-[70vh] gap-10 lg:gap-20 justify-center w-full">
          <div className="relative w-full lg:w-[40%] h-64 sm:h-80 md:h-96 lg:h-full rounded-2xl overflow-hidden">
            <Image
              src="https://jackiemantey.com/wp-content/uploads/2018/12/JM_Addictive-Reading.jpg"
              alt="readingPerson"
              fill
              className="object-cover"
              quality={100}
              placeholder="blur"
              blurDataURL="/placeholder.svg"
              loading="lazy"
            />
          </div>

          <ul className="w-full lg:w-[40%] flex flex-col text-left justify-between gap-6 lg:gap-0 list-none relative">
            <h1 className="text-2xl sm:text-3xl font-extrabold bg-[#0d0f15] z-10 pb-3">
              How to use this website?
            </h1>
            <li className="bg-[#0d0f15] z-10 py-3">
              <div>
                <h2 className="text-[20px] sm:text-xl font-semibold">
                  Search for any book you want
                </h2>
                <p className="text-[#a0a8b7] text-sm sm:text-base">
                  Trust me, any book
                </p>
              </div>
            </li>
            <li className="bg-[#0d0f15] z-10 py-3">
              <div>
                <h2 className="text-[20px] sm:text-xl font-semibold">
                  Read reviews for books
                </h2>
                <p className="text-[#a0a8b7] text-sm sm:text-base">
                  Or be the first to review
                </p>
              </div>
            </li>

            <li className="bg-[#0d0f15] z-10 py-3">
              <h2 className="text-[20px] sm:text-xl font-semibold flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-10">
                <span>Track</span>
                <div className="flex flex-col text-sm sm:text-base font-normal w-full sm:w-1/3">
                  <span
                    className="text-red-500 text-left animate-float"
                    style={{ animationDelay: "0s", animationDuration: "6s" }}
                  >
                    &quot;favourite
                  </span>
                  <span
                    className="text-blue-700 text-center animate-float"
                    style={{ animationDelay: "1s", animationDuration: "7s" }}
                  >
                    reading now
                  </span>
                  <span
                    className="text-green-500 text-right animate-float"
                    style={{ animationDelay: "2s", animationDuration: "5s" }}
                  >
                    have read&quot;
                  </span>
                </div>
                books
              </h2>
            </li>
            <div className="absolute bg-gray-500 h-full w-0.5 ml-2 z-0"></div>
          </ul>
        </div>
      </section>
    </>
  );
  // }

  //   const reviews = await prisma.review.findMany({
  //     where: { userId: session.user.id },
  //     include: { book: true },
  //     orderBy: { createdAt: "desc" },
  //     cacheStrategy: { swr: 60 },
  //   });

  //   if (reviews.length === 0) {
  //     return (
  //       <div className="flex flex-col justify-center items-center w-9/12 mx-auto py-8 gap-5">
  //         <div className="w-full h-[65vh] flex flex-col justify-center items-center">
  //           <div className="text-center">
  //             <h1 className="text-3xl font-bold">No Reviews Found</h1>
  //             <p className="text-gray-600 mt-1 mb-5">
  //               You haven&apos;t reviewed any books yet.
  //             </p>
  //             <Button asChild className="px-8 py-6 text-xl ">
  //               <Link href="/books">Explore Books</Link>
  //             </Button>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   }

  //   return (
  //     <div className="flex flex-col justify-center items-center w-9/12 mx-auto py-8 gap-5">
  //       <div className="mb-5 mt-5 w-full">
  //         <h1 className="text-3xl font-bold">Welcome {session.user.name}, </h1>
  //         <h2 className="text-2xl">Here&apos;s your reviews</h2>
  //       </div>
  //       <Carousel
  //         opts={{ align: "start" }}
  //         className="w-full max-w-4xl overflow-visible pb-16"
  //       >
  //         <CarouselContent className="overflow-visible pb-10">
  //           {reviews.map((review) => (
  //             <CarouselItem
  //               key={review.id}
  //               className="md:basis-1/2 lg:basis-1/3 min-w-[400px] mx-4 my-6"
  //             >
  //               <div className="border p-8 rounded-2xl text-left flex flex-col items-start gap-6 shadow-2xl bg-white transition-all duration-300 transform hover:scale-103">
  //                 <Image
  //                   src={review.book.cover || "/images/cover.jpg"}
  //                   alt={`Cover of ${review.book.title}`}
  //                   className="w-full h-64 object-cover rounded-xl"
  //                   width={400}
  //                   height={500}
  //                   quality={50}
  //                   placeholder="blur"
  //                   blurDataURL="/images/placeholder.jpg"
  //                   loading="lazy"
  //                 />
  //                 <div className="flex flex-col w-full">
  //                   <h3 className="font-bold text-2xl">{review.book.title}</h3>
  //                   <p className="text-lg text-gray-600">{review.book.author}</p>
  //                   <div className="flex flex-row items-center justify-between">
  //                     <div className="mt-1 flex items-center">
  //                       <span className="text-yellow-500 text-xl">
  //                         {"★".repeat(review.rating)}
  //                       </span>
  //                       <span className="text-gray-400 text-xl">
  //                         {"★".repeat(5 - review.rating)}
  //                       </span>
  //                     </div>{" "}
  //                     <Link
  //                       className="cursor-pointer underline text-blue-950"
  //                       href={`/books/${review.book.id}`}
  //                     >
  //                       Go to book page
  //                     </Link>
  //                   </div>

  //                   <p className="text-lg mt-1">{review.comment}</p>
  //                   <div className="flex flex-row items-center justify-between text-lg text-gray-500 mt-3">
  //                     <p>
  //                       {review.status}
  //                       {review.status === "reading" && (
  //                         <span className="text-blue-500 ml-1">•</span>
  //                       )}
  //                       {review.status === "completed" && (
  //                         <span className="text-green-500 ml-1">•</span>
  //                       )}
  //                     </p>

  //                     <span>
  //                       {new Date(review.createdAt).toLocaleDateString()}
  //                     </span>
  //                   </div>
  //                 </div>
  //               </div>
  //             </CarouselItem>
  //           ))}
  //         </CarouselContent>
  //         <CarouselPrevious aria-label="Previous review" />
  //         <CarouselNext aria-label="Next review" />
  //       </Carousel>
  //     </div>
  //   );
  // }
}
