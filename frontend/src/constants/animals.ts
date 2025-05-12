import {
  AnimalBadgeSize,
  AnimalIconMap,
  AnimalTeamNameMap,
  AnimalType,
} from "@/types/animal"

import Chicken from "@/assets/icons/animals/chicken-icon.svg"
import Cow from "@/assets/icons/animals/cow-icon.svg"
import Dog from "@/assets/icons/animals/dog-icon.svg"
import Dragon from "@/assets/icons/animals/dragon-icon.svg"
import Horse from "@/assets/icons/animals/horse-icon.svg"
import Monkey from "@/assets/icons/animals/monkey-icon.svg"
import Mouse from "@/assets/icons/animals/mouse-icon.svg"
import Pig from "@/assets/icons/animals/pig-icon.svg"
import Rabbit from "@/assets/icons/animals/rabbit-icon.svg"
import Sheep from "@/assets/icons/animals/sheep-icon.svg"
import Snake from "@/assets/icons/animals/snake-icon.svg"
import Tiger from "@/assets/icons/animals/tiger-icon.svg"
import { FC, SVGProps } from "react"

interface AnimalMetaDataType {
  id: number
  en: AnimalType
  icon: FC<SVGProps<SVGSVGElement>>
  teamName: string
  bgColor: string
  textColor: string
}

const animalMetaData: Record<AnimalType, AnimalMetaDataType> = {
  MONKEY: {
    id: 0,
    en: "MONKEY",
    icon: Monkey,
    teamName: "원숭이",
    bgColor: "bg-monkey",
    textColor: "text-monkey",
  },
  CHICKEN: {
    id: 1,
    en: "CHICKEN",
    icon: Chicken,
    teamName: "닭",
    bgColor: "bg-chicken",
    textColor: "text-chicken",
  },
  DOG: {
    id: 2,
    en: "DOG",
    icon: Dog,
    teamName: "개",
    bgColor: "bg-dog",
    textColor: "text-dog",
  },
  PIG: {
    id: 3,
    en: "PIG",
    icon: Pig,
    teamName: "돼지",
    bgColor: "bg-pig",
    textColor: "text-pig",
  },
  MOUSE: {
    id: 4,
    en: "MOUSE",
    icon: Mouse,
    teamName: "쥐",
    bgColor: "bg-mouse",
    textColor: "text-mouse",
  },
  COW: {
    id: 5,
    en: "COW",
    icon: Cow,
    teamName: "소",
    bgColor: "bg-cow",
    textColor: "text-cow",
  },
  TIGER: {
    id: 6,
    en: "TIGER",
    icon: Tiger,
    teamName: "호랑이",
    bgColor: "bg-tiger",
    textColor: "text-tiger",
  },
  RABBIT: {
    id: 7,
    en: "RABBIT",
    icon: Rabbit,
    teamName: "토끼",
    bgColor: "bg-rabbit",
    textColor: "text-rabbit",
  },
  DRAGON: {
    id: 8,
    en: "DRAGON",
    icon: Dragon,
    teamName: "용",
    bgColor: "bg-dragon",
    textColor: "text-dragon",
  },
  SNAKE: {
    id: 9,
    en: "SNAKE",
    icon: Snake,
    teamName: "뱀",
    bgColor: "bg-snake",
    textColor: "text-snake",
  },
  HORSE: {
    id: 10,
    en: "HORSE",
    icon: Horse,
    teamName: "말",
    bgColor: "bg-horse",
    textColor: "text-horse",
  },
  SHEEP: {
    id: 11,
    en: "SHEEP",
    icon: Sheep,
    teamName: "양",
    bgColor: "bg-sheep",
    textColor: "text-sheep",
  },
}

export const animalIconMap: AnimalIconMap = {
  MOUSE: animalMetaData.MOUSE.icon,
  COW: animalMetaData.COW.icon,
  TIGER: animalMetaData.TIGER.icon,
  RABBIT: animalMetaData.RABBIT.icon,
  DRAGON: animalMetaData.DRAGON.icon,
  SNAKE: animalMetaData.SNAKE.icon,
  HORSE: animalMetaData.HORSE.icon,
  SHEEP: animalMetaData.SHEEP.icon,
  MONKEY: animalMetaData.MONKEY.icon,
  CHICKEN: animalMetaData.CHICKEN.icon,
  DOG: animalMetaData.DOG.icon,
  PIG: animalMetaData.PIG.icon,
} as const

export const animalTeamNameMap: AnimalTeamNameMap = {
  MOUSE: animalMetaData.MOUSE.teamName,
  COW: animalMetaData.COW.teamName,
  TIGER: animalMetaData.TIGER.teamName,
  RABBIT: animalMetaData.RABBIT.teamName,
  DRAGON: animalMetaData.DRAGON.teamName,
  SNAKE: animalMetaData.SNAKE.teamName,
  HORSE: animalMetaData.HORSE.teamName,
  SHEEP: animalMetaData.SHEEP.teamName,
  MONKEY: animalMetaData.MONKEY.teamName,
  CHICKEN: animalMetaData.CHICKEN.teamName,
  DOG: animalMetaData.DOG.teamName,
  PIG: animalMetaData.PIG.teamName,
} as const

export const backgroundClassMap: Record<AnimalType, string> = {
  MOUSE: animalMetaData.MOUSE.bgColor,
  COW: animalMetaData.COW.bgColor,
  TIGER: animalMetaData.TIGER.bgColor,
  RABBIT: animalMetaData.RABBIT.bgColor,
  DRAGON: animalMetaData.DRAGON.bgColor,
  SNAKE: animalMetaData.SNAKE.bgColor,
  HORSE: animalMetaData.HORSE.bgColor,
  SHEEP: animalMetaData.SHEEP.bgColor,
  MONKEY: animalMetaData.MONKEY.bgColor,
  CHICKEN: animalMetaData.CHICKEN.bgColor,
  DOG: animalMetaData.DOG.bgColor,
  PIG: animalMetaData.PIG.bgColor,
} as const

export const textClassMap: Record<AnimalType, string> = {
  MOUSE: animalMetaData.MOUSE.textColor,
  COW: animalMetaData.COW.textColor,
  TIGER: animalMetaData.TIGER.textColor,
  RABBIT: animalMetaData.RABBIT.textColor,
  DRAGON: animalMetaData.DRAGON.textColor,
  SNAKE: animalMetaData.SNAKE.textColor,
  HORSE: animalMetaData.HORSE.textColor,
  SHEEP: animalMetaData.SHEEP.textColor,
  MONKEY: animalMetaData.MONKEY.textColor,
  CHICKEN: animalMetaData.CHICKEN.textColor,
  DOG: animalMetaData.DOG.textColor,
  PIG: animalMetaData.PIG.textColor,
} as const

export const animalNumberMap: Record<number, AnimalType> = {
  0: animalMetaData.MONKEY.en,
  1: animalMetaData.CHICKEN.en,
  2: animalMetaData.DOG.en,
  3: animalMetaData.PIG.en,
  4: animalMetaData.MOUSE.en,
  5: animalMetaData.COW.en,
  6: animalMetaData.TIGER.en,
  7: animalMetaData.RABBIT.en,
  8: animalMetaData.DRAGON.en,
  9: animalMetaData.SNAKE.en,
  10: animalMetaData.HORSE.en,
  11: animalMetaData.SHEEP.en,
} as const

export const sizeClassMap: Record<
  AnimalBadgeSize,
  { container: string; icon: string; text: string; px: string }
> = {
  sm: {
    container: "h-7 w-20",
    icon: "w-5 h-5",
    text: "text-caption",
    px: "px-1",
  },
  md: {
    container: "h-8 w-24",
    icon: "w-6 h-6",
    text: "text-caption",
    px: "px-2",
  },
  lg: {
    container: "h-9 w-28",
    icon: "w-8 h-8",
    text: "text-title-xs",
    px: "px-2",
  },
} as const
