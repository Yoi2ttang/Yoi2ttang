"use client"

import { useState, useEffect } from "react"
import RunningMap from "./RunningMap"
import RunningTimer from "./RunningTimer"
import RunningInfoSlide from "./RunningInfoSlide"
import { ArrowLeft } from "lucide-react"
import { useRunningStats } from "@/hooks/running/useRunningStats"
import { Coordinates } from "@/types/map/navermaps"

const RunningView = () => {
  const [loc, setLoc] = useState<Coordinates>()
  const [isPaused, setIsPaused] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)

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

      <button
        onClick={() => setShowOverlay(true)}
        className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition active:scale-95">
        <span className="text-2xl font-bold">
          <ArrowLeft />
        </span>
      </button>

      <RunningTimer runningTime={runningTime} />

      {showOverlay && (
        <RunningInfoSlide
          onClose={() => setShowOverlay(false)}
          runningTime={runningTime}
          distance={distance}
          calories={calories}
          speed={speed}
          setIsPaused={setIsPaused}
          isPaused={isPaused}
        />
      )}
    </div>
  )
}

export default RunningView
