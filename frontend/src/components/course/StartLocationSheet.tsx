import { MapIcon, MapPinnedIcon } from "lucide-react"

interface StartLocationSheetProps {
  onSelectCurrentLocation: () => void
  onSelectMapLocation: () => void
}

const StartLocationSheet = ({
  onSelectCurrentLocation,
  onSelectMapLocation,
}: StartLocationSheetProps) => {
  return (
    <>
      {/* 위치 선택 */}
      <div className="flex gap-1 text-neutral-400">
        <button
          onClick={onSelectCurrentLocation}
          className="flex w-full items-center justify-center gap-2">
          <MapPinnedIcon />
          <p className="text-caption">현재 위치에서 시작하기</p>
        </button>
        <button
          onClick={onSelectMapLocation}
          className="flex w-full items-center justify-center gap-2">
          <MapIcon />
          <p className="text-caption">지도에서 선택하기</p>
        </button>
      </div>
      {/* info */}
      <div className="flex flex-col gap-2">
        <h3 className="text-title-sm">{"알 수 없는 위치"}</h3>
        <p className="text-sm">{"서울특별시 강남구 테헤란로 2222"}</p>
      </div>
    </>
  )
}
export default StartLocationSheet
