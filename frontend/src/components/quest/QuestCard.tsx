import { cn } from "@/lib/utils"

interface QuestCardProps {
  title: string
  distance: number
  className?: string
}

const QuestCard = ({ title, distance, className }: QuestCardProps) => {
  return (
    <div
      className={cn(
        "w-28 shrink-0 rounded-xl border border-neutral-100",
        className,
      )}>
      <div className="h-20 w-full rounded-t-xl bg-neutral-200" />
      <div className="p-2">
        <p className="line-clamp-1">{title}</p>
        <p className="text-caption text-neutral-500">{distance}km</p>
      </div>
    </div>
  )
}

export default QuestCard
