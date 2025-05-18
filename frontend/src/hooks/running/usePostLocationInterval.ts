import { useEffect } from "react"
import { usePostLocation } from "./usePostLocation"
import { Coordinates } from "@/types/map/navermaps"

interface UsePostLocationIntervalProps {
  runningId: number
  getCurrentLocation: () => Coordinates
  getBeforeLocation: () => Coordinates
  isPaused?: boolean
}

export const usePostLocationInterval = ({
  runningId,
  getCurrentLocation,
  getBeforeLocation,
  isPaused = false,
}: UsePostLocationIntervalProps) => {
  const { mutate } = usePostLocation()

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      const now = getCurrentLocation()
      const before = getBeforeLocation()

      mutate({
        runningId,
        beforePoint: before,
        nowPoint: now,
        currentTime: new Date().toISOString(),
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [runningId, isPaused, mutate, getCurrentLocation, getBeforeLocation])
}
