import { AvatarUploader } from "@/components/AvatarUploader";
import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import React from "react";
import Image from "next/image";
import { Check, Mail } from "lucide-react";
import cloudinary from "@/lib/cloudinary";
import { extractPublicId } from "@/app/utils/extractPublicId";
import { EditProfileDialog } from "@/components/EditProfileDialog";
import { getServerSession } from "@/app/actions";
import { Session } from "@/app/types";
import { redirect } from "next/navigation";

export default async function ProfileComponent() {
  const session: Session | null = await getServerSession();
  if (!session) return redirect("/sign-in");
  const user = await prisma.user.findFirst({
    where: { id: session?.user.id },
    cacheStrategy: { swr: 30 },
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
      <div className="flex justify-center flex-col gap-7 w-5/12">
        <h1 className="text-3xl font-bold">Profile</h1>
        <div className="w-50 h-50 rounded-full overflow-hidden relative">
          <Image
            src={user?.image || "/user.svg"}
            alt="Your avatar"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="mt-auto">
          <AvatarUploader onUploadSuccess={saveAvatar} />
        </div>
      </div>
      <div className="flex flex-col gap-10 text-left overflow-hidden w-5/12">
        <ul className="flex flex-col gap-5 h-full ">
          <li className="text-2xl font-semibold">{user?.name}</li>
          <li className="text-base">
            <span className="text-[#a0a8b7]">Bio</span>
            <p> {user?.bio || "No bio yet"}</p>
          </li>
          <li>
            <div className="flex flex-col text-lg font-semibold">
              {user?.emailVerified ? (
                <p className="flex items-center text-sm text-[#a0a8b7]">
                  Email verified
                  <span className="ml-1">
                    <Check size={15} color="green" />
                  </span>
                </p>
              ) : (
                <p className="flex items-center text-sm text-[#a0a8b7]">
                  Email not verified
                  <span className="ml-1">
                    <Mail size={15} color="red" />
                  </span>
                </p>
              )}
              {user?.email}
            </div>
          </li>

          <div className="mt-auto">
            <EditProfileDialog user={user} />
          </div>
        </ul>
      </div>
    </div>
  );
}
