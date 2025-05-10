import { AnimalType } from "@/types/animal"
import AnimalBadge from "../animal-badges/AnimalBadge"
import FollowButton from "./FollowButton"

interface RunnerItemProps {
  nickname: string
  animalType: AnimalType
  targetId: number
}

const RunnerItem = ({ nickname, animalType, targetId }: RunnerItemProps) => {
  return (
    <div className="flex items-center rounded-xl bg-white p-4">
      <div className="flex w-full items-center gap-3">
        <div className="size-12 rounded-full bg-neutral-200" />

        <div className="flex flex-1 flex-col gap-0.5">
          <p className="line-clamp-1 break-all">{nickname}</p>
          <AnimalBadge animal={animalType} />
        </div>

        {targetId ? <FollowButton targetId={targetId} /> : null}
      </div>
    </div>
  )
}

export default RunnerItem
