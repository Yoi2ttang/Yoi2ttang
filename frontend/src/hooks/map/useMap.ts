import { useEffect } from "react"
import { Coordinates } from "@/types/map/navermaps"
import { useMapInitialize } from "./useMapInitialize"

interface InitMapOptions {
  loc: Coordinates
  zoom?: number
  onCenterChange?: (center: Coordinates) => void
}

export const useMap = ({ loc, zoom = 15, onCenterChange }: InitMapOptions) => {
  const { mapRef, initializeMap, setCenter } = useMapInitialize()

  useEffect(() => {
    try {
      initializeMap({ loc, zoom, onCenterChange })
    } catch (e) {
      console.error(e)
    }
  }, [loc, zoom, onCenterChange])

  return {
    mapRef,
    setCenter,
  }
}
