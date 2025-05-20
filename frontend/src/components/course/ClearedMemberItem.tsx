import { CourseClearedMember } from "@/types/course/course.type"
import Image from "next/image"
import Link from "next/link"

interface ClearedMemberItemProps {
  data: CourseClearedMember
}

const ClearedMemberItem = ({ data }: ClearedMemberItemProps) => {
  const { memberId, nickname, profileImageUrl } = data

  return (
    <Link
      href={`/profile/${memberId}`}
      className="flex w-20 shrink-0 flex-col items-center gap-1">
      <div className="relative size-12">
        <Image
          src={profileImageUrl}
          alt=""
          fill
          className="order rounded-full border-neutral-200"
        />
      </div>
      <p className="text-caption line-clamp-1 break-all">{nickname}</p>
    </Link>
  )
}

export default ClearedMemberItem
