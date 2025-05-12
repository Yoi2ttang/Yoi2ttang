import {
  animalIconMap,
  animalTeamNameMap,
  backgroundClassMap,
  sizeClassMap,
} from "@/constants/animals"
import { cn } from "@/lib/utils"
import { AnimalBadgeSize, AnimalType } from "@/types/animal"
import Badge from "../common/Badge"

interface AnimalBadgeProps {
  className?: string
  animal: AnimalType
  size?: AnimalBadgeSize
}

const AnimalBadge = ({
  className = "",
  animal,
  size = "sm",
}: AnimalBadgeProps) => {
  const Icon = animalIconMap[animal]
  const teamName = animalTeamNameMap[animal]
  const { iconSize, text, padding } = sizeClassMap[size]
  const bgClass = backgroundClassMap[animal]

  if (!Icon) return null

  return (
    <Badge className={`${padding} ${bgClass} ${className} ${text}`}>
      <Icon className={iconSize} />
      <div
        className={cn(
          "flex-1 text-center",
          "font-semibold",
          animal === "sheep" ? "text-black" : "text-white",
        )}>
        {teamName}
      </div>
    </Badge>
  )
}

export default AnimalBadge
