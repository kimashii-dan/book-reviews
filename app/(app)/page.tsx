import dynamic from "next/dynamic";
import Image from "next/image";

const SliderInfinite = dynamic(
  () => import("../../components/SliderInfinite"),
  {
    loading: () => <div>Loading slider...</div>,
  }
);

export default async function Page() {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-9/12 mx-auto py-8 gap-5 relative">
        <div className="w-full h-[85vh] flex flex-col justify-center items-center">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-extrabold 	text-[#e4e6eb]">
              Welcome to Book Reviews
            </h1>
            <p className="text-[#a0a8b7] text-lg mt-2">
              Find any book you want and post personal reviews
            </p>
          </div>

          <SliderInfinite />
        </div>
      </div>

      <section
        id="usage"
        className="flex flex-col justify-center items-center w-11/12 md:w-10/12 mx-auto my-16 md:my-32 gap-5"
      >
        <div className="flex flex-col lg:flex-row h-auto lg:h-[70vh] gap-10 lg:gap-20 justify-center w-full">
          <div className="relative w-full lg:w-[40%] h-64 sm:h-80 md:h-96 lg:h-full rounded-2xl overflow-hidden">
            <Image
              src="/images/reading_person.jpg"
              alt="readingPerson"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              quality={100}
              placeholder="blur"
              blurDataURL="/placeholder.svg"
              loading="lazy"
            />
          </div>

          <ul className="w-full lg:w-[40%] flex flex-col text-left justify-between gap-6 lg:gap-0 list-none relative">
            <h1 className="text-2xl sm:text-3xl font-extrabold bg-[#0d0f15] z-10 pb-7 animate-appear">
              How to use this website?
            </h1>
            <li className="bg-[#0d0f15] z-10 py-6 animate-appear">
              <div>
                <h2 className="text-[20px] sm:text-xl font-semibold">
                  Search for any book you want
                </h2>
                <p className="text-[#a0a8b7] text-sm sm:text-base">
                  Trust me, any book
                </p>
              </div>
            </li>
            <li className="bg-[#0d0f15] z-10 py-6 animate-appear">
              <div>
                <h2 className="text-[20px] sm:text-xl font-semibold">
                  Read reviews for books
                </h2>
                <p className="text-[#a0a8b7] text-sm sm:text-base">
                  Or be the first to review
                </p>
              </div>
            </li>

            <li className="bg-[#0d0f15] z-10 py-7 animate-appear">
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
}
