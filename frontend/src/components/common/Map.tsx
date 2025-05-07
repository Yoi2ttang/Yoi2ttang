import { useEffect } from "react"
import { Tile } from "@/types/map/tile"
import { Coordinates } from "@/types/map/navermaps"
import { useMapTile } from "@/hooks/map/useMapTile"

interface MapProps {
  loc: Coordinates
  tiles?: Tile[]
  zoom?: number
  strokeColor?: string
  fillColor?: string
  onCenterChange?: (center: Coordinates) => void
}

const Map = ({ loc, tiles = [], zoom = 15, onCenterChange }: MapProps) => {
  const { initializeMap, renderTiles } = useMapTile()

  useEffect(() => {
    try {
      initializeMap({ loc, zoom, onCenterChange })
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    renderTiles(tiles)
  }, [tiles])

  return <div id="naver-map" className="h-full w-full" />
}

export default Map
