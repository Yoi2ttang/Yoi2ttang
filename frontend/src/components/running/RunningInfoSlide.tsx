import { useEffect, useState, useMemo } from "react"
import clsx from "clsx"
import { debounce } from "lodash-es"
import Map from "../common/Map"
import { Coordinates } from "@/types/map/navermaps"
import { tileGetResponseList } from "@/constants/tiles"
import { Tile } from "@/types/map/tile"
import HeartRate from "@/assets/icons/running/heartRate.svg"
import FinishRunning from "@/assets/icons/running/finishRunning.svg"
import PauseRunning from "@/assets/icons/running/pauseRunning.svg"

interface RunningInfoSlideProps {
  onClose: () => void
}

const RunningInfoSlide = ({ onClose }: RunningInfoSlideProps) => {
  const [visible, setVisible] = useState(false)
  const [loc, setLoc] = useState<Coordinates>({ lat: 37.5665, lng: 126.978 })
  const [tiles, setTiles] = useState<Tile[]>(tileGetResponseList)
  const [center, setCenter] = useState<Coordinates | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 10)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  // 중심 좌표 가져오기
  const handleCenterChange = useMemo(
    () =>
      debounce((center: Coordinates) => {
        setCenter(center)
        console.log("지도 중심 좌표: ", center.lat, center.lng)
      }, 300),
    [],
  )

  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setVisible(true), 10)
    const timer2 = setTimeout(() => setShowMap(true), 300) // 애니메이션 끝난 후 지도 렌더

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-[9999] overflow-hidden">
      <div
        className={clsx(
          "bg-opacity-60 absolute top-0 right-0 flex h-full w-full flex-col gap-5 bg-white px-4 py-8 text-3xl transition-transform duration-300 ease-in-out",
          visible ? "translate-x-0" : "translate-x-full",
        )}>
        <div className="text-2xl font-semibold">러닝 기록</div>
        <div className="text-4xl font-bold italic">2.54KM</div>
        <div className="flex">
          <div className="flex flex-1 flex-col">
            <div className="text-lg text-neutral-500">이동 시간</div>
            <div className="text-xl font-semibold">01:01:30</div>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="text-lg text-neutral-500">평균 속력</div>
            <div className="text-xl font-semibold">6.1km/h</div>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col">
            <div className="text-lg text-neutral-500">소모 칼로리</div>
            <div className="text-xl font-semibold">105kcal</div>
          </div>
          <div className="flex flex-1 flex-col">
            <div className="text-lg text-neutral-500">평균 심박수</div>
            <div className="flex items-center gap-1">
              <HeartRate />
              <div className="text-xl font-semibold">131</div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="text-lg text-neutral-500">획득 타일</div>
          <div className="flex items-center gap-2">
            <div className="bg-yoi-500 size-4 rotate-12"></div>
            <div className="text-xl font-semibold">102</div>
          </div>
        </div>
        {showMap && loc && (
          <div className="flex h-52 w-52">
            <Map
              key="resultMap"
              loc={loc}
              tiles={tiles}
              zoom={15}
              onCenterChange={handleCenterChange}
            />
          </div>
        )}
        <button
          onClick={handleClose}
          className="ml-4 rounded bg-white px-4 py-2 text-black">
          닫기
        </button>
        <div className="flex items-center justify-between text-center text-sm">
          <div className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-full bg-neutral-300">
            <PauseRunning />
            일시 정지
          </div>
          <div className="bg-yoi-400 flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-full text-white">
            <FinishRunning />
            점령 완료
          </div>
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-neutral-300">
            공유
          </div>
        </div>
      </div>
    </div>
  )
}

export default RunningInfoSlide
