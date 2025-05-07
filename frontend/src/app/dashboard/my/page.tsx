import OccupyButton from "@/components/dashboard/OccupyButton"
import PersonalActivityChangeSection from "@/components/dashboard/personal-dashboard/PersonalActivityChangeSection"
import PersonalHeatmapCalendarSection from "@/components/dashboard/personal-dashboard/PersonalHeatmapCalendarSection"
import PersonalStatisticsSection from "@/components/dashboard/personal-dashboard/PersonalStatisticsSection"
import PersonalTitleSection from "@/components/dashboard/personal-dashboard/PersonalTitleSection"
import TileMapSection from "@/components/dashboard/TileMapSection"

interface PersonalDashboardPageProps {}

const PersonalDashboardPage = ({}: PersonalDashboardPageProps) => {
  return (
    <main className="flex flex-1 flex-col gap-10 px-4">
      <PersonalTitleSection />
      <PersonalStatisticsSection />
      <OccupyButton />
      <PersonalHeatmapCalendarSection />
      <TileMapSection />
      <PersonalActivityChangeSection />
    </main>
  )
}
export default PersonalDashboardPage
