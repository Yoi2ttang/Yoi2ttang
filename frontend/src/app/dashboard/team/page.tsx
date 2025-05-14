import MyTeamRankCard from "@/components/dashboard/team-dashboard/MyTeamRankCard"
import TeamActivityChangeSection from "@/components/dashboard/team-dashboard/TeamActivityChangeSection"
import TeamContributionSection from "@/components/dashboard/team-dashboard/TeamContributionSection"
import TeamRankingSummarySection from "@/components/dashboard/team-dashboard/TeamRankingSummarySection"
import TeamTitleSection from "@/components/dashboard/team-dashboard/TeamTitleSection"
import TileMapSectionWrapper from "@/components/dashboard/TileMapSectionWrapper"
import { getPayloadOrRedirect } from "@/hooks/common/get-payload-or-redirect"
import { getMyTeamInfo } from "@/services/ranking/api"
import { use } from "react"

interface TeamDashboardPageProps {}

const TeamDashboardPage = ({}: TeamDashboardPageProps) => {
  const { nickname, zodiacTeam, sub } = use(getPayloadOrRedirect())
  const { data } = use(getMyTeamInfo())

  const { zodiacId, ranking, tileCount } = data

  const teamInfo = {
    username: nickname,
    teamName: zodiacTeam,
    rank: ranking,
    tileCount: tileCount,
    zodiacId: zodiacId,
  }

  return (
    <main className="flex flex-1 flex-col gap-10 px-4">
      <div className="flex flex-col gap-2">
        <TeamTitleSection teamInfo={teamInfo} />
        <MyTeamRankCard teamInfo={teamInfo} />
      </div>
      <TeamContributionSection zodiacId={zodiacId} />
      <TeamRankingSummarySection zodiacId={zodiacId} />
      <TileMapSectionWrapper type="team" />
      <TeamActivityChangeSection />
    </main>
  )
}
export default TeamDashboardPage
