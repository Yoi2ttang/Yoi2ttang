import { cookies } from "next/headers"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

type FetchOptions = Omit<RequestInit, "method">
type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

interface ApiError extends Error {
  method: RequestMethod
  status: number
  data?: unknown
  _retry?: boolean
}

interface FetchParams {
  params?: Record<string, string | number | boolean>
  body?: Record<string, unknown>
  options?: FetchOptions
}

const getAccessToken = async () => {
  const cookieStore = await cookies()
  return cookieStore.get("accessToken")?.value
}

const setAccessToken = async (accessToken: string) => {
  const cookieStore = await cookies()
  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30일
    path: "/",
  })
}

const objectToSearchParams = (
  params?: Record<string, string | number | boolean>,
) => {
  if (!params) return ""
  return new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)]),
  ).toString()
}

async function nextFetchInstance(baseUrl?: string) {
  const accessToken = await getAccessToken()

  // headers 객체는 참조 공유되기 때문에 요청마다 새로 만드는 것이 안전
  const defaultConfig: () => RequestInit = () => ({
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    credentials: "include",
  })

  const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
      const error = new Error() as ApiError
      error.status = response.status

      if (error.status === 401 && !error._retry) {
        error._retry = true

        try {
          const { accessToken } = (await request("POST", "/auth/reissue")) as {
            accessToken: string
          }

          setAccessToken(accessToken)

          // Todo : 재시도 로직 추가
        } catch (reissueError) {
          window.location.href = "/login"
        }
      }
      try {
        error.data = await response.json()
      } catch {
        error.data = await response.text()
      }
      error.message = `HTTP error! status: ${response.status}`
      throw error
    }
    return response.json()
  }

  const request = async <T>(
    method: RequestMethod,
    url: string,
    options?: FetchOptions,
  ) => {
    const response = await fetch(`${baseUrl}${url}`, {
      method,
      ...defaultConfig(),
      ...options,
    })
    return handleResponse<T>(response)
  }

  const nextGet = <T>(url: string, FetchParams?: FetchParams) =>
    request<T>(
      "GET",
      `${url}?${objectToSearchParams(FetchParams?.params)}`,
      FetchParams?.options,
    )

  const nextPost = <TRes>(url: string, FetchParams?: FetchParams) =>
    request<TRes>("POST", url, {
      ...FetchParams?.options,
      body: JSON.stringify(FetchParams?.body),
    })

  const nextPut = <TRes>(url: string, FetchParams?: FetchParams) =>
    request<TRes>("PUT", url, {
      ...FetchParams?.options,
      body: JSON.stringify(FetchParams?.body),
    })

  const nextDelete = <T>(url: string, FetchParams?: FetchParams) =>
    request<T>("DELETE", url, {
      ...FetchParams?.options,
    })

  const nextPatch = <TRes>(url: string, FetchParams?: FetchParams) =>
    request<TRes>("PATCH", url, {
      ...FetchParams?.options,
      body: JSON.stringify(FetchParams?.body),
    })

  return {
    get: nextGet,
    post: nextPost,
    put: nextPut,
    patch: nextPatch,
    delete: nextDelete,
  }
}

export const getApiServer = async () => {
  return await nextFetchInstance(`${process.env.NEXT_PUBLIC_API_URL}/api/v1`)
}
