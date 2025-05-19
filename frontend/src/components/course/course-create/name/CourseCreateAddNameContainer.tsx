import Input from "@/components/common/Input"
import Section from "@/components/common/Section"
import StackHeader from "@/components/layouts/Header/StackHeader"
import { CourseData } from "@/types/course.type"
import { debounce } from "lodash-es"
import { ChangeEvent } from "react"

interface CourseCreateAddNameContainerProps {
  title: string
  onPrevStep: () => void
  updateCourseData: (data: Partial<CourseData>) => void
  courseData: CourseData
}

const CourseCreateAddNameContainer = ({
  title,
  onPrevStep,
  updateCourseData,
  courseData,
}: CourseCreateAddNameContainerProps) => {
  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const courseName = e.target.value
    updateCourseData({ courseName })
  }, 500)

  return (
    <div className="h-full w-full bg-neutral-50">
      <StackHeader onClick={onPrevStep} title={""} />
      <div className="px-4 py-10">
        <Section title={`✨ ${title}`}>
          <Input
            ref={(el) => {
              if (el && el.value === "") {
                el.focus()
              }
            }}
            defaultValue={courseData.courseName}
            onChange={handleChange}
            placeholder="코스 이름을 입력해주세요."
          />
        </Section>
      </div>
    </div>
  )
}
export default CourseCreateAddNameContainer
