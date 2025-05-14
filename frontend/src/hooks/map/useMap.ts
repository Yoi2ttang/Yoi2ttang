"use client"

import { Coordinates } from "@/types/map/navermaps"
import { useEffect } from "react"
import { useMapInitialize } from "./useMapInitialize"

interface InitMapOptions {
  mapDiv?: string | HTMLElement
  loc: Coordinates
  zoom?: number
  onCenterChange?: (center: Coordinates) => void
}

export const useMap = ({
  loc,
  zoom = 15,
  onCenterChange,
  mapDiv,
}: InitMapOptions) => {
  const { mapRef, initializeMap } = useMapInitialize()

  useEffect(() => {
    if (!mapRef.current) {
      initializeMap({ loc, zoom, onCenterChange, mapDiv })
    }
  }, [])

  return {
    mapRef,
    setCenter,
  }
}
