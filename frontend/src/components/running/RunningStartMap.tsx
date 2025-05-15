"use client"

import { useState } from "react"
import { useMap } from "@/hooks/map/useMap"
import { useMapMarker } from "@/hooks/map/useMapMarker"
import { useMapTiles } from "@/hooks/map/useMapTiles"
import { getOneTeamTileMap } from "@/services/tile/api"
import { Coordinates } from "@/types/map/navermaps"
import { Tile } from "@/types/map/tile"
import { getPayload } from "@/lib/auth/util"
import { useCurrentLocationButton } from "@/hooks/map/useCurrentLocationButton"
import CurrentLocationBtn from "@/assets/icons/maps/current-location-btn.svg"

interface RunningStartMapProps {
  loc: Coordinates
}

const RunningStartMap = ({ loc }: RunningStartMapProps) => {
  const [tiles, setTiles] = useState<Tile[]>([])

  const zodiacId = Number(getPayload()?.zodiacId)

  const handleCenterChange = async (center: Coordinates) => {
    const res = await getOneTeamTileMap(zodiacId, center)
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

  const { moveToCurrentLocation } = useCurrentLocationButton({ mapRef })

  if (!loc) {
    return null
  }

  return (
    <div className="relative flex h-full w-full">
      <div id="running-start-map" className="h-full w-full" />
      <button
        onClick={moveToCurrentLocation}
        className="absolute top-2 left-2 z-10 rounded-full bg-white p-2 text-sm shadow-xl">
        <CurrentLocationBtn className="size-5" />
      </button>
    </div>
  )
}

export default RunningStartMap
