import SearchBar from "@/components/common/SearchBar"
import StackHeader from "@/components/layouts/Header/StackHeader"
import RunnerItem from "@/components/profile/RunnerItem"

const ProfileFollowerPage = () => {
  return (
    <div className="flex flex-col bg-neutral-50">
      <StackHeader title="팔로워" />

      <div className="flex flex-1 flex-col gap-6 p-4">
        <SearchBar placeholder="러너의 이름을 입력해 주세요" />

        <div className="flex flex-1 flex-col gap-4">
          {/* targetId가 0이면 팔로우/언팔로우 버튼이 렌더링 되지 않음 */}
          {Array.from({ length: 10 }).map((item, index) => (
            <RunnerItem
              key={index}
              nickname="ErOI거"
              animalType="tiger"
              targetId={0}
            />
          ))}

          {/* <p className="text-neutral-300">일치하는 결과가 없습니다.</p> */}
        </div>
      </div>
    </div>
  )
}

export default ProfileFollowerPage
