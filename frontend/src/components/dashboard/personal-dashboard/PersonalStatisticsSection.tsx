import Section from "@/components/common/Section"
import { PersonalDashboardResponse } from "@/types/dashboard/dashboard.type"
import DashboardCard from "../DashboardCard"
interface PersonalStatisticsSectionProps {
  dashboardData: PersonalDashboardResponse
}

const PersonalStatisticsSection = ({
  dashboardData,
}: PersonalStatisticsSectionProps) => {
  const { completeCourseCount, duration, occupiedTileCount, totalDistance } =
    dashboardData

  const statisticsList = [
    {
      title: "총 활동 시간",
      icon: "🎆",
      value: `${duration} 시간`,
    },
    {
      title: "총 활동 거리",
      icon: "🏃",
      value: `${totalDistance}km`,
    },
    {
      title: "완주한 코스",
      icon: "🏆",
      value: `${completeCourseCount}개`,
    },
    {
      title: "점령한 타일",
      icon: "🪵",
      value: `${occupiedTileCount}개`,
    },
  ]

  return (
    <Section title="🪧 나의 기록" supplement="한달 동안의 기록">
      <div className="grid grid-cols-2 gap-4">
        {statisticsList.map(({ title, icon, value }) => (
          <DashboardCard key={title} className="flex flex-col gap-2">
            <div className="text-yoi-500 text-2xl">{icon}</div>
            <div className="flex flex-col">
              <span className="text-title-md">{value}</span>
              <span className="text-sm text-neutral-400">{title}</span>
            </div>
          </DashboardCard>
        ))}
      </div>
    </Section>
  )
}
export default PersonalStatisticsSection
