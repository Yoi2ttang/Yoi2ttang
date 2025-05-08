import { cookies } from "next/headers"
import { redirect } from "next/navigation"

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

interface FetchResponse<T> {
  data: T | null
  error: ApiError | null
}

const getAccessToken = async () => {
  const cookieStore = await cookies()
  return cookieStore.get("accessToken")?.value
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

      try {
        error.data = await response.json()
      } catch {
        error.data = await response.text()
      }
      error.message = `🎀 에러 발생! status: ${response.status}`
      throw error
    }
    return response.json()
  }

  const request = async <T>(
    method: RequestMethod,
    url: string,
    options?: FetchOptions,
  ): Promise<FetchResponse<T>> => {
    try {
      const res = await fetch(`${baseUrl}${url}`, {
        method,
        ...defaultConfig(),
        ...options,
      })

      return {
        data: await handleResponse<T>(res),
        error: null,
      }
    } catch (err) {
      const error = err as ApiError

      if (error.status === 401 && !error._retry) {
        error._retry = true

        try {
          const { data: accessToken } = await request<{
            accessToken: string | null
          }>("POST", "/auth/reissue")

          if (accessToken) {
            fetch(`${BASE_URL}/api/set-cookie`, {
              method: "POST",
              body: JSON.stringify({ accessToken }),
            })

            // 재시도 로직
            return await request<T>(method, url, options)
          } else {
            console.log("토큰 재발급 실패 후 로그인 페이지로 리다이렉트")
            redirect("/")
          }
        } catch (reissueError) {
          return {
            data: null,
            error: new Error("토큰 재발급 실패") as ApiError,
          }
        }
      }
      return { data: null, error }
    }
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
  return await nextFetchInstance(`${BASE_URL}/api/v1`)
}
