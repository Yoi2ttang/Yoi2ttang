"use client"

import { useTileDataFetcher } from "@/hooks/map/useTileDataFetcher"
import { getMapBounds } from "@/lib/map/utils"
import useTileMapStore from "@/stores/useTileMapStore"
import { Coordinates, NaverMap } from "@/types/map/navermaps"
import { TileViewOption } from "@/types/map/tile"
import { debounce } from "lodash-es"
import { useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import TilesMap from "./TilesMap"

interface TilesMapContainerProps {
  selectedOption: TileViewOption | null
  tileMapType: "my" | "team"
  myZodiacId: number
  memberId: string
}
const CLUSTERING_ZOOM_LEVEL = 16
const MIN_ZOOM_LEVEL = 12

const TilesMapContainer = ({
  myZodiacId,
  memberId,
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
    myZodiacId,
    memberId,
  })

  const handleCenterChange = useCallback(
    debounce(async (center: Coordinates, map: NaverMap | null) => {
      if (center.lat === undefined || center.lng === undefined) {
        return
      }

      if (map && map?.getZoom() <= MIN_ZOOM_LEVEL) {
        setCluster([])
        setTiles([])
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
    }, 500),
    [selectedOption, tileMapType, setCluster, setTiles],
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
      myZodiacId={myZodiacId}
      memberId={memberId}
      zoom={16}
      onCenterChange={handleCenterChange}
    />
  )
}
export default TilesMapContainer
