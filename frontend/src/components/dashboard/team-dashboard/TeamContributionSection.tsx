import Section from "@/components/common/Section"
import { getZodiacContributionRankingServer } from "@/services/ranking/api"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { use } from "react"
import TeamContributionItem from "./TeamContributionItem"
interface TeamContributionSectionProps {
  zodiacId: number
}

const TeamContributionSection = ({
  zodiacId,
}: TeamContributionSectionProps) => {
  const { data } = use(
    getZodiacContributionRankingServer(zodiacId, {
      date: "2025-05-22",
      size: 3,
    }),
  )

  const contributionData = data?.pageInfoArgs?.data

  return (
    <Section
      title="✨ 우리 팀 TOP 3"
      supplement={
        <Link
          href={`/ranking/teams/${zodiacId}/contribution`}
          className="text-caption flex items-center gap-1 text-neutral-400">
          <span>전체보기</span>
          <ChevronRight className="size-4" />
        </Link>
      }>
      <div className="flex flex-col gap-4">
        {contributionData?.length ? (
          contributionData.map((data) => (
            <TeamContributionItem key={data.memberId} data={data} />
          ))
        ) : (
          <div className="flex flex-col gap-4 text-center">
            <p className="text-caption text-neutral-400">
              팀 기여도 랭킹 데이터가 없습니다.
            </p>
          </div>
        )}
      </div>
    </Section>
  )
}
export default TeamContributionSection
