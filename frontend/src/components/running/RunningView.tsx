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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLoc({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }, [])

  const [showOverlay, setShowOverlay] = useState(false)

  const { runningTime, distance, calories, speed, currentLoc } =
    useRunningStats()

  useEffect(() => {
    console.log("RunningTime:", currentLoc)
  }, [runningTime, distance, calories, speed])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white">
      {loc && <RunningMap loc={loc} />}

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
        />
      )}
    </div>
  )
}

export default RunningView
