import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonBook() {
  return (
    <div className="flex flex-col justify-center items-center w-9/12 mx-auto my-24">
      <div className="w-full max-w-[1000px] mx-auto space-y-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 items-start">
          <div className="w-full">
            <Skeleton className="w-full pb-[150%] rounded-lg" />
          </div>

          <div className="w-full flex flex-col justify-around h-full">
            <div className="w-full flex flex-col justify-around h-full">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>

            <div className="w-full flex flex-col justify-around h-full">
              <Skeleton className="h-6 w-1/4" />
              <div className="w-full flex flex-col justify-around h-full">
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1800px] mx-auto my-10">
          <Skeleton className="h-40 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
