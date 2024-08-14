import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function middleware(request: any) {
  const session = await auth();
  const isLoggedIn = session && session.user?.userId;
  //  const list = ["/help", "/account", "/center", "/create", "/help"];
  console.log(33333333, request.nextUrl.pathname);

  // if (!isLoggedIn && list.some((e) => request.nextUrl.pathname.startsWith(e))) {
  if (!isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "r",
      request.nextUrl.pathname + request.nextUrl.search
    );
    return NextResponse.redirect(loginUrl);
  } else {
    if (request.nextUrl.pathname.includes("/login")) {
      return Response.redirect(new URL("/", request.nextUrl));
    }
  }
}
// 下面写了的才走上面的过滤
export const config = {
  matcher: [
    // "/((?!api|v2|_next/static|_next/image|assets|favicon.ico|dpa.html).*)",
    "/help",
    "/account/:path*",
    "/center",
    "/create/:path*",
    "/bot/:path*",
    "/help",
  ],
};
