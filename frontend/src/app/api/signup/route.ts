import { postSignup } from "@/services/auth/api"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
  try {
    // 요청 바디에서 회원가입 데이터 추출
    const signupData = await request.json()

    // 백엔드 서버에 로그인 API 호출
    const response = await postSignup(signupData)
    // 응답이 실패한 경우 로그인 페이지로 리다이렉트
    if (!response.ok) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    const data = await response.json()
    // 메인 페이지로 리다이렉트 응답 생성
    const nextResponse = NextResponse.redirect(new URL("/", request.url))

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

    // 에러 발생 시, 로그인 페이지로 리다이렉트 응답 생성
    return NextResponse.redirect(new URL("/login", request.url))
  }
}
