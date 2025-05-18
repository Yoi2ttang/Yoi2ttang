import { TileViewOption } from "@/types/map/tile"
import { motion } from "framer-motion"
import TileViewOptionItem from "./TileViewOptionItem"

interface TilesViewOptionContainerProps {
  onOptionClick: (id: TileViewOption) => void
  selectedOption: TileViewOption | null
  metaData: {
    id: TileViewOption
    name: string
    style: string
    position: string
    icon: React.ReactNode
  }[]
}

const TilesViewOptionContainer = ({
  onOptionClick,
  selectedOption,
  metaData,
}: TilesViewOptionContainerProps) => {
  return (
    <motion.div className="w-full">
      <div className="flex items-center justify-around gap-2 px-2">
        {metaData.map((item) => (
          <TileViewOptionItem
            key={item.id}
            item={item}
            onClick={() => onOptionClick(item.id)}
            isSelected={selectedOption === item.id}
          />
        ))}
      </div>
    </motion.div>
  )
}
export default TilesViewOptionContainer
