import Section from "../common/Section"

const ProfileRunningRecordSectionSkeleton = () => {
  return (
    <Section title="러닝 기록" className="rounded-2xl bg-white p-6">
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="size-10 animate-pulse rounded-full bg-neutral-200" />
            <div className="flex flex-col gap-1">
              <p className="h-5 w-36 animate-pulse rounded-xl bg-neutral-200" />
              <p className="h-5 w-1/2 animate-pulse rounded-xl bg-neutral-200" />
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default ProfileRunningRecordSectionSkeleton
