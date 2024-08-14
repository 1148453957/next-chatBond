import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function middleware(request: any) {
  const session = await auth();
  const isLoggedIn = session && session.user?.userId;
  const list = ["/help", "/account", "/center", "/create", "/help"];

  if (!isLoggedIn && list.some((e) => request.nextUrl.pathname.startsWith(e))) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "r",
      request.nextUrl.pathname + request.nextUrl.search
    );
    return NextResponse.redirect(loginUrl);
  } /* else if (isLoggedIn && request.nextUrl.pathname.includes("/login")) {
    return Response.redirect(new URL("/", request.nextUrl));
  } */
}
// 请求public里的文件资源都会走中间件
// 排除掉一些接口和静态资源
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|v2|assets|favicon.ico).*)"],
};
