"use client"

import { useEffect, useState, Dispatch, SetStateAction } from "react"
import RunningMap from "./RunningMap"
import RunningTimer from "./RunningTimer"
import RunningInfoSlide from "./RunningInfoSlide"
import { useRunningStats } from "@/hooks/running/useRunningStats"
import { Coordinates } from "@/types/map/navermaps"
import RunningSettingsButton from "./RunningSettingsButton"
import RunningSettingsModal from "./RunningSettingsModal"
import RunningStatsButton from "./RunningStatsButton"
import { usePostStartRunning } from "@/hooks/running/usePostStartRunning"
import { useRunningStatsContext } from "@/hooks/running/useRunningStatsContext"

interface RunningViewProps {
  isPaused: boolean
  setIsPaused: Dispatch<SetStateAction<boolean>>
}

const RunningView = ({ isPaused, setIsPaused }: RunningViewProps) => {
  const [loc, setLoc] = useState<Coordinates>()
  const [showStats, setShowStats] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const { currentLoc } = useRunningStats({ isPaused })
  const { mutate: startRunning } = usePostStartRunning()
  const { setRunningId } = useRunningStatsContext()

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
              console.log("받은 runningId:", data.runningId)
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
  )
}

export default RunningView
