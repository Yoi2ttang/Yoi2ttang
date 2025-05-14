import Badge from "@/components/common/Badge"
import { animalMetaData, animalNumberMap } from "@/constants/animals"
import { cn } from "@/lib/utils"
import { TeamRanking } from "@/types/ranking"
import { ChevronRightIcon } from "lucide-react"
import Link from "next/link"

interface RankingCardProps {
  rankInfo: TeamRanking
  isMyTeam?: boolean
}

const RankingCard = ({ rankInfo, isMyTeam = false }: RankingCardProps) => {
  const { rank, zodiacId, tileCount } = rankInfo

  const animalData = animalMetaData[animalNumberMap[zodiacId]]

  const { icon: TeamIconComponent, teamName } = animalData

  const rankIcon =
    rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : rank
  return (
    <Link
      href={`/ranking/teams/${zodiacId}/contribution`}
      className={cn(
        "flex items-center justify-between rounded-xl px-3 py-4",
        "transition-all duration-300 active:scale-95",
        rank === 1 && "bg-yoi-400 active:bg-yoi-400/80",
        rank === 2 && "bg-yoi-300 active:bg-yoi-300/80",
        rank === 3 && "bg-yoi-100 active:bg-yoi-100/80",
        rank > 3 && "bg-neutral-200 active:bg-neutral-200/80",
        isMyTeam && "bg-transparent py-12",
      )}
      key={zodiacId}>
      <div className="flex w-full items-center gap-2 text-black">
        <div className="text-title-sm basis-8 text-center">{rankIcon}</div>
        <div className="flex w-full flex-1 items-center gap-2">
          {TeamIconComponent && <TeamIconComponent className="size-10" />}
          <span className="text-title-sm">{teamName} 팀</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge className={cn("bg-yoi-300 border-yoi-400 border text-black")}>
          {tileCount} 타일
        </Badge>
        <ChevronRightIcon className="size-4" />
      </div>
    </Link>
  )
}
export default RankingCard
