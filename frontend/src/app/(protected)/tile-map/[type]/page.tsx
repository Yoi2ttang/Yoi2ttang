"use client"

import MapHeader from "@/components/layouts/Header/MapHeader"
import CurrentOption from "@/components/tiles/tiles-map/CurrentOption"
import TilesViewOptionButton from "@/components/tiles/tiles-map/TilesViewOptionButton"
import TilesViewOptionContainer from "@/components/tiles/tiles-map/TilesViewOptionContainer"
import TilesMapContainer from "@/components/tiles/TilesMapContainer"
import { getPayload } from "@/lib/auth/util"
import useTileMapStore from "@/stores/useTileMapStore"
import { Payload } from "@/types/auth/auth.type"
import { TileViewOption } from "@/types/map/tile"
import { use, useEffect, useMemo, useState } from "react"

interface TileMapPageProps {
  params: Promise<{
    type: "my" | "team"
  }>
}

const TileMapPage = ({ params }: TileMapPageProps) => {
  const setCluster = useTileMapStore.getState().setCluster
  const setTiles = useTileMapStore.getState().setTiles

  const { type } = use(params)

  const [open, setOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<TileViewOption | null>(
    null,
  )
  const [myZodiacId, setMyZodiacId] = useState<number>(0)
  const [memberId, setMemberId] = useState<string>("")

  useEffect(() => {
    const { zodiacId, sub } = getPayload() as Payload
    setMyZodiacId(+zodiacId)
    setMemberId(sub)
  }, [])

  const handleOptionClick = (id: TileViewOption) => {
    setSelectedOption(id)
    setOpen(false)
  }

  const handleResetOption = () => {
    setSelectedOption(null)
    setTiles([])
    setCluster([])
    setOpen(false)
  }

  const headerTitle = useMemo(() => {
    if (type === "my") {
      return "내 타일 지도"
    }
    return "팀 타일 지도"
  }, [type])

  return (
    <div className="relative flex h-dvh w-full flex-col gap-4">
      <MapHeader showBackButton title={headerTitle} />
      <TilesMapContainer
        myZodiacId={myZodiacId}
        memberId={memberId}
        tileMapType={type}
        selectedOption={selectedOption}
      />
      <div className="absolute bottom-10 z-101 flex w-full items-center justify-center gap-2">
        <section className="flex w-full flex-col items-center justify-center gap-2">
          {open && (
            <TilesViewOptionContainer
              tileMapType={type}
              selectedOption={selectedOption}
              onOptionClick={handleOptionClick}
            />
          )}
          <div className="border-yoi-400 flex items-center justify-center gap-2">
            {selectedOption && !open && (
              <CurrentOption
                selectedOption={selectedOption}
                onClose={handleResetOption}
              />
            )}
            <TilesViewOptionButton
              isOpen={open}
              onClick={() => setOpen(!open)}
            />
          </div>
        </section>
      </div>
      {open && (
        <div className="absolute right-0 bottom-0 left-0 z-100 h-dvh w-full bg-black/40"></div>
      )}
    </div>
  )
}
export default TileMapPage
