import StackHeader from "@/components/layouts/Header/StackHeader"
import MyTeamCard from "@/components/ranking/MyTeamCard"
import RankingCard from "@/components/ranking/RankingCard"
import { animalIconMap } from "@/constants/animals"
import { TeamRankingInfo } from "@/types/ranking"

interface TeamsRankingPageProps {}

const TeamsRankingPage = ({}: TeamsRankingPageProps) => {
  const myTeamId = 3
  const myTeam = mockData.find((team) => team.teamId === myTeamId)

  return (
    <div>
      <StackHeader title="팀 랭킹" align="left" description="12시 기준" />
      <div className="flex flex-col gap-4 px-4">
        {myTeam && <MyTeamCard rankInfo={myTeam} />}

        <hr className="border-neutral-200" />

        <div className="py-4">
          <div className="flex flex-col gap-3">
            {mockData.map((data) => (
              <RankingCard key={data.teamId} rankInfo={data} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default TeamsRankingPage

const mockData = [
  {
    teamId: 1,
    teamName: "호랑이",
    TeamIconComponent: animalIconMap["tiger"],
    totalTiles: 100,
    rank: 1,
  },
  {
    teamId: 2,
    teamName: "소",
    TeamIconComponent: animalIconMap["cow"],
    totalTiles: 100,
    rank: 2,
  },
  {
    teamId: 3,
    teamName: "토끼",
    TeamIconComponent: animalIconMap["rabbit"],
    totalTiles: 100,
    rank: 3,
  },
  {
    teamId: 4,
    teamName: "용",
    TeamIconComponent: animalIconMap["dragon"],
    totalTiles: 100,
    rank: 4,
  },
  {
    teamId: 5,
    teamName: "뱀",
    TeamIconComponent: animalIconMap["snake"],
    totalTiles: 100,
    rank: 5,
  },
  {
    teamId: 6,
    teamName: "말",
    TeamIconComponent: animalIconMap["horse"],
    totalTiles: 100,
    rank: 6,
  },
  {
    teamId: 7,
    teamName: "양",
    TeamIconComponent: animalIconMap["sheep"],
    totalTiles: 100,
    rank: 7,
  },
  {
    teamId: 8,
    teamName: "치킨",
    TeamIconComponent: animalIconMap["chicken"],
    totalTiles: 100,
    rank: 8,
  },
] as TeamRankingInfo[]
