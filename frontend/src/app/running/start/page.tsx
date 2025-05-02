"use client"

import { useEffect, useState } from "react"
import Button from "@/components/common/Button"
import PreRunningInfo from "@/components/running/PreRunningInfo"
import { Coordinates } from "@/types/map/navermaps"
import Map from "@/components/common/Map"
import { Tile } from "@/types/map/tile"
// 테스트를 위한 임시 좌표 데이터
import { tileGetResponseList, tileGetResponseList2 } from "@/constants/tiles"

const Page = () => {
  const [loc, setLoc] = useState<Coordinates>()
  const [tiles, setTiles] = useState<Tile[]>(tileGetResponseList)
  const [useFirstSet, setUseFirstSet] = useState<boolean>(true)

  const initLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLoc({ lat: position.coords.latitude, lng: position.coords.longitude })
    })
  }

  useEffect(() => {
    initLocation()
  }, [])

  // 타일 셋 바꾸기 (api 호출 코드로 변경 필요)
  const toggleTiles = () => {
    const newTiles = useFirstSet ? tileGetResponseList2 : tileGetResponseList
    setTiles(newTiles)
    setUseFirstSet(!useFirstSet)
  }

  return (
    <div className="relative flex h-full w-full flex-col justify-center">
      <div className="flex flex-1 flex-col gap-4 overflow-hidden pb-32">
        <PreRunningInfo />
        <div className="flex flex-1">
          {loc && <Map loc={loc} tiles={tiles} zoom={15} />}
        </div>
      </div>
      <div className="absolute bottom-16 left-0 w-full space-y-2">
        {/* 타일 변경 버튼 (추후 토글 또는 드롭다운으로 변경 필요) */}
        {/* <Button className="w-full" onClick={toggleTiles}>
          타일 변경하기
        </Button> */}
        <Button className="w-full">참여하기</Button>
      </div>
    </div>
  )
}

export default Page
