import TeamActivityChangeSection from "@/components/dashboard/team-dashboard/TeamActivityChangeSection"
import TeamContributionSection from "@/components/dashboard/team-dashboard/TeamContributionSection"
import TeamRankingSummarySection from "@/components/dashboard/team-dashboard/TeamRankingSummarySection"
import TeamTitleSection from "@/components/dashboard/team-dashboard/TeamTitleSection"
import TileMapSection from "@/components/dashboard/TileMapSection"

interface TeamDashboardPageProps {}

const TeamDashboardPage = ({}: TeamDashboardPageProps) => {
  return (
    <main className="flex flex-1 flex-col gap-10 px-4">
      <TeamTitleSection />
      <TeamRankingSummarySection />
      <TileMapSection />
      <TeamContributionSection />
      <TeamActivityChangeSection />
    </main>
  )
}
export default TeamDashboardPage
