import useTileMapStore from "@/stores/useTileMapStore"
import { TileViewOption } from "@/types/map/tile"
import { useState } from "react"
import CurrentOption from "./CurrentOption"
import TilesViewOptionButton from "./TilesViewOptionButton"
import TilesViewOptionContainer from "./TilesViewOptionContainer"

interface TileViewSelectorProps {}

const TileViewSelector = ({}: TileViewSelectorProps) => {
  const [open, setOpen] = useState(false)

  const setCluster = useTileMapStore.getState().setCluster
  const setTiles = useTileMapStore.getState().setTiles
  const setSelectedOption = useTileMapStore.getState().setSelectedOption
  const selectedOption = useTileMapStore.getState().selectedOption

  const handleOptionClick = (id: TileViewOption) => {
    setTiles([])
    setCluster([])
    setSelectedOption(id)
    setOpen(false)
  }

  const handleResetOption = () => {
    setSelectedOption(TileViewOption.MY)
    setTiles([])
    setCluster([])
    setOpen(false)
  }

  return (
    <div className="absolute right-5 bottom-10 z-101 gap-2">
      <section className="flex w-full flex-col items-end justify-center gap-2">
        {open && (
          <TilesViewOptionContainer
            selectedOption={selectedOption}
            onOptionClick={handleOptionClick}
          />
        )}
        <div className="border-yoi-400 flex w-full items-center justify-end gap-2">
          {!open && (
            <CurrentOption
              selectedOption={selectedOption}
              onClose={handleResetOption}
            />
          )}
          <TilesViewOptionButton isOpen={open} onClick={() => setOpen(!open)} />
        </div>
      </section>
    </div>
  )
}
export default TileViewSelector
