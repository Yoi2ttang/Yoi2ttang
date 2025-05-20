import SearchBar from "@/components/common/SearchBar"
import CourseSearchList from "@/components/course/CourseSearchList"
import StackHeader from "@/components/layouts/Header/StackHeader"

const CourseSearchPage = () => {
  return (
    <div className="flex flex-col bg-neutral-50">
      <StackHeader title="코스 찾기" />

      <div className="flex flex-1 flex-col gap-6 p-4">
        <SearchBar placeholder="코스의 이름을 입력해 주세요" />
        <CourseSearchList />
      </div>
    </div>
  )
}

export default CourseSearchPage
