"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  BadgeAlert,
  BadgeCheck,
  ChevronsUpDown,
  UserCircle2,
} from "lucide-react";
import SignOutButton from "./SignOutButton";
import { Session } from "@/app/types";

export function AppSidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const { isMobile } = useSidebar();

  return (
    <Sidebar>
      {session && <SideHeader session={session} isMobile={isMobile} />}

      <SidebarContent>
        <SideMainContent pathname={pathname} />
        {session && <SideUserBooks pathname={pathname} />}
      </SidebarContent>

      <SidebarFooter>
        <SideFooter session={session || undefined} />
      </SidebarFooter>
    </Sidebar>
  );
}

function SideHeader({
  session,
  isMobile,
}: {
  session: Session;
  isMobile: boolean;
}) {
  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
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
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {session.user.name}
                  </span>
                  <span className="truncate text-xs">{session.user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
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
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {session.user.name}
                    </span>
                    <span className="truncate text-xs">
                      {session.user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {session.user.emailVerified ? (
                  <BadgeCheck />
                ) : (
                  <BadgeAlert color="red" />
                )}

                <Link href="/profile">Account</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <SignOutButton />
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}

function SideMainContent({ pathname }: { pathname: string }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Search for books</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              href="/"
              className={`${
                pathname === "/" ? "text-black" : "text-gray-400"
              } flex items-center gap-2`}
            >
              <p className="text-lg">Home</p>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              href="/books"
              className={`${
                pathname === "/books" ? "text-black" : "text-gray-400"
              } flex items-center gap-2`}
            >
              <p className="text-lg">Search</p>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

function SideUserBooks({ pathname }: { pathname: string }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Your books</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              href="/reading"
              className={`${
                pathname === "/reading" ? "text-black" : "text-gray-400"
              } flex items-center gap-2`}
            >
              <p className="text-lg">Reading now</p>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              href="/haveRead"
              className={`${
                pathname === "/haveRead" ? "text-black" : "text-gray-400"
              } flex items-center gap-2`}
            >
              <p className="text-lg">Have read</p>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              href="/favourites"
              className={`${
                pathname === "/favourites" ? "text-black" : "text-gray-400"
              } flex items-center gap-2`}
            >
              <p className="text-lg">Favourites</p>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

function SideFooter({ session }: { session: Session | undefined }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {session ? (
          <SidebarMenuButton asChild>
            <SignOutButton />
          </SidebarMenuButton>
        ) : (
          <Button className=" w-full" variant="outline" asChild>
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
