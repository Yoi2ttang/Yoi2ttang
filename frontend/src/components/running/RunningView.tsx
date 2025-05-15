"use client"

import { useState, useEffect } from "react"
import RunningMap from "./RunningMap"
import RunningTimer from "./RunningTimer"
import RunningInfoSlide from "./RunningInfoSlide"
import { useRunningStats } from "@/hooks/running/useRunningStats"
import { Coordinates } from "@/types/map/navermaps"
import RunningSettingsButton from "./RunningSettingsButton"
import RunningSettingsModal from "./RunningSettingsModal"
import RunningStatsButton from "./RunningStatsButton"

const RunningView = () => {
  const [loc, setLoc] = useState<Coordinates>()
  const [isPaused, setIsPaused] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLoc({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }, [])

  const { runningTime, distance, calories, speed, currentLoc } =
    useRunningStats({ isPaused })

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      {currentLoc && <RunningMap loc={currentLoc} />}
      <RunningStatsButton onClick={() => setShowStats(true)} />
      <RunningTimer runningTime={runningTime} />

      {showStats && (
        <RunningInfoSlide
          onClose={() => setShowStats(false)}
          runningTime={runningTime}
          distance={distance}
          calories={calories}
          speed={speed}
          setIsPaused={setIsPaused}
          isPaused={isPaused}
        />
      )}

      <RunningSettingsButton onClick={() => setShowSettings(true)} />
      {showSettings && (
        <RunningSettingsModal onClose={() => setShowSettings(false)} />
      )}
    </div>
  )
}

export default RunningView
