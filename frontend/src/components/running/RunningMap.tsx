"use client"

import { useState, useEffect } from "react"
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
import CurrentLocationBtn from "@/assets/icons/maps/current-location-btn.svg"

const RunningMap = () => {
  const { currentLoc } = useRunningStatsContext()
  const [center, setCenter] = useState<Coordinates | null>(null)
  const [zoomLevel, setZoomLevel] = useState<number>(15)
  const [tiles, setTiles] = useState<Tile[]>([])

  const { mapRef } = useMap({
    loc: currentLoc!,
    zoom: 17,
    onCenterChange: (newCenter) => setCenter(newCenter),
    mapDiv: "running-map",
  })

  // 줌 레벨 추적
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

  // 클러스터 요청
  const { data: clusterData } = useGetTeamTileMapCluster({
    center: center || currentLoc!,
    zoomLevel,
  })

  // 줌이 16 이상일 때만 타일 요청
  const { data: tileData } = useGetTeamTileMap({
    center: center || currentLoc!,
  })

  // tile 또는 cluster 반영
  useEffect(() => {
    if (zoomLevel >= 16) {
      if (tileData) setTiles(tileData.tileGetResponseList)
    } else {
      setTiles([]) // 타일 제거
    }
  }, [zoomLevel, tileData])

  const tileClusters =
    zoomLevel < 16 ? (clusterData?.tileClusterGetResponseList ?? []) : []

  useMapTileClusters({ mapRef, tileClusters })
  useMapTiles({ mapRef, tiles })
  useMapMarker({ mapRef, loc: currentLoc })

  const { moveToCurrentLocation } = useCurrentLocationButton({ mapRef })

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
