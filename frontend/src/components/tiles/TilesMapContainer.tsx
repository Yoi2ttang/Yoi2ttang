"use client"

import { useTileDataFetcher } from "@/hooks/map/useTileDataFetcher"
import { getMapBounds } from "@/lib/map/utils"
import useTileMapStore from "@/stores/useTileMapStore"
import { Coordinates, NaverMap } from "@/types/map/navermaps"
import { TileViewOption } from "@/types/map/tile"
import { useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import TilesMap from "./TilesMap"

interface TilesMapContainerProps {
  selectedOption: TileViewOption | null
  tileMapType: "my" | "team"
}
const CLUSTERING_ZOOM_LEVEL = 17

const TilesMapContainer = ({
  selectedOption,
  tileMapType,
}: TilesMapContainerProps) => {
  const { setCluster, setTiles } = useTileMapStore(
    useShallow((state) => ({
      setCluster: state.setCluster,
      setTiles: state.setTiles,
    })),
  )

  const { fetchTileData, fetchClusterData } = useTileDataFetcher({
    tileMapType,
  })

  const handleCenterChange = useCallback(
    async (center: Coordinates, map: NaverMap | null) => {
      if (center.lat === undefined || center.lng === undefined) {
        return
      }

      console.log(map?.getZoom(), selectedOption, tileMapType)

      // 클러스터링 처리
      if (map && map?.getZoom() < CLUSTERING_ZOOM_LEVEL) {
        await handleClusterView(map.getZoom(), center)
        return
      }

      // 타일 데이터 가져오기
      await handleTileView(center, map)
    },
    [selectedOption, tileMapType],
  )

  const handleTileView = useCallback(
    async (center: Coordinates, map: NaverMap | null) => {
      setCluster([])

      const bounds = getMapBounds(map)
      if (!bounds) return

      const tileList = await fetchTileData(selectedOption, bounds, center)
      console.log("tilesRes", tileList)
      setTiles(tileList)
    },
    [selectedOption, fetchTileData, setCluster, setTiles],
  )

  const handleClusterView = useCallback(
    async (zoom: number, center: Coordinates) => {
      setTiles([])

      const clusterList =
        (await fetchClusterData(selectedOption, zoom, center)) ?? []

      console.log("clusterList", clusterList)
      setCluster(clusterList)
    },
    [selectedOption, fetchClusterData, setTiles, setCluster],
  )

  return (
    <TilesMap
      zoom={CLUSTERING_ZOOM_LEVEL}
      onCenterChange={handleCenterChange}
    />
  )
}
export default TilesMapContainer
