import Badge from "@/components/common/Badge"
import { animalIconMap } from "@/constants/animals"
import { cn } from "@/lib/utils"
import { AnimalType } from "@/types/animal"

interface TeamRankingItemProps {
  rankInfo: {
    rank: number
    teamName: string
    zodiac: string
    tileCount: number
  }
}

const TeamRankingItem = ({ rankInfo }: TeamRankingItemProps) => {
  const { rank, teamName, zodiac, tileCount } = rankInfo
  const AnimalIcon = animalIconMap[zodiac as AnimalType]
  const rankIcon = rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"
  const backgroundColor =
    rank === 1
      ? "bg-gradient-to-br from-yoi-300 to-yoi-200"
      : rank === 2
        ? "bg-gradient-to-br from-yoi-300 to-yoi-200"
        : "bg-gradient-to-br from-yoi-300 to-yoi-200"
  const lightShadow = "shadow-md shadow-black/10" // 은은한 그림자

  return (
    <div
      className={cn(
        "h-full min-w-full shrink-0 snap-center overflow-hidden rounded-xl",
        backgroundColor,
        lightShadow,
      )}>
      <div className="flex h-full flex-col gap-3 p-4">
        {/* 랭킹 아이콘 및 타일 수 */}
        <div className="flex items-center justify-between">
          <span className="text-title-lg text-white">{rankIcon}</span>
          <Badge className="text-yoi-500 bg-white shadow-sm">
            {tileCount} 타일
          </Badge>
        </div>
        {/* 팀 이름 및 동물 아이콘 */}
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white/20 p-2 shadow-inner">
            <AnimalIcon className="size-10 text-white" />
          </div>
          <span className="text-title-md text-white">{teamName} 팀</span>
        </div>
      </div>
    </div>
  )
}

export default TeamRankingItem
