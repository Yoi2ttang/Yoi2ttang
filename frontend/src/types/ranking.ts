import { ComponentProps, FC } from "react"

export interface TeamRankingInfo {
  rank: number
  teamId: number
  teamName: string
  totalTiles: number
  TeamIconComponent: FC<ComponentProps<"svg">>
}

export interface ContributionUserInfo {
  rank: number
  memberId: number
  nickname: string
  profileImageUrl: string
  tileCount: number
}
