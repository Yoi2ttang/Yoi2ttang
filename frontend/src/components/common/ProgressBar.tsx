import StepIcon from "@/assets/icons/common/progress-step-icon.svg"
import { cn } from "@/lib/utils"
import { Progress } from "../ui/progress"

interface ProgressBarProps {
  value: number
  stepCount: number
  className?: string
  indicatorClassName?: string
}

const ProgressBar = ({
  value,
  stepCount,
  className,
  indicatorClassName,
}: ProgressBarProps) => {
  return (
    <div className="relative flex h-8 w-full items-center">
      <Progress
        value={value}
        className={className}
        indicatorClassName={indicatorClassName}
      />

      <div className="absolute flex h-full w-full items-center justify-between">
        {Array.from({ length: stepCount }).map((item, index) => (
          <StepIcon
            key={index}
            className={cn(
              "size-8",
              (100 / stepCount) * index <= value
                ? "text-yoi-500"
                : "text-neutral-200",
            )}
          />
        ))}
      </div>
    </div>
  )
}

export default ProgressBar
