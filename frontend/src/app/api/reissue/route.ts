import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reissue`,
      {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ accessToken }),
      },
    )
    const data = await response.json()
    const nextResponse = NextResponse.json(null, { status: 200 })

    // 쿠키 방식으로 액세스 토큰 생성
    // 개발 환경(http)에서는 httpOnly를 false로 설정
    // 배포 환경(https)에서는 httpOnly를 true로 설정
    const isProd = process.env.NODE_ENV === "production"
    nextResponse.cookies.set("accessToken", data.accessToken, {
      httpOnly: isProd,
      secure: isProd,
      sameSite: "none",
      path: "/",
      maxAge: 60 * 30, // 30분
    })

    return nextResponse
  } catch (error) {
    console.error(error)
    return NextResponse.json(null, { status: 500 })
  }
}
