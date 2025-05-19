"use client"

import { useEffect, useState } from "react"
import { Coordinates } from "@/types/map/navermaps"
import RunningStartMap from "./RunningStartMap"

const RunningStartMapSection = () => {
  const [loc, setLoc] = useState<Coordinates>()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLoc({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }, [])

  return (
    <div className="flex flex-1">{loc && <RunningStartMap loc={loc} />}</div>
  )
}

export default RunningStartMapSection
