"use client"

import { useTileDataFetcher } from "@/hooks/map/useTileDataFetcher"
import { getMapBounds } from "@/lib/map/utils"
import useTileMapStore, {
  CLUSTERING_ZOOM_LEVEL,
  MIN_ZOOM_LEVEL,
} from "@/stores/useTileMapStore"
import { Coordinates, NaverMap } from "@/types/map/navermaps"
import { debounce } from "lodash-es"
import { useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import TilesMap from "./TilesMap"

interface TilesMapContainerProps {
  myZodiacId: number
  memberId: string
}

const TilesMapContainer = ({
  myZodiacId,
  memberId,
}: TilesMapContainerProps) => {
  const { setCluster, setTiles, selectedOption } = useTileMapStore(
    useShallow((state) => ({
      setCluster: state.setCluster,
      setTiles: state.setTiles,
      selectedOption: state.selectedOption,
    })),
  )

  const { fetchTileData, fetchClusterData } = useTileDataFetcher({
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

      console.log(map?.getZoom(), selectedOption)

      // 클러스터링 처리
      if (map && map?.getZoom() < CLUSTERING_ZOOM_LEVEL) {
        await handleClusterView(map.getZoom(), center)
        return
      }

      // 타일 데이터 가져오기
      await handleTileView(center, map)
    }, 500),
    [selectedOption, setCluster, setTiles],
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
