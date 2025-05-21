import StackHeader from "@/components/layouts/Header/StackHeader"
import TeamsContributionSkeleton from "@/components/ranking/TeamsContributionSkeleton"
import { getPayloadOrRedirect } from "@/hooks/common/get-payload-or-redirect"
import { Suspense, use, type ReactNode } from "react"

interface TeamsContributionLayoutProps {
  children: ReactNode
}

const TeamsContributionLayout = ({
  children,
}: TeamsContributionLayoutProps) => {
  const { zodiacTeam } = use(getPayloadOrRedirect())

  return (
    <div className="flex flex-col gap-4">
      <StackHeader title={`${zodiacTeam} 팀 기여도`} supplement="12시 기준" />
      <div className="px-4">
        <Suspense fallback={<TeamsContributionSkeleton />}>{children}</Suspense>
      </div>
    </div>
  )
}
export default TeamsContributionLayout
