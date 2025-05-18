"use client"

import { useMap } from "@/hooks/map/useMap"
import { useMapMarker } from "@/hooks/map/useMapMarker"
import { useMapTiles } from "@/hooks/map/useMapTiles"
import { cn } from "@/lib/utils"
import { Coordinates } from "@/types/map/navermaps"
import { Tile } from "@/types/map/tile"

interface TilesMapProps {
  tileMapRef: React.RefObject<HTMLDivElement> | null
  loc: Coordinates
  zoom: number
  onCenterChange: (center: Coordinates) => void
  tiles: Tile[]
}

const TilesMap = ({
  tileMapRef,
  loc,
  zoom,
  onCenterChange,
  tiles,
}: TilesMapProps) => {
  const { mapRef } = useMap({ loc, zoom, onCenterChange })
  useMapMarker({ mapRef })
  useMapTiles({ mapRef, tiles })

  // useEffect(() => {
  //   if (!tileMapRef?.current) {
  //     tileMapRef?.current = mapRef.current
  //   }
  // }, [])

  return <div id="naver-map" className={cn("h-full w-full")} />
}
export default TilesMap
