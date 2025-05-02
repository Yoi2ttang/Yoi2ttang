"use client"

import { useEffect, useState } from "react"
import Button from "@/components/common/Button"
import PreRunningInfo from "@/components/running/PreRunningInfo"
import { Coordinates } from "@/types/map/navermaps"
import Map from "@/components/running/Map"
import { tileGetResponseList } from "@/constants/tiles"

const Page = () => {
  const [loc, setLoc] = useState<Coordinates>()

  const initLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLoc({ lat: position.coords.latitude, lng: position.coords.longitude })
    })
  }

  useEffect(() => {
    initLocation()
  }, [])

  return (
    <div className="relative flex h-full w-full flex-col">
      <div className="flex flex-1 flex-col gap-4 overflow-hidden pb-32">
        <PreRunningInfo />
        <div className="flex flex-1">
          {loc && <Map loc={loc} tiles={tileGetResponseList} zoom={15} />}
        </div>
      </div>
      <div className="fixed bottom-20 left-0 w-full px-4">
        <Button className="w-full">참여하기</Button>
      </div>
    </div>
  )
}

export default Page
