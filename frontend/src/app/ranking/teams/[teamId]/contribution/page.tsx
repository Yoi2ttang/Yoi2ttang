import ContributeCard from "@/components/ranking/ContributeCard"
import { getZodiacContributionRanking } from "@/services/ranking/api"
import { ContributionUserInfo } from "@/types/ranking"
import { use } from "react"

interface TeamsContributionPageProps {
  params: Promise<{
    teamId: string
  }>
}

const TeamsContributionPage = ({ params }: TeamsContributionPageProps) => {
  const { teamId } = use(params)
  // TODO: teamId 기준 팀 기여도 데이터 가져오기
  const { data, isSuccess } = use(getZodiacContributionRanking(+teamId))

  const userContributionList = isSuccess
    ? data.pageInfoArgs.data.length > 0
      ? data.pageInfoArgs.data
      : mockData.pageInfoArgs.data
    : mockData.pageInfoArgs.data

  return (
    <div className="flex flex-col gap-4">
      {userContributionList.map((userInfo) => (
        <ContributeCard key={userInfo.memberId} userInfo={userInfo} />
      ))}
    </div>
  )
}

export default TeamsContributionPage

const mockData = {
  pageInfoArgs: {
    pageToken: {
      lastMemberId: 3,
      lastCount: 3,
    },
    data: [
      {
        rank: 1,
        memberId: 1,
        nickname: "dlskawo0409",
        profileImageUrl: "",
        tileCount: 5,
      },
      {
        rank: 2,
        memberId: 3,
        nickname: "즈우현호랑이",
        profileImageUrl: "",
        tileCount: 3,
      },
      {
        rank: 3,
        memberId: 4,
        nickname: "즈우현호랑이",
        profileImageUrl: "",
        tileCount: 3,
      },
      {
        rank: 4,
        memberId: 5,
        nickname: "즈우현호랑이",
        profileImageUrl: "",
        tileCount: 3,
      },
      {
        rank: 5,
        memberId: 6,
        nickname: "즈우현호랑이",
        profileImageUrl: "",
        tileCount: 3,
      },
    ] as ContributionUserInfo[],
    hasNext: true,
  },
}
