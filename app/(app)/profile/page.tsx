import { checkServerSession } from "@/app/actions";
import { SessionUser } from "@/app/types";
import SignOutButton from "@/components/SignOutButton";
import React from "react";

export default async function Profile() {
  const user: SessionUser | undefined = await checkServerSession();
  return (
    <div className="mt-10 text-center">
      <h1 className="text-2xl font-bold">Profile</h1>
      <ul>
        <li>Name: {user?.name}</li>
        <li>Email: {user?.email}</li>
      </ul>

      <SignOutButton />
    </div>
  );
}
