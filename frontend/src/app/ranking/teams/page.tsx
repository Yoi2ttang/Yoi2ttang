import StackHeader from "@/components/layouts/Header/StackHeader"
import MyTeamCard from "@/components/ranking/MyTeamCard"
import RankingCard from "@/components/ranking/RankingCard"
import { getTeamRanking } from "@/services/ranking/api"
import { use } from "react"

interface TeamsRankingPageProps {}

const TeamsRankingPage = ({}: TeamsRankingPageProps) => {
  const { data } = use(getTeamRanking())

  const { tileTeamSituationResponseList, myTeamRanking } = data

  const myTeam = tileTeamSituationResponseList?.find(
    (team) => team.rank === myTeamRanking,
  )

  return (
    <div>
      <StackHeader title="팀 랭킹" align="left" description="12시 기준" />
      <div className="flex flex-col gap-4 px-4">
        {myTeam && <MyTeamCard rankInfo={myTeam} />}

        <hr className="border-neutral-200" />

        <div className="py-4">
          <div className="flex flex-col gap-3">
            {tileTeamSituationResponseList?.map((data) => (
              <RankingCard key={data.zodiacId} rankInfo={data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default TeamsRankingPage
