"use client"

import { useCallback, useRef } from "react"
import { Coordinates, NaverMap } from "@/types/map/navermaps"
import { Tile } from "@/types/map/tile"

interface InitMapOptions {
  loc: Coordinates
  zoom?: number
  onCenterChange?: (center: Coordinates) => void
}

export const useMapTile = () => {
  const mapRef = useRef<NaverMap | null>(null)
  const rectanglesRef = useRef<naver.maps.Rectangle[]>([])
  const markerRef = useRef<naver.maps.Marker | null>(null)

  const centerChangeCallbackRef = useRef<
    ((center: Coordinates) => void) | null
  >(null)

  const initializeMap = useCallback(
    ({ loc, zoom = 15, onCenterChange }: InitMapOptions) => {
      if (typeof window === "undefined" || !window.naver || mapRef.current) {
        return
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

      // 중심 좌표 변화 시 좌표 출력
      naver.maps.Event.addListener(map, "idle", () => {
        const center = map.getCenter() as naver.maps.LatLng
        const newCenter = {
          lat: center.lat(),
          lng: center.lng(),
        }
        centerChangeCallbackRef.current?.(newCenter)
      })

      // 마커 추가 함수
      addMarker(loc)
    },
    [],
  )

  // 마커 추가 함수
  const addMarker = (loc: Coordinates) => {
    const map = mapRef.current
    if (!map) return

    // 마커가 이미 존재하는지 확인 후 추가
    if (!markerRef.current) {
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(loc),
        map,
        icon: {
          content: ` 
            <div class="relative flex justify-center items-center w-6 h-6">
              <div class="absolute w-6 h-6 bg-blue-300 rounded-full animate-ping"></div>
              <div class="relative w-3 h-3 bg-blue-500 rounded-full z-10"></div>
            </div>`,
        },
      })
      markerRef.current = marker
    } else {
      // 마커가 이미 존재하면 위치 변경
      markerRef.current.setPosition(new naver.maps.LatLng(loc))
    }
  }

  const renderTiles = useCallback((tiles: Tile[], color = "#FF7C64") => {
    const map = mapRef.current
    if (!map || typeof window === "undefined" || !window.naver) {
      return
    }

    // 기존 타일 제거
    rectanglesRef.current.forEach((rectangle) => rectangle.setMap(null))
    rectanglesRef.current = []

    // 새 타일 추가
    tiles.forEach(({ sw, ne }) => {
      const rectangle = new naver.maps.Rectangle({
        map,
        bounds: new naver.maps.LatLngBounds(
          new naver.maps.LatLng(sw.lat, sw.lng),
          new naver.maps.LatLng(ne.lat, ne.lng),
        ),
        strokeColor: color,
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: color,
        fillOpacity: 0.6,
      })
      rectanglesRef.current.push(rectangle)
    })
  }, [])

  return { initializeMap, renderTiles, mapRef }
}
