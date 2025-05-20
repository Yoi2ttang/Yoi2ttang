import { postReissue } from "@/services/auth/api-server"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
  try {
    const response = await postReissue()
    const nextResponse = NextResponse.json(
      { accessToken: response.data.accessToken },
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
    console.error("리이슈 실패: ", error)
    return NextResponse.json(null, { status: 500 })
  }
}
