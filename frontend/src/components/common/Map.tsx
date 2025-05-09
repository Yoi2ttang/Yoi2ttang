import { useEffect } from "react"
import { Tile } from "@/types/map/tile"
import { Coordinates } from "@/types/map/navermaps"
import { useMap } from "@/hooks/map/useMap"
import { useMapMarker } from "@/hooks/map/useMapMarker"
import { useMapTiles } from "@/hooks/map/useMapTiles"

interface MapProps {
  loc: Coordinates
  tiles?: Tile[]
  zoom?: number
  strokeColor?: string
  fillColor?: string
  onCenterChange?: (center: Coordinates) => void
}

const Map = ({ loc, tiles = [], zoom = 15, onCenterChange }: MapProps) => {
  const { mapRef, setCenter } = useMap({ loc, zoom, onCenterChange })
  const { addMarker } = useMapMarker({ mapRef })
  const { renderTiles } = useMapTiles({ mapRef })

  useEffect(() => {
    if (mapRef.current) {
      setCenter(loc)
      renderTiles(tiles)
      addMarker(loc)
    }
  }, [loc, mapRef])

  useEffect(() => {
    if (mapRef.current) {
      renderTiles(tiles)
    }
  }, [tiles, mapRef])

  return <div id="naver-map" className="h-full w-full" />
}
export default Map
