"use client"

import Carousel from "@/components/common/Carousel"
import Section from "@/components/common/Section"
import ClearedMemberItem from "@/components/course/ClearedMemberItem"
import ViewMoreClearedMemberButton from "@/components/course/ViewMoreClearedMemberButton"
import useGetClearedMemberPreview from "@/hooks/course/useGetClearedMemberPreview"
import Skeleton from "../common/skeleton"

interface CourseMemberSectionProps {
  courseId: number
}

const CourseMemberSection = ({ courseId }: CourseMemberSectionProps) => {
  const { data, isLoading, isError } = useGetClearedMemberPreview(courseId)
  const isEmpty = !data || data.length === 0

  return (
    <Section
      title="코스 완주 러너"
      supplement={
        !isEmpty && <ViewMoreClearedMemberButton courseId={courseId} />
      }
      className="w-full rounded-xl bg-white p-6">
      {isError ? (
        <p className="text-center text-neutral-300">
          잠시 후 다시 시도해 주세요
        </p>
      ) : isLoading ? (
        <Skeleton className="h-32" />
      ) : isEmpty ? (
        <p className="text-center text-neutral-300">완주한 러너가 없습니다</p>
      ) : (
        <Carousel dragFree={true} skipSnaps={false}>
          {data.map((item) => (
            <ClearedMemberItem key={item.memberId} data={item} />
          ))}
        </Carousel>
      )}
    </Section>
  )
}

export default CourseMemberSection
