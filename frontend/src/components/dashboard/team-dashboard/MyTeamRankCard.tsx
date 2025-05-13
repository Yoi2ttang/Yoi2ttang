import Badge from "@/components/common/Badge"
import { animalMetaData, animalNumberMap } from "@/constants/animals"
import DashboardCard from "../DashboardCard"

interface MyTeamRankCardProps {
  teamInfo: {
    username: string
    teamName: string
    rank: number
    tileCount: number
    zodiacId: number
  }
}

const MyTeamRankCard = ({ teamInfo }: MyTeamRankCardProps) => {
  const { teamName, rank, tileCount, zodiacId } = teamInfo
  const zodiacName = animalNumberMap[zodiacId]
  const AnimalIcon = animalMetaData[zodiacName].icon
  return (
    <DashboardCard className="bg-yoi-400 flex flex-col gap-4 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-white/20 p-2 shadow-inner">
            {AnimalIcon && <AnimalIcon className="size-10 text-white" />}
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
