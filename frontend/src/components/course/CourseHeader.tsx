import Button from "@/components/common/Button"
import { ArrowLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface CourseHeaderProps {
  title: string
}

const CourseHeader = ({ title }: CourseHeaderProps) => {
  const router = useRouter()

  const handleOnClickBack = () => {
    router.back()
  }

  return (
    <div className="absolute top-2 left-0 z-100 flex h-16 w-full items-center justify-between">
      <div className="flex h-full w-full items-center justify-between gap-2 py-3">
        <div className="flex h-full basis-1/5 items-center justify-center">
          <Button
            onClick={handleOnClickBack}
            variant="outline"
            className="size-10 rounded-full p-0">
            <ArrowLeftIcon />
          </Button>
        </div>

        <div className="border-yoi-600 flex h-full flex-1 items-center justify-center rounded-full border-2 bg-white text-center">
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>
        <div className="basis-1/6"></div>
      </div>
    </div>
  )
}
export default CourseHeader
