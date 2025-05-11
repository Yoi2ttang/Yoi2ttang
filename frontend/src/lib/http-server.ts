import { cookies } from "next/headers"

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const isProd = process.env.NODE_ENV === "production"
  // 개발 환경(http)인 경우
  if (!isProd) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
      {
        ...options,
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
        credentials: "include",
      },
    )
    if (response.status === 401) {
      throw new Error("UNAUTHORIZED")
    }

    return await response.json()
  }
  // 배포 환경(https)인 경우
  else {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
      {
        ...options,
        credentials: "include",
      },
    )
    if (response.status === 401) {
      throw new Error("UNAUTHORIZED")
    }

    return await response.json()
  }
}
