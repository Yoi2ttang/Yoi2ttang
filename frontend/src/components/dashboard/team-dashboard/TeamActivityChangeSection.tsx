import Section from "@/components/common/Section"
import { getTeamActivityChange } from "@/services/dashboard/api"
import { PersonalTileChangeRateResponse } from "@/types/dashboard/dashboard.type"
import { use } from "react"
import ActivityChangeItem from "../personal-dashboard/ActivityChangeItem"
import ActivityLineChart from "../personal-dashboard/ActivityLineChart"

interface TeamActivityChangeSectionProps {}

const TeamActivityChangeSection = ({}: TeamActivityChangeSectionProps) => {
  const { data: activityData } = use(getTeamActivityChange())

  const dailyData = {
    changeRate: 10,
    changeDirection: "INCREASE",
  } as PersonalTileChangeRateResponse

  const weeklyData = {
    changeRate: 10,
    changeDirection: "INCREASE",
  } as PersonalTileChangeRateResponse

  const metadata = [
    { ...dailyData, title: "전일 대비 오늘 활동량" },
    { ...weeklyData, title: "지난 주 대비 오늘 활동량" },
  ]

  return (
    <Section title="📈 활동 변화" supplement={"최근 7일"}>
      <div className="flex flex-col gap-4 rounded-xl">
        <ActivityLineChart
          activityData={activityData?.tookTileHistoryGroupByPeriodList}
        />
        <div className="flex h-full w-full flex-col items-center gap-3">
          {metadata.map(({ title, changeRate, changeDirection }) => (
            <ActivityChangeItem
              key={title}
              title={title}
              rateOfChange={changeRate}
              changeDirection={changeDirection}
            />
          ))}
        </div>
      </div>
    </Section>
  )
}
export default TeamActivityChangeSection
