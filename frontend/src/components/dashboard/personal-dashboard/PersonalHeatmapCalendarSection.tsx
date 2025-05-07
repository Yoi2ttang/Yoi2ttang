import Section from "@/components/common/Section"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import ActivityGrid from "./ActivityGrid"

interface PersonalHeatmapCalendarSectionProps {}

const PersonalHeatmapCalendarSection =
  ({}: PersonalHeatmapCalendarSectionProps) => {
    return (
      <Section
        title="☘️ 발자국"
        supplement={
          <Link
            href="/dashboard/my/tiles"
            className="text-caption flex items-center gap-1 text-neutral-400">
            <span>자세히 보기</span>
            <ChevronRight className="size-4" />
          </Link>
        }>
        <div className="h-full">
          <ActivityGrid />
        </div>
      </Section>
    )
  }
export default PersonalHeatmapCalendarSection
