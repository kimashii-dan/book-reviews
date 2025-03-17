import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonBook() {
  return (
    <div className="w-full max-w-[1000px] mx-auto p-4 space-y-8">
      {/* Main Card Skeleton */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 items-start p-4">
        {/* Image Skeleton */}
        <div className="w-full">
          <Skeleton className="w-full pb-[150%] rounded-lg" />
        </div>

        {/* Content Skeleton */}
        <div className="w-full space-y-8">
          {/* Title and Author Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          {/* Reviews Section Skeleton */}
          <div className="space-y-6">
            <Skeleton className="h-6 w-1/4" />
            <div className="space-y-4">
              <Skeleton className="h-24 w-full rounded-lg" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Review Form Skeleton */}
      <div className="w-full max-w-[1800px] mx-auto p-4">
        <Skeleton className="h-40 w-full rounded-lg" />
      </div>
    </div>
  );
}
