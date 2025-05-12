import MyTeamRankCard from "@/components/dashboard/team-dashboard/MyTeamRankCard"
import TeamActivityChangeSection from "@/components/dashboard/team-dashboard/TeamActivityChangeSection"
import TeamContributionSection from "@/components/dashboard/team-dashboard/TeamContributionSection"
import TeamRankingSummarySection from "@/components/dashboard/team-dashboard/TeamRankingSummarySection"
import TeamTitleSection from "@/components/dashboard/team-dashboard/TeamTitleSection"
import TileMapSection from "@/components/dashboard/TileMapSection"
import { AnimalType } from "@/types/animal"

interface TeamDashboardPageProps {}

const TeamDashboardPage = ({}: TeamDashboardPageProps) => {
  const mockData = {
    username: "창조",
    teamName: "호랑이",
    rank: 1,
    tileCount: 100,
    zodiac: "tiger" as AnimalType,
  }
  return (
    <main className="flex flex-1 flex-col gap-10 px-4">
      <div className="flex flex-col gap-2">
        <TeamTitleSection teamInfo={mockData} />
        <MyTeamRankCard teamInfo={mockData} />
      </div>
      <TeamContributionSection />
      <TeamRankingSummarySection />
      <TileMapSection />
      <TeamActivityChangeSection />
    </main>
  )
}
export default TeamDashboardPage
