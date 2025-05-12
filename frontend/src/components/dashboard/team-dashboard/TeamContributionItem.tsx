import Badge from "@/components/common/Badge"
import { cn } from "@/lib/utils"
import Image from "next/image"
import DashboardCard from "../DashboardCard"

interface TeamContributionItemProps {
  data: {
    rank: number
    nickname: string
    tileCount: number
    profileImageUrl: string | null
  }
}

const TeamContributionItem = ({ data }: TeamContributionItemProps) => {
  const { rank, nickname, tileCount, profileImageUrl } = data
  const rankIcon =
    rank === 1 ? "👑" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : rank

  return (
    <DashboardCard className="flex items-center justify-between">
      <div className="flex w-full items-center gap-2 text-black">
        <div className="text-title-sm basis-8 text-center">{rankIcon}</div>
        <div className="flex w-full flex-1 items-center gap-2">
          {profileImageUrl ? (
            <Image
              src={profileImageUrl}
              alt={nickname}
              width={30}
              height={30}
              className="size-10 rounded-full"
            />
          ) : (
            <div className="size-10 rounded-full bg-blue-200" />
          )}
          <span className="text-title-sm">{nickname}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge className={cn("bg-yoi-300 border-yoi-400 border text-black")}>
          {tileCount}타일
        </Badge>
      </div>
    </DashboardCard>
  )
}
export default TeamContributionItem
