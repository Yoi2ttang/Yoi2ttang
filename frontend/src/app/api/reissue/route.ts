import { postReissue } from "@/services/auth/api"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
  try {
    const response = await postReissue()
    const nextResponse = NextResponse.json(null, { status: 200 })

    // 쿠키 방식으로 액세스 토큰 생성
    nextResponse.cookies.set("accessToken", response.data.accessToken, {
      httpOnly: false,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 60분
    })

    return nextResponse
  } catch (error) {
    console.error(error)
    return NextResponse.json(null, { status: 500 })
  }
}
