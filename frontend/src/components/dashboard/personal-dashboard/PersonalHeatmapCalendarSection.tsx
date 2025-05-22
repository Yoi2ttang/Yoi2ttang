import Section from "@/components/common/Section"
import { getDailyTime } from "@/services/dashboard/api"
import Link from "next/link"
import { use } from "react"
import ActivityGrid from "./ActivityGrid"

interface PersonalHeatmapCalendarSectionProps {}

const PersonalHeatmapCalendarSection =
  ({}: PersonalHeatmapCalendarSectionProps) => {
    const today = new Date()
    const { year, month } = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
    }
    const { data } = use(getDailyTime({ year, month }))
    return (
      <Section
        title="☘️ 발자국"
        supplement={
          <Link
            href="/dashboard/my/heatmap"
            className="text-caption flex items-center gap-1 text-neutral-400">
            {/* <span>자세히 보기</span>
            <ChevronRight className="size-4" /> */}
          </Link>
        }>
        <div className="h-full">
          <ActivityGrid data={data} />
        </div>
      </Section>
    )
  }
export default PersonalHeatmapCalendarSection
