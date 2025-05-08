import Section from "@/components/common/Section"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import TeamContributionItem from "./TeamContributionItem"

interface TeamContributionSectionProps {}

const TeamContributionSection = ({}: TeamContributionSectionProps) => {
  const mockData = [
    {
      rank: 1,
      nickname: "홍길동",
      tileCount: 100,
      profileImageUrl: null,
    },
    {
      rank: 2,
      nickname: "이순신",
      tileCount: 90,
      profileImageUrl: null,
    },
    {
      rank: 3,
      nickname: "김유신",
      tileCount: 80,
      profileImageUrl: null,
    },
  ]

  return (
    <Section
      title="✨ 우리 팀 TOP 3"
      supplement={
        <Link
          href={`/ranking/teams/${"1"}/contribution`}
          className="text-caption flex items-center gap-1 text-neutral-400">
          <span>전체보기</span>
          <ChevronRight className="size-4" />
        </Link>
      }>
      <div className="flex flex-col gap-4">
        {mockData.map((data) => (
          <TeamContributionItem key={data.rank} data={data} />
        ))}
      </div>
    </Section>
  )
}
export default TeamContributionSection
