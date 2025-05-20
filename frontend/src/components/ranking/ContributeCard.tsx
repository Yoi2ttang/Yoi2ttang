import { cn } from "@/lib/utils"
import { ContributionUserInfo } from "@/types/ranking"
import Image from "next/image"
import Link from "next/link"
import Badge from "../common/Badge"

interface ContributeCardProps {
  userInfo: ContributionUserInfo
}

const ContributeCard = ({ userInfo }: ContributeCardProps) => {
  const { nickname, rank, profileImageUrl, tileCount, memberId } = userInfo
  const rankIcon =
    rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : rank
  return (
    <Link
      href={`/profile/${memberId}`}
      className="flex items-center justify-between rounded-xl bg-neutral-200 px-3 py-4 transition-all duration-300 active:scale-95">
      <div className="flex w-full items-center gap-2 text-black">
        <div className="text-title-sm basis-8 text-center">{rankIcon}</div>
        <div className="flex w-full flex-1 items-center gap-2">
          {profileImageUrl ? (
            <Image
              src={profileImageUrl}
              alt={nickname}
              width={30}
              height={30}
              className="size-9 rounded-full"
            />
          ) : (
            <div className="size-9 rounded-full bg-neutral-300" />
          )}
          <span className="text-title-sm">{nickname}</span>
        </div>
      </div>
      <div className="flex basis-20 items-center justify-end gap-2">
        <Badge className={cn("bg-yoi-300 border-yoi-400 border text-black")}>
          {tileCount}타일
        </Badge>
      </div>
    </Link>
  )
}
export default ContributeCard
