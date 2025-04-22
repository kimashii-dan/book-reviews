import ButtonGoBack from "@/components/ButtonGoBack";
import dynamic from "next/dynamic";

const Book = dynamic(() => import("../../../../../components/pages/Book"));

export default async function BookPage({
  params,
}: {
  params: Promise<{ [key: string]: string | undefined }>;
}) {
  return (
    <div className="flex flex-col justify-center items-center w-9/12 mx-auto  ">
      <div className="w-full text-left my-5">
        <ButtonGoBack />
      </div>
      <Book params={params} />
    </div>
  );
}
