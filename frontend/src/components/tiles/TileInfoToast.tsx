import { animalMetaData, animalNumberMap } from "@/constants/animals"

interface TileInfoToastProps {
  message?: string
  zodiacId: number
}

const TileInfoToast = ({ message, zodiacId }: TileInfoToastProps) => {
  const { icon: AnimalIcon, teamName } =
    animalMetaData[animalNumberMap[zodiacId.toString()]]
  return (
    <div className="animate-in fade-in fade-out slide-in-from-bottom-3 flex w-46 items-center gap-3 rounded-lg bg-black/80 px-3 py-2 text-sm text-white shadow-lg transition-all duration-300 ease-in">
      <AnimalIcon className="size-12" />
      <span className="text-sm">{teamName}&nbsp;팀 타일</span>
    </div>
  )
}
export default TileInfoToast
