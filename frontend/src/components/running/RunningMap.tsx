"use client"

import { Coordinates } from "@/types/map/navermaps"
import { useEffect, useState, useMemo } from "react"
import Map from "../common/Map"
import { tileGetResponseList } from "@/constants/tiles"
import { Tile } from "@/types/map/tile"
import { debounce } from "lodash-es"

const RunningMap = () => {
  const [loc, setLoc] = useState<Coordinates>({ lat: 37.5665, lng: 126.978 })
  const [tiles, setTiles] = useState<Tile[]>(tileGetResponseList)
  const [center, setCenter] = useState<Coordinates | null>(null)

  const getInitLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLoc({ lat: position.coords.latitude, lng: position.coords.longitude })
    })
  }

  const handleCenterChange = useMemo(
    () =>
      debounce((center: Coordinates) => {
        setCenter(center)
        console.log("지도 중심 좌표: ", center.lat, center.lng)
      }, 300),
    [],
  )

  useEffect(() => {
    getInitLocation()
  }, [])

  return (
    <div className="flex h-full w-full flex-1">
      <Map loc={loc} tiles={tiles} onCenterChange={handleCenterChange} />
    </div>
  )
}

export default RunningMap
