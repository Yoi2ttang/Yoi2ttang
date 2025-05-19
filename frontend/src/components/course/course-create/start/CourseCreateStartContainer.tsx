import { getReverseGeocode } from "@/lib/utils"
import { CourseData } from "@/types/course.type"
import { Coordinates, NaverMap } from "@/types/map/navermaps"
import { RefObject, useRef } from "react"
import BottomSheet from "../../BottomSheet"
import CourseCreateMap from "../../CourseCreateMap"
import CourseHeader from "../../CourseHeader"
import StartLocationSheet from "../../StartLocationSheet"

interface CourseCreateStartContainerProps {
  isSearch: RefObject<boolean>
  courseData: CourseData
  title: string
  onBack: () => void
  handleSearchStep: () => void
  updateCourseData: (data: Partial<CourseData>) => void
}

const CourseCreateStartContainer = ({
  isSearch,
  courseData,
  title,
  onBack,
  handleSearchStep,
  updateCourseData,
}: CourseCreateStartContainerProps) => {
  const mapRef = useRef<NaverMap | null>(null)

  const isNumberOrNumberDashNumber = (str: string) =>
    /^\d+$/.test(str) || /^\d+-\d+$/.test(str)

  const handleDragEnd = async ({ lat, lng }: Coordinates) => {
    if (isSearch.current) {
      isSearch.current = false
      return
    }

    const reverseGeocode = await getReverseGeocode({ lat, lng })
    const address = reverseGeocode.v2.address.roadAddress

    const { title, convertedAddress } = handleConvertedAddress(address)

    // TODO : 검색 후 지도로 다시 돌아와 렌더링 될 때 센터가 바뀌면서 해당 함수가 실행되어, 검색 후 locationAddress가 반영이 안됨
    updateCourseData({
      addressPOI: title,
      startLocation: { lat, lng },
      path: [{ lat, lng }],
      localAddress: convertedAddress,
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

      const { title, convertedAddress } = handleConvertedAddress(address)

      updateCourseData({
        addressPOI: title,
        startLocation: { lat, lng },
        path: [{ lat, lng }],
        localAddress: convertedAddress,
      })
    })
  }

  const handleConvertedAddress = (localAddress: string) => {
    let buildingName = ""

    const address = localAddress.split(" ")
    const last = address[address.length - 1]
    const secondLast = address[address.length - 2]

    let convertedAddress = localAddress

    if (
      courseData.addressPOI !== undefined &&
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

    const title =
      courseData.addressPOI !== undefined ? courseData.addressPOI : buildingName

    return { title, convertedAddress }
  }

  return (
    <>
      <CourseHeader title={title} showBackButton={true} onBack={onBack} />
      <CourseCreateMap
        ref={mapRef}
        handleDragEnd={handleDragEnd}
        startLocation={courseData?.startLocation}
      />
      <BottomSheet isOpen={true}>
        <StartLocationSheet
          addressPOI={courseData.addressPOI}
          localAddress={courseData.localAddress}
          onSelectCurrentLocation={handleSelectCurrentLocation}
          onSelectMapLocation={handleSearchStep}
        />
      </BottomSheet>
    </>
  )
}
export default CourseCreateStartContainer
