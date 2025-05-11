"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

interface GlobalErrorProps {
  error: Error
  reset: () => void
}

const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  const router = useRouter()

  useEffect(() => {
    const reissueAndRetry = async () => {
      try {
        if (error.message === "UNAUTHORIZED") {
          const response = await fetch("/api/reissue", {
            method: "POST",
            credentials: "include",
          })
          if (response.ok) {
            // 에러가 발생한 서버 컴포넌트를 다시 렌더링하여 리패칭이 일어나도록 유도
            reset()
          } else {
            router.replace("/login")
          }
        }
      } catch (error) {
        console.error(error)
        router.replace("/login")
      }
    }

    reissueAndRetry()
  }, [error, reset, router])

  return null
}

export default GlobalError
