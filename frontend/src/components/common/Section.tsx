import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface SectionProps {
  leftIcon?: ReactNode
  title: string | ReactNode
  supplement?: ReactNode | string
  children: ReactNode
  className?: string
}

const Section = ({
  leftIcon,
  title,
  supplement,
  children,
  className,
}: SectionProps) => {
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      <header className="flex w-full items-center">
        <div className="flex flex-1 gap-2">
          {leftIcon && <div>{leftIcon}</div>}
          <div className="text-title-md line-clamp-1 break-all">{title}</div>
        </div>
        {supplement && typeof supplement === "string" ? (
          <span className="text-caption text-neutral-400">{supplement}</span>
        ) : (
          <div>{supplement}</div>
        )}
      </header>
      <div>{children}</div>
    </div>
  )
}

export default Section
