import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith("/admin/login")) {
		return NextResponse.next();
	}

	const session = request.cookies.get("admin_session")?.value;
	if (session && process.env.ADMIN_PASSWORD && session === process.env.ADMIN_PASSWORD) {
		return NextResponse.next();
	}

	const url = request.nextUrl.clone();
	url.pathname = "/admin/login";
	url.searchParams.set("next", request.nextUrl.pathname);
	return NextResponse.redirect(url);
}

export const config = {
	matcher: ["/admin/:path*"],
};
