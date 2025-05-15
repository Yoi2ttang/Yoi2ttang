import { useState } from "react"
import { Coordinates } from "@/types/map/navermaps"
import { Tile } from "@/types/map/tile"
import { useMap } from "@/hooks/map/useMap"
import { useMapMarker } from "@/hooks/map/useMapMarker"
import { useMapTiles } from "@/hooks/map/useMapTiles"
import { getTeamTileMap } from "@/services/tile/api"

interface RunningStatsMapProps {
  loc: Coordinates
}

const RunningStatsMap = ({ loc }: RunningStatsMapProps) => {
  const [tiles, setTiles] = useState<Tile[]>([])

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
  useMapMarker({ mapRef })
  useMapTiles({ mapRef, tiles })

  if (!loc) return null

  return (
    <div className="flex h-full w-full">
      <div id="running-stats-map" className="h-full w-full" />
    </div>
  )
}

export default RunningStatsMap
