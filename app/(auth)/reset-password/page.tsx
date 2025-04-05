"use client";
import Loading from "@/components/loadingUI/Loading";
import React, { Suspense } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "@/lib/auth-schema";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordComponent />
    </Suspense>
  );
}

function ResetPasswordComponent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || undefined;
  const error = searchParams.get("error");

  const router = useRouter();
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function handleResetPassword(
    formData: z.infer<typeof resetPasswordSchema>
  ) {
    const { error } = await authClient.resetPassword({
      newPassword: formData.confirmPassword,
      token: token,
    });

    if (error) {
      toast(error.message, {
        className: "bg-red-500 text-white",
      });
      form.setError("password", {
        type: "manual",
        message: error.message,
      });
    } else {
      toast("Password reset successfully");
      router.push("/sign-in");
    }
  }

  if (!token) {
    toast("Invalid reset link", { className: "bg-red-500 text-white" });
    return;
  }

  if (error) {
    return (
      <div className="w-full max-w-sm mx-auto">Error reseting password</div>
    );
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Resetting your password</CardTitle>
        <CardDescription>Create a new password</CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleResetPassword)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={48} />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
