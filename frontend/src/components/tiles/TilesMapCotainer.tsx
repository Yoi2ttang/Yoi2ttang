"use client"

import useGetAllTiles from "@/hooks/tile/useGetAllTiles"
import useGetTeamTile from "@/hooks/tile/useGetTeamTile"
import useGetTeamTileCluster from "@/hooks/tile/useGetTeamTileCluster"
import { TileMapResponse } from "@/types/dashboard/dashboard.type"
import { Coordinates } from "@/types/map/navermaps"
import { Tile, TileViewOption } from "@/types/map/tile"
import { useEffect, useRef, useState } from "react"
import TilesMap from "./TilesMap"

interface TilesMapContainerProps {
  selectedOption: TileViewOption | null
}

const mockTeamTileMap: TileMapResponse = {
  tileGetResponseList: [
    {
      geoHash: "mock1",
      zordiacId: 1,
      sw: { lat: 37.509, lng: 127.0212 },
      ne: { lat: 37.5095, lng: 127.0217 },
    },
    {
      geoHash: "mock2",
      zordiacId: 2,
      sw: { lat: 37.5095, lng: 127.0217 },
      ne: { lat: 37.51, lng: 127.0222 },
    },
    {
      geoHash: "mock3",
      zordiacId: 3,
      sw: { lat: 37.509, lng: 127.0222 },
      ne: { lat: 37.5095, lng: 127.0227 },
    },
    {
      geoHash: "mock4",
      zordiacId: 4,
      sw: { lat: 37.5085, lng: 127.0212 },
      ne: { lat: 37.509, lng: 127.0217 },
    },
  ],
}

const testData = mockTeamTileMap.tileGetResponseList

const TilesMapContainer = ({ selectedOption }: TilesMapContainerProps) => {
  const [loc, setLoc] = useState<Coordinates>()
  const [tiles, setTiles] = useState<Tile[]>(testData)
  const tileMapRef = useRef<HTMLDivElement>(null)

  const { mutateAsync: getPersonalTileMap } = useGetTeamTile() // 개인 타일 지도 조회
  const { mutateAsync: getAllTiles } = useGetAllTiles() // 전체 타일 지도 조회
  const { mutateAsync: getTeamTileMapCluster } = useGetTeamTileCluster() // 전체 점령 지도 클러스터 조회

  const getTileData = async (center: Coordinates) => {
    switch (selectedOption) {
      case TileViewOption.MY:
        // 우리 팀 타일 지도 조회
        return await getPersonalTileMap({
          zodiacId: 1,
          lat: center.lat,
          lng: center.lng,
        })
      // 전체 타일 지도 조회
      case TileViewOption.ALL || TileViewOption.UNCLAIMED:
        return await getAllTiles({
          lat: center.lat,
          lng: center.lng,
        })
      //
      case TileViewOption.TEAM:
        break
      default:
        return await getPersonalTileMap({
          zodiacId: 1,
          lat: center.lat,
          lng: center.lng,
        })
    }
  }

  const handleCenterChange = async (center: Coordinates) => {
    const res = await getTileData(center)

    console.log(res)
    setTiles([...testData, ...(res?.tileGetResponseList ?? [])])
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLoc({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })
  }, [])

  return (
    loc && (
      <TilesMap
        tileMapRef={tileMapRef as React.RefObject<HTMLDivElement>}
        loc={loc}
        zoom={17}
        tiles={tiles}
        onCenterChange={handleCenterChange}
      />
    )
  )
}
export default TilesMapContainer
