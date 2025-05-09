import PreRunningRankingInfo from "./PreRunningRankingInfo"
import PreRunningTileInfo from "./PreRunningTileInfo"

const PreRunningInfo = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="text-title-md">점령 현황</div>
        <div className="text-caption text-neutral-400">12:00 기준</div>
      </div>
      <PreRunningTileInfo />
      <PreRunningRankingInfo />
    </div>
  )
}

export default PreRunningInfo
