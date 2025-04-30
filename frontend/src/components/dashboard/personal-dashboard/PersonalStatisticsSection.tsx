import { PersonalStatistics } from "@/types/dashboard/dashboard.type"
import DashboardCard from "../DashboardCard"
interface PersonalStatisticsSectionProps {}

const PersonalStatisticsSection = ({}: PersonalStatisticsSectionProps) => {
  const mockData: PersonalStatistics = {
    totalTime: 100,
    totalLength: 100,
    completedChallenge: 100,
    totalTile: 100,
  }

  const { totalTime, totalLength, completedChallenge, totalTile } = mockData

  const statisticsList = [
    {
      title: "총 활동 시간",
      icon: "🎆",
      value: `${totalTime}시간`,
    },
    {
      title: "총 활동 거리",
      icon: "🏃",
      value: `${totalLength}km`,
    },
    {
      title: "완료한 챌린지 수",
      icon: "🏆",
      value: `${completedChallenge}개`,
    },
    {
      title: "모은 타일수",
      icon: "🪵",
      value: `${totalTile}개`,
    },
  ]

  return (
    <section className="flex flex-col gap-4">
      <div className="gpa-2 flex items-baseline justify-between">
        <h2 className="text-title-md">🪧 나의 기록</h2>
        <span className="text-xs text-neutral-400">
          가입한 일부터 현재까지 기록입니다
        </span>
      </div>
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
    </section>
  )
}
export default PersonalStatisticsSection
