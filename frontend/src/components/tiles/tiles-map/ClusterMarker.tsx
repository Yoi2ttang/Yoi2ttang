import { animalIconMap, animalNumberMap } from "@/constants/animals"

interface ClusterMarkerProps {
  count: number
  zodiacId: number
}
const ClusterMarker = ({ count, zodiacId }: ClusterMarkerProps) => {
  const AnimalIcon = animalIconMap[animalNumberMap[zodiacId]]

  return (
    <div className="bg-yoi-200 shadow-yoi-200 relative size-12 rounded-full drop-shadow-md">
      <div className="flex flex-col items-center justify-center gap-2">
        {AnimalIcon && <AnimalIcon className="size-12" />}
      </div>
      <span className="bg-yoi-200 absolute -top-4 left-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 rounded-full text-center text-sm text-white">
        {count}
      </span>
    </div>
  )
}
export default ClusterMarker
