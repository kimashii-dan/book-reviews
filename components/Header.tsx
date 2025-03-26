"use client";

import { UserCircle2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import Image from "next/image";
import SignOutButton from "./SignOutButton";

export default function Header() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  return (
    <div className="w-full">
      <nav className="flex justify-center items-center w-9/12 mx-auto py-6 relative">
        <ul className="flex flex-row justify-between items-center w-full">
          <li>
            <Link
              href="/"
              className={`${
                pathname === "/" ? "text-black" : "text-gray-400"
              } flex items-center gap-2`}
            >
              <p className="text-xl">Home</p>
            </Link>
          </li>
          <li>
            <Link
              href="/books"
              className={`${
                pathname === "/books" ? "text-black" : "text-gray-400"
              } flex items-center gap-2`}
            >
              <p className="text-xl">Books</p>
            </Link>
          </li>
          <li>
            {session ? (
              <Link
                href="/profile"
                className={
                  pathname === "/profile" ? "text-black" : "text-gray-400"
                }
              >
                {session.user.image ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden relative">
                    <Image
                      src={session.user.image}
                      alt="Your avatar"
                      fill
                      className="object-cover"
                      priority
                      placeholder="blur"
                      blurDataURL="/user.svg"
                    />
                  </div>
                ) : (
                  <UserCircle2 size={35} />
                )}
              </Link>
            ) : (
              <Button className="text-base" variant="outline" asChild>
                <Link href="/sign-in">Login</Link>
              </Button>
            )}
          </li>
        </ul>
      </nav>
      {session && (
        <div className="absolute right-2 top-6">
          <SignOutButton />
        </div>
      )}
    </div>
  );
}
