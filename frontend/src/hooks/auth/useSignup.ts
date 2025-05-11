import { SignUpData } from "@/types/auth"

const useSignup = (signupData: SignUpData) => {
  const signup = async () => {
    const response = await fetch("/api/signup", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(signupData),
    })
    if (response.redirected) {
      window.location.href = response.url
    }
  }

  return { signup }
}

export default useSignup
