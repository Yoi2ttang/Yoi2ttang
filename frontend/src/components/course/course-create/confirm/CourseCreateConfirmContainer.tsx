import Section from "@/components/common/Section"
import StackHeader from "@/components/layouts/Header/StackHeader"

interface CourseCreateConfirmContainerProps {
  courseName: string
  onPrevStep: () => void
  onNextStep: () => void
}

const CourseCreateConfirmContainer = ({
  onPrevStep,
  onNextStep,
  courseName,
}: CourseCreateConfirmContainerProps) => {
  return (
    <div className="h-full w-full bg-neutral-50">
      <StackHeader onClick={onPrevStep} title={""} />
      <div className="px-4 py-10">
        <Section title={`✨ 코스 확인 ✨`}>
          <div className="flex flex-col items-center gap-4">
            <div className="aspect-square w-full max-w-96 bg-red-50"></div>
            <h3 className="text-title-md text-neutral-400 italic">
              {`" ${courseName} "`}
            </h3>
          </div>
        </Section>
      </div>
    </div>
  )
}
export default CourseCreateConfirmContainer
