import { getPayload } from "@/lib/auth/util"
import { NextRequest, NextResponse } from "next/server"

// 모든 경로 감시
export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"], // 내부 리소스는 제외
}

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl
  const publicPaths = ["/", "/login"]
  const isPublic = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  )
  if (isPublic) {
    return NextResponse.next()
  }

  const accessToken = request.cookies.get("accessToken")?.value
  if (accessToken) {
    const payload = getPayload()
    if (payload) {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}
