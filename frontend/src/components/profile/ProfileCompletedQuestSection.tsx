import { ChevronRight } from "lucide-react"
import Carousel from "../common/Carousel"
import Section from "../common/Section"
import QuestCard from "../quest/QuestCard"
import Link from "next/link"
import { ProfileResponse } from "@/types/member"
import Image from "next/image"

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
        <Link href={`/profile/jongwoo/quests`} className="cursor-pointer">
          <ChevronRight className="size-5 text-neutral-300" />
        </Link>
      }
      className="rounded-2xl bg-white p-6">
      <div className="flex gap-4">
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
      </div>
    </Section>
  )
}

export default ProfileCompletedQuestSection
