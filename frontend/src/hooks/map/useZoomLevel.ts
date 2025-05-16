"use client"

import { useEffect, RefObject } from "react"
import { NaverMap } from "@/types/map/navermaps"

interface useZoomLevelLoggerProps {
  mapRef: RefObject<NaverMap | null>
}

export const useZoomLevel = ({ mapRef }: useZoomLevelLoggerProps) => {
  useEffect(() => {
    if (!mapRef.current) return

    const map = mapRef.current

    // 최초 줌 레벨 로깅
    console.log("초기 줌 레벨:", map.getZoom())

    const listener = naver.maps.Event.addListener(map, "zoom_changed", () => {
      console.log("변경된 줌 레벨:", map.getZoom())
    })

    return () => {
      naver.maps.Event.removeListener(listener)
    }
  }, [mapRef])
}
