import SearchBar from "@/components/common/SearchBar"
import CourseCard from "@/components/course/CourseCard"
import StackHeader from "@/components/layouts/Header/StackHeader"

const ProfileQuestPage = () => {
  return (
    <div className="flex flex-col bg-neutral-50">
      <StackHeader title="완료한 퀘스트" />

      <div className="flex flex-1 flex-col gap-6 p-4">
        <SearchBar placeholder="퀘스트의 이름을 입력해 주세요" />

        <div className="flex flex-1 flex-col gap-4">
          {Array.from({ length: 10 }).map((item, index) => (
            <CourseCard
              key={index}
              title="한강 러닝 코스"
              distance={4.3}
              completedDate={new Date()}>
              <div className="h-36 w-full rounded-t-xl bg-neutral-200" />
            </CourseCard>
          ))}

          {/* <p className="text-neutral-300">일치하는 결과가 없습니다.</p> */}
        </div>
      </div>
    </div>
  )
}

export default ProfileQuestPage
