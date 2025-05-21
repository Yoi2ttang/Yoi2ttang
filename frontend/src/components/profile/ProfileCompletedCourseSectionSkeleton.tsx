import Carousel from "../common/Carousel"
import Section from "../common/Section"

const ProfileCompletedCourseSectionSkeleton = () => {
  return (
    <Section title="완주한 코스" className="rounded-2xl bg-white p-6">
      <Carousel dragFree={true}>
        <div className="mr-4 h-40 w-36 shrink-0 animate-pulse rounded-xl bg-neutral-200"></div>
        <div className="mr-4 h-40 w-36 shrink-0 animate-pulse rounded-xl bg-neutral-200"></div>
      </Carousel>
    </Section>
  )
}

export default ProfileCompletedCourseSectionSkeleton
