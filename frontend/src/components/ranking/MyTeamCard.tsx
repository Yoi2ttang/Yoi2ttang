import Badge from "@/components/common/Badge"
import { animalMetaData, animalNumberMap } from "@/constants/animals"
import { TeamRanking } from "@/types/ranking"

interface MyTeamCardProps {
  rankInfo: TeamRanking
}

const MyTeamCard = ({ rankInfo }: MyTeamCardProps) => {
  const { rank, zodiacId, tileCount } = rankInfo
  const rankIcon =
    rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `${rank}등`

  const animalData = animalMetaData[animalNumberMap[zodiacId]]
  const { icon: TeamIconComponent, teamName } = animalData

  return (
    <section className="bg-neutral-50 py-4">
      <div className="from-yoi-100/30 to-yoi-400/30 overflow-hidden rounded-2xl bg-gradient-to-br shadow-lg">
        <div className="bg-yoi-400/10 px-4 py-3">
          <span className="text-title-sm text-yoi-700 font-bold">
            우리 팀 랭킹
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-title-lg text-yoi-700">{rankIcon}</span>
            <div className="flex items-center gap-2">
              <TeamIconComponent className="size-10" />
              <span className="text-title-sm">{teamName} 팀</span>
            </div>
            <Badge className="bg-yoi-300 border-yoi-400 border text-black">
              {tileCount}타일
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )
}
export default MyTeamCard
