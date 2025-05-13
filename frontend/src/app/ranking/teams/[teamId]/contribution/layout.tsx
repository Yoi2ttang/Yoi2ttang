import StackHeader from "@/components/layouts/Header/StackHeader"
import TeamsContributionSkeleton from "@/components/ranking/TeamsContributionSkeleton"
import { Suspense, use, type ReactNode } from "react"

interface TeamsContributionLayoutProps {
  children: ReactNode
  params: Promise<{
    teamId: string
  }>
}

const TeamsContributionLayout = ({
  children,
  params,
}: TeamsContributionLayoutProps) => {
  const { teamId } = use(params)
  // TODO: teamId 기준 팀 이름 가져오기
  return (
    <div className="flex flex-col gap-4">
      <StackHeader
        title={`${"호랑이"} 팀 기여도`}
        align="left"
        description="12시 기준"
      />
      <div className="px-4">
        <Suspense fallback={<TeamsContributionSkeleton />}>{children}</Suspense>
      </div>
    </div>
  )
}
export default TeamsContributionLayout
