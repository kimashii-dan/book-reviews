"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function SignOutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const signOut = async () => {
    setIsLoading(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast("Successful sign-out");
            router.push("/sign-in");
          },
          onError: () => {
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
  };

  return (
    <div className="mt-auto">
      <Button onClick={signOut} disabled={isLoading}>
        {isLoading ? (
          <Loader2 className="animate-spin" size={48} />
        ) : (
          "Sign out"
        )}
      </Button>
    </div>
  );
}
