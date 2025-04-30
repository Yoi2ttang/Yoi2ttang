import { AnimalType, AnimalBadgeSize } from "@/types/animal"
import {
  animalIconMap,
  animalTeamNameMap,
  sizeClassMap,
} from "@/constants/animalBadge"

export interface AnimalBadgeProps {
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

  if (!Icon) return null

  return (
    <div
      className={`flex items-center rounded-full py-0.5 bg-${animal} ${container} ${px} ${className}`}>
      <Icon className={icon} />
      <div
        className={`flex-1 text-center font-medium ${text} ${
          animal === "sheep" ? "text-black" : "text-white"
        }`}>
        {teamName}
      </div>
    </div>
  )
}

export default AnimalBadge
