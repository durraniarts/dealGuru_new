import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const authPages = path === "/signin" || path === "/signup";
  const publicPages = path === "/" || path === "/deal:id";

  const token = cookies().get("userId")?.value;

  if (authPages && token) {
    return NextResponse.redirect(new URL(`/user/${token}`, request.nextUrl));
  }

  if ((publicPages && !token) || (publicPages && token)) {
    return;
  }
  if (path.startsWith("/user") && !token) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/user/(.*)", "/signin", "/signup", "/deal/:id"],
};
