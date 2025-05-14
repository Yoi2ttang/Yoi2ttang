import { postSignup } from "@/services/auth/api"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
  try {
    // 요청 바디에서 회원가입 데이터 추출
    const signupData = await request.json()

    // 백엔드 서버에 회원가입 API 호출
    const response = await postSignup(signupData)
    // 응답이 실패한 경우 로그인 페이지로 리다이렉트
    if (response.isError) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

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

    // 에러 발생 시, 로그인 페이지로 리다이렉트 응답 생성
    return NextResponse.redirect(new URL("/login", request.url))
  }
}
