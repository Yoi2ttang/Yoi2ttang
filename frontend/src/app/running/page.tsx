"use client"

import { useState } from "react"
import useCountdown from "@/hooks/running/useCountdown"
import Countdown from "@/components/running/Countdown"
import RunningView from "@/components/running/RunningView"

const RunningPage = () => {
  const [showMap, setShowMap] = useState(false)

  const count = useCountdown({
    start: 3,
    onComplete: () => setShowMap(true),
  })

  if (!showMap) {
    return <Countdown count={count} />
  }

  return <RunningView />
}

export default RunningPage
