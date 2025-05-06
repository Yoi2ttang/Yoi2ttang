"use client"

import { postSignup } from "@/services/auth/api"
import { SignUpData } from "@/types/auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { jwtDecode } from "jwt-decode"

const useSignup = (signupData: SignUpData) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => postSignup(signupData),
    onSuccess: (response) => {
      // 액세스 토큰을 로컬 스토리지에 저장
      const accessToken = response.accessToken
      localStorage.setItem("accessToken", accessToken)

      // JWT 디코딩
      const payload = jwtDecode(accessToken)

      // 캐시로 사용자 정보 저장
      queryClient.setQueryData(["user"], payload)
    },
  })
}

export default useSignup
