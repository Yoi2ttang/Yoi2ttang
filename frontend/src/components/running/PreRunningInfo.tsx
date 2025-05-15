"use client"

import { useState, useEffect } from "react"
import useGetTeamSituation from "@/hooks/running/useGetTeamSituation"
import PreRunningRankingInfo from "./PreRunningRankingInfo"
import PreRunningTileInfo from "./PreRunningTileInfo"
import { getPayload } from "@/lib/auth/util"

const PreRunningInfo = () => {
  const [zodiacId, setZodiacId] = useState<number | null>(null)

  useEffect(() => {
    const payload = getPayload()
    if (payload?.zodiacId) {
      setZodiacId(Number(payload.zodiacId))
    }
  }, [])

  const { data, isLoading, isError } = useGetTeamSituation(zodiacId ?? 0)

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="text-title-md">점령 현황</div>
        <div className="text-caption text-neutral-400">12:00 기준</div>
      </div>
      <PreRunningTileInfo data={data} />
      <PreRunningRankingInfo data={data} />
    </div>
  )
}

export default PreRunningInfo
