"use client"

import CurrentLocationBtn from "@/assets/icons/maps/current-location-btn.svg"
import { useCurrentLocationButton } from "@/hooks/map/useCurrentLocationButton"
import { useMap } from "@/hooks/map/useMap"
import { useMapMarker } from "@/hooks/map/useMapMarker"
import { useMapTileClusters } from "@/hooks/map/useMapTileClusters"
import { useMapTiles } from "@/hooks/map/useMapTiles"
import useGetOneTeamTileMap from "@/hooks/running/useGetOneTeamTileMap"
import useGetOneTeamTileMapCluster from "@/hooks/running/useGetOneTeamTileMapCluster"
import { getPayload } from "@/lib/auth/util"
import { Coordinates } from "@/types/map/navermaps"
import { Tile } from "@/types/map/tile"
import { useEffect, useState } from "react"

interface RunningStartMapProps {
  loc: Coordinates
}

const RunningStartMap = ({ loc }: RunningStartMapProps) => {
  const [center, setCenter] = useState<Coordinates>(loc)
  const [zoomLevel, setZoomLevel] = useState<number>(17)
  const [tiles, setTiles] = useState<Tile[]>([])

  const zodiacId = Number(getPayload()?.zodiacId)

  const { mapRef } = useMap({
    loc,
    zoom: 17,
    onCenterChange: (newCenter) => setCenter(newCenter),
    mapDiv: "running-start-map",
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
  const { data: clusterData } = useGetOneTeamTileMapCluster({
    zodiacId,
    center,
    zoomLevel,
  })

  // 줌이 16 이상일 때만 타일 요청
  const { data: tileData } = useGetOneTeamTileMap({
    zodiacId,
    sw: { lat: center.lat, lng: center.lng },
    ne: { lat: center.lat, lng: center.lng },
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
  useMapMarker({ mapRef, loc })

  const { moveToCurrentLocation } = useCurrentLocationButton({ mapRef })

  if (!loc) return null

  return (
    <div className="relative flex h-full w-full">
      <div id="running-start-map" className="h-full w-full" />
      <button
        onClick={moveToCurrentLocation}
        className="absolute top-2 left-2 z-10 rounded-full bg-white p-2 text-sm shadow-xl">
        <CurrentLocationBtn className="size-5" />
      </button>
    </div>
  )
}

export default RunningStartMap
