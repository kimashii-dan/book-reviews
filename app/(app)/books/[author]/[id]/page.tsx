import Book from "@/components/Book";
import { SkeletonBookPage } from "@/components/SkeletonBook";
import BackButton from "@/components/ui/BackButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";
export default async function BookPage({
  params,
}: {
  params: Promise<{ [key: string]: string | undefined }>;
}) {
  const { id, author } = await params;
  const decodedAuthor = decodeURIComponent(author || "");
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  return (
    <>
      <BackButton />
      <Suspense fallback={<SkeletonBookPage />}>
        <Book id={id} author={decodedAuthor} user={user} />
      </Suspense>
    </>
  );
}
