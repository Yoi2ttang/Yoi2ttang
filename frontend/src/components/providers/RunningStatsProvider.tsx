"use client"

import { useState, useEffect, ReactNode } from "react"
import { useRunningStats } from "@/hooks/running/useRunningStats"
import { RunningStatsContext } from "@/hooks/running/useRunningStatsContext"
import { getPayload } from "@/lib/auth/util"
import { getProfile } from "@/services/member/api"
import useProfileForEdit from "@/hooks/profile/useProfileForEdit"

interface RunningStatsProviderProps {
  children: ReactNode
  isPaused: boolean
}

export const RunningStatsProvider = ({
  children,
  isPaused,
}: RunningStatsProviderProps) => {
  const { data } = useProfileForEdit()
  const stats = useRunningStats({ isPaused, weight: data?.weight })

  return (
    <RunningStatsContext.Provider value={stats}>
      {children}
    </RunningStatsContext.Provider>
  )
}
