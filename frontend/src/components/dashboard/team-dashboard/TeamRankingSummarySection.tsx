import Section from "@/components/common/Section"
import { AnimalType } from "@/types/animal"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import TeamRankingItem from "./TeamRankingItem"

interface TeamRankingSummarySectionProps {}

const mockRankInfo = [
  {
    rank: 1,
    teamName: "팀 이름",
    zodiac: "tiger" as AnimalType,
    tileCount: 100,
  },
  {
    rank: 2,
    teamName: "호랑이",
    zodiac: "tiger" as AnimalType,
    tileCount: 100,
  },
  {
    rank: 3,
    teamName: "호랑이",
    zodiac: "tiger" as AnimalType,
    tileCount: 100,
  },
]

const TeamRankingSummarySection = ({}: TeamRankingSummarySectionProps) => {
  return (
    <Section
      title="🏆 상위 팀 랭킹"
      supplement={
        <Link
          href="/dashboard/my/tiles"
          className="text-caption flex items-center gap-1 text-neutral-400">
          <span>자세히 보기</span>
          <ChevronRight className="size-4" />
        </Link>
      }
      className="rounded-xl">
      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto">
        {mockRankInfo.map((rankInfo) => (
          <TeamRankingItem key={rankInfo.rank} rankInfo={rankInfo} />
        ))}
      </div>
    </Section>
  )
}
export default TeamRankingSummarySection
