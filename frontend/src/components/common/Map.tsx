import { useEffect } from "react"
import { Tile } from "@/types/map/tile"
import { Coordinates } from "@/types/map/navermaps"
import { useMapTile } from "@/hooks/map/useMapTile"
import { useScriptLoaded } from "@/components/providers/ScriptProvider"

interface MapProps {
  loc: Coordinates
  tiles?: Tile[]
  zoom?: number
  strokeColor?: string
  fillColor?: string
  onCenterChange?: (center: Coordinates) => void // 추가
}

const Map = ({ loc, tiles = [], zoom = 15, onCenterChange }: MapProps) => {
  const { initializeMap, renderTiles } = useMapTile()
  const { loaded } = useScriptLoaded()

  useEffect(() => {
    if (loaded && loc) {
      initializeMap({ loc, zoom, onCenterChange })
    }
  }, [loaded])

  useEffect(() => {
    renderTiles(tiles)
  }, [tiles])

  return <div id="naver-map" className="h-full w-full" />
}

export default Map
