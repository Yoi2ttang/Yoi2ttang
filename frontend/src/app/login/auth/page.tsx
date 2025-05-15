"use client"

import TileLoading from "@/assets/images/loading/tile-loading.gif"
import useLogin from "@/hooks/auth/useLogin"
import Image from "next/image"
import { Suspense } from "react"

const LoginContent = () => {
  useLogin()

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-8 p-6">
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <Image src={TileLoading} alt="logo" width={120} height={120} />
        <p className="text-yoi-500 animate-pulse font-semibold">
          로그인을 하는 중이에요
        </p>
      </div>

      <div className="flex justify-center">
        <Image src="/images/logo.svg" alt="logo" width={46} height={34} />
      </div>
    </div>
  )
}

const LoginAuthPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  )
}

export default LoginAuthPage
