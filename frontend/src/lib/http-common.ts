import axios from "axios"

const apiClient = axios.create({
  baseURL: "/",
  timeout: 8 * 1000, // 8초
  withCredentials: true,
})

// 요청 인터셉터
// - localStorage에 저장된 accessToken을 헤더에 추가
apiClient.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken")
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 응답 인터셉터
// - 401 응답 시 로그인 페이지로 리다이렉트
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
        const response = await apiClient.post("/auth/reissue")
        localStorage.setItem("accessToken", response.data.accessToken)

        // 원래 요청을 재시도하되, 실패할 경우 로그인 페이지로 이동
        try {
          return await apiClient(error.config)
        } catch (retryError) {
          // 재시도 자체가 실패한 경우
          localStorage.removeItem("accessToken")
          window.location.href = "/login"
          return Promise.reject(retryError)
        }
      } catch (reissueError) {
        // 리이슈 자체가 실패한 경우
        localStorage.removeItem("accessToken")
        window.location.href = "/login"
        return Promise.reject(reissueError)
      }
    }

    return Promise.reject(error)
  },
)

export default apiClient
