import Section from "@/components/common/Section"

import { getDailyTile, getTileChangeRate } from "@/services/dashboard/api"
import { use } from "react"
import ActivityChangeItem from "./ActivityChangeItem"
import ActivityLineChart from "./ActivityLineChart"

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
    count: 40,
    date: "2025-05-03",
  },
  {
    count: 20,
    date: "2025-05-04",
  },
  {
    count: 33,
    date: "2025-05-05",
  },
]

interface PersonalActivityChangeSectionProps {}

const PersonalActivityChangeSection =
  ({}: PersonalActivityChangeSectionProps) => {
    const { data: dailyTileData } = use(
      getDailyTile({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
      }),
    )

    const { data: weeklyData } = use(
      getTileChangeRate({
        period: "WEEKLY",
      }),
    )

    const { data: dailyData } = use(
      getTileChangeRate({
        period: "DAILY",
      }),
    )

    const data = dailyTileData.length
      ? dailyTileData.map(({ date, occupiedTileCount }) => ({
          count: occupiedTileCount,
          date,
        }))
      : mockData

    const metadata = [
      { ...dailyData, title: "전일 대비 오늘 활동량" },
      { ...weeklyData, title: "지난 주 대비 오늘 활동량" },
    ]

    return (
      <Section title="📈 활동 변화" supplement={"최근 7일"}>
        <div className="flex flex-col gap-4 rounded-xl">
          <ActivityLineChart activityData={data} />
          <div className="flex h-full w-full flex-col items-center gap-3">
            {metadata.map(({ title, changeDirection, changeRate }) => (
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
export default PersonalActivityChangeSection
