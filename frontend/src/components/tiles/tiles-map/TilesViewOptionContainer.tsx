import PeopleIcon from "@/assets/icons/navigation-bar/people-icon.svg"
import PersonIcon from "@/assets/icons/navigation-bar/person-icon.svg"
import { TileViewOption } from "@/types/map/tile"
import { motion } from "framer-motion"
import TileViewOptionItem from "./TileViewOptionItem"

interface TilesViewOptionContainerProps {
  onOptionClick: (id: TileViewOption) => void
  selectedOption: TileViewOption | null
  tileMapType: "my" | "team"
}

const metaData = [
  {
    id: TileViewOption.MY,
    name: "나의 타일",
    style: "bg-yoi-200",
    position: "translate-y-0",
    icon: <PersonIcon />,
  },
  {
    id: TileViewOption.TEAM,
    name: "우리 팀 타일",
    style: "bg-yoi-300",
    position: "-translate-y-0",
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

const TilesViewOptionContainer = ({
  onOptionClick,
  selectedOption,
  tileMapType,
}: TilesViewOptionContainerProps) => {
  const OptionList = metaData.filter(({ id }) => {
    if (tileMapType === "my") {
      return id !== TileViewOption.TEAM
    } else if (tileMapType === "team") {
      return id !== TileViewOption.MY
    } else {
      return true
    }
  })

  return (
    <motion.div className="w-full">
      <div className="flex items-center justify-around gap-2 px-2">
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
