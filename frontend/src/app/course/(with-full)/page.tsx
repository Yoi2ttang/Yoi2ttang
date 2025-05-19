import CourseBookmarkSection from "@/components/course/CourseBookmarkSection"
import CourseCreateButton from "@/components/course/CourseCreateButton"
import CourseHistorySection from "@/components/course/CourseHistorySection"
import CourseRecommendSection from "@/components/course/CourseRecommendSection"

const CoursePage = () => {
  return (
    <div className="flex flex-col gap-6 p-4">
      <h1 className="text-title-md">오늘은 어떤 길로 떠나볼까요</h1>
      <CourseHistorySection />
      <CourseBookmarkSection />
      <CourseRecommendSection />

      <div className="max-w-yoi-width fixed bottom-0 mx-auto w-full">
        <CourseCreateButton />
      </div>
    </div>
  )
}

export default CoursePage
