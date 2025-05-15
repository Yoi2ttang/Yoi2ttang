import Input from "@/components/common/Input"
import Section from "@/components/common/Section"
import StackHeader from "@/components/layouts/Header/StackHeader"
import { getRegionSearch } from "@/services/course/api"
import { CourseData, SearchResult } from "@/types/course.type"
import { debounce } from "lodash-es"
import { ChangeEvent, useState } from "react"
import SearchResultList from "./SearchResultList"

interface CourseCreateSearchContainerProps {
  title: string
  onPrevStep: () => void
  updateCourseData: (data: Partial<CourseData>) => void
}

const CourseCreateSearchContainer = ({
  title,
  onPrevStep,
  updateCourseData,
}: CourseCreateSearchContainerProps) => {
  const [searchLocation, setSearchLocation] = useState<SearchResult[]>([])

  const handleSearchLocation = debounce(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const location = e.target.value
      const { items } = await getRegionSearch({
        query: location,
      })
      const searchList = items.map((item: any) => ({
        title: item.title,
        roadAddress: item.roadAddress,
        lat: item.mapx,
        lng: item.mapy,
      }))

      setSearchLocation(searchList)
    },
    500,
  )

  const handleSelectLocation = ({
    title,
    roadAddress,
    lat,
    lng,
  }: SearchResult) => {
    updateCourseData({
      startLocation: {
        lat,
        lng,
      },
      localAddress: roadAddress,
    })
  }

  return (
    <div className="h-full w-full bg-neutral-50">
      <StackHeader onClick={onPrevStep} title={""} />
      <div className="flex flex-col gap-8 px-4 py-10">
        <Section title={`✨ ${title} ✨`}>
          <Input
            placeholder="지역을 입력해주세요."
            onChange={handleSearchLocation}
          />
        </Section>
        <SearchResultList
          handleSelectLocation={handleSelectLocation}
          searchLocation={searchLocation}
        />
      </div>
    </div>
  )
}
export default CourseCreateSearchContainer
