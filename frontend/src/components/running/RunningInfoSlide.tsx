"use client"

import { useEffect, useState, Dispatch, SetStateAction } from "react"
import clsx from "clsx"
import RunningStats from "./RunningStats"
import RunningActions from "./RunningActions"
import RunningPaceLogger from "./RunningPaceLogger"
import { useRunningStatsContext } from "@/hooks/running/useRunningStatsContext"

interface RunningInfoSlideProps {
  onClose: () => void
  isPaused: boolean
  setIsPaused: Dispatch<SetStateAction<boolean>>
}

const RunningInfoSlide = ({
  onClose,
  isPaused,
  setIsPaused,
}: RunningInfoSlideProps) => {
  const {
    runningTime,
    distance,
    calories,
    speed,
    averagePace,
    paceHistory,
    saveCurrentPace,
  } = useRunningStatsContext()

  const [visible, setVisible] = useState(false)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [touchEndX, setTouchEndX] = useState<number | null>(null)

  useEffect(() => {
    const timer1 = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(timer1)
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => onClose(), 300)
  }

  // 스와이프 감지
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.changedTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.changedTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (
      touchStartX !== null &&
      touchEndX !== null &&
      touchEndX - touchStartX > 100 // → 방향 스와이프
    ) {
      handleClose()
    }
    setTouchStartX(null)
    setTouchEndX(null)
  }

  const stopTouchPropagation = (e: React.TouchEvent) => {
    e.stopPropagation()
  }

  return (
    <div
      className="absolute inset-0 z-[9999] overflow-hidden"
      onTouchStart={(e) => {
        stopTouchPropagation(e)
        handleTouchStart(e)
      }}
      onTouchMove={(e) => {
        stopTouchPropagation(e)
        handleTouchMove(e)
      }}
      onTouchEnd={(e) => {
        stopTouchPropagation(e)
        handleTouchEnd()
      }}>
      <div
        className={clsx(
          "absolute top-0 right-0 flex h-full w-full flex-col gap-6 bg-white px-4 py-8 text-3xl transition-transform duration-300 ease-in-out",
          visible ? "translate-x-0" : "translate-x-full",
        )}>
        <div className="text-2xl font-semibold">러닝 기록</div>
        <RunningStats
          runningTime={runningTime}
          distance={distance}
          calories={calories}
          speed={speed}
          averagePace={averagePace}
        />
        <RunningPaceLogger
          paceHistory={paceHistory}
          saveCurrentPace={saveCurrentPace}
        />
        <RunningActions isPaused={isPaused} setIsPaused={setIsPaused} />
      </div>
    </div>
  )
}

export default RunningInfoSlide
