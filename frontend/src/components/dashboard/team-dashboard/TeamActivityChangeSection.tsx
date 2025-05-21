import Section from "@/components/common/Section"
import { getTeamActivityChange } from "@/services/dashboard/api"
import {
  PersonalTileChangeRateResponse,
  TeamActivityChangeResponse,
} from "@/types/dashboard/dashboard.type"
import { use } from "react"
import ActivityChangeItem from "../personal-dashboard/ActivityChangeItem"
import ActivityLineChart from "../personal-dashboard/ActivityLineChart"

interface TeamActivityChangeSectionProps {}

const TeamActivityChangeSection = ({}: TeamActivityChangeSectionProps) => {
  const today = new Date().toISOString().split("T")[0]
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  const { data: activityData } = use(
    getTeamActivityChange({
      zodiacId: 1,
      startDate: sevenDaysAgo.toISOString().split("T")[0],
      endDate: today,
      period: "DAY",
      order: "ASC",
    }),
  )

  const data =
    activityData?.pointList?.length > 0 ? activityData?.pointList : mockData

  const dailyData = {
    changeRate: 10,
    changeDirection: "INCREASE",
  } as PersonalTileChangeRateResponse

  const weeklyData = {
    changeRate: 10,
    changeDirection: "INCREASE",
  } as PersonalTileChangeRateResponse

  const getDailyData = (
    data: TeamActivityChangeResponse["pointList"],
  ): PersonalTileChangeRateResponse => {
    if (data.length < 2) return dailyData
    // 오늘과 전날을 비교하여 데이터를 반환
    const today = new Date().toISOString().split("T")[0]
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const todayData = data.find((item) => item.date === today)
    const yesterdayData = data.find(
      (item) => item.date === yesterday.toISOString().split("T")[0],
    )

    if (!todayData || !yesterdayData) return dailyData

    const changeRate =
      ((todayData.count - yesterdayData.count) / yesterdayData.count) * 100
    const changeDirection =
      changeRate > 0 ? "INCREASE" : changeRate < 0 ? "DECREASE" : "NO_CHANGE"

    return {
      changeRate,
      changeDirection,
    }
  }

  const metadata = [
    { ...getDailyData(data), title: "전일 대비 오늘 활동량" },
    { ...weeklyData, title: "지난 주 대비 오늘 활동량" },
  ]

  return (
    <Section title="📈 활동 변화" supplement={"최근 7일"}>
      <div className="flex flex-col gap-4 rounded-xl">
        <ActivityLineChart activityData={data} />
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

const mockData = [
  {
    count: 10,
    date: "2025-05-01",
  },
  {
    count: 30,
    date: "2025-05-02",
  },
  {
    count: 20,
    date: "2025-05-03",
  },
  {
    count: 25,
    date: "2025-05-04",
  },
  {
    count: 15,
    date: "2025-05-05",
  },
] as TeamActivityChangeResponse["pointList"]
