"use client"

import { useRouter } from "next/navigation"
import Button from "@/components/common/Button"
import PreRunningInfo from "@/components/running/PreRunningInfo"
import RunningStartMapSection from "@/components/running/RunningStartMapSection"

declare const AndroidBridge: {
  onUrlChanged: (url: string) => void
}

const RunningStartPage = () => {
  const router = useRouter()

  const handleParticipate = () => {
    if (
      typeof window !== "undefined" &&
      (window as any).AndroidBridge?.onUrlChanged
    ) {
      ;(window as any).AndroidBridge.onUrlChanged(window.location.pathname)
    }
    router.push("/running")
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
