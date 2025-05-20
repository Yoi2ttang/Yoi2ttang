import SearchBar from "@/components/common/SearchBar"
import CourseCard from "@/components/course/CourseCard"
import CourseHistoryList from "@/components/course/CourseHistoryList"
import StackHeader from "@/components/layouts/Header/StackHeader"

const CourseHistoryPage = () => {
  return (
    <div className="flex flex-col bg-neutral-50">
      <StackHeader title="내가 달렸던 코스" />

      <div className="flex flex-1 flex-col gap-6 p-4">
        <SearchBar placeholder="코스의 이름을 입력해 주세요" />
        <CourseHistoryList />
      </div>
    </div>
  )
}

export default CourseHistoryPage
