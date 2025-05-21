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
      <div className="flex items-center gap-3 text-black">
        {/*  */}
        <div className="text-title-md text-center">{rankIcon}</div>
        {/*  */}
        <div>
          {profileImageUrl ? (
            <div className="relative size-8">
              <Image
                src={profileImageUrl}
                alt={nickname}
                fill
                className="rounded-full"
              />
            </div>
          ) : (
            <div className="size-10 rounded-full bg-blue-200" />
          )}
        </div>
        {/*  */}
        <span className="max-w-28 truncate text-base font-semibold">
          {nickname}
        </span>
      </div>
      <div className="flex basis-2/3 items-center justify-end gap-2">
        <Badge className={cn("bg-yoi-300 border-yoi-400 border text-black")}>
          {tileCount}타일
        </Badge>
      </div>
    </DashboardCard>
  )
}
export default TeamContributionItem
