import TempMapImage from "@/assets/images/course/temp_map.png"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface CourseCardProps {
  image?: string
  title: string
  distance: number
  completedDate?: Date
  progress?: number
  className?: string
}

const CourseCard = ({
  image,
  title,
  distance,
  completedDate,
  progress,
  className,
}: CourseCardProps) => {
  return (
    <div
      className={cn(
        "flex shrink-0 cursor-pointer flex-col rounded-xl border border-neutral-200 bg-white",
        className,
      )}>
      <div className="relative w-full flex-1">
        <Image
          src={image || TempMapImage}
          alt=""
          fill
          className="rounded-t-xl object-cover"
        />
      </div>

      <div className="p-3">
        <div className="flex-1 flex-col gap-1">
          <p className="line-clamp-1 break-all">{title}</p>
          <p className="text-caption line-clamp-1 break-all text-neutral-500">
            {distance}km
          </p>
        </div>

        {progress !== undefined && (
          <div>
            <p className="text-caption text-yoi-500 text-end font-medium">
              {progress}% 달렸어요!
            </p>
            <Progress
              value={progress}
              className="bg-neutral-200"
              indicatorClassName="bg-yoi-500 rounded-full"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default CourseCard
