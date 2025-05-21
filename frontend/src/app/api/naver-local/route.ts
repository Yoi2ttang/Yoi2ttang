import { objectToSearchParams } from "@/lib/utils-server"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)

  const params = {
    query: searchParams.get("query"),
    display: 10,
    start: 1,
    sort: searchParams.get("sort") ?? "random",
  } as {
    query: string
    display?: number
    start?: number
    sort?: "random" | "comment"
  }

  const baseUrl = "https://openapi.naver.com/v1/search/local.json"

  const paramsToUrl = objectToSearchParams(params)

  const url = `${baseUrl}?${paramsToUrl}`

  const clientId = process.env.NEXT_PUBLIC_NAVER_SEARCH_API_CLIENT_ID
  const clientSecret = process.env.NEXT_PUBLIC_NAVER_SEARCH_API_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      {
        error: "Client ID or Secret is not set",
        data: `${clientId};${clientSecret}`,
      },
      { status: 500 },
    )
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-Naver-Client-Id": clientId,
      "X-Naver-Client-Secret": clientSecret,
    },
  })

  const data = await response.json()

  return NextResponse.json(data)
}
