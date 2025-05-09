import Badge from "@/components/common/Badge"
import { cn } from "@/lib/utils"
import { ArrowDown, ArrowUp } from "lucide-react"

interface ActivityChangeItemProps {
  title: string
  rateOfChange: number
  isIncrease: boolean
}

const ActivityChangeItem = ({
  title,
  rateOfChange,
  isIncrease,
}: ActivityChangeItemProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      {/* left */}
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "h-2 w-2 rounded-full",
            isIncrease ? "bg-yoi-500" : "bg-blue-500",
          )}
        />
        <span className="text-caption text-neutral-400">{title}</span>
      </div>
      {/* right */}
      <div className="flex items-center gap-2">
        <span className="text-caption text-black">
          {isIncrease ? "+" : "-"}
          {rateOfChange}
        </span>
        <Badge
          className={cn(isIncrease ? "bg-yoi-500" : "bg-blue-500", "w-full")}>
          {isIncrease ? (
            <ArrowUp className="size-4" />
          ) : (
            <ArrowDown className="size-4" />
          )}
        </Badge>
      </div>
    </div>
  )
}
export default ActivityChangeItem
