import { useEffect, useState } from "react"
import clsx from "clsx"
import RunningStats from "./RunningStats"
import RunningStatsMap from "./RunningStatsMap"
import RunningActions from "./RunningActions"
import { Coordinates } from "@/types/map/navermaps"
import { ArrowRight } from "lucide-react"

interface RunningInfoSlideProps {
  onClose: () => void
  runningTime: number
  distance: number
  calories: number
  speed: number
}

const RunningInfoSlide = ({
  onClose,
  runningTime,
  distance,
  calories,
  speed,
}: RunningInfoSlideProps) => {
  const [loc, setLoc] = useState<Coordinates>()
  const [visible, setVisible] = useState(false)
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLoc({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    })

    const timer1 = setTimeout(() => setVisible(true), 10)
    const timer2 = setTimeout(() => setShowMap(true), 300)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => onClose(), 300)
  }

  return (
    <div className="absolute inset-0 z-[9999] overflow-hidden">
      <div
        className={clsx(
          "bg-opacity-60 absolute top-0 right-0 flex h-full w-full flex-col gap-5 bg-white px-4 py-8 text-3xl transition-transform duration-300 ease-in-out",
          visible ? "translate-x-0" : "translate-x-full",
        )}>
        <div className="text-2xl font-semibold">러닝 기록</div>
        <RunningStats
          runningTime={runningTime}
          distance={distance}
          calories={calories}
          speed={speed}
        />
        <div className="text-title-sm text-neutral-500">평균 페이스</div>
        <div className="flex flex-1 rounded-xl bg-neutral-200"></div>
        <RunningActions />
      </div>
      <button
        onClick={handleClose}
        className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition active:scale-95">
        <span className="text-2xl font-bold">
          <ArrowRight />
        </span>
      </button>
    </div>
  )
}

export default RunningInfoSlide
