"use client"

import { Coordinates } from "@/types/map/navermaps"
import { RefObject, useCallback } from "react"

interface UseCurrentLocationButtonProps {
  mapRef: RefObject<naver.maps.Map | null>
  onMove?: (loc: Coordinates) => void
}

export const useCurrentLocationButton = ({
  mapRef,
  onMove,
}: UseCurrentLocationButtonProps) => {
  const moveToCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      console.error("위치 정보를 사용할 수 없습니다.")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }

        if (mapRef.current) {
          const center = new naver.maps.LatLng(loc.lat, loc.lng)
          mapRef.current.setCenter(center)
        }

        onMove?.(loc)
      },
      (error) => {
        console.error("위치 정보 가져오기 실패", error)
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
      },
    )
  }, [mapRef, onMove])
  return {
    moveToCurrentLocation,
  }
}
