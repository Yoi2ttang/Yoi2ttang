import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface BadgeProps {
  className?: string
  children: ReactNode
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
