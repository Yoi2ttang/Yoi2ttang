import Button from "@/components/common/Button"

interface CourseCreateButtonProps {
  buttonText: string
  onClick: () => void
  disabled?: boolean
}

const CourseCreateButton = ({
  buttonText,
  onClick,
  disabled,
}: CourseCreateButtonProps) => {
  return (
    <div className="absolute right-0 bottom-8 left-0 z-101 px-4">
      <Button onClick={onClick} disabled={disabled} className="w-full">
        {buttonText}
      </Button>
    </div>
  )
}

export default CourseCreateButton
