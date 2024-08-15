import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function middleware(request: any) {
  const session = await auth();
  const isLoggedIn = session && session.user?.userId;
  if (!isLoggedIn) {
    // 未登录需要跳转登录
    if (request.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.next();
    }
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "r",
      request.nextUrl.pathname + request.nextUrl.search
    );
    return NextResponse.redirect(loginUrl);
  } else {
    // 已登录，跳转登录页面的时候，自动跳转首页
    if (request.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}
// 下面写了的才走上面的过滤
export const config = {
  matcher: [
    "/login",
    "/help",
    "/account/:path*",
    "/center",
    "/create/:path*",
    "/bot/:path*",
    "/help",
  ],
};
