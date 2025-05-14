import OccupyButton from "@/components/dashboard/OccupyButton"
import PersonalActivityChangeSection from "@/components/dashboard/personal-dashboard/PersonalActivityChangeSection"
import PersonalHeatmapCalendarSection from "@/components/dashboard/personal-dashboard/PersonalHeatmapCalendarSection"
import PersonalStatisticsSection from "@/components/dashboard/personal-dashboard/PersonalStatisticsSection"
import PersonalTitleSection from "@/components/dashboard/personal-dashboard/PersonalTitleSection"
import TileMapSectionWrapper from "@/components/dashboard/TileMapSectionWrapper"
import { getPayloadOrRedirect } from "@/hooks/common/get-payload-or-redirect"
import { getDashboardData } from "@/services/dashboard/api"
import { use } from "react"

interface PersonalDashboardPageProps {}

const PersonalDashboardPage = ({}: PersonalDashboardPageProps) => {
  const { data } = use(getDashboardData())
  const { nickname } = use(getPayloadOrRedirect())

  return (
    <main className="flex flex-1 flex-col gap-10 px-4">
      <PersonalTitleSection name={nickname ?? ""} days={data.duration + 1} />
      <PersonalStatisticsSection dashboardData={data} />
      <OccupyButton />
      <PersonalHeatmapCalendarSection />
      <TileMapSectionWrapper type="my" />
      <PersonalActivityChangeSection />
    </main>
  )
}
export default PersonalDashboardPage
