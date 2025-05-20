"use client"

import MapHeader from "@/components/layouts/Header/MapHeader"
import CurrentOption from "@/components/tiles/tiles-map/CurrentOption"
import TilesViewOptionButton from "@/components/tiles/tiles-map/TilesViewOptionButton"
import TilesViewOptionContainer from "@/components/tiles/tiles-map/TilesViewOptionContainer"
import TilesMapContainer from "@/components/tiles/TilesMapContainer"
import useTileMapStore from "@/stores/useTileMapStore"
import { TileViewOption } from "@/types/map/tile"
import { use, useMemo, useState } from "react"

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
      <TilesMapContainer tileMapType={type} selectedOption={selectedOption} />
      <div className="absolute bottom-10 z-101 flex w-full items-center justify-center gap-2">
        <section className="flex w-full flex-col items-center justify-center gap-2">
          {open && (
            <TilesViewOptionContainer
              tileMapType={type}
              selectedOption={selectedOption}
              onOptionClick={handleOptionClick}
            />
          )}
          {selectedOption && !open && (
            <CurrentOption
              selectedOption={selectedOption}
              onClose={handleResetOption}
            />
          )}
          <TilesViewOptionButton isOpen={open} onClick={() => setOpen(!open)} />
        </section>
      </div>
      {open && (
        <div className="absolute right-0 bottom-0 left-0 z-100 h-dvh w-full bg-black/40"></div>
      )}
    </div>
  )
}
export default TileMapPage
