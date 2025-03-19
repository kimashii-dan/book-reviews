import { Skeleton } from "../ui/skeleton";

export default function SkeletonProfile() {
  return (
    <div className="flex flex-row justify-between w-[650px] mx-auto py-8">
      <div className="flex justify-center flex-col gap-7 w-5/12">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="w-50 h-50 rounded-full" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="flex flex-col gap-10 text-left overflow-hidden w-5/12">
        <ul className="flex flex-col gap-5 h-full">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </ul>
      </div>
    </div>
  );
}
