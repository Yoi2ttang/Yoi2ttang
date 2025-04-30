import {
  AnimalType,
  AnimalIconMap,
  AnimalTeamNameMap,
  AnimalBadgeSize,
} from "@/types/animal"

import Mouse from "@/assets/icons/animals/mouse-icon.svg"
import Cow from "@/assets/icons/animals/cow-icon.svg"
import Tiger from "@/assets/icons/animals/tiger-icon.svg"
import Rabbit from "@/assets/icons/animals/rabbit-icon.svg"
import Dragon from "@/assets/icons/animals/dragon-icon.svg"
import Snake from "@/assets/icons/animals/snake-icon.svg"
import Horse from "@/assets/icons/animals/horse-icon.svg"
import Sheep from "@/assets/icons/animals/sheep-icon.svg"
import Monkey from "@/assets/icons/animals/monkey-icon.svg"
import Chicken from "@/assets/icons/animals/chicken-icon.svg"
import Dog from "@/assets/icons/animals/dog-icon.svg"
import Pig from "@/assets/icons/animals/pig-icon.svg"

export const animalIconMap: AnimalIconMap = {
  mouse: Mouse,
  cow: Cow,
  tiger: Tiger,
  rabbit: Rabbit,
  dragon: Dragon,
  snake: Snake,
  horse: Horse,
  sheep: Sheep,
  monkey: Monkey,
  chicken: Chicken,
  dog: Dog,
  pig: Pig,
}

export const animalTeamNameMap: AnimalTeamNameMap = {
  mouse: "쥐 팀",
  cow: "소 팀",
  tiger: "호랑이 팀",
  rabbit: "토끼 팀",
  dragon: "용 팀",
  snake: "뱀 팀",
  horse: "말 팀",
  sheep: "양 팀",
  monkey: "원숭이 팀",
  chicken: "닭 팀",
  dog: "개 팀",
  pig: "돼지 팀",
}

export const backgroundClassMap: Record<AnimalType, string> = {
  mouse: "bg-mouse",
  cow: "bg-cow",
  tiger: "bg-tiger",
  rabbit: "bg-rabbit",
  dragon: "bg-dragon",
  snake: "bg-snake",
  horse: "bg-horse",
  sheep: "bg-sheep",
  monkey: "bg-monkey",
  chicken: "bg-chicken",
  dog: "bg-dog",
  pig: "bg-pig",
}

export const sizeClassMap: Record<
  AnimalBadgeSize,
  { container: string; icon: string; text: string; px: string }
> = {
  sm: {
    container: "h-6 w-20",
    icon: "w-5 h-5",
    text: "text-xs",
    px: "px-1",
  },
  md: {
    container: "h-7 w-24",
    icon: "w-6 h-6",
    text: "text-xs",
    px: "px-2",
  },
  lg: {
    container: "h-9 w-28",
    icon: "w-7 h-7",
    text: "text-sm",
    px: "px-2",
  },
}
