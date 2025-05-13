"use client"

import Button from "@/components/common/Button"
import BottomSheet from "@/components/course/BottomSheet"
import CourseCreateMap from "@/components/course/CourseCreateMap"
import CourseHeader from "@/components/course/CourseHeader"
import StartLocationSheet from "@/components/course/StartLocationSheet"

interface QuestCreatePageProps {}

const QuestCreatePage = ({}: QuestCreatePageProps) => {
  const handleSelectCurrentLocation = () => {
    console.log("현재 위치 선택")
  }

  const handleSelectMapLocation = () => {
    console.log("지도 위치 선택")
  }
  return (
    <div className="relative h-dvh w-full">
      <CourseHeader title="출발지 설정하기" />
      <CourseCreateMap />
      <BottomSheet>
        <StartLocationSheet
          onSelectCurrentLocation={handleSelectCurrentLocation}
          onSelectMapLocation={handleSelectMapLocation}
        />
      </BottomSheet>
      <div className="fixed right-0 bottom-10 left-0 z-101 px-4">
        <Button className="w-full">출발지 설정하기</Button>
      </div>
    </div>
  )
}
export default QuestCreatePage
