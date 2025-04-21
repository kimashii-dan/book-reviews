import { SkeletonBookList } from "@/components/loadingUI/SkeletonBookList";
export default function Loading() {
  return (
    <div className="flex flex-col w-9/12 mx-auto my-20 gap-8 ">
      <SkeletonBookList />
    </div>
  );
}
