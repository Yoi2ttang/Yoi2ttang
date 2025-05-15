import { MapIcon, MapPinnedIcon } from "lucide-react"

interface StartLocationSheetProps {
  onSelectCurrentLocation: () => void
  onSelectMapLocation: () => void
  localAddress: string
}

const StartLocationSheet = ({
  onSelectCurrentLocation,
  onSelectMapLocation,
  localAddress,
}: StartLocationSheetProps) => {
  const address = localAddress.split(" ")
  const last = address[address.length - 1]
  const secondLast = address[address.length - 2]

  // 숫자 또는 숫자-숫자 패턴 체크 함수
  const isNumberOrNumberDashNumber = (str: string) =>
    /^\d+$/.test(str) || /^\d+-\d+$/.test(str)

  let buildingName = "알 수 없는 위치"
  let convertedAddress = localAddress

  if (
    last &&
    secondLast &&
    !isNumberOrNumberDashNumber(last) &&
    !isNumberOrNumberDashNumber(secondLast)
  ) {
    buildingName = `${secondLast} ${last}`
    convertedAddress = localAddress
      .replace(new RegExp(`${buildingName}$`), "")
      .trim()
  } else if (last && !isNumberOrNumberDashNumber(last)) {
    buildingName = last
    convertedAddress = localAddress
      .replace(new RegExp(`${buildingName}$`), "")
      .trim()
  }

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
          <MapIcon />
          <p className="text-caption">지도에서 선택하기</p>
        </button>
      </div>
      {/* info */}
      <div className="flex flex-col gap-2">
        <h3 className="text-title-sm">{buildingName}</h3>
        <p className="text-sm">
          <span>{convertedAddress}&nbsp;</span>
        </p>
      </div>
    </>
  )
}
export default StartLocationSheet
