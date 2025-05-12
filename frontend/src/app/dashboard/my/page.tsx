import OccupyButton from "@/components/dashboard/OccupyButton"
import PersonalActivityChangeSection from "@/components/dashboard/personal-dashboard/PersonalActivityChangeSection"
import PersonalHeatmapCalendarSection from "@/components/dashboard/personal-dashboard/PersonalHeatmapCalendarSection"
import PersonalStatisticsSection from "@/components/dashboard/personal-dashboard/PersonalStatisticsSection"
import PersonalTitleSection from "@/components/dashboard/personal-dashboard/PersonalTitleSection"
import TileMapSection from "@/components/dashboard/TileMapSection"
import { getApiServer } from "@/lib/api-server"

interface PersonalDashboardPageProps {}

const PersonalDashboardPage = async ({}: PersonalDashboardPageProps) => {
  const apiServer = await getApiServer()
  const { data, error } = await apiServer.get("/member/me")

  if (error) {
    console.log(error.data)
  }

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
