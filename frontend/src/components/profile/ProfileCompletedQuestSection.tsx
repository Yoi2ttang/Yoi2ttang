import LockIcon from "@/assets/icons/profile/lock-icon.svg"
import { ProfileResponse } from "@/types/member/member.type"
import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Carousel from "../common/Carousel"
import Section from "../common/Section"
import QuestCard from "../quest/QuestCard"

interface ProfileCompletedQuestSectionProps {
  data: ProfileResponse
}

const ProfileCompletedQuestSection = ({
  data,
}: ProfileCompletedQuestSectionProps) => {
  const { courses } = data

  return (
    <Section
      title="완료한 퀘스트"
      supplement={
        courses &&
        courses.length > 0 && (
          <Link
            href={`/profile/jongwoo/quests`}
            className="flex cursor-pointer items-center gap-0.5">
            <p className="text-caption text-neutral-400">전체 보기</p>
            <ChevronRight className="size-5 text-neutral-300" />
          </Link>
        )
      }
      className="rounded-2xl bg-white p-6">
      {courses ? (
        <div className="flex gap-4">
          {courses.length > 0 ? (
            <Carousel>
              {courses.map((item) => (
                <QuestCard
                  key={item.courseId}
                  title={item.courseName}
                  distance={item.distance}
                  showLables={false}>
                  <div className="h-20 w-36 rounded-t-xl">
                    <Image
                      src={item.courseImageUrl}
                      alt=""
                      fill
                      className="rounded-t-xl object-cover"
                    />
                  </div>
                </QuestCard>
              ))}
            </Carousel>
          ) : (
            <p className="w-full text-center text-neutral-300">
              완료한 퀘스트가 없어요
            </p>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <LockIcon className="size-5 text-neutral-300" />
          <p className="text-neutral-300">비공개로 설정 돼있어요</p>
        </div>
      )}
    </Section>
  )
}

export default ProfileCompletedQuestSection
