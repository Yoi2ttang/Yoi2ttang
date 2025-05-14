import { getPayloadOrRedirect } from "@/hooks/common/get-payload-or-redirect"
import { getTeamRanking } from "@/services/ranking/api"
import { use } from "react"
import MyTeamCard from "./MyTeamCard"
import RankingCard from "./RankingCard"

interface TeamsRankingContentProps {}

const TeamsRankingContent = ({}: TeamsRankingContentProps) => {
  const { zodiacId } = use(getPayloadOrRedirect())
  const { data } = use(getTeamRanking())

  const { tileTeamSituationResponseList } = data

  const myTeam = tileTeamSituationResponseList?.find(
    (team) => team.zodiacId === Number(zodiacId),
  )

  return (
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
  )
}
export default TeamsRankingContent
