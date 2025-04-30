import { AnimalType, AnimalBadgeSize } from "@/types/animal"
import {
  animalIconMap,
  animalTeamNameMap,
  sizeClassMap,
  backgroundClassMap,
} from "@/constants/animalBadge"
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
  const { container, icon, text, px } = sizeClassMap[size]
  const bgClass = backgroundClassMap[animal]

  if (!Icon) return null

  return (
    <Badge className={`${container} ${px} ${bgClass} ${className}`}>
      <Icon className={icon} />
      <div
        className={`flex-1 text-center font-medium ${text} ${
          animal === "sheep" ? "text-black" : "text-white"
        }`}>
        {teamName}
      </div>
    </Badge>
  )
}

export default AnimalBadge
