"use client"

import { postLogin } from "@/services/auth/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"

const useLogin = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: (code: string) => postLogin(code),
    onSuccess: (data) => {
      // 기존 유저
      if (!data.socialId) {
        // 액세스 토큰을 로컬 스토리지에 저장
        const accessToken = data.accessToken
        localStorage.setItem("accessToken", accessToken!)

        // JWT 디코딩
        const payload = jwtDecode(accessToken!)

        // 캐시로 사용자 정보 저장
        queryClient.setQueryData(["user"], payload)

        // 메인 페이지로 이동
        router.replace("/")
      }
      // 신규 유저
      else {
        // 회원가입 페이지로 이동
        router.replace(`/signup?socialId=${data.socialId}`)
      }
    },
  })
}

export default useLogin
