import Section from "@/components/common/Section"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface TileMapSectionProps {}

const TileMapSection = ({}: TileMapSectionProps) => {
  return (
    <Section
      title="🪵 타일 한눈에 보기"
      supplement={
        <Link
          href="/dashboard/my/tiles"
          className="text-caption flex items-center gap-1 text-neutral-400">
          <span>전체 보기</span>
          <ChevronRight className="size-4" />
        </Link>
      }>
      <div
        id="map"
        className="aspect-video w-full rounded-md bg-neutral-200"></div>
    </Section>
  )
}
export default TileMapSection
