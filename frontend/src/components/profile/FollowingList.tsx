"use client"

import useFollowingList from "@/hooks/profile/useFollowingList"
import { AnimalType } from "@/types/animal"
import {
  MemberAutocompleteResponse,
  MemberPreview,
  MembersResponse,
} from "@/types/member"
import Skeleton from "../common/skeleton"
import RunnerItem from "./RunnerItem"

const FollowingList = () => {
  const { targetRef, data, isLoading, isFetchingNextPage } = useFollowingList()
  const isEmpty = !data?.pages.some(
    (page: MemberAutocompleteResponse) => page?.data.length > 0,
  )

  return (
    <div className="flex flex-1 flex-col gap-4">
      {isLoading ? (
        Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} className="h-16" />
        ))
      ) : (
        <>
          {isEmpty ? (
            <p className="text-center text-neutral-300">
              일치하는 결과가 없어요
            </p>
          ) : (
            <>
              {data?.pages.map((page: MembersResponse) =>
                page?.data.map((item: MemberPreview) => (
                  <RunnerItem
                    key={item.memberId}
                    targetId={item.memberId}
                    nickname={item.nickname}
                    animalType={item.zodiacName as AnimalType}
                    profileImageUrl={item.profileImageUrl}
                    isFollow={item.isFollow}
                  />
                )),
              )}

              {isFetchingNextPage ? (
                <Skeleton className="h-16" />
              ) : (
                <div ref={targetRef} />
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default FollowingList
