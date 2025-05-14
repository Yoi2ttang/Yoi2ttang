"use client"

import useFollowingList from "@/hooks/profile/useFollowingList"
import { AnimalType } from "@/types/animal"
import { MemberPreview, MembersResponse } from "@/types/member"
import RunnerItem from "./RunnerItem"

const FollowingList = () => {
  const { targetRef, data, isPending, isFetchingNextPage } = useFollowingList()

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* targetId가 0이면 팔로우/언팔로우 버튼이 렌더링 되지 않음 */}
      {isPending ? (
        Array.from({ length: 10 }).map((item, index) => (
          <div
            key={index}
            className="h-16 w-full animate-pulse bg-neutral-100"
          />
        ))
      ) : (
        <>
          {data?.pages.map((page: MembersResponse) =>
            page.data.map((item: MemberPreview) => (
              <RunnerItem
                key={item.memberId}
                targetId={item.memberId}
                nickname={item.nickname}
                animalType={item.zodiacName as AnimalType}
                profileImageUrl={item.profileImageUrl}
              />
            )),
          )}

          {isFetchingNextPage ? (
            <div className="h-16 w-full animate-pulse bg-neutral-100" />
          ) : (
            <div ref={targetRef} />
          )}
        </>
      )}

      {/* <p className="text-neutral-300">일치하는 결과가 없습니다.</p> */}
    </div>
  )
}

export default FollowingList
