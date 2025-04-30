import OccupyButton from "@/components/dashboard/OccupyButton"
import PersonalStatisticsSection from "@/components/dashboard/personal-dashboard/PersonalStatisticsSection"
import PersonalTitleSection from "@/components/dashboard/personal-dashboard/PersonalTitleSection"

interface PersonalDashboardPageProps {}

const PersonalDashboardPage = ({}: PersonalDashboardPageProps) => {
  return (
    <main className="flex flex-1 flex-col gap-6 px-4">
      <PersonalTitleSection />
      <PersonalStatisticsSection />
      <OccupyButton />
      {/* 나의 활동 변화 */}
      {/* 내가 활동한 땅 한눈에 보기기 */}
      {/* 나의 활동 내역 잔디로 확인하기 */}
    </main>
  )
}
export default PersonalDashboardPage
