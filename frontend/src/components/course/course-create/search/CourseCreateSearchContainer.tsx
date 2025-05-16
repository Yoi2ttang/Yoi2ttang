import Input from "@/components/common/Input"
import Section from "@/components/common/Section"
import StackHeader from "@/components/layouts/Header/StackHeader"
import useGetRegionSearch from "@/hooks/course/useGetRegionSearch"
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
  const { mutateAsync: getRegionSearch } = useGetRegionSearch()

  const handleSearchLocation = debounce(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const location = e.target.value
      const { items } = await getRegionSearch({
        query: location,
      })
      const searchList = items.map((item: any) => ({
        addressPOI: item.title.replace(/<[^>]+>/g, ""),
        roadAddress: item.roadAddress,
        lat: item.mapy,
        lng: item.mapx,
      })) as SearchResult[]

      setSearchLocation(searchList)
    },
    500,
  )

  const handleSelectLocation = ({
    addressPOI,
    roadAddress,
    lat,
    lng,
  }: SearchResult) => {
    updateCourseData({
      addressPOI,
      startLocation: {
        lat,
        lng,
      },
      path: [{ lat, lng }],
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
