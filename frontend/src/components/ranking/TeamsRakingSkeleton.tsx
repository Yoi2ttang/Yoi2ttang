import Skeleton from "../common/skeleton"

interface TeamsRakingSkeletonProps {}

const TeamsRakingSkeleton = ({}: TeamsRakingSkeletonProps) => {
  return (
    <div className="flex flex-col gap-4 px-4">
      <Skeleton className="h-40 w-full rounded-2xl"></Skeleton>

      <hr className="border-neutral-200" />

      {/* Ranking List Skeleton */}
      <div className="py-4">
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-xl"></Skeleton>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TeamsRakingSkeleton
