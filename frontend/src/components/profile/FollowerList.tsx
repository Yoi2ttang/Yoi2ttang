"use client"

import useFollowerList from "@/hooks/profile/useFollowerList"
import { AnimalType } from "@/types/animal"
import { MemberPreview, MembersResponse } from "@/types/member"
import { useParams } from "next/navigation"
import RunnerItem from "./RunnerItem"

const FollowerList = () => {
  const { q } = useParams()
  const { targetRef, data, isPending, isFetchingNextPage } = useFollowerList()

  return (
    <div className="flex flex-1 flex-col gap-4">
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
            page.data
              .filter((item: MemberPreview) =>
                item.nickname.includes(q as string),
              )
              .map((item: MemberPreview) => (
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

export default FollowerList
