"use client"

import { useState, useEffect, useRef } from "react"
import { Coordinates } from "@/types/map/navermaps"
import { Tile } from "@/types/map/tile"
import { useMap } from "@/hooks/map/useMap"
import { useMapMarker } from "@/hooks/map/useMapMarker"
import { useMapTiles } from "@/hooks/map/useMapTiles"
import { useMapTileClusters } from "@/hooks/map/useMapTileClusters"
import { useRunningStatsContext } from "@/hooks/running/useRunningStatsContext"
import useGetTeamTileMap from "@/hooks/running/useGetTeamTileMap"
import useGetTeamTileMapCluster from "@/hooks/running/useGetTeamTileMapCluster"
import { useCurrentLocationButton } from "@/hooks/map/useCurrentLocationButton"
import { usePostLocation } from "@/hooks/running/usePostLocation"
import CurrentLocationBtn from "@/assets/icons/maps/current-location-btn.svg"

const RunningMap = () => {
  const { currentLoc, runningId } = useRunningStatsContext()
  const [center, setCenter] = useState<Coordinates | null>(null)
  const [zoomLevel, setZoomLevel] = useState<number>(15)
  const [tiles, setTiles] = useState<Tile[]>([])
  const beforeLocRef = useRef<Coordinates | null>(null)

  const { mapRef } = useMap({
    loc: currentLoc!,
    zoom: 17,
    onCenterChange: (newCenter) => setCenter(newCenter),
    mapDiv: "running-map",
  })

  useEffect(() => {
    if (!mapRef.current) return
    const map = mapRef.current
    setZoomLevel(map.getZoom())

    const listener = naver.maps.Event.addListener(map, "zoom_changed", () => {
      setZoomLevel(map.getZoom())
    })

    return () => {
      naver.maps.Event.removeListener(listener)
    }
  }, [mapRef])

  const { data: clusterData } = useGetTeamTileMapCluster({
    center: center || currentLoc!,
    zoomLevel,
  })

  const { data: tileData } = useGetTeamTileMap({
    center: center || currentLoc!,
  })

  useEffect(() => {
    if (zoomLevel >= 16) {
      if (tileData) setTiles(tileData.tileGetResponseList)
    } else {
      setTiles([])
    }
  }, [zoomLevel, tileData])

  const tileClusters =
    zoomLevel < 16 ? (clusterData?.tileClusterGetResponseList ?? []) : []

  useMapTileClusters({ mapRef, tileClusters })
  useMapTiles({ mapRef, tiles })
  useMapMarker({ mapRef, loc: currentLoc })

  const { moveToCurrentLocation } = useCurrentLocationButton({ mapRef })

  const { mutate: postLocation } = usePostLocation()

  // ✅ 위치 전송 useEffect
  useEffect(() => {
    if (!currentLoc || !runningId) {
      console.log("⛔ currentLoc 또는 runningId 없음", {
        currentLoc,
        runningId,
      })
      return
    }

    console.log("✅ 위치 전송 시작됨")

    const interval = setInterval(() => {
      if (!beforeLocRef.current) {
        console.log("🔹 최초 beforeLoc 설정됨", currentLoc)
        beforeLocRef.current = currentLoc
        return
      }

      const payload = {
        runningId,
        beforePoint: beforeLocRef.current,
        nowPoint: currentLoc,
        currentTime: new Date().toISOString(),
      }

      console.log("📤 위치 전송 중...", payload)

      postLocation(payload)

      beforeLocRef.current = currentLoc
    }, 5000)

    return () => {
      console.log("🧹 위치 전송 인터벌 해제")
      clearInterval(interval)
    }
  }, [runningId, postLocation])

  if (!currentLoc) return null

  return (
    <div className="flex h-full w-full">
      <div id="running-map" className="h-full w-full" />
      <button
        onClick={moveToCurrentLocation}
        className="absolute right-4 bottom-20 z-10 rounded-full bg-white p-2 text-sm shadow-xl">
        <CurrentLocationBtn className="size-6" />
      </button>
    </div>
  )
}

export default RunningMap
