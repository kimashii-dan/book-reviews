import { SkeletonBook } from "@/components/loadingUI/SkeletonBook";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center w-9/12 mx-auto my-24">
      <SkeletonBook />
    </div>
  );
}
