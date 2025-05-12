import type { FC, SVGProps } from "react"

export type AnimalType =
  | "MOUSE"
  | "COW"
  | "TIGER"
  | "RABBIT"
  | "DRAGON"
  | "SNAKE"
  | "HORSE"
  | "SHEEP"
  | "MONKEY"
  | "CHICKEN"
  | "DOG"
  | "PIG"

export type AnimalBadgeSize = "sm" | "md" | "lg"

export type AnimalIconMap = {
  [key in AnimalType]: FC<SVGProps<SVGSVGElement>>
}

export type AnimalTeamNameMap = {
  [key in AnimalType]: string
}
