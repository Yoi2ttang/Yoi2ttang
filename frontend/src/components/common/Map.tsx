"use client"

import { useMap } from "@/hooks/map/useMap"
import { useMapMarker } from "@/hooks/map/useMapMarker"
import { useMapTiles } from "@/hooks/map/useMapTiles"
import { cn } from "@/lib/utils"
import { Coordinates } from "@/types/map/navermaps"
import { Tile } from "@/types/map/tile"

interface MapProps {
  loc: Coordinates
  tiles?: Tile[]
  zoom?: number
  strokeColor?: string
  fillColor?: string
  onCenterChange?: (center: Coordinates) => void
  className?: string
}

const Map = ({
  loc,
  tiles = [],
  zoom = 15,
  onCenterChange,
  className,
}: MapProps) => {
  const { mapRef } = useMap({ loc, zoom, onCenterChange })
  useMapMarker({ mapRef })
  useMapTiles({ mapRef, tiles })

  return <div id="naver-map" className={cn("h-full w-full", className)} />
}
export default Map
