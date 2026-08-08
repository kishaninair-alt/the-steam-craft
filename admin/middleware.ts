import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAME, isValidSessionToken } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!(await isValidSessionToken(token))) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!login|api/login|_next/static|_next/image|favicon.ico).*)",
  ],
};
