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
import { RunningStatsProvider } from "../providers/RunningStatsProvider"

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

  const { currentLoc } = useRunningStats({ isPaused })

  return (
    <RunningStatsProvider isPaused={isPaused}>
      <div className="relative h-screen w-full overflow-hidden bg-white">
        {currentLoc && loc && <RunningMap />}
        <RunningStatsButton onClick={() => setShowStats(true)} />
        <RunningTimer />

        {showStats && (
          <RunningInfoSlide
            onClose={() => setShowStats(false)}
            setIsPaused={setIsPaused}
            isPaused={isPaused}
          />
        )}

        <RunningSettingsButton onClick={() => setShowSettings(true)} />
        {showSettings && (
          <RunningSettingsModal onClose={() => setShowSettings(false)} />
        )}
      </div>
    </RunningStatsProvider>
  )
}

export default RunningView
