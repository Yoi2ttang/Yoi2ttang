import { WebViewContext } from "@/components/providers/WebViewProvider"
import { SignUpData } from "@/types/auth/auth.type"
import { useRouter } from "next/navigation"
import { useContext } from "react"

const useSignup = (signupData: SignUpData) => {
  const router = useRouter()
  const { sendMessage } = useContext(WebViewContext)

  const signup = async () => {
    const response = await fetch("/api/signup", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(signupData),
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

  return { signup }
}

export default useSignup
