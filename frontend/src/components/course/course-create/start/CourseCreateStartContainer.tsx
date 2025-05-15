import { getReverseGeocode } from "@/lib/utils"
import { CourseData } from "@/types/course.type"
import { Coordinates, NaverMap } from "@/types/map/navermaps"
import { useRef } from "react"
import BottomSheet from "../../BottomSheet"
import CourseCreateMap from "../../CourseCreateMap"
import CourseHeader from "../../CourseHeader"
import StartLocationSheet from "../../StartLocationSheet"

interface CourseCreateStartContainerProps {
  title: string
  onBack: () => void
  handleSearchStep: () => void
  updateCourseData: (data: Partial<CourseData>) => void
  localAddress: string
}

const CourseCreateStartContainer = ({
  title,
  onBack,
  handleSearchStep,
  updateCourseData,
  localAddress,
}: CourseCreateStartContainerProps) => {
  const mapRef = useRef<NaverMap | null>(null)

  const handleDragEnd = async ({ lat, lng }: Coordinates) => {
    const reverseGeocode = await getReverseGeocode({ lat, lng })
    const address = reverseGeocode.v2.address.roadAddress

    updateCourseData({
      startLocation: { lat, lng },
      path: [{ lat, lng }],
      localAddress: address,
    })
  }

  const handleSelectCurrentLocation = async () => {
    if (!mapRef.current) return
    // 현재 위치로 이동하기
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude: lat, longitude: lng } = position.coords
      mapRef.current?.panTo({ lat, lng })

      const reverseGeocode = await getReverseGeocode({ lat, lng })
      const address = reverseGeocode.v2.address.roadAddress

      updateCourseData({
        startLocation: { lat, lng },
        path: [{ lat, lng }],
        localAddress: address,
      })
    })
  }

  return (
    <>
      <CourseHeader title={title} showBackButton={true} onBack={onBack} />
      <CourseCreateMap ref={mapRef} handleDragEnd={handleDragEnd} />
      <BottomSheet isOpen={true}>
        <StartLocationSheet
          localAddress={localAddress}
          onSelectCurrentLocation={handleSelectCurrentLocation}
          onSelectMapLocation={handleSearchStep}
        />
      </BottomSheet>
    </>
  )
}
export default CourseCreateStartContainer
