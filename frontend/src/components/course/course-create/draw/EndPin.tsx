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
      id={id.toString()}
      onClick={handleClick}
      className="flex -translate-4 items-center justify-center">
      <div className="bg-yoi-400 size-8 rounded-full border-4 border-white shadow-lg" />
    </div>
  )
}

export default EndPin
