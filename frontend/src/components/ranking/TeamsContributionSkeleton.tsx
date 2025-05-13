import Skeleton from "../common/skeleton"

interface TeamsContributionSkeletonProps {}

const TeamsContributionSkeleton = ({}: TeamsContributionSkeletonProps) => {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} className="h-16 w-full rounded-xl"></Skeleton>
      ))}
    </div>
  )
}
export default TeamsContributionSkeleton
