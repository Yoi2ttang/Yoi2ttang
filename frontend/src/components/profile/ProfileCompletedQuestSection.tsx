import { ChevronRight } from "lucide-react"
import Section from "../common/Section"

const ProfileCompletedQuestSection = () => {
  return (
    <Section
      title="완료한 퀘스트"
      supplement={<ChevronRight className="size-5 text-neutral-300" />}
      className="rounded-2xl bg-white p-6">
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="w-32 shrink-0 rounded-xl border border-neutral-100">
            <div className="h-20 w-full rounded-t-xl bg-neutral-200" />
            <div className="p-2">
              <p className="line-clamp-1">한강 러닝 코스</p>
              <p className="text-caption text-neutral-600">4.3km</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default ProfileCompletedQuestSection
