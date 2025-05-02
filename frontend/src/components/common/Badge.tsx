import { cn } from "@/lib/utils"

interface BadgeProps {
  className?: string
  children: React.ReactNode
}

const Badge = ({ className, children }: BadgeProps) => {
  return (
    <div
      className={cn(
        "flex h-6 w-20 items-center justify-center rounded-full px-1 py-0.5 text-white",
        className,
      )}>
      {children}
    </div>
  )
}

export default Badge
