import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "@/app/actions";
import dynamic from "next/dynamic";

const UserBooks = dynamic(
  () => import("../../../../components/pages/UserBooks")
);

export default async function ReadingNowPage() {
  const session = await getServerSession();
  if (!session) redirect("/sign-in");
  return (
    <div className="flex flex-col  w-9/12 mx-auto gap-8 ">
      <h1 className="text-left w-full mt-10 text-4xl font-bold">Reading now</h1>

      <UserBooks category={"reading"} userId={session.user.id} />
    </div>
  );
}
