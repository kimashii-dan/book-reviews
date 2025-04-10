"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { signInFormSchema } from "@/lib/auth-schema";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function SignIn() {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;
  const router = useRouter();

  async function onSubmit(formData: z.infer<typeof signInFormSchema>) {
    const { email, password } = formData;
    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: () => {
          console.log("onRequest");
        },
        onSuccess: () => {
          form.reset();
          toast("Successful sign-in");
          router.push("/");
          router.refresh();
        },
        onError: (ctx) => {
          toast(ctx.error.message, {
            className: "bg-red-500 text-white",
          });
          form.setError("email", {
            type: "manual",
            message: ctx.error.message,
          });

          form.setError("password", {
            type: "manual",
            message: ctx.error.message,
          });
        },
      }
    );
  }

  const signInWithGoogle = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
    console.log(data);
  };

  return (
    <Card className="w-full max-w-md mx-auto text-[#e4e6eb] bg-[#1c1f26] border-[#292e38]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Welcome back! Please sign in to continue.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
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
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="m-0">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="border-[#292e38] border-2"
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <div className=" mt-1">
                    <Link className="underline text-sm" href="/forgot-password">
                      Forgot password?
                    </Link>
                  </div>
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
        <div className="flex flex-row items-center my-5">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-2 text-gray-500">or</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>

        <Button
          className="w-full"
          onClick={() => signInWithGoogle()}
          disabled={isSubmitting}
        >
          <span>
            <Image src={"/google.svg"} alt="google" width={25} height={25} />
          </span>
          Sign in with Google
        </Button>
      </CardContent>

      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account yet?{" "}
          <Link href="/sign-up" className=" hover:underline text-white">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
