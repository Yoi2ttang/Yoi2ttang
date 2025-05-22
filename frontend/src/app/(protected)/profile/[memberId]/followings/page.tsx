import Loading from "@/components/common/Loading"
import SearchBar from "@/components/common/SearchBar"
import StackHeader from "@/components/layouts/Header/StackHeader"
import FollowingList from "@/components/profile/FollowingList"
import { Suspense } from "react"

const ProfileFollowingPage = () => {
  return (
    <div className="flex flex-col bg-neutral-50">
      <StackHeader title="팔로잉" />

      <div className="flex flex-1 flex-col gap-6 p-4">
        <SearchBar placeholder="러너의 이름을 입력해 주세요" />
        <Suspense fallback={<Loading />}>
          <FollowingList />
        </Suspense>
      </div>
    </div>
  )
}

export default ProfileFollowingPage
