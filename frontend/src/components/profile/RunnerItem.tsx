import KakaoProfileImage from "@/assets/images/profile/kakao_profile.jpg"
import { AnimalType } from "@/types/animal"
import Image from "next/image"
import AnimalBadge from "../animal-badges/AnimalBadge"

interface RunnerItemProps {
  targetId: number
  nickname: string
  animalType: AnimalType
  profileImageUrl: string
}

const RunnerItem = ({ nickname, animalType, targetId }: RunnerItemProps) => {
  return (
    <div className="flex items-center rounded-xl bg-white p-4">
      <div className="flex w-full items-center gap-3">
        <Image
          src={KakaoProfileImage}
          alt=""
          width={52}
          height={52}
          className="rounded-full"
        />

        <div className="flex flex-1 flex-col gap-0.5">
          <p className="line-clamp-1 break-all">{nickname}</p>
          <AnimalBadge animal={animalType} />
        </div>

        {/* {targetId ? <FollowButton targetId={targetId} /> : null} */}
      </div>
    </div>
  )
}

export default RunnerItem
