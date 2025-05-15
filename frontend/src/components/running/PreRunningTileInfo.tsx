"use client"
import { TeamSituationResponse } from "@/types/running/running.type"

interface PreRunningTileInfoProps {
  data?: TeamSituationResponse
}

const PreRunningTileInfo = ({ data }: PreRunningTileInfoProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="size-3 rotate-12 bg-[#56ff89]"></div>
        <div>1등 팀 타일 수: </div>
        <div>{data?.No1Team?.tileCount}</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-yoi-500 size-3 rotate-12"></div>
        <div>우리 팀 타일 수: </div>
        <div>{data?.myTeam?.tileCount}</div>
      </div>
      <div className="flex items-center gap-3">
        <div className="size-3 rotate-12 bg-neutral-400"></div>
        <div>1등과의 차이: </div>
        <div>{data?.rankGap}</div>
      </div>
    </div>
  )
}

export default PreRunningTileInfo
