import { animalMetaData, animalNumberMap } from "@/constants/animals"
import { cn } from "@/lib/utils"

interface ClusterMarkerProps {
  count: number
  zodiacId: number
}
const ClusterMarker = ({ count, zodiacId }: ClusterMarkerProps) => {
  const { bgColor, icon: AnimalIcon } =
    animalMetaData[animalNumberMap[zodiacId]]

  return (
    <div
      className={`shadow-yoi-200 relative size-12 rounded-full drop-shadow-md`}>
      <div className="drop-shadow-accent flex flex-col items-center justify-center gap-2">
        {AnimalIcon && <AnimalIcon className="size-12" />}
      </div>
      <span
        className={cn(
          bgColor,
          "absolute -top-4 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full px-2 text-center text-sm text-white",
        )}>
        {count}
      </span>
    </div>
  )
}
export default ClusterMarker
