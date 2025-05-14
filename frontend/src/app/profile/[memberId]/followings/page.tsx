"use client"

import SearchBar from "@/components/common/SearchBar"
import StackHeader from "@/components/layouts/Header/StackHeader"
import FollowingList from "@/components/profile/FollowingList"

const ProfileFollowingPage = () => {
  return (
    <div className="flex flex-col bg-neutral-50">
      <StackHeader title="팔로잉" />

      <div className="flex flex-1 flex-col gap-6 p-4">
        <SearchBar placeholder="러너의 이름을 입력해 주세요" />
        <FollowingList />

        {/* <p className="text-neutral-300">일치하는 결과가 없습니다.</p> */}
      </div>
    </div>
  )
}

export default ProfileFollowingPage
