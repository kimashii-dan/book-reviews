import Image from "next/image";
import dynamic from "next/dynamic";
import { userService } from "@/app/services/user.service";
import { Check, Mail } from "lucide-react";

const AvatarUploader = dynamic(() => import("@/components/AvatarUploader"), {
  loading: () => <div>Loading avatar uploader...</div>,
});

const EditProfileDialog = dynamic(
  () => import("@/components/EditProfileDialog"),
  {
    loading: () => <div>Loading dialog...</div>,
  }
);

export default async function ProfileComponent({ userId }: { userId: string }) {
  const user = await userService.getUser(userId);

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
          <AvatarUploader user={user} />
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
