import Section from "@/components/common/Section"
import { getTeamRankingPreview } from "@/services/ranking/api"
import { AnimalType } from "@/types/animal"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { use } from "react"
import TeamRankingItem from "./TeamRankingItem"

interface TeamRankingSummarySectionProps {
  zodiacId: number
}

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

const TeamRankingSummarySection = ({
  zodiacId,
}: TeamRankingSummarySectionProps) => {
  const { data } = use(getTeamRankingPreview())

  const rankingData = data?.tileTeamSituationResponseList
  return (
    <Section
      title="🏆 상위 팀 랭킹"
      supplement={
        <Link
          href={`/ranking/teams`}
          className="text-caption flex items-center gap-1 text-neutral-400">
          <span>자세히 보기</span>
          <ChevronRight className="size-4" />
        </Link>
      }
      className="rounded-xl">
      <div className="flex snap-x snap-mandatory gap-2 overflow-x-auto">
        {rankingData?.length ? (
          rankingData.map((rankInfo) => (
            <TeamRankingItem key={rankInfo.rank} rankInfo={rankInfo} />
          ))
        ) : (
          <div className="flex w-full flex-col gap-4 text-center">
            <p className="text-caption text-neutral-400">
              팀 랭킹 데이터가 없습니다.
            </p>
          </div>
        )}
      </div>
    </Section>
  )
}
export default TeamRankingSummarySection
