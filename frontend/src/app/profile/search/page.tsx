import AnimalBadge from "@/components/animal-badges/AnimalBadge"
import Button from "@/components/common/Button"
import SearchBar from "@/components/common/SearchBar"
import StackHeader from "@/components/layouts/header/StackHeader"

const ProfileSearchPage = () => {
  return (
    <div className="flex flex-col bg-neutral-50">
      <StackHeader title="러너 검색" />

      <div className="flex flex-1 flex-col gap-6 p-4">
        <SearchBar placeholder="러너의 이름을 입력해 주세요" />

        <div className="flex flex-1 flex-col gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center rounded-xl bg-white p-4">
              <div className="flex w-full items-center gap-4">
                <div className="size-15 rounded-full bg-neutral-200" />

                <div className="flex flex-1 flex-col gap-1">
                  <p className="font-regular text-lg">ErOI거</p>
                  <AnimalBadge animal="tiger" />
                </div>

                <div className="cursor-pointer">
                  <Button className="rounded-lg py-1">팔로우</Button>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center rounded-xl bg-white p-4">
            <div className="flex w-full items-center gap-4">
              <div className="size-15 rounded-full bg-neutral-200" />

              <div className="flex flex-1 flex-col gap-1">
                <p className="font-regular text-lg">ErOI거</p>
                <AnimalBadge animal="tiger" />
              </div>

              <div className="cursor-pointer">
                <Button className="rounded-lg py-1">팔로우</Button>
              </div>
            </div>
          </div>

          {/* <p className="text-neutral-300">일치하는 결과가 없습니다.</p> */}
        </div>
      </div>
    </div>
  )
}

export default ProfileSearchPage
