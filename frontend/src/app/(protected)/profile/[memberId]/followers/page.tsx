import Loading from "@/components/common/Loading"
import SearchBar from "@/components/common/SearchBar"
import StackHeader from "@/components/layouts/Header/StackHeader"
import FollowerList from "@/components/profile/FollowerList"
import { Suspense } from "react"

const ProfileFollowerPage = () => {
  return (
    <div className="flex flex-col bg-neutral-50">
      <StackHeader title="팔로워" />

      <div className="flex flex-1 flex-col gap-6 p-4">
        <SearchBar placeholder="러너의 이름을 입력해 주세요" />
        <Suspense fallback={<Loading />}>
          <FollowerList />
        </Suspense>
      </div>
    </div>
  )
}

export default ProfileFollowerPage
