import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function SkeletonBookPage() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <Card className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
        <CardContent className="w-full md:w-1/2 flex justify-center">
          <Skeleton className="w-[300px] h-[500px] rounded-lg" />
        </CardContent>

        <CardHeader className="w-full md:w-1/2">
          <Skeleton className="h-8 w-[200px] mb-4" />
          <Skeleton className="h-6 w-[150px] mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-[80%] mb-2" />
        </CardHeader>
      </Card>
    </div>
  );
}
