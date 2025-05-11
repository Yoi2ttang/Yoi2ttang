import axios from "axios"
import { getCookie } from "./utils"

const apiClient = axios.create({
  baseURL: "/api/v1",
  timeout: 8 * 1000, // 8초
  withCredentials: true,
})

// 요청 인터셉터
// - 개발(http) 환경에서는 브라우저에 저장된 쿠키로부터 accessToken을 가져와 헤더에 추가
apiClient.interceptors.request.use(
  (config) => {
    const isProd = process.env.NODE_ENV === "production"
    if (!isProd) {
      const accessToken = getCookie("accessToken")
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 응답 인터셉터
// - 401 응답 시 리이슈 시도 후 로그인 페이지로 리다이렉트
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config._retry
    ) {
      error.config._retry = true

      try {
        const response = await fetch("/auth/reissue", {
          method: "POST",
          credentials: "include",
        })
        // 원래 요청을 재시도하되, 실패할 경우 로그인 페이지로 이동
        if (response.ok) {
          const isProd = process.env.NODE_ENV === "production"
          if (!isProd) {
            // 갱신된 쿠키에서 accessToken을 가져와 헤더에 추가
            const accessToken = getCookie("accessToken")
            if (accessToken) {
              error.config.headers.Authorization = `Bearer ${accessToken}`
            }
          }

          return await apiClient(error.config)
        } else {
          window.location.href = "/login"
        }
      } catch (reissueError) {
        window.location.href = "/login"
        return Promise.reject(reissueError)
      }
    }

    return Promise.reject(error)
  },
)

export default apiClient
