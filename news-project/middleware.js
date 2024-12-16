import { NextResponse } from "next/server";

// https://nextjs.org/docs/app/building-your-application/routing/middleware
export function middleware(request) {
  console.log(request);
  return NextResponse.next();
}

export const config = {
  matcher: '/news'
};