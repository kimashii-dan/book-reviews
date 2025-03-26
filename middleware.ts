import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isPrivatePath = [
    "/profile",
    "/favourites",
    "/reading",
    "/haveRead",
  ].includes(path);

  if (session && (path === "/sign-in" || path === "/sign-up")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!session && isPrivatePath) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/sign-in",
    "/sign-up",
    "/profile",
    "/favourites",
    "/reading",
    "/haveRead",
  ],
  runtime: "nodejs",
};
