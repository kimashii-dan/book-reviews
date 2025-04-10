"use client";
import { authClient } from "@/lib/auth-client";
import React from "react";
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
import { forgotPasswordSchema } from "@/lib/auth-schema";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
export default function ForgotPasswordPage() {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const { isSubmitting } = form.formState;

  async function handleResetPassword(
    formData: z.infer<typeof forgotPasswordSchema>
  ) {
    const { error } = await authClient.forgetPassword({
      email: formData.email,
      redirectTo: "/reset-password",
    });

    if (error) {
      toast(error.message, {
        className: "bg-red-500 text-white",
      });
      form.setError("email", {
        type: "manual",
        message: error.message,
      });
    } else {
      toast("Reset password link has been sent to your email");
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto text-[#e4e6eb] bg-[#1c1f26] border-[#292e38]">
      <CardHeader>
        <CardTitle>Forgot password</CardTitle>
        <CardDescription>
          We&apos;re going to send you a link to reset your password
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleResetPassword)}
            className="flex flex-col gap-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="border-[#292e38] border-2"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full primary-button"
              type="submit"
              disabled={isSubmitting}
            >
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
