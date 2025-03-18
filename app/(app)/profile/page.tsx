import { checkServerSession } from "@/app/actions";
import { SessionUser } from "@/app/types";
import { AvatarUploader } from "@/components/AvatarUploader";
import SignOutButton from "@/components/SignOutButton";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import React from "react";
import Image from "next/image";
import { Check, Mail, UserCircle2 } from "lucide-react";
import cloudinary from "@/lib/cloudinary";
import { extractPublicId } from "@/app/utils/extractPublicId";
import { User } from "@prisma/client";

export default async function Profile() {
  const userSession: SessionUser | undefined = await checkServerSession();

  const user: User | null = await prisma.user.findUnique({
    where: { id: userSession?.id },
  });

  async function saveAvatar(url: string) {
    "use server";
    if (user?.image) {
      const publicId = extractPublicId(user.image);
      if (!publicId) return "Error deleting old image from storage";
      await cloudinary.uploader.destroy(publicId);
    }
    const updatedUser = await prisma.user.update({
      where: { id: user?.id },
      data: { image: url },
    });

    console.log(updatedUser);
    revalidatePath("/profile");
  }

  return (
    <div className="flex flex-row justify-between w-[650px] mx-auto py-8">
      <div className="flex justify-center flex-col gap-7 ">
        <h1 className="text-3xl font-bold">Profile</h1>
        <div className="w-50 h-50 rounded-full overflow-hidden relative">
          {user?.image ? (
            <Image
              src={user.image}
              alt="Your avatar"
              fill
              className="object-cover"
            />
          ) : (
            <UserCircle2 className="w-full h-full" />
          )}
        </div>
        <AvatarUploader onUploadSuccess={saveAvatar} />
      </div>
      <div className="flex flex-col gap-10 text-left justify-center">
        <ul className="flex flex-col gap-5">
          <li className="text-2xl font-semibold">{user?.name}</li>
          <li>{user?.email}</li>
          <li>
            {user?.emailVerified ? (
              <p className="flex">
                Account verified
                <span className="ml-1">
                  <Check color="green" />
                </span>
              </p>
            ) : (
              <>
                <p className="flex text-base">
                  Email not verified
                  <span className="ml-1">
                    <Mail color="red" />
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Check your email to verify account
                </p>
              </>
            )}
          </li>
        </ul>
        <SignOutButton />
      </div>
    </div>
  );
}
