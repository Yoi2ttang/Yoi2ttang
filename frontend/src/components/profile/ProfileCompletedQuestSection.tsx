import { ChevronRight } from "lucide-react"
import Carousel from "../common/Carousel"
import Section from "../common/Section"
import QuestCard from "../quest/QuestCard"
import Link from "next/link"

const ProfileCompletedQuestSection = () => {
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
          {Array.from({ length: 5 }).map((_, index) => (
            <QuestCard
              key={index}
              title="한강 러닝 코스"
              distance={4.3}
              showLables={false}>
              <div className="h-20 w-36 rounded-t-xl bg-neutral-200" />
            </QuestCard>
          ))}
        </Carousel>
      </div>
    </Section>
  )
}

export default ProfileCompletedQuestSection
