import Badge from "@/components/common/Badge"
import { AnimalType } from "@/types/animal"
import DashboardCard from "../DashboardCard"
import { animalIconMap } from "@/constants/animals"

interface MyTeamRankCardProps {
  teamInfo: {
    username: string
    teamName: string
    rank: number
    tileCount: number
    zodiac: AnimalType
  }
}

const MyTeamRankCard = ({ teamInfo }: MyTeamRankCardProps) => {
  const { teamName, rank, tileCount, zodiac } = teamInfo
  const AnimalIcon = animalIconMap[zodiac]
  return (
    <DashboardCard className="bg-yoi-400 flex flex-col gap-4 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-white/20 p-2 shadow-inner">
            <AnimalIcon className="size-10 text-white" />
          </div>
          <span className="text-title-md text-white">{teamName}</span>
        </div>
        <Badge className="text-yoi-500 bg-white shadow-sm">
          {tileCount} 타일
        </Badge>
      </div>
    </DashboardCard>
  )
}
export default MyTeamRankCard
