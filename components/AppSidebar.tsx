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
  BookCheck,
  BookHeart,
  BookMarkedIcon,
  ChevronsUpDown,
  Home,
  Search,
  UserCircle2,
} from "lucide-react";
import SignOutButton from "./SignOutButton";
import { Session } from "@/app/types";

export function AppSidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();
  const { isMobile } = useSidebar();

  return (
    <Sidebar className="text-white border-black">
      {session && (
        <SidebarHeader className="bg-[#161b22]">
          <SideHeader session={session} isMobile={isMobile} />
        </SidebarHeader>
      )}

      <SidebarContent className="bg-[#161b22]">
        <SideMainContent pathname={pathname} />
        {session && <SideUserBooks pathname={pathname} />}
      </SidebarContent>

      <SidebarFooter className="bg-[#161b22]">
        <SideFooter session={session || null} />
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
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
            >
              <div className="w-8 h-8 rounded-full overflow-hidden relative flex items-center justify-center">
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="Your avatar"
                    fill
                    className="object-cover"
                    priority
                    placeholder="blur"
                    blurDataURL="/user.svg"
                  />
                ) : (
                  <UserCircle2 size={50} />
                )}
              </div>
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
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-[#1c1f26] text-white border-none"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="w-8 h-8 rounded-full overflow-hidden relative flex items-center justify-center">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt="Your avatar"
                      fill
                      className="object-cover"
                      priority
                      placeholder="blur"
                      blurDataURL="/user.svg"
                    />
                  ) : (
                    <UserCircle2 size={50} />
                  )}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {session.user.name}
                  </span>
                  <span className="truncate text-xs">{session.user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#292e38]" />
            <DropdownMenuItem>
              {session.user.emailVerified ? (
                <BadgeCheck />
              ) : (
                <BadgeAlert color="red" />
              )}

              <Link href="/profile">Account</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#292e38]" />
            <SignOutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function SideMainContent({ pathname }: { pathname: string }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-white">
        Search for books
      </SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              href="/"
              className={`${pathname === "/" ? "text-white" : "text-gray-400"}`}
            >
              <Home />
              <p className="text-base">Home</p>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              href="/books"
              className={`${
                pathname === "/books" ? "text-white" : "text-gray-400"
              } flex items-center gap-2`}
            >
              <Search />
              <p className="text-base">Search</p>
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
      <SidebarGroupLabel className="text-white">Your books</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              href="/favourites"
              className={`${
                pathname === "/favourites" ? "text-white" : "text-gray-400"
              } flex items-center gap-2`}
            >
              <BookHeart />
              <p className="text-base">Favourites</p>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              href="/reading"
              className={`${
                pathname === "/reading" ? "text-white" : "text-gray-400"
              } flex items-center gap-2`}
            >
              <BookMarkedIcon />
              <p className="text-base">Reading now</p>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              href="/haveRead"
              className={`${
                pathname === "/haveRead" ? "text-white" : "text-gray-400"
              } flex items-center gap-2`}
            >
              <BookCheck />
              <p className="text-base">Have read</p>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

function SideFooter({ session }: { session: Session | null }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {session ? (
          <SidebarMenuButton asChild>
            <SignOutButton />
          </SidebarMenuButton>
        ) : (
          <Button
            className=" w-full bg-[#1e2531] border-none"
            variant="outline"
            asChild
          >
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
