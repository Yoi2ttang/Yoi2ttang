import OccupyButton from "@/components/dashboard/OccupyButton"
import PersonalActivityChangeSection from "@/components/dashboard/personal-dashboard/PersonalActivityChangeSection"
import PersonalHeatmapCalendarSection from "@/components/dashboard/personal-dashboard/PersonalHeatmapCalendarSection"
import PersonalStatisticsSection from "@/components/dashboard/personal-dashboard/PersonalStatisticsSection"
import PersonalTitleSection from "@/components/dashboard/personal-dashboard/PersonalTitleSection"
import TileMapSection from "@/components/dashboard/TileMapSection"
import { getDashboardData } from "@/services/dashboard/api"

interface PersonalDashboardPageProps {}

const PersonalDashboardPage = async ({}: PersonalDashboardPageProps) => {
  const { data, isSuccess, error, isError } = await getDashboardData()

  // if (isError) {
  //   return <div className="px-4">알 수 없는 에러가 발생했습니다.</div>
  // }

  return (
    <main className="flex flex-1 flex-col gap-10 px-4">
      <PersonalTitleSection name={data.memberId + ""} days={data.duration} />
      <PersonalStatisticsSection dashboardData={data} />
      <OccupyButton />
      <PersonalHeatmapCalendarSection />
      <TileMapSection />
      <PersonalActivityChangeSection />
    </main>
  )
}
export default PersonalDashboardPage
