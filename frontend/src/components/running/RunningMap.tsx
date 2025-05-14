"use client"

import { useState } from "react"
import { Coordinates } from "@/types/map/navermaps"
import { tileGetResponseList } from "@/constants/tiles"
import { Tile } from "@/types/map/tile"
import { getTeamTileMap } from "@/services/tile/api"
import { useMap } from "@/hooks/map/useMap"
import { useMapMarker } from "@/hooks/map/useMapMarker"
import { useMapTiles } from "@/hooks/map/useMapTiles"

interface RunningMapProps {
  loc: Coordinates
}

const RunningMap = ({ loc }: RunningMapProps) => {
  const [tiles, setTiles] = useState<Tile[]>(tileGetResponseList)

  const handleCenterChange = async (center: Coordinates) => {
    const res = await getTeamTileMap(center)
    setTiles(res.tileGetResponseList)
  }

  const { mapRef } = useMap({
    loc,
    zoom: 15,
    onCenterChange: handleCenterChange,
    mapDiv: "running-stats-map",
  })
  useMapMarker({ mapRef, loc: loc })
  useMapTiles({ mapRef, tiles })

  if (!loc) return null

  return (
    <div className="flex h-full w-full">
      <div id="running-stats-map" className="h-full w-full" />
    </div>
  )
}

export default RunningMap
