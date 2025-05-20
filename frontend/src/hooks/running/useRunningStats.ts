import { useEffect, useRef, useState } from "react"
import { calculateCalories } from "@/lib/running/calory"

interface Coordinates {
  lat: number
  lng: number
}

const getDistance = (loc1: Coordinates, loc2: Coordinates) => {
  const toRad = (value: number) => (value * Math.PI) / 180
  const R = 6371e3 // 지구 반지름 (단위: m)
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

interface useRunningStatsProps {
  isPaused?: boolean
  weight?: number
}

interface PaceRecord {
  fromTime: number
  toTime: number
  fromDistance: number
  toDistance: number
  pace: number // 초/km
}

export const useRunningStats = ({ isPaused, weight }: useRunningStatsProps) => {
  const locRef = useRef<Coordinates>({ lat: 0, lng: 0 })
  const prevLoc = useRef<Coordinates | null>(null)

  const [runningId, setRunningId] = useState<number | null>(null)

  const [currentLoc, setCurrentLoc] = useState<Coordinates>()
  const [distance, setDistance] = useState(0)
  const [calories, setCalories] = useState(0)
  const [runningTime, setRunningTime] = useState(0)
  const [speed, setSpeed] = useState(0)
  const [averagePace, setAveragePace] = useState(0)
  const [paceHistory, setPaceHistory] = useState<PaceRecord[]>([])

  const distanceRef = useRef(0)
  const timeRef = useRef(0)

  const moveSteps = [
    0.000027, 0.000027, 0.000027, 0.000027, 0.000027, 0.000018, 0.000018,
    0.000009, 0.000009, 0.000009, 0.000009, 0.000009,
  ]
  const stepIndexRef = useRef(0)

  // 최초 위치 설정
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const initLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
        locRef.current = initLoc
        prevLoc.current = initLoc
        setCurrentLoc(initLoc)
      },
      (error) => {
        console.error("현재 위치를 불러오는 데 실패했습니다:", error)
      },
      {
        enableHighAccuracy: true,
      },
    )
  }, [])

  // 1초마다 위치 갱신 및 거리/시간 누적
  useEffect(() => {
    const id = setInterval(() => {
      if (isPaused) return

      setRunningTime((prev) => prev + 1)

      const step = moveSteps[stepIndexRef.current]
      const nextLoc = {
        lat: locRef.current.lat + step,
        lng: locRef.current.lng,
      }

      stepIndexRef.current = (stepIndexRef.current + 1) % moveSteps.length

      if (prevLoc.current) {
        const d = getDistance(prevLoc.current, nextLoc)
        distanceRef.current += d
        setDistance(distanceRef.current)

        if (timeRef.current > 0) {
          const distanceInKm = distanceRef.current / 1000
          const timeInHours = timeRef.current / 3600
          setSpeed(distanceInKm / timeInHours)
          setAveragePace(timeRef.current / distanceInKm)
        }

        setCalories(
          calculateCalories(
            distanceRef.current / 1000,
            timeRef.current,
            weight ?? 50,
          ),
        )
      }

      prevLoc.current = nextLoc
      locRef.current = nextLoc
      setCurrentLoc(nextLoc)
      timeRef.current += 1
    }, 1000)

    return () => clearInterval(id)
  }, [isPaused, weight])

  // 사용자가 호출할 수 있는 구간 페이스 저장 함수
  const saveCurrentPace = () => {
    if (distanceRef.current === 0 || timeRef.current === 0) return

    const lastRecord = paceHistory.at(-1)
    const fromTime = lastRecord?.toTime ?? 0
    const fromDistance = lastRecord?.toDistance ?? 0
    const toTime = timeRef.current
    const toDistance = distanceRef.current

    const duration = toTime - fromTime
    const distanceDelta = (toDistance - fromDistance) / 1000 // km

    if (distanceDelta === 0) return

    const pace = duration / distanceDelta // 초/km

    setPaceHistory((prev) => [
      ...prev,
      {
        fromTime,
        toTime,
        fromDistance,
        toDistance,
        pace,
      },
    ])
  }

  return {
    runningId,
    setRunningId,
    runningTime,
    distance,
    calories,
    speed,
    averagePace,
    currentLoc,
    paceHistory,
    saveCurrentPace,
  }
}
