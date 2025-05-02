"use client"

import { useCallback, useRef } from "react"
import { Coordinates, NaverMap } from "@/types/map/navermaps"

interface Tile {
  sw: Coordinates
  ne: Coordinates
}

interface InitMapOptions {
  loc: Coordinates
  zoom?: number
  tiles?: Tile[]
}

export const useNaverMap = () => {
  const mapRef = useRef<NaverMap | null>(null)

  const initializeMap = useCallback(
    ({ loc, zoom = 15, tiles = [] }: InitMapOptions) => {
      if (typeof window === "undefined" || !window.naver) return

      const mapOptions = {
        center: new naver.maps.LatLng(loc),
        zoom,
        scaleControl: true,
        mapDataControl: true,
        logoControlOptions: {
          position: naver.maps.Position.BOTTOM_LEFT,
        },
      }

      const map = new naver.maps.Map("naver-map", mapOptions)

      new naver.maps.Marker({
        position: new naver.maps.LatLng(loc),
        map,
        icon: {
          content: `
          <div class="relative flex justify-center items-center w-6 h-6">
            <div class="absolute w-6 h-6 bg-yoi-300 rounded-full animate-ping"></div>
            <div class="relative w-3 h-3 bg-yoi-500 rounded-full z-10"></div>
          </div>
        `,
          size: new naver.maps.Size(24, 24),
          anchor: new naver.maps.Point(12, 12),
        },
      })

      tiles.forEach(({ sw, ne }) => {
        new naver.maps.Rectangle({
          map,
          bounds: new naver.maps.LatLngBounds(
            new naver.maps.LatLng(sw.lat, sw.lng),
            new naver.maps.LatLng(ne.lat, ne.lng),
          ),
          strokeColor: "#FF7C64",
          strokeOpacity: 1,
          strokeWeight: 2,
          fillColor: "#FF5434",
          fillOpacity: 0.4,
        })
      })

      mapRef.current = map
    },
    [],
  )

  return { initializeMap, mapRef }
}
