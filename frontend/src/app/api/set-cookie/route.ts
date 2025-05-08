import { NextRequest, NextResponse } from "next/server"

export const POST = async (request: NextRequest) => {
  const { accessToken } = await request.json()

  const response = NextResponse.json({ success: true })

  response.cookies.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 30, // 30분
    path: "/",
  })

  return response
}
