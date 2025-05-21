"use client"

import Button from "@/components/common/Button"
import { useDevice } from "@/components/DeviceProvider"
import PreRunningInfo from "@/components/running/PreRunningInfo"
import RunningStartMapSection from "@/components/running/RunningStartMapSection"
import { useRouter } from "next/navigation"

declare const AndroidBridge: {
  onUrlChanged: (url: string) => void
}

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void
    }
  }
}

const RunningStartPage = () => {
  const router = useRouter()
  const { isWebView } = useDevice()

  const handleParticipate = () => {
    if (!isWebView) {
      alert("앱에서만 사용 가능합니다.")
      return
    }

    if (typeof window !== "undefined") {
      // ✅ WebView → React Native 로 메시지 보내기
      window.ReactNativeWebView?.postMessage("navigateToRunning")

      // ✅ AndroidBridge 예외 처리 (선택)
      if ((window as any).AndroidBridge?.onUrlChanged) {
        ;(window as any).AndroidBridge.onUrlChanged(window.location.pathname)
      }

      // ✅ 실제 페이지 이동
      // router.push("/running")
    } else {
      alert("앱을 설치해주세요.")
    }
  }

  return (
    <div className="relative flex h-full w-full flex-col justify-center">
      <div className="flex flex-1 flex-col gap-4 overflow-hidden pb-32">
        <PreRunningInfo />
        <RunningStartMapSection />
      </div>
      <div className="absolute bottom-16 left-0 w-full space-y-2">
        <Button className="w-full" onClick={handleParticipate}>
          참여하기
        </Button>
      </div>
    </div>
  )
}

export default RunningStartPage
