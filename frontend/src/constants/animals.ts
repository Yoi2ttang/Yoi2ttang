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
  id: string
  en: AnimalType
  icon: FC<SVGProps<SVGSVGElement>>
  teamName: string
  bgColor: string
  textColor: string
  color: string
}

export const animalMetaData: Record<AnimalType, AnimalMetaDataType> = {
  MOUSE: {
    id: "1",
    en: "MOUSE",
    icon: Mouse,
    teamName: "쥐",
    color: "#bebebe",
    bgColor: "bg-mouse",
    textColor: "text-mouse",
  },
  COW: {
    id: "2",
    en: "COW",
    icon: Cow,
    teamName: "소",
    color: "#e2be8d",
    bgColor: "bg-cow",
    textColor: "text-cow",
  },
  TIGER: {
    id: "3",
    en: "TIGER",
    icon: Tiger,
    teamName: "호랑이",
    color: "#ffb950",
    bgColor: "bg-tiger",
    textColor: "text-tiger",
  },
  RABBIT: {
    id: "4",
    en: "RABBIT",
    icon: Rabbit,
    teamName: "토끼",
    color: "#ac2fd7",
    bgColor: "bg-rabbit",
    textColor: "text-rabbit",
  },
  DRAGON: {
    id: "5",
    en: "DRAGON",
    icon: Dragon,
    teamName: "용",
    color: "#88bfa7",
    bgColor: "bg-dragon",
    textColor: "text-dragon",
  },
  SNAKE: {
    id: "6",
    en: "SNAKE",
    icon: Snake,
    teamName: "뱀",
    color: "#4f93d2",
    bgColor: "bg-snake",
    textColor: "text-snake",
  },
  HORSE: {
    id: "7",
    en: "HORSE",
    icon: Horse,
    teamName: "말",
    color: "#ad6b23",
    bgColor: "bg-horse",
    textColor: "text-horse",
  },
  SHEEP: {
    id: "8",
    en: "SHEEP",
    icon: Sheep,
    teamName: "양",
    color: "#f2e7d6",
    bgColor: "bg-sheep",
    textColor: "text-sheep",
  },
  MONKEY: {
    id: "9",
    en: "MONKEY",
    icon: Monkey,
    teamName: "원숭이",
    color: "#f2cc4d",
    bgColor: "bg-monkey",
    textColor: "text-monkey",
  },
  CHICKEN: {
    id: "10",
    en: "CHICKEN",
    icon: Chicken,
    teamName: "닭",
    color: "#ef3a5d",
    bgColor: "bg-chicken",
    textColor: "text-chicken",
  },
  DOG: {
    id: "11",
    en: "DOG",
    icon: Dog,
    teamName: "개",
    color: "#9d9d9d",
    bgColor: "bg-dog",
    textColor: "text-dog",
  },
  PIG: {
    id: "12",
    en: "PIG",
    icon: Pig,
    teamName: "돼지",
    color: "#f5b8c3",
    bgColor: "bg-pig",
    textColor: "text-pig",
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

export const animalNumberMap: Record<string, AnimalType> = {
  [animalMetaData.MONKEY.id]: animalMetaData.MONKEY.en,
  [animalMetaData.CHICKEN.id]: animalMetaData.CHICKEN.en,
  [animalMetaData.DOG.id]: animalMetaData.DOG.en,
  [animalMetaData.PIG.id]: animalMetaData.PIG.en,
  [animalMetaData.MOUSE.id]: animalMetaData.MOUSE.en,
  [animalMetaData.COW.id]: animalMetaData.COW.en,
  [animalMetaData.TIGER.id]: animalMetaData.TIGER.en,
  [animalMetaData.RABBIT.id]: animalMetaData.RABBIT.en,
  [animalMetaData.DRAGON.id]: animalMetaData.DRAGON.en,
  [animalMetaData.SNAKE.id]: animalMetaData.SNAKE.en,
  [animalMetaData.HORSE.id]: animalMetaData.HORSE.en,
  [animalMetaData.SHEEP.id]: animalMetaData.SHEEP.en,
} as const

export const sizeClassMap: Record<
  AnimalBadgeSize,
  { iconSize: string; padding: string; text?: string }
> = {
  sm: {
    iconSize: "size-5",
    padding: "pl-1.5 pr-2.5 py-0.5",
    text: "text-caption",
  },
  md: {
    iconSize: "size-6",
    padding: "pl-1.5 pr-2.5 py-0.5",
  },
  lg: {
    iconSize: "size-8",
    padding: "pl-2 pr-3 py-0.5",
    text: "text-title-sm",
  },
} as const
