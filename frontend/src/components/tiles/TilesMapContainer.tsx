"use client"

import useGetAllTiles from "@/hooks/tile/useGetAllTiles"
import useGetTeamTile from "@/hooks/tile/useGetMyTeamTile"
import useGetOneTeamTileCluster from "@/hooks/tile/useGetOneTeamTileCluster"
import useGetPersonalTile from "@/hooks/tile/useGetPersonalTile"
import useGetTeamTileCluster from "@/hooks/tile/useGetTeamTileCluster"
import { getPersonalTileMap } from "@/services/tile/api"
import useTileMapStore from "@/stores/useTileMapStore"
import { Coordinates, NaverMap } from "@/types/map/navermaps"
import { TileViewOption } from "@/types/map/tile"
import { useCallback, useRef } from "react"
import { useShallow } from "zustand/react/shallow"
import TilesMap from "./TilesMap"

interface TilesMapContainerProps {
  selectedOption: TileViewOption | null
}

const TilesMapContainer = ({ selectedOption }: TilesMapContainerProps) => {
  const { setCluster, setTiles } = useTileMapStore(
    useShallow((state) => ({
      setCluster: state.setCluster,
      setTiles: state.setTiles,
    })),
  )
  const tileMapRef = useRef<NaverMap | null>(null)

  // 개인 타일 지도 조회
  const { mutateAsync: getPersonalTile } = useGetPersonalTile({
    memberId: "1",
  })
  // 특정팀 타일 지도 조회
  const { mutateAsync: getTeamTile } = useGetTeamTile({ zodiacId: 1 })
  // 전체 타일 지도 조회
  const { mutateAsync: getAllTiles } = useGetAllTiles()
  // 전체 점령 지도 클러스터 조회
  const { mutateAsync: getTeamTileMapCluster } = useGetTeamTileCluster()
  // 특정 팀 점령 지도 클러스터 조회
  const { mutateAsync: getOneTeamTileMapCluster } = useGetOneTeamTileCluster({
    zodiacId: 1,
  })

  const handleCenterChange = useCallback(
    async (center: Coordinates) => {
      // 좌표가 없으면 종료
      if (center.lat === undefined || center.lng === undefined) {
        return
      }

      // Todo: 변경 사항이 없으면 종료

      console.log(tileMapRef.current?.getZoom())
      // zoom 16 이하일때는 클러스터링
      if (tileMapRef.current && tileMapRef.current?.getZoom() < 16) {
        handleZoomChange(tileMapRef.current?.getZoom(), center)
        return
      }

      // zoom 17 이상일 때만 타일 지도 조회
      const sw = {
        lat: tileMapRef.current?.getBounds().getMin().y,
        lng: tileMapRef.current?.getBounds().getMin().x,
      } as Coordinates
      const ne = {
        lat: tileMapRef.current?.getBounds().getMax().y,
        lng: tileMapRef.current?.getBounds().getMax().x,
      } as Coordinates

      if (
        sw.lat === undefined ||
        sw.lng === undefined ||
        ne.lat === undefined ||
        ne.lng === undefined
      ) {
        return
      }

      handleTileChange({ sw, ne })
    },
    [selectedOption, getPersonalTileMap, getAllTiles, getTeamTileMapCluster],
  )

  const handleTileChange = useCallback(
    async ({ sw, ne }: { sw: Coordinates; ne: Coordinates }) => {
      setCluster([]) // 클러스터링 안할 때 클러스터 초기화

      const { lat: swLat, lng: swLng } = sw
      const { lat: neLat, lng: neLng } = ne

      let res

      switch (selectedOption) {
        case TileViewOption.MY:
          // 개인 타일 지도 조회
          console.log("개인 타일 지도 조회")
          res = await getPersonalTile()
          break
        // 전체 타일 지도 조회
        case TileViewOption.ALL:
        case TileViewOption.UNCLAIMED:
          console.log("전체 타일 지도 조회")
          res = await getAllTiles({
            swLat,
            swLng,
            neLat,
            neLng,
          })
          break
        //
        case TileViewOption.TEAM:
          console.log("우리 팀 타일 지도 조회")
          res = await getTeamTile({
            swLat,
            swLng,
            neLat,
            neLng,
          })
          break
        default:
          console.log("기본 타일 지도 조회")
          res = await getPersonalTile()
      }

      console.log("res", res)
      setTiles(res?.tileGetResponseList ?? [])
    },
    [
      selectedOption,
      getPersonalTile,
      getAllTiles,
      getTeamTile,
      getTeamTileMapCluster,
      getOneTeamTileMapCluster,
    ],
  )

  const handleZoomChange = useCallback(
    async (zoom: number, center: Coordinates) => {
      if (zoom < 16) {
        setTiles([])

        let clusterRes

        switch (selectedOption) {
          case TileViewOption.MY:
            clusterRes = await getOneTeamTileMapCluster({
              lat: center.lat,
              lng: center.lng,
              zoomLevel: zoom,
            })
            break
          case TileViewOption.TEAM:
            clusterRes = await getTeamTileMapCluster({
              lat: center.lat,
              lng: center.lng,
              zoomLevel: zoom,
            })
            break
        }

        const clusterList = clusterRes?.tileClusterGetResponseList ?? []

        setCluster(clusterList)
      }
    },
    [],
  )

  return (
    <TilesMap
      tileMapRef={tileMapRef}
      zoom={16}
      onCenterChange={handleCenterChange}
    />
  )
}
export default TilesMapContainer
