import { postLogout } from "@/services/auth/api-server"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
  try {
    await postLogout()
    const nextResponse = NextResponse.json(null, { status: 200 })

    // 액세스 토큰이 담긴 쿠키 삭제
    nextResponse.cookies.delete("accessToken")

    // 리프레쉬 토큰이 담긴 쿠키 삭제
    nextResponse.cookies.delete("refreshToken")

    return nextResponse
  } catch (error) {
    console.error("로그아웃 실패: ", error)
    return NextResponse.json(null, { status: 500 })
  }
}
