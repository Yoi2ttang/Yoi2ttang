import type { FC, SVGProps } from "react"

export type AnimalType =
  | "mouse"
  | "cow"
  | "tiger"
  | "rabbit"
  | "dragon"
  | "snake"
  | "horse"
  | "sheep"
  | "monkey"
  | "chicken"
  | "dog"
  | "pig"

export type AnimalBadgeSize = "sm" | "md" | "lg"

export type AnimalIconMap = {
  [key in AnimalType]: FC<SVGProps<SVGSVGElement>>
}

export type AnimalTeamNameMap = {
  [key in AnimalType]: string
}
