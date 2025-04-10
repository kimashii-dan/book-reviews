import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonBookList() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 w-full">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex flex-col items-center gap-4">
          <div className="w-full text-center flex flex-col gap-3">
            <Skeleton className="h-6 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </div>
          <Skeleton className="w-full pb-[140%] rounded-lg" />
          <Skeleton className="h-10 w-full max-w-[225px]" />
        </div>
      ))}
    </div>
  );
}
