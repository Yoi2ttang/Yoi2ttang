"use client"

import MapHeader from "@/components/layouts/Header/MapHeader"
import DetailDescription from "@/components/tiles/tiles-map/DetailDescription"
import TileViewSelector from "@/components/tiles/tiles-map/TileViewSelector"
import TilesMapContainer from "@/components/tiles/TilesMapContainer"
import { getPayload } from "@/lib/auth/util"
import useTileMapStore from "@/stores/useTileMapStore"
import { Payload } from "@/types/auth/auth.type"
import { useEffect, useState } from "react"

interface TileMapPageProps {}

const TileMapPage = ({}: TileMapPageProps) => {
  const [myZodiacId, setMyZodiacId] = useState<number>(0)
  const [memberId, setMemberId] = useState<string>("")

  const currentTileZodiacId = useTileMapStore.getState().currentTileZodiacId

  console.log("currentTileZodiacId", currentTileZodiacId)

  useEffect(() => {
    const { zodiacId, sub } = getPayload() as Payload
    setMyZodiacId(+zodiacId)
    setMemberId(sub)
  }, [])

  return (
    <div className="relative flex h-dvh w-full flex-col gap-4">
      <MapHeader showBackButton title="타일 지도" />
      <DetailDescription />
      <TilesMapContainer myZodiacId={myZodiacId} memberId={memberId} />
      <TileViewSelector />
    </div>
  )
}
export default TileMapPage
