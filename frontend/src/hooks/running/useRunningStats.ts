import { useEffect, useRef, useState } from "react"
import { calculateCalories } from "@/lib/running/calory"

interface Coordinates {
  lat: number
  lng: number
}

const getDistance = (loc1: Coordinates, loc2: Coordinates) => {
  const toRad = (value: number) => (value * Math.PI) / 180
  const R = 6371e3
  const dLat = toRad(loc2.lat - loc1.lat)
  const dLng = toRad(loc2.lng - loc1.lng)

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(loc1.lat)) *
      Math.cos(toRad(loc2.lat)) *
      Math.sin(dLng / 2) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export const useRunningStats = (weightKg = 50) => {
  const locRef = useRef<Coordinates>({ lat: 37.5665, lng: 126.978 })
  const prevLoc = useRef<Coordinates | null>(null)

  const [currentLoc, setCurrentLoc] = useState<Coordinates>(locRef.current)
  const [distance, setDistance] = useState(0)
  const [calories, setCalories] = useState(0)
  const [runningTime, setRunningTime] = useState(0)
  const [speed, setSpeed] = useState(0)

  const distanceRef = useRef(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const id = setInterval(() => {
      setRunningTime((prev) => prev + 1)

      const nextLoc = {
        lat: locRef.current.lat + 0.000027, // 약 3m
        lng: locRef.current.lng,
      }

      if (prevLoc.current) {
        const d = getDistance(prevLoc.current, nextLoc)
        distanceRef.current += d
        setDistance(distanceRef.current)

        const distanceInKm = distanceRef.current / 1000
        const timeInHours = timeRef.current / 3600

        setSpeed(distanceInKm / timeInHours)
        setCalories(calculateCalories(distanceInKm, timeRef.current, weightKg))
      }

      prevLoc.current = nextLoc
      locRef.current = nextLoc
      setCurrentLoc(nextLoc)
      timeRef.current += 1
    }, 1000)

    return () => clearInterval(id)
  }, [weightKg])

  return { runningTime, distance, calories, speed, currentLoc }
}
