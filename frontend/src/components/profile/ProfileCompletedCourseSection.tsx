import LockIcon from "@/assets/icons/profile/lock-icon.svg"
import { ProfileResponse } from "@/types/member/member.type"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import Carousel from "../common/Carousel"
import Section from "../common/Section"
import CourseCard from "../course/CourseCard"
import { useParams } from "next/navigation"

interface ProfileCompletedCourseSectionProps {
  data: ProfileResponse
}

const ProfileCompletedCourseSection = ({
  data,
}: ProfileCompletedCourseSectionProps) => {
  const { memberId } = useParams()
  const { courses } = data

  return (
    <Section
      title="완주한 코스"
      supplement={
        courses &&
        courses.length > 0 && (
          <Link
            href={`/profile/${memberId}/courses`}
            className="flex cursor-pointer items-center gap-0.5">
            <p className="text-caption text-neutral-400">전체 보기</p>
            <ChevronRight className="size-5 text-neutral-300" />
          </Link>
        )
      }
      className="rounded-2xl bg-white p-6">
      {courses ? (
        <>
          {courses.length > 0 ? (
            <Carousel dragFree={true}>
              {courses.map((item) => (
                <CourseCard
                  key={item.courseId}
                  data={item}
                  className="mr-4 h-40 w-36"
                />
              ))}
            </Carousel>
          ) : (
            <p className="w-full text-center text-neutral-300">
              완주한 코스가 없어요
            </p>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <LockIcon className="size-5 text-neutral-300" />
          <p className="text-neutral-300">비공개로 설정 돼있어요</p>
        </div>
      )}
    </Section>
  )
}

export default ProfileCompletedCourseSection
