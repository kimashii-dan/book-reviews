import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonBookList() {
  return (
    <div className="grid grid-cols-2 gap-7 w-full">
      {[...Array(4)].map((_, index) => (
        <Card key={index} className="flex flex-col items-center p-4">
          <div className="w-full text-center mb-3">
            <Skeleton className="h-6 w-[250px] rounded-md" />
            <Skeleton className="h-5 w-[200px] rounded-md" />
          </div>

          <Skeleton className="w-[225px] h-[350px] mb-4 rounded-lg" />

          <Skeleton className="h-10 w-[100px] rounded-md" />
        </Card>
      ))}
    </div>
  );
}
