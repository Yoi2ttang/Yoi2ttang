"use client"

import { useEffect, useState } from "react"
import RunningMap from "./RunningMap"
import RunningTimer from "./RunningTimer"
import RunningInfoSlide from "./RunningInfoSlide"
import { useRunningStats } from "@/hooks/running/useRunningStats"
import { Coordinates } from "@/types/map/navermaps"
import RunningSettingsButton from "./RunningSettingsButton"
import RunningSettingsModal from "./RunningSettingsModal"
import RunningStatsButton from "./RunningStatsButton"
import { RunningStatsProvider } from "../providers/RunningStatsProvider"
import { usePostStartRunning } from "@/hooks/running/usePostStartRunning"

const RunningView = () => {
  const [loc, setLoc] = useState<Coordinates>()
  const [isPaused, setIsPaused] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [runningId, setRunningId] = useState<number | null>(null)

  const { currentLoc } = useRunningStats({ isPaused })
  const { mutate: startRunning } = usePostStartRunning()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        setLoc(coords)

        startRunning(
          {
            lat: coords.lat,
            lng: coords.lng,
            currentTime: new Date().toISOString(),
          },
          {
            onSuccess: (data) => {
              console.log("러닝 시작 성공", data)
              setRunningId(data.runningId)
            },
            onError: (err) => {
              console.error("러닝 시작 실패", err)
            },
          },
        )
      },
      (err) => {
        console.error("위치 가져오기 실패:", err)
      },
      { enableHighAccuracy: true },
    )
  }, [startRunning])

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
