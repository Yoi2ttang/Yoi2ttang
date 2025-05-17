import SearchBar from "@/components/common/SearchBar"
import CourseBookmarkList from "@/components/course/CourseBookmarkList"
import StackHeader from "@/components/layouts/Header/StackHeader"

const CourseBookmarkPage = () => {
  return (
    <div className="flex flex-col bg-neutral-50">
      <StackHeader title="내가 찜한 코스" />

      <div className="flex flex-1 flex-col gap-6 p-4">
        <SearchBar placeholder="코스의 이름을 입력해 주세요" />
        <CourseBookmarkList />
      </div>
    </div>
  )
}

export default CourseBookmarkPage
