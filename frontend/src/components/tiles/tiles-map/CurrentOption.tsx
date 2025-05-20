import { TileViewOption } from "@/types/map/tile"
import { XIcon } from "lucide-react"
import { useMemo } from "react"

interface CurrentOptionProps {
  selectedOption: TileViewOption | null
  onClose: () => void
}

const CurrentOption = ({ selectedOption, onClose }: CurrentOptionProps) => {
  const value = useMemo(() => {
    switch (selectedOption) {
      case TileViewOption.ALL:
        return "전체 점령 타일"
      case TileViewOption.UNCLAIMED:
        return "미점령 타일"
      case TileViewOption.MY:
        return "나의 타일"
      case TileViewOption.TEAM:
        return "팀 타일"
    }
  }, [selectedOption])

  return (
    <div className="">
      <div className="border-yoi-400 flex w-full items-center justify-center gap-4 rounded-full border bg-white/60 px-4 py-2 text-neutral-800 backdrop-blur-md">
        <span className="text-sm font-semibold">{value}</span>
        <XIcon className="size-4" onClick={onClose} />
      </div>
    </div>
  )
}
export default CurrentOption
