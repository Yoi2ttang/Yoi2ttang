"use client"

import { useState } from "react"
import RunningMap from "./RunningMap"
import RunningTimer from "./RunningTimer"
import RunningInfoSlide from "./RunningInfoSlide"
import { ArrowLeft } from "lucide-react"

interface RunningViewProps {
  runningTime: number
}

const RunningView = ({ runningTime }: RunningViewProps) => {
  const [showOverlay, setShowOverlay] = useState(false)

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      <RunningMap />

      {/* 오버레이 버튼 */}
      <button
        onClick={() => setShowOverlay(true)}
        className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition active:scale-95">
        <span className="text-2xl font-bold">
          <ArrowLeft />
        </span>
      </button>

      <RunningTimer runningTime={runningTime} />

      {showOverlay && (
        <RunningInfoSlide onClose={() => setShowOverlay(false)} />
      )}
    </div>
  )
}

export default RunningView
