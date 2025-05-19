"use client"

import { useState } from "react"
import useCountdown from "@/hooks/running/useCountdown"
import Countdown from "@/components/running/Countdown"
import RunningView from "@/components/running/RunningView"
import { RunningStatsProvider } from "@/components/providers/RunningStatsProvider" // ✅ 위치 맞게 조정

const RunningPage = () => {
  const [showMap, setShowMap] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const count = useCountdown({
    start: 3,
    onComplete: () => setShowMap(true),
  })

  if (!showMap) {
    return <Countdown count={count} />
  }

  return (
    <RunningStatsProvider isPaused={isPaused}>
      <RunningView isPaused={isPaused} setIsPaused={setIsPaused} />
    </RunningStatsProvider>
  )
}

export default RunningPage
