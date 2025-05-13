import MyTeamRankCard from "@/components/dashboard/team-dashboard/MyTeamRankCard"
import TeamActivityChangeSection from "@/components/dashboard/team-dashboard/TeamActivityChangeSection"
import TeamContributionSection from "@/components/dashboard/team-dashboard/TeamContributionSection"
import TeamRankingSummarySection from "@/components/dashboard/team-dashboard/TeamRankingSummarySection"
import TeamTitleSection from "@/components/dashboard/team-dashboard/TeamTitleSection"
import TileMapSection from "@/components/dashboard/TileMapSection"
import { getPayloadOrRedirect } from "@/hooks/common/get-payload-or-redirect"
import { getMyTeamInfo } from "@/services/ranking/api"
import { use } from "react"

interface TeamDashboardPageProps {}

const TeamDashboardPage = ({}: TeamDashboardPageProps) => {
  const { nickname, zodiacTeam, sub } = use(getPayloadOrRedirect())
  const { data } = use(getMyTeamInfo())

  const { totalTileCount, zodiacName } = data

  const teamInfo = {
    username: nickname,
    teamName: zodiacTeam,
    rank: 1,
    tileCount: totalTileCount, // Todo: 팀 tile 개수 인지 확인
    zodiac: zodiacName,
  }

  console.log(data)

  return (
    <main className="flex flex-1 flex-col gap-10 px-4">
      <div className="flex flex-col gap-2">
        <TeamTitleSection teamInfo={teamInfo} />
        <MyTeamRankCard teamInfo={teamInfo} />
      </div>
      <TeamContributionSection zodiacId={1} />
      <TeamRankingSummarySection zodiacId={1} />
      <TileMapSection />
      <TeamActivityChangeSection />
    </main>
  )
}
export default TeamDashboardPage
