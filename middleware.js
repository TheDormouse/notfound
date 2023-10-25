import { NextResponse } from "next/server";

export function middleware(request) {
  // Lock /members area behind authentication
  const isUserAuthenticated = true;
  console.log(request.nextUrl.pathname);
  if (request.nextUrl.pathname.startsWith("/members/")) {
    if (!isUserAuthenticated) {
      console.log("hello?");
      return new NextResponse("Not Found", { status: 404 });
    }
  }
  // Set VID2 in cookie for later usage by the app
  const response = NextResponse.next();
  const vid2 = request.nextUrl.searchParams.get("VID2");
  if (vid2) {
    response.cookies.set("VID2", vid2, {
      secure: true,
      maxAge: 3600 * 24 * 400, // 400 days long expiration (maximum allowed expiration date)
    });
  }
  return response;
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
