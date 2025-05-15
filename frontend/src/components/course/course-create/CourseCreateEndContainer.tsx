interface CourseCreateEndContainerProps {
  onPrevStep: () => void
  onNextStep: () => void
}

const CourseCreateEndContainer = ({
  onPrevStep,
  onNextStep,
}: CourseCreateEndContainerProps) => {
  return (
    <div className="h-full w-full bg-neutral-50">
      <div className="px-4 py-10"></div>
    </div>
  )
}
export default CourseCreateEndContainer
