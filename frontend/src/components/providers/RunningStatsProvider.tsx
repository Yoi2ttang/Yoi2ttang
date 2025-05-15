import { useRunningStats } from "@/hooks/running/useRunningStats"
import { RunningStatsContext } from "@/hooks/running/useRunningStatsContext"
import { ReactNode } from "react"

interface RunningStatsProviderProps {
  children: ReactNode
  isPaused: boolean
}

export const RunningStatsProvider = ({
  children,
  isPaused,
}: RunningStatsProviderProps) => {
  const stats = useRunningStats({ isPaused })

  return (
    <RunningStatsContext.Provider value={stats}>
      {children}
    </RunningStatsContext.Provider>
  )
}
