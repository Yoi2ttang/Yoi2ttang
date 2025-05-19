"use client"

import { getPayload } from "@/lib/auth/util"
import { usePathname, useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

interface ProtectedLayoutProps {
  children: ReactNode
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      const payload = getPayload()
      if (payload) {
        const isStaled = Math.floor(Date.now() / 1_000) > payload.exp
        // accessToken이 만료되었으면 리이슈 요청
        if (isStaled) {
          const response = await fetch("/api/auth/reissue", {
            method: "POST",
          })
          if (response.ok) {
            return
          }
        } else {
          return
        }
      }

      router.replace("/login")
    }

    checkAuth()
  }, [pathname])

  return <>{children}</>
}

export default ProtectedLayout
