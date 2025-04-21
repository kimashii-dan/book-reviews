import BackButton from "@/components/BackButton";
import dynamic from "next/dynamic";

const BookComponent = dynamic(
  () => import("../../../../../components/pages/BookComponent")
);

export default async function BookPage({
  params,
}: {
  params: Promise<{ [key: string]: string | undefined }>;
}) {
  return (
    <div className="flex flex-col justify-center items-center w-9/12 mx-auto  ">
      <div className="w-full text-left my-5">
        <BackButton />
      </div>

      <BookComponent params={params} />
    </div>
  );
}
