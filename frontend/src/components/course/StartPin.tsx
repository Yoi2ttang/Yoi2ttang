import { cn } from "@/lib/utils"
import { CourseCreateStep } from "@/types/course.type"
import { Stars } from "lucide-react"

interface StartPinProps {
  step?: CourseCreateStep
  className?: string
}

const StartPin = ({ className, step }: StartPinProps) => {
  return (
    <div
      className={cn(
        "",
        className,
        step === CourseCreateStep.DRAW && "-translate-6",
      )}>
      <div className="relative flex flex-col items-center gap-1">
        <div className="absolute -top-8 w-14">
          <span className="bg-yoi-400 rounded-md px-3 py-1 text-center text-xs text-white drop-shadow-sm">
            출발지
          </span>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="bg-yoi-400/40 absolute size-20 animate-pulse rounded-full blur-xs" />
          <div className="bg-yoi-400 flex size-12 items-center justify-center rounded-full border-2 border-white shadow-lg">
            <Stars className="text-lg text-white drop-shadow" />
          </div>
        </div>
      </div>
    </div>
  )
}
export default StartPin
