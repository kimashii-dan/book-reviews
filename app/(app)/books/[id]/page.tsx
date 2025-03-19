import BookComponent from "@/components/suspended/BookComponent";
import { SkeletonBook } from "@/components/loadingUI/SkeletonBook";
import BackButton from "@/components/ui/BackButton";
import { Suspense } from "react";
export default async function BookPage({
  params,
}: {
  params: Promise<{ [key: string]: string | undefined }>;
}) {
  return (
    <div className="flex flex-col justify-center items-center w-4/6 mx-auto  ">
      <div className="w-full text-left my-5">
        <BackButton />
      </div>

      <Suspense fallback={<SkeletonBook />}>
        <BookComponent params={params} />
      </Suspense>
    </div>
  );
}
