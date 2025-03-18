"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Button } from "./ui/button";

interface AvatarUploaderProps {
  onUploadSuccess: (url: string) => void;
}

export function AvatarUploader({ onUploadSuccess }: AvatarUploaderProps) {
  console.log(process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string}
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={(result) => {
        if (typeof result.info === "object" && "secure_url" in result.info) {
          onUploadSuccess(result.info.secure_url);
        }
      }}
      options={{
        singleUploadAutoClose: true,
      }}
    >
      {({ open }) => {
        return (
          <Button
            className="cursor-pointer"
            variant="outline"
            onClick={() => open()}
          >
            Upload Avatar
          </Button>
        );
      }}
    </CldUploadWidget>
  );
}
