import { TeamSituationResponse } from "@/types/running/running.type"

interface PreRunningRankingInfoProps {
  data?: TeamSituationResponse
}

const PreRunningRankingInfo = ({ data }: PreRunningRankingInfoProps) => {
  const rankGap = data?.rankGap ?? 0
  const isPositive = rankGap > 0
  const isNegative = rankGap < 0

  const formattedGap = isPositive
    ? `+${rankGap}`
    : isNegative
      ? `${rankGap}`
      : "0"

  const gapClassName = isPositive
    ? "text-blue-500"
    : isNegative
      ? "text-red-500"
      : "text-neutral-500"

  return (
    <div className="flex flex-col gap-2 rounded-lg border-2 border-neutral-300 p-2 text-center">
      <div className="text-md">
        <span>우리 팀이 </span>
        <span className="font-bold">{data?.myTeam?.rank}등</span>
        <span>을 달리고 있어요!</span>
      </div>
      <div>
        {data?.myTeam?.rank && data.myTeam.rank > 1 ? (
          <span>
            ({data.myTeam.rank - 1}등과의 차이{" "}
            <span className={gapClassName}>{formattedGap}</span>)
          </span>
        ) : (
          <span>1등 자리를 유지하세요!</span>
        )}
      </div>
    </div>
  )
}

export default PreRunningRankingInfo
