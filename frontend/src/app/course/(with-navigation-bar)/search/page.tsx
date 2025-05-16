import SearchBar from "@/components/common/SearchBar"
import CourseCard from "@/components/course/CourseCard"
import StackHeader from "@/components/layouts/Header/StackHeader"

const CourseSearchPage = () => {
  return (
    <div className="flex flex-col bg-neutral-50">
      <StackHeader title="코스 찾기" />

      <div className="flex flex-1 flex-col gap-6 p-4">
        <SearchBar placeholder="코스의 이름을 입력해 주세요" />

        <div className="flex flex-1 flex-col gap-4">
          {Array.from({ length: 10 }).map((item, index) => (
            <CourseCard
              key={index}
              courseId={index}
              title="한강 러닝 코스"
              distance={4.3}
              completedDate={new Date()}
              progress={100 - 10 * index}
              className="h-64 w-full"
            />
          ))}

          {/* <p className="text-neutral-300">일치하는 결과가 없습니다.</p> */}
        </div>
      </div>
    </div>
  )
}

export default CourseSearchPage
