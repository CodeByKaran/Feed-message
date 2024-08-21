import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  // Get the session token from the request
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  const isLogged = !!session;

  if (
    isLogged &&
    (request.nextUrl.pathname.startsWith("/sign-in") ||
      request.nextUrl.pathname.startsWith("/sign-up") ||
      request.nextUrl.pathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  } else if (!isLogged && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Continue to the requested route if no redirect
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/sign-in", "/sign-up", "/"]
};
