"use client"

import { useEffect, useRef, useState } from "react"
import useCountdown from "@/hooks/running/useCountdown"
import Countdown from "@/components/running/Countdown"
import RunningMap from "@/components/running/RunningMap"
import RunningInfoSlide from "@/components/running/RunningInfoSlide"
import { ArrowLeft } from "lucide-react"

const RunningPage = () => {
  const [showMap, setShowMap] = useState(false)
  const [runningTime, setRunningTime] = useState(0)
  const [showOverlay, setShowOverlay] = useState(false)

  const count = useCountdown({
    start: 3,
    onComplete: () => setShowMap(true),
  })

  // 러닝 시간 증가
  useEffect(() => {
    if (!showMap) return

    const timer = setInterval(() => {
      setRunningTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [showMap])

  if (!showMap) {
    return <Countdown count={count} />
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      <RunningMap />

      {/* 클릭만 되는 화살표 버튼 */}
      <button
        onClick={() => setShowOverlay(true)}
        className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition active:scale-95">
        <span className="text-2xl font-bold">
          <ArrowLeft />
        </span>
      </button>

      {/* 시간 표시 */}
      <div className="absolute top-10 left-1/2 z-10 flex -translate-x-1/2 flex-col gap-3">
        <div className="text-4xl font-bold text-black italic">
          {String(Math.floor(runningTime / 3600)).padStart(2, "0")}:
          {String(Math.floor((runningTime % 3600) / 60)).padStart(2, "0")}:
          {String(runningTime % 60).padStart(2, "0")}
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="bg-yoi-500 size-3 rotate-12"></div>
          <div className="text-xl font-bold">102</div>
        </div>
      </div>

      {/* 오버레이 */}
      {showOverlay && (
        <RunningInfoSlide onClose={() => setShowOverlay(false)} />
      )}
    </div>
  )
}

export default RunningPage
