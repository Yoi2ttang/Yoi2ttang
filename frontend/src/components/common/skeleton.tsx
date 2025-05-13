import { cn } from "@/lib/utils"

interface SkeletonProps extends React.ComponentProps<"div"> {
  className?: string
}

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-neutral-300", className)}
      {...props}
    />
  )
}

export default Skeleton
