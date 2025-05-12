import OccupyButton from "@/components/dashboard/OccupyButton"
import PersonalActivityChangeSection from "@/components/dashboard/personal-dashboard/PersonalActivityChangeSection"
import PersonalHeatmapCalendarSection from "@/components/dashboard/personal-dashboard/PersonalHeatmapCalendarSection"
import PersonalStatisticsSection from "@/components/dashboard/personal-dashboard/PersonalStatisticsSection"
import PersonalTitleSection from "@/components/dashboard/personal-dashboard/PersonalTitleSection"
import TileMapSection from "@/components/dashboard/TileMapSection"
import { getPayloadFromAccessToken } from "@/lib/decode-token"
import { getDashboardData } from "@/services/dashboard/api"
import console from "console"
import { use } from "react"

interface PersonalDashboardPageProps {}

const PersonalDashboardPage = ({}: PersonalDashboardPageProps) => {
  const payload = use(getPayloadFromAccessToken())

  if (!payload) {
    console.error("payload is null")
  }
  const { nickname, sub } = payload!

  const { data } = use(getDashboardData())

  return (
    <main className="flex flex-1 flex-col gap-10 px-4">
      <PersonalTitleSection name={nickname} days={data.duration + 1} />
      <PersonalStatisticsSection dashboardData={data} />
      <OccupyButton />
      <PersonalHeatmapCalendarSection />
      <TileMapSection />
      <PersonalActivityChangeSection />
    </main>
  )
}
export default PersonalDashboardPage
