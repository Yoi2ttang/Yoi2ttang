import Input from "@/components/common/Input"
import Section from "@/components/common/Section"
import StackHeader from "@/components/layouts/Header/StackHeader"
import { CourseData, SearchResult } from "@/types/course.type"
import { ChangeEvent, useState } from "react"
import SearchResultListWrapper from "./SearchResultListWrapper"

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
  const [query, setQuery] = useState<string>("")

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setQuery(query)
  }

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
            ref={(el) => {
              if (el) {
                if (el.value === "") {
                  el.focus()
                }
              }
            }}
            placeholder="지역을 입력해주세요."
            onChange={handleInputChange}
          />
        </Section>
        <SearchResultListWrapper
          query={query}
          handleSelectLocation={handleSelectLocation}
        />
      </div>
    </div>
  )
}
export default CourseCreateSearchContainer
