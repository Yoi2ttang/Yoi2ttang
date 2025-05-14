"use client"

import { useEffect, useState } from "react"
import useCountdown from "@/hooks/running/useCountdown"
import Countdown from "@/components/running/Countdown"
import RunningView from "@/components/running/RunningView"

const RunningPage = () => {
  const [showMap, setShowMap] = useState(false)
  const [runningTime, setRunningTime] = useState(0)

  const count = useCountdown({
    start: 3,
    onComplete: () => setShowMap(true),
  })

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

  return <RunningView runningTime={runningTime} />
}

export default RunningPage
