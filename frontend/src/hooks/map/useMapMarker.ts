import { Coordinates } from "@/types/map/navermaps"
import { RefObject, useEffect, useRef } from "react"

interface useMapMarkerProps {
  mapRef: RefObject<naver.maps.Map | null>
}

export const useMapMarker = ({ mapRef }: useMapMarkerProps) => {
  const markerRef = useRef<naver.maps.Marker | null>(null)

  // 마커 추가 함수
  const addMarker = (loc: Coordinates) => {
    const map = mapRef.current
    if (!map) {
      return
    }

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

  useEffect(() => {
    // 현재 위치를 기반으로 마커 추가
    if (mapRef.current) {
      navigator.geolocation.getCurrentPosition((position) => {
        addMarker({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
    }
  }, [])

  return { addMarker }
}
