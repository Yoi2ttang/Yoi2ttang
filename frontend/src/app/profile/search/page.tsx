"use client"

import StackHeader from "@/components/layouts/Header/StackHeader"
import RunnerItem from "@/components/profile/RunnerItem"
import UserSearchBar from "@/components/profile/UserSearchBar"
import useSearchUser from "@/hooks/auth/useSearchUser"
import { AnimalType } from "@/types/animal"
import { MemberPreview, MembersResponse } from "@/types/member"
import { Suspense, useState } from "react"

const SearchContent = () => {
  const [keyword, setKeyword] = useState("")
  const { targetRef, data, isLoading, isFetchingNextPage } = useSearchUser()

  return (
    <div className="flex flex-col bg-neutral-50">
      <StackHeader title="러너 검색" />

      <div className="flex flex-1 flex-col gap-6 p-4">
        <UserSearchBar
          placeholder="러너의 이름을 입력해 주세요"
          keyword={keyword}
          onChange={setKeyword}
        />

        <div className="flex flex-1 flex-col gap-4">
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <div
                  key={index}
                  className="h-16 animate-pulse rounded-xl bg-neutral-200"
                />
              ))
            : data?.pages.map((page: MembersResponse) =>
                page.data.map((member: MemberPreview) => (
                  <RunnerItem
                    key={member.memberId}
                    nickname={member.nickname}
                    animalType={member.zodiacName as AnimalType}
                    profileImageUrl={member.profileImageUrl}
                    targetId={member.memberId}
                  />
                )),
              )}

          {isFetchingNextPage ? (
            <div className="h-16 animate-pulse rounded-xl bg-neutral-200" />
          ) : (
            <div ref={targetRef} />
          )}

          {/* <p className="text-neutral-300">일치하는 결과가 없습니다.</p> */}
        </div>
      </div>
    </div>
  )
}

const ProfileSearchPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  )
}

export default ProfileSearchPage
