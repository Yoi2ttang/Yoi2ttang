import { ComponentProps, FC } from "react"

export interface TeamRanking {
  rank: number
  zodiacId: number
  tileCount: number
}

export interface TeamRankingInfo extends TeamRanking {
  teamName: string
  TeamIconComponent: FC<ComponentProps<"svg">>
}

export interface ContributionUserInfo {
  rank: number
  memberId: number
  nickname: string
  profileImageUrl: string
  tileCount: number
}

export interface PageToken {
  lastMemberId: number
  lastCount: number
}

export interface ZodiacContributionRankingResponse {
  pageInfoArgs: {
    pageToken: PageToken
    data: ContributionUserInfo[]
    hasNext: boolean
  }
}

export interface TeamRankingResponse {
  tileTeamSituationResponseList: TeamRanking[]
}

export interface MyTeamInfoResponse {
  nickname: string
  zodiacId: number
  ranking: number
  zodiacName: string
  tileCount: number
}
