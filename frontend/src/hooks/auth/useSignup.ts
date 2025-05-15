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
    const data = await response.json()
    if (data.redirectTo) {
      router.replace(data.redirectTo)
    }
  }

  return { signup }
}

export default useSignup
