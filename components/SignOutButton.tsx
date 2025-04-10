"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, LogOut } from "lucide-react";

export default function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function signOut() {
    setIsLoading(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast("Successful sign-out");
            router.push("/");
            router.refresh();
          },
          onError: (error) => {
            console.log(error);
            toast("Sign-out failed. Please try again.");
          },
        },
      });
    } catch (error) {
      console.error("Sign-out error:", error);
      toast("An error occurred during sign-out.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="">
      <Button
        onClick={() => signOut()}
        disabled={isLoading}
        className="flex flex-row gap-2 justify-start w-full light-button"
      >
        {isLoading ? (
          <Loader2 className="animate-spin" size={48} />
        ) : (
          <LogOut />
        )}
        Log out
      </Button>
    </div>
  );
}
