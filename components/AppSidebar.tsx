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

import { Session } from "@/app/types";
import ButtonSignOut from "./ButtonSignOut";

export default function AppSidebar({ session }: { session: Session | null }) {
  const pathname = usePathname();
  const { isMobile } = useSidebar();

  return (
    <Sidebar className="text-white border-black">
      {session && (
        <SidebarHeader className="bg-[#161b22]">
          <SideHeader
            pathname={pathname}
            session={session}
            isMobile={isMobile}
          />
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
  pathname,
}: {
  session: Session;
  isMobile: boolean;
  pathname: string;
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className={`${
                pathname === "/profile" ? "bg-[#0d0f15]" : "bg-transparent"
              }`}
              size="lg"
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
              <Button className="w-full light-button">
                <Link
                  className="w-full flex gap-2 items-center"
                  href="/profile"
                >
                  {session.user.emailVerified ? (
                    <BadgeCheck />
                  ) : (
                    <BadgeAlert color="red" />
                  )}
                  <span>Account</span>
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#292e38]" />
            <ButtonSignOut />
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
      <SidebarMenu className="gap-2">
        <SidebarMenuItem>
          <SidebarMenuButton
            className={`${
              pathname === "/" ? "bg-[#0d0f15]" : "bg-transparent"
            } sidebar-button`}
          >
            <Link
              href="/"
              className={`${
                pathname === "/" ? "text-white" : "text-gray-400"
              } flex items-center gap-2 w-full`}
            >
              <Home />
              <p className="text-base">Home</p>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            className={`${
              pathname === "/books" ? "bg-[#0d0f15]" : "bg-transparent"
            } sidebar-button`}
          >
            <Link
              href="/books"
              className={`${
                pathname === "/books" ? "text-white" : "text-gray-400"
              } flex items-center gap-2 w-full`}
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
      <SidebarMenu className="gap-2">
        <SidebarMenuItem>
          <SidebarMenuButton
            className={`${
              pathname === "/favourites" ? "bg-[#0d0f15]" : "bg-transparent"
            } sidebar-button`}
          >
            <Link
              href="/favourites"
              className={`${
                pathname === "/favourites" ? "text-white" : "text-gray-400"
              } flex items-center gap-2 w-full`}
            >
              <BookHeart />
              <p className="text-base">Favourites</p>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            className={`${
              pathname === "/reading" ? "bg-[#0d0f15]" : "bg-transparent"
            } sidebar-button`}
          >
            <Link
              href="/reading"
              className={`${
                pathname === "/reading" ? "text-white" : "text-gray-400"
              } flex items-center gap-2 w-full`}
            >
              <BookMarkedIcon />
              <p className="text-base">Reading now</p>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            className={`${
              pathname === "/haveRead" ? "bg-[#0d0f15]" : "bg-transparent"
            } sidebar-button`}
          >
            <Link
              href="/haveRead"
              className={`${
                pathname === "/haveRead" ? "text-white" : "text-gray-400"
              } flex items-center gap-2 w-full`}
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
          <ButtonSignOut />
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
