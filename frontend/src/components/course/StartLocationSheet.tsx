import { MapPinnedIcon, SearchIcon } from "lucide-react"

interface StartLocationSheetProps {
  onSelectCurrentLocation: () => void
  onSelectMapLocation: () => void
  localAddress: string
  addressPOI: string | undefined
}

const StartLocationSheet = ({
  onSelectCurrentLocation,
  onSelectMapLocation,
  localAddress,
  addressPOI,
}: StartLocationSheetProps) => {
  // 숫자 또는 숫자-숫자 패턴 체크 함수

  return (
    <>
      {/* 위치 선택 */}
      <div className="flex w-full gap-4 text-neutral-400">
        <button
          onClick={onSelectCurrentLocation}
          className="flex items-center justify-center gap-2">
          <MapPinnedIcon />
          <p className="text-caption">현재 위치에서 시작하기</p>
        </button>
        <button
          onClick={onSelectMapLocation}
          className="flex items-center justify-center gap-2">
          <SearchIcon />
          <p className="text-caption">검색해서 찾아보기</p>
        </button>
      </div>
      {/* info */}
      <div className="flex flex-col gap-2">
        <h3 className="text-title-sm">{addressPOI || "알 수 없는 위치"}</h3>
        <p className="text-sm">
          <span>{localAddress}&nbsp;</span>
        </p>
      </div>
    </>
  )
}
export default StartLocationSheet
