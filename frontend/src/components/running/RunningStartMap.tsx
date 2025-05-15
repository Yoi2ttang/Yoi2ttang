"use client"

import { useMap } from "@/hooks/map/useMap"
import { useMapMarker } from "@/hooks/map/useMapMarker"
import { useMapTiles } from "@/hooks/map/useMapTiles"
import { getOneTeamTileMap } from "@/services/tile/api"
import { Coordinates } from "@/types/map/navermaps"
import { Tile } from "@/types/map/tile"
import { useState } from "react"
import { getPayload } from "@/lib/auth/util"

interface RunningStartMapProps {
  loc: Coordinates
}

const RunningStartMap = ({ loc }: RunningStartMapProps) => {
  const [tiles, setTiles] = useState<Tile[]>([])

  const zodiacId = Number(getPayload()?.zodiacId)

  const handleCenterChange = async (center: Coordinates) => {
    const res = await getOneTeamTileMap(zodiacId, center)
    console.log("eee")
    setTiles(res.tileGetResponseList)
  }

  const { mapRef } = useMap({
    loc,
    zoom: 15,
    onCenterChange: handleCenterChange,
    mapDiv: "running-start-map",
  })
  useMapMarker({ mapRef, loc: loc })
  useMapTiles({ mapRef, tiles })

  if (!loc) {
    return null
  }
  return (
    <div className="flex h-full w-full">
      <div id="running-start-map" className="h-full w-full" />
    </div>
  )
}

export default RunningStartMap
