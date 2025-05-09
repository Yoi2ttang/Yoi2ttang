import { useRef, useCallback } from "react"
import { NaverMap, Coordinates } from "@/types/map/navermaps"

interface InitMapOptions {
  loc: Coordinates
  zoom?: number
  onCenterChange?: (center: Coordinates) => void
}

export const useMapInitialize = () => {
  const mapRef = useRef<NaverMap | null>(null)
  const centerChangeCallbackRef = useRef<
    ((center: Coordinates) => void) | null
  >(null)

  const initializeMap = useCallback(
    ({ loc, zoom = 15, onCenterChange }: InitMapOptions) => {
      if (typeof window === "undefined" || !window.naver || mapRef.current) {
        throw new Error("네이버 지도 api가 로드되지 않았습니다.")
      }

      centerChangeCallbackRef.current = onCenterChange ?? null

      const mapOptions = {
        center: new naver.maps.LatLng(loc.lat, loc.lng),
        zoom,
        scaleControl: true,
        mapDataControl: true,
        logoControlOptions: {
          position: naver.maps.Position.BOTTOM_LEFT,
        },
      }

      const map = new naver.maps.Map("naver-map", mapOptions)
      mapRef.current = map

      naver.maps.Event.addListener(map, "idle", () => {
        const center = map.getCenter() as naver.maps.LatLng
        const newCenter = {
          lat: center.lat(),
          lng: center.lng(),
        }
        centerChangeCallbackRef.current?.(newCenter)
      })
    },
    [],
  )

  // ✅ 중심 좌표 이동 함수 추가
  const setCenter = (center: Coordinates) => {
    if (mapRef.current) {
      mapRef.current.setCenter(new naver.maps.LatLng(center.lat, center.lng))
    }
  }

  return {
    mapRef,
    initializeMap,
    setCenter, // ✅ 추가된 부분
  }
}
