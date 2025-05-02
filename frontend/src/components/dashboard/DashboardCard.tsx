import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface DashboardCardProps {
  children: ReactNode
  className?: string
}

const DashboardCard = ({ children, className }: DashboardCardProps) => {
  return (
    <div className={cn("rounded-xl bg-white px-4 py-3 shadow-2xs", className)}>
      {children}
    </div>
  )
}
export default DashboardCard
