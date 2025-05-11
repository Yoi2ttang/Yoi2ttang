import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

const useLogin = () => {
  const searchParams = useSearchParams()
  const code = searchParams.get("code")

  useEffect(() => {
    const login = async () => {
      // Route Handler 호출
      const response = await fetch(`/api/login?code=${code}`, {
        method: "GET",
        credentials: "include",
      })
      if (response.redirected) {
        window.location.href = response.url
      }
    }

    login()
  }, [])
}

export default useLogin
