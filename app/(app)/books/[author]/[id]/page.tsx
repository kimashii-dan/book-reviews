import BookComponent from "@/components/BookComponent";
import { SkeletonBook } from "@/components/SkeletonBook";
import BackButton from "@/components/ui/BackButton";
import { Suspense } from "react";
export default async function BookPage({
  params,
}: {
  params: Promise<{ [key: string]: string | undefined }>;
}) {
  const { id, author } = await params;
  const decodedAuthor = decodeURIComponent(author || "");
  return (
    <div className="flex flex-col justify-center items-center w-4/6 mx-auto  ">
      <BackButton />
      <Suspense fallback={<SkeletonBook />}>
        <BookComponent author={decodedAuthor} id={id} />
      </Suspense>
    </div>
  );
}
