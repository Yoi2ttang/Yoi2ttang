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
    </Link>
  )
}
export default ContributeCard
