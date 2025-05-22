import { postSignup } from "@/services/auth/api-server"
import console from "console"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
  try {
    // 요청 바디에서 회원가입 데이터 추출
    const signupData = await request.json()

    // 백엔드 서버에 회원가입 API 호출
    const response = await postSignup(signupData)
    // 응답이 실패한 경우 로그인 페이지로 리다이렉트
    if (response.isError) {
      return NextResponse.json(
        {
          redirectTo: "/login",
        },
        { status: 400 },
      )
    }
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
  } catch (error) {
    console.error("회원가입 실패: ", error)

    // 에러 발생 시, 로그인 페이지로 리다이렉트 응답 생성
    return NextResponse.json(
      {
        redirectTo: "/login",
      },
      { status: 400 },
    )
  }
}
