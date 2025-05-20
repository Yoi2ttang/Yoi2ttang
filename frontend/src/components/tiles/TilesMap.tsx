"use client"

import useMapCluster from "@/hooks/map/useMapCluster"
import { useMapInitialize } from "@/hooks/map/useMapInitialize"
import { useMapMarker } from "@/hooks/map/useMapMarker"
import { useMapTiles } from "@/hooks/map/useMapTiles"
import { cn } from "@/lib/utils"
import useTileMapStore from "@/stores/useTileMapStore"
import { Coordinates, NaverMap } from "@/types/map/navermaps"
import { useEffect, useRef } from "react"
import { useShallow } from "zustand/react/shallow"

interface TilesMapProps {
  zoom: number
  onCenterChange: (center: Coordinates, map: NaverMap | null) => void
}

const TilesMap = ({ zoom, onCenterChange }: TilesMapProps) => {
  const { cluster, tiles } = useTileMapStore(
    useShallow((state) => ({
      cluster: state.cluster,
      tiles: state.tiles,
    })),
  )

  const { mapRef, initializeMap } = useMapInitialize()
  const listenerRef = useRef<naver.maps.MapEventListener | null>(null)

  useMapCluster({ mapRef, clusterList: cluster })
  useMapMarker({ mapRef })
  useMapTiles({ mapRef, tiles })

  useEffect(() => {
    if (!mapRef.current) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude: lat, longitude: lng } = position.coords
        initializeMap({
          loc: { lat, lng },
          zoom,
          onCenterChange,
          mapDiv: "naver-map",
        })
      })
    } else {
      // 기존 리스너 제거
      if (listenerRef.current) {
        naver.maps.Event.removeListener(listenerRef.current)
      }

      // 새 리스너 등록
      listenerRef.current = naver.maps.Event.addListener(
        mapRef.current,
        "idle",
        () => {
          const center = mapRef.current?.getCenter() as naver.maps.LatLng
          onCenterChange(
            { lat: center.lat(), lng: center.lng() },
            mapRef.current,
          )
        },
      )
    }

    return () => {
      if (listenerRef.current) {
        naver.maps.Event.removeListener(listenerRef.current)
      }
    }
  }, [zoom, onCenterChange, initializeMap])

  return <div id="naver-map" className={cn("h-full w-full")} />
}

export default TilesMap
