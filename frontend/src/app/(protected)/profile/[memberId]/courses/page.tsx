import SearchBar from "@/components/common/SearchBar"
import StackHeader from "@/components/layouts/Header/StackHeader"
import CompletedCourseList from "@/components/profile/CompletedCourseList"

const ProfileCoursePage = () => {
  return (
    <div className="flex flex-col bg-neutral-50">
      <StackHeader title="완주한 코스" />

      <div className="flex flex-1 flex-col gap-6 p-4">
        <SearchBar placeholder=" 이름을 입력해 주세요" />
        <CompletedCourseList />
      </div>
    </div>
  )
}

export default ProfileCoursePage
