import { postLogin } from "@/services/auth/api-server"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
  try {
    // URL에서 인증 코드 추출
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")
    // 인증 코드가 없으면 로그인 페이지로 리다이렉트
    if (!code) {
      console.error("인증 코드가 존재하지 않습니다.")
      // return NextResponse.redirect(new URL("/login", request.url))
      return NextResponse.json(
        {
          redirectTo: "/login",
        },
        { status: 400 },
      )
    }

    // 백엔드 서버에 로그인 API 호출
    const response = await postLogin(code)
    // 응답이 실패한 경우 로그인 페이지로 리다이렉트
    if (response.isError) {
      return NextResponse.json(
        {
          redirectTo: "/login",
        },
        { status: 400 },
      )
    }

    // 1. 기존 유저인 경우
    if (!response.data.socialId) {
      // 대시보드 페이지로 리다이렉트 응답 생성
      const nextResponse = NextResponse.json(
        {
          accessToken: response.data.accessToken,
          redirectTo: "/dashboard/my",
        },
        { status: 200 },
      )

      // 쿠키 방식으로 액세스 토큰 생성
      nextResponse.cookies.set("accessToken", response.data.accessToken, {
        httpOnly: false,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60, // 60분
      })

      // 쿠키 방식으로 리프레쉬 토큰 생성
      const refreshToken = response.config.headers
        .get("set-cookie")
        ?.split(";")[0]
        .split("=")[1]
      if (!refreshToken) {
        console.error("리프레쉬 토큰 생성 실패!")
        return NextResponse.json(
          {
            redirectTo: "/login",
          },
          { status: 400 },
        )
      }

      nextResponse.cookies.set("refreshToken", refreshToken as string, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7일
      })

      return nextResponse
    }
    // 2. 신규 유저인 경우
    else {
      // 회원가입 페이지로 리다이렉트 응답 생성
      const nextResponse = NextResponse.json(
        {
          redirectTo: `/signup?socialId=${response.data.socialId}`,
        },
        { status: 200 },
      )

      return nextResponse
    }
  } catch (error) {
    console.error(error)

    // 에러 발생 시, 로그인 페이지로 리다이렉트 응답 생성
    return NextResponse.json(
      {
        redirectTo: "/login",
      },
      { status: 400 },
    )
  }
}
