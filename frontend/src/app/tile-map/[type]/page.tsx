"use client"

import PeopleIcon from "@/assets/icons/navigation-bar/people-icon.svg"
import MapHeader from "@/components/layouts/Header/MapHeader"
import CurrentOption from "@/components/tiles/tiles-map/CurrentOption"
import TilesViewOptionButton from "@/components/tiles/tiles-map/TilesViewOptionButton"
import TilesViewOptionContainer from "@/components/tiles/tiles-map/TilesViewOptionContainer"
import TilesMapContainer from "@/components/tiles/TilesMapCotainer"
import { TileViewOption } from "@/types/map/tile"
import { use, useState } from "react"

interface TileMapPageProps {
  params: Promise<{
    type: "my" | "team"
  }>
}

const metaData = [
  {
    id: TileViewOption.MY,
    name: "나의 타일",
    style: "bg-yoi-200",
    position: "translate-y-0",
    icon: <PeopleIcon />,
  },
  {
    id: TileViewOption.ALL,
    name: "전체 점령 타일",
    style: "bg-yoi-300",
    position: "-translate-y-10",
    icon: <PeopleIcon />,
  },
  {
    id: TileViewOption.UNCLAIMED,
    name: "미점령 타일",
    style: "bg-yoi-400",
    position: "translate-y-0",
    icon: <PeopleIcon />,
  },
]

const TileMapPage = ({ params }: TileMapPageProps) => {
  const { type } = use(params)
  const isMyTileMap = type === "my"

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
    setOpen(false)
  }

  return (
    <div className="relative flex h-dvh w-full flex-col gap-4">
      <MapHeader showBackButton title="전체 타일 지도" />
      <TilesMapContainer selectedOption={selectedOption} />
      <div className="absolute bottom-10 z-101 flex w-full items-center justify-center gap-2">
        <section className="flex w-full flex-col items-center justify-center gap-2">
          {open && (
            <TilesViewOptionContainer
              metaData={metaData}
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
