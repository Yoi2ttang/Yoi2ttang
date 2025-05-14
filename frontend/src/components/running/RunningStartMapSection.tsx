"use client"

import { useEffect, useState } from "react"
import { Coordinates } from "@/types/map/navermaps"
import { Tile } from "@/types/map/tile"
import { getTeamTileMap } from "@/services/tile/api"
import Map from "@/components/common/Map"
import { tileGetResponseList } from "@/constants/tiles"

const RunningStartMapSection = () => {
  const [loc, setLoc] = useState<Coordinates>()
  const [tiles, setTiles] = useState<Tile[]>(tileGetResponseList)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLoc({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }, [])

  const handleCenterChange = async (center: Coordinates) => {
    const res = await getTeamTileMap(center)
    setTiles(res.tileGetResponseList)
  }

  if (!loc) return null

  return (
    <div className="flex flex-1">
      <Map
        loc={loc}
        tiles={tiles}
        zoom={15}
        onCenterChange={handleCenterChange}
      />
    </div>
  )
}

export default RunningStartMapSection
