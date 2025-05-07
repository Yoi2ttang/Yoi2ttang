import { useContext, useEffect } from "react"
import { Tile } from "@/types/map/tile"
import { Coordinates } from "@/types/map/navermaps"
import { useMapTile } from "@/hooks/map/useMapTile"
import { ScriptContext } from "@/components/providers/ScriptProvider"

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
  const { loaded } = useContext(ScriptContext)

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
