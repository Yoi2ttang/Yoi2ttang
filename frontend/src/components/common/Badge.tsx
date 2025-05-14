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
        "flex w-fit items-center justify-center rounded-full text-white",
        className,
      )}>
      {children}
    </div>
  )
}

export default Badge
