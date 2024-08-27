import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function middleware(request: any) {
  const session = await auth();
  const isLoggedIn = session?.user?.userId;
  if (!isLoggedIn) {
    // 未登录需要跳转登录,并且记录之前的路由，并在登录以后回跳回去
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "r",
      request.nextUrl.pathname + request.nextUrl.search
    );
    return NextResponse.redirect(loginUrl);
  }
}
// 下面写了的才走上面的过滤
export const config = {
  matcher: [
    "/help",
    "/account/:path*",
    "/create/:path*",
    "/bot/:path*",
    "/help",
  ],
};
