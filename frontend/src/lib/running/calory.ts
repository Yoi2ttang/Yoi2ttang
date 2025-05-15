const estimateMetsFromPace = (paceMinPerKm: number): number => {
  if (paceMinPerKm <= 4.5) return 12.8 // 매우 빠른 달리기
  if (paceMinPerKm <= 5.5) return 11.5 // 빠른 달리기
  if (paceMinPerKm <= 6.5) return 10.0 // 중간 속도
  return 8.3 // 가벼운 조깅
}

export const calculateCalories = (
  distanceKm: number,
  totalRunningTimeSeconds: number,
  weightKg: number,
): number => {
  if (distanceKm === 0 || totalRunningTimeSeconds === 0) return 0

  const runningTimeMinutes = totalRunningTimeSeconds / 60
  const paceMinPerKm = runningTimeMinutes / distanceKm

  const mets = estimateMetsFromPace(paceMinPerKm)

  const calories = (runningTimeMinutes * mets * 3.5 * weightKg) / 200
  return Math.round(calories)
}
