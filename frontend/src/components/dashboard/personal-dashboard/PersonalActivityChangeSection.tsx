import Section from "@/components/common/Section"

import { getTileChangeRate } from "@/services/dashboard/api"
import { PersonalTileChangeRateResponse } from "@/types/dashboard/dashboard.type"
import ActivityChangeItem from "./ActivityChangeItem"
import ActivityLineChart from "./ActivityLineChart"

interface PersonalActivityChangeSectionProps {}

const PersonalActivityChangeSection =
  async ({}: PersonalActivityChangeSectionProps) => {
    const { data, isSuccess, error, isError } = await getTileChangeRate({
      period: "WEEKLY",
    })

    const metadata = [
      { changeDirection: "INCREASE", changeRate: 10, title: "오늘 활동량" },
      { changeDirection: "DECREASE", changeRate: 10, title: "주간 활동량" },
    ] as {
      changeDirection: PersonalTileChangeRateResponse["changeDirection"]
      changeRate: PersonalTileChangeRateResponse["changeRate"]
      title: string
    }[]

    return (
      <Section title="📈 활동 변화" supplement={"최근 7일"}>
        <div className="flex flex-col gap-4 rounded-xl">
          <ActivityLineChart />
          <div className="flex h-full w-full flex-col items-center gap-3">
            {metadata.map(({ title, changeDirection, changeRate }) => (
              <ActivityChangeItem
                key={title}
                title={title}
                rateOfChange={changeRate}
                isIncrease={changeDirection === "INCREASE"}
              />
            ))}
          </div>
        </div>
      </Section>
    )
  }
export default PersonalActivityChangeSection
