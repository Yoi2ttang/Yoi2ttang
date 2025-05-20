import TileIcon from "@/assets/icons/common/tile-icon.svg"
import PeopleIcon from "@/assets/icons/navigation-bar/people-icon.svg"
import PersonIcon from "@/assets/icons/navigation-bar/person-icon.svg"
import { TileViewOption } from "@/types/map/tile"
import { motion } from "framer-motion"
import { BanIcon } from "lucide-react"
import TileViewOptionItem from "./TileViewOptionItem"

interface TilesViewOptionContainerProps {
  onOptionClick: (id: TileViewOption) => void
  selectedOption: TileViewOption | null
}

const metaData = [
  {
    id: TileViewOption.MY,
    name: "내 타일",
    style: "bg-yoi-400",
    position: "translate-y-0",
    icon: <PersonIcon />,
  },
  {
    id: TileViewOption.TEAM,
    name: "우리 팀 타일",
    style: "bg-yoi-400",
    position: "-translate-y-0",
    icon: <PeopleIcon />,
  },
  {
    id: TileViewOption.ALL,
    name: "전체 점령 타일",
    style: "bg-yoi-400",
    position: "-translate-y-0",
    icon: <TileIcon className="text-white" />,
  },
  {
    id: TileViewOption.UNCLAIMED,
    name: "미점령 타일",
    style: "bg-yoi-400",
    position: "translate-y-0",
    icon: <BanIcon />,
  },
]

const TilesViewOptionContainer = ({
  onOptionClick,
  selectedOption,
}: TilesViewOptionContainerProps) => {
  const OptionList = metaData.filter(({ id }) => {
    return true
  })

  return (
    <motion.div className="w-full">
      <div className="flex w-full flex-col items-end justify-around gap-2 px-2">
        {OptionList.map((item, idx) => (
          <TileViewOptionItem
            idx={idx}
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
