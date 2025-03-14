import SignOutButton from "@/components/SignOutButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

export default async function Profile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
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
