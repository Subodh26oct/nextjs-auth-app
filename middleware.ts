import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";
  const urlToken = request.nextUrl.searchParams.get("token");

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";

  // If user is already logged in, block login/signup/verify pages
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // Allow /verifyemail when accessed with a token in the URL
  if (path === "/verifyemail" && urlToken) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users away from private routes
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile", "/login", "/signup", "/verifyemail"],
};
