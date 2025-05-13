import Section from "@/components/common/Section"
import { getTeamActivityChange } from "@/services/dashboard/api"
import { TeamActivityChangeResponse } from "@/types/dashboard/dashboard.type"
import { use } from "react"
import ActivityLineChart from "../personal-dashboard/ActivityLineChart"

interface TeamActivityChangeSectionProps {}

const metadata = [
  { count: 100, date: "2024-01-01" },
  { count: 100, date: "2024-01-01" },
  { count: 100, date: "2024-01-01" },
  { count: 100, date: "2024-01-01" },
  { count: 100, date: "2024-01-01" },
  { count: 100, date: "2024-01-01" },
  { count: 100, date: "2024-01-01" },
] as TeamActivityChangeResponse["tookTileHistoryGroupByPeriodList"]

const TeamActivityChangeSection = ({}: TeamActivityChangeSectionProps) => {
  const { data: activityData } = use(getTeamActivityChange())

  return (
    <Section title="📈 활동 변화" supplement={"최근 7일"}>
      <div className="flex flex-col gap-4 rounded-xl">
        <ActivityLineChart
          activityData={activityData?.tookTileHistoryGroupByPeriodList}
        />
        {/* <div className="flex h-full w-full flex-col items-center gap-3">
          {metadata.map(({ title, rateOfChange, isIncrease }) => (
            <ActivityChangeItem
              key={title}
              title={title}
              rateOfChange={rateOfChange}
              changeDirection={"NO_CHANGE"}
            />
          ))}
        </div> */}
      </div>
    </Section>
  )
}
export default TeamActivityChangeSection
