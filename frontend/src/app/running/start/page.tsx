"use client"

import Button from "@/components/common/Button"
import PreRunningInfo from "@/components/running/PreRunningInfo"
import RunningStartMapSection from "@/components/running/RunningStartMapSection"
import { useRouter } from "next/navigation"

const RunningStartPage = () => {
  const router = useRouter()

  const handleParticipate = () => {
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
