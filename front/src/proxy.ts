import { NextRequest, NextResponse } from "next/server";

/**
 * Next.js Edge Middleware — server-side route protection.
 *
 * Reads the `role` cookie (set by AuthContext after login) for fast
 * redirects. The API remains the source of truth; this cookie is only
 * used to avoid a full round-trip on every navigation.
 */

const PUBLIC_PATHS = ["/login", "/register", "/forgot-password", "/unauthorized"];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get("role")?.value;

  // ── Public paths: if already authenticated, redirect to dashboard ──
  if (isPublicPath(pathname)) {
    if (role) {
      const dest = dashboardForRole(role);
      return NextResponse.redirect(new URL(dest, request.url));
    }
    return NextResponse.next();
  }

  // ── Protected paths: must be authenticated ──
  if (!role) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── Role-based access control ──
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (
    pathname.startsWith("/teacher") &&
    !["teacher", "admin"].includes(role)
  ) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (
    pathname.startsWith("/student") &&
    !["student", "teacher", "admin"].includes(role)
  ) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     *  - api routes, _next internals, static files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
  ],
};

function dashboardForRole(role: string): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "teacher":
      return "/teacher";
    case "student":
      return "/student";
    default:
      return "/login";
  }
}
