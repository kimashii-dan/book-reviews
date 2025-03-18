import { checkServerSession } from "@/app/actions";
import { SessionUser } from "@/app/types";
import { AvatarUploader } from "@/components/AvatarUploader";
import SignOutButton from "@/components/SignOutButton";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import React from "react";
import Image from "next/image";
import { UserCircle2 } from "lucide-react";
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
    <div className="flex flex-row justify-between w-5/12 mx-auto py-8">
      <div className="flex justify-center flex-col gap-4">
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
      <div className="flex flex-col gap-8 text-left">
        <h1 className="text-2xl font-bold">Profile</h1>
        <ul>
          <li>Name: {user?.name}</li>
          <li>Email: {user?.email}</li>
        </ul>

        <SignOutButton />
      </div>
    </div>
  );
}
