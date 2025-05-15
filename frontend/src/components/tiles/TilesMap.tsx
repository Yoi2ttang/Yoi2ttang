"use client"

import useGetTeamTile from "@/hooks/tile/useGetTeamTile"
import { TileMapResponse } from "@/types/dashboard/dashboard.type"
import { Coordinates } from "@/types/map/navermaps"
import { Tile } from "@/types/map/tile"
import { useEffect, useState } from "react"
import Map from "../common/Map"

interface TilesMapProps {}

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

const TilesMap = ({}: TilesMapProps) => {
  const [loc, setLoc] = useState<Coordinates>()
  const [tiles, setTiles] = useState<Tile[]>(testData)

  const { mutateAsync: getTeamTileMap } = useGetTeamTile()

  const handleCenterChange = async (center: Coordinates) => {
    const res = await getTeamTileMap(center)
    setTiles([...testData, ...res.tileGetResponseList])
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
      <Map
        loc={loc}
        zoom={17}
        tiles={tiles}
        onCenterChange={handleCenterChange}
      />
    )
  )
}
export default TilesMap
