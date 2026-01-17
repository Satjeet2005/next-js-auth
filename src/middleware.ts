import { NextRequest, NextResponse } from "next/server";
import { extractJWT } from "./helpers/extractJWT";

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPathPublic = path === "/login" || path === "/signup";
  const token = request.cookies.get("token")?.value || "";

  if (isPathPublic && token) {
    return NextResponse.redirect(new URL("/profile", request.nextUrl));
  }

  if (!isPathPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // If token exists, verify it. If verification fails, redirect to login.
  if (token) {
    const userId = await extractJWT(request);
    if (!userId) {
      return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/logout", "/profile", "/signup","/verifyemail","/forgotpassword"],
};
