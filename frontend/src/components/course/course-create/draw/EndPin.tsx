import { Coordinates } from "@/types/map/navermaps"
import { MouseEvent } from "react"

interface EndPinProps {
  id: number
  loc?: Coordinates
  onClick?: () => void
}

const EndPin = ({ id, loc, onClick }: EndPinProps) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    console.log("click", e)
  }

  return (
    <div
      id={`marker-${id}`}
      onClick={handleClick}
      className="flex -translate-3 items-center justify-center">
      <div className="border-yoi-400 size-6 rounded-full border-2 bg-white shadow-lg" />
    </div>
  )
}

export default EndPin
