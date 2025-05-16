import Button from "@/components/common/Button"
import CourseInfoSection from "@/components/course/CourseInfoSection"
import CourseMemberSection from "@/components/course/CourseMemberSection"
import StackHeader from "@/components/layouts/Header/StackHeader"

interface CourseDetailPageProps {
  params: Promise<{ courseId: string }>
}

const CourseDetailPage = async ({ params }: CourseDetailPageProps) => {
  const { courseId } = await params

  return (
    <div>
      <StackHeader title="코스 상세" />

      <div>
        <div className="flex flex-col gap-4 p-4">
          <CourseInfoSection distance={10} calorie={300} time={73} />

          <CourseMemberSection />
          <Button className="w-full">참여하기</Button>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailPage
