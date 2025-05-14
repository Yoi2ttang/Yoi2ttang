import { useEffect } from "react"
import useGetTeamSituation from "@/hooks/running/useGetTeamSituation"
import PreRunningRankingInfo from "./PreRunningRankingInfo"
import PreRunningTileInfo from "./PreRunningTileInfo"

const PreRunningInfo = () => {
  const { mutate: fetchTeamSituation, data } = useGetTeamSituation()

  useEffect(() => {
    fetchTeamSituation(2)
  }, [])

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
