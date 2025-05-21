"use client"

import Skeleton from "@/components/common/skeleton"
import ContributeCard from "@/components/ranking/ContributeCard"
import useContributionRanking from "@/hooks/ranking/useContributionRanking"
import { ZodiacContributionRankingResponse } from "@/types/ranking"
import { useParams } from "next/navigation"

interface TeamsContributionPageProps {}

const TeamsContributionPage = ({}: TeamsContributionPageProps) => {
  const { teamId } = useParams()

  const { targetRef, data, isSuccess, isFetchingNextPage } =
    useContributionRanking(Number(teamId), {
      date: "2025-05-22",
    })
  const result = data?.pages[0] as ZodiacContributionRankingResponse

  const userContributionList = isSuccess ? result.pageInfoArgs.data : []
  return (
    <div className="flex flex-col gap-4">
      {userContributionList.map((userInfo) => (
        <ContributeCard key={userInfo.memberId} userInfo={userInfo} />
      ))}
      {isFetchingNextPage ? (
        <Skeleton ref={targetRef} className="h-24 w-full" />
      ) : (
        <div ref={targetRef} />
      )}
    </div>
  )
}

export default TeamsContributionPage
