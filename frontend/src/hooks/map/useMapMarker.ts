import { Coordinates } from "@/types/map/navermaps"
import { RefObject, useEffect, useRef } from "react"

interface useMapMarkerProps {
  mapRef: RefObject<naver.maps.Map | null>
  loc?: Coordinates
}

export const useMapMarker = ({ mapRef, loc }: useMapMarkerProps) => {
  const markerRef = useRef<naver.maps.Marker | null>(null)

  const addMarker = (markerLoc: Coordinates) => {
    const map = mapRef.current
    if (!map || !markerLoc) return

    const position = new naver.maps.LatLng(markerLoc)

    if (!markerRef.current) {
      const marker = new naver.maps.Marker({
        position,
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
      markerRef.current.setPosition(position)
    }

    // 마커가 이동해도 지도의 중심을 맞춰줌
    map.setCenter(position)
  }

  useEffect(() => {
    if (loc) {
      addMarker(loc)
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          addMarker(currentLoc)
        },
        (err) => {
          console.error("현재 위치 가져오기 실패:", err)
        },
      )
    }
  }, [loc, mapRef])

  return { addMarker }
}
