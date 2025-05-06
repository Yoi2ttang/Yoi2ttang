import Chicken from "@/assets/icons/animals/chicken-icon.svg"
import Cow from "@/assets/icons/animals/cow-icon.svg"
import Dragon from "@/assets/icons/animals/dragon-icon.svg"
import Horse from "@/assets/icons/animals/horse-icon.svg"
import Rabbit from "@/assets/icons/animals/rabbit-icon.svg"
import Sheep from "@/assets/icons/animals/sheep-icon.svg"
import Snake from "@/assets/icons/animals/snake-icon.svg"
import Tiger from "@/assets/icons/animals/tiger-icon.svg"
import StackHeader from "@/components/layouts/Header/StackHeader"
import MyTeamCard from "@/components/ranking/MyTeamCard"
import RankingCard from "@/components/ranking/RankingCard"
import { TeamRankingInfo } from "@/types/ranking"
import { Separator } from "@radix-ui/react-separator"

interface TeamsRankingPageProps {}

const TeamsRankingPage = ({}: TeamsRankingPageProps) => {
  const myTeamId = 3
  const myTeam = mockData.find((team) => team.teamId === myTeamId)

  return (
    <div>
      <StackHeader title="팀 랭킹" align="left" description="12시 기준" />
      <div className="flex flex-col gap-4 px-4">
        {myTeam && <MyTeamCard rankInfo={myTeam} />}

        <Separator className="h-px bg-neutral-200" />

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
    TeamIconComponent: Tiger,
    totalTiles: 100,
    rank: 1,
  },
  {
    teamId: 2,
    teamName: "소",
    TeamIconComponent: Cow,
    totalTiles: 100,
    rank: 2,
  },
  {
    teamId: 3,
    teamName: "토끼",
    TeamIconComponent: Rabbit,
    totalTiles: 100,
    rank: 3,
  },
  {
    teamId: 4,
    teamName: "용",
    TeamIconComponent: Dragon,
    totalTiles: 100,
    rank: 4,
  },
  {
    teamId: 5,
    teamName: "뱀",
    TeamIconComponent: Snake,
    totalTiles: 100,
    rank: 5,
  },
  {
    teamId: 6,
    teamName: "말",
    TeamIconComponent: Horse,
    totalTiles: 100,
    rank: 6,
  },
  {
    teamId: 7,
    teamName: "양",
    TeamIconComponent: Sheep,
    totalTiles: 100,
    rank: 7,
  },
  {
    teamId: 8,
    teamName: "치킨",
    TeamIconComponent: Chicken,
    totalTiles: 100,
    rank: 8,
  },
] as TeamRankingInfo[]
