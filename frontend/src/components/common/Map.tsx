import { useEffect } from "react"
import { Tile } from "@/types/map/tile"
import { Coordinates } from "@/types/map/navermaps"
import { useNaverMap } from "@/hooks/map/useNaverMap"
import { useScriptLoaded } from "@/components/providers/ScriptProvider"

interface MapProps {
  loc: Coordinates
  tiles?: Tile[]
  zoom?: number
  strokeColor?: string
  fillColor?: string
}

const Map = ({ loc, tiles = [], zoom = 15 }: MapProps) => {
  const { initializeMap, renderTiles } = useNaverMap()
  const { loaded } = useScriptLoaded()

  useEffect(() => {
    if (loaded && window.naver && window.naver.maps) {
      initializeMap({ loc, zoom })
      renderTiles(tiles)
    }
  }, [loaded, loc])

  useEffect(() => {
    renderTiles(tiles)
  }, [tiles])

  return <div id="naver-map" className="h-full w-full" />
}

export default Map
