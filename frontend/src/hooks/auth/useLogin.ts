import { WebViewContext } from "@/components/providers/WebViewProvider"
import { useRouter, useSearchParams } from "next/navigation"
import { useContext, useEffect } from "react"

const useLogin = () => {
  const searchParams = useSearchParams()
  const code = searchParams.get("code")
  const router = useRouter()
  const { sendMessage } = useContext(WebViewContext)

  useEffect(() => {
    const login = async () => {
      // Route Handler 호출
      const response = await fetch(`/api/login?code=${code}`, {
        method: "GET",
        credentials: "include",
      })

      const data = await response.json()

      if (response.ok) {
        sendMessage?.("REISSUE_TOKEN_RESPONSE", {
          accessToken: data.accessToken,
        })
      }

      if (data.redirectTo) {
        router.replace(data.redirectTo)
      }
    }

    login()
  }, [])
}

export default useLogin
