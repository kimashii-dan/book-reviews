"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { User } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { saveChanges } from "@/app/actions";
import { useTransition } from "react";
import { toast } from "sonner";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";

export function EditProfileDialog({ user }: { user: User | null | undefined }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await saveChanges(user?.id as string, formData);

      if (result.success) {
        toast.success(result.message);
        setIsOpen(false);
      } else {
        toast.error(result.message);
      }
    });

    router.refresh();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="w-full">
        <Button className="bg-[#1c1f26] border-[#242b38]" variant="outline">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-[#1c1f26] border-[#242b38]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={onSubmit} className="space-y-4">
          <div>
            <Label className="mb-2" htmlFor="name">
              Name
            </Label>
            <Input
              name="name"
              placeholder="Enter new name"
              defaultValue={user?.name || ""}
              maxLength={50}
            />
          </div>
          <div>
            <Label className="mb-2" htmlFor="bio">
              Bio
            </Label>
            <Textarea
              name="bio"
              placeholder="Write anything about yourself"
              defaultValue={user?.bio || ""}
              className="h-40 w-full p-2 border rounded"
              maxLength={200}
            />
            <p className="text-sm text-muted-foreground mt-1">
              Max 200 characters
            </p>
          </div>
          <Button className="w-full mt-5" type="submit" disabled={isPending}>
            {isPending ? (
              <Loader2 className="animate-spin" size={48} />
            ) : (
              "Save changes"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
