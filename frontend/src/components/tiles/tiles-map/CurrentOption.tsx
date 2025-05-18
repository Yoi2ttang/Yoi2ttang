import { TileViewOption } from "@/types/map/tile"
import { XIcon } from "lucide-react"

interface CurrentOptionProps {
  selectedOption: TileViewOption | null
  onClose: () => void
}

const CurrentOption = ({ selectedOption, onClose }: CurrentOptionProps) => {
  return (
    <div className="">
      <div className="border-yoi-400 flex w-full items-center justify-center gap-4 rounded-full border bg-white/60 px-4 py-2 text-neutral-800 backdrop-blur-md">
        <span className="text-sm font-semibold">
          {selectedOption === TileViewOption.ALL
            ? "전체 점령 타일"
            : selectedOption === TileViewOption.UNCLAIMED
              ? "미점령 타일"
              : "전체 타일"}
        </span>
        <XIcon className="size-4" onClick={onClose} />
      </div>
    </div>
  )
}
export default CurrentOption
