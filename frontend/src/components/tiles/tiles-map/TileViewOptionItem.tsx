import { cn } from "@/lib/utils"
import { TileViewOption } from "@/types/map/tile"
import { motion } from "framer-motion"

interface TileViewOptionItemProps {
  onClick: () => void
  item: {
    id: TileViewOption
    name: string
    style: string
    icon: React.ReactNode
    position: string
  }
  isSelected: boolean
  idx: number
}

const TileViewOptionItem = ({
  onClick,
  item,
  isSelected,
  idx,
}: TileViewOptionItemProps) => {
  const { name, style, icon, position } = item
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.1,
        delay: 0.1 * idx,
        type: "spring",
        stiffness: 180,
      }}
      className={cn(
        "flex w-full cursor-pointer items-center justify-start gap-2 rounded-2xl border border-white/30 bg-white/60 px-2 py-3 shadow-lg backdrop-blur-md transition-all",
        position,
        isSelected && "ring-yoi-400 ring-2",
      )}>
      <div
        className={cn(
          "flex size-10 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-blue-400/80 to-purple-400/80 text-white",
          style,
        )}>
        {icon}
      </div>
      <p className="text-sm font-semibold tracking-tight text-gray-800 drop-shadow-sm">
        {name}
      </p>
    </motion.div>
  )
}
export default TileViewOptionItem
