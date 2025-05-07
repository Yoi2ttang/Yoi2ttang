import { useEffect } from "react"
import { Tile } from "@/types/map/tile"
import { Coordinates } from "@/types/map/navermaps"
import { useMap } from "@/hooks/map/useMap"

interface MapProps {
  loc: Coordinates
  tiles?: Tile[]
  zoom?: number
  strokeColor?: string
  fillColor?: string
  onCenterChange?: (center: Coordinates) => void
}

const Map = ({ loc, tiles = [], zoom = 15, onCenterChange }: MapProps) => {
  const { renderTiles, mapRef } = useMap({ loc, zoom, onCenterChange })

  useEffect(() => {
    renderTiles(tiles)
  }, [tiles, mapRef])

  return <div id="naver-map" className="h-full w-full" />
}

export default Map
