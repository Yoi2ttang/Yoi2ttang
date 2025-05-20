import StackHeader from "@/components/layouts/Header/StackHeader"
import TeamsRakingSkeleton from "@/components/ranking/TeamsRakingSkeleton"
import TeamsRankingContent from "@/components/ranking/TeamsRankingContent"
import { Suspense } from "react"

interface TeamsRankingPageProps {}

const TeamsRankingPage = ({}: TeamsRankingPageProps) => {
  return (
    <>
      <StackHeader title="팀 랭킹" supplement="12시 기준" />
      <Suspense fallback={<TeamsRakingSkeleton />}>
        <TeamsRankingContent />
      </Suspense>
    </>
  )
}
export default TeamsRankingPage
