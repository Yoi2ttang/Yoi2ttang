import { SignUpData } from "@/types/auth"
import { useRouter } from "next/navigation"

const useSignup = (signupData: SignUpData) => {
  const router = useRouter()

  const signup = async () => {
    const response = await fetch("/api/signup", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(signupData),
    })
    if (response.redirected) {
      router.replace(response.url)
    }
  }

  return { signup }
}

export default useSignup
