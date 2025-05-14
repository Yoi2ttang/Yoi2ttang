import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import RouteIcon from "@/assets/icons/navigation-bar/route-icon.svg"
import { CalendarDaysIcon } from "lucide-react"

interface QuestCardProps {
  title: string
  distance: number
  completedDate?: Date
  showLables?: boolean
  className?: string
  children: ReactNode
}

const QuestCard = ({
  title,
  distance,
  completedDate,
  showLables = true,
  className,
  children,
}: QuestCardProps) => {
  return (
    <div
      className={cn(
        "shrink-0 cursor-pointer rounded-xl border border-neutral-200",
        className,
      )}>
      {/* 카드 이미지 */}
      {children}

      <div className="flex flex-col gap-1 p-3">
        <p className="line-clamp-1 break-all">{title}</p>

        <div className="flex items-center gap-1.5 text-neutral-400">
          <RouteIcon className="size-3 shrink-0" />

          {showLables ? (
            <p className="text-caption line-clamp-1 break-all">
              달린 거리: {distance}
            </p>
          ) : (
            <p className="text-caption line-clamp-1 break-all">{distance}km</p>
          )}
        </div>

        {completedDate && (
          <div className="flex items-center gap-1.5 text-neutral-400">
            <CalendarDaysIcon className="size-3 shrink-0" />

            {showLables ? (
              <p className="text-caption line-clamp-1 break-all">
                완료일: {completedDate.toLocaleDateString()}
              </p>
            ) : (
              <p className="text-caption line-clamp-1 break-all">
                {completedDate.toLocaleDateString()}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default QuestCard
