import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;

  // Redirect root domain to bio subdomain
  if (hostname === "thron.cfg" || hostname === "www.thron.cfg") {
    return NextResponse.redirect("https://bio.thron.cfg", 301);
  }

  // Subdomain-based routing
  const subdomain = hostname.split(".")[0];

  if (subdomain === "git" && pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/git";
    return NextResponse.rewrite(url);
  }

  // Check if the route is an admin route
  if (pathname.startsWith("/admin")) {
    const session = request.cookies.get("getbio_session");

    if (!session || session.value !== "authenticated") {
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
