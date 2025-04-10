"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "./ui/button";
import { User } from "@prisma/client";
import { saveAvatar } from "@/app/actions";

export default function AvatarUploader({ user }: { user: User | null }) {
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string}
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={(result) => {
        if (typeof result.info === "object" && "secure_url" in result.info) {
          saveAvatar(result.info.secure_url, user);
        }
      }}
      options={{
        singleUploadAutoClose: true,
      }}
    >
      {({ open }) => {
        return (
          <Button
            className="w-full mt-5 secondary-button"
            onClick={() => open()}
          >
            Upload Avatar
          </Button>
        );
      }}
    </CldUploadWidget>
  );
}
