import TempMapImage from "@/assets/images/course/temp_map.png"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Course } from "@/types/course/course.type"
import Image from "next/image"
import Link from "next/link"

interface CourseCarouselItemProps {
  data: Course
  className?: string
}

const CourseCarouselItem = ({ data, className }: CourseCarouselItemProps) => {
  const { courseId, courseName, distance, courseImageUrl, completeRate } = data

  return (
    <Link
      href={`/course/${courseId}`}
      className={cn(
        "flex shrink-0 cursor-pointer items-center gap-3 rounded-xl bg-white p-3",
        className,
      )}>
      <div className="relative size-28">
        <Image
          src={courseImageUrl || TempMapImage}
          alt=""
          fill
          className="rounded-xl object-cover"
        />
      </div>

      <div className="flex h-full flex-1 flex-col justify-between py-2">
        <div className="flex-1 flex-col gap-1">
          <p className="text-title-sm line-clamp-1 break-all">{courseName}</p>
          <p className="text-caption line-clamp-1 break-all text-neutral-500">
            {distance}km
          </p>
        </div>

        {completeRate !== undefined && (
          <div>
            <p className="text-caption text-yoi-500 text-end font-medium">
              {completeRate}% 달렸어요!
            </p>
            <Progress
              value={completeRate}
              className="bg-neutral-200"
              indicatorClassName="bg-yoi-500 rounded-full"
            />
          </div>
        )}
      </div>
    </Link>
  )
}

export default CourseCarouselItem
