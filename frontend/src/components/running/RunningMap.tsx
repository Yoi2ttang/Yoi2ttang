"use client"

import { useState } from "react"
import { Coordinates } from "@/types/map/navermaps"
import { Tile } from "@/types/map/tile"
import { getTeamTileMap } from "@/services/tile/api"
import { useMap } from "@/hooks/map/useMap"
import { useMapMarker } from "@/hooks/map/useMapMarker"
import { useMapTiles } from "@/hooks/map/useMapTiles"
import { useRunningStatsContext } from "@/hooks/running/useRunningStatsContext"

const RunningMap = () => {
  const { currentLoc } = useRunningStatsContext()

  if (!currentLoc) {
    return null
  }

  const [tiles, setTiles] = useState<Tile[]>([])

  const handleCenterChange = async (center: Coordinates) => {
    const res = await getTeamTileMap(center)
    setTiles(res.tileGetResponseList)
  }

  const { mapRef } = useMap({
    loc: currentLoc,
    zoom: 15,
    onCenterChange: handleCenterChange,
    mapDiv: "running-stats-map",
  })
  useMapMarker({ mapRef, loc: currentLoc })
  useMapTiles({ mapRef, tiles })

  if (!currentLoc) {
    return null
  }

  return (
    <div className="flex h-full w-full">
      <div id="running-stats-map" className="h-full w-full" />
    </div>
  )
}

export default RunningMap
