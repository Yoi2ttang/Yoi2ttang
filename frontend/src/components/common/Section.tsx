import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  leftIcon?: ReactNode
  title: string
  rightIcon?: ReactNode
  onRightIconClick?: () => void
  children: ReactNode
  className?: string
}

const Section = (sectionProps: SectionProps) => {
  const {
    leftIcon,
    title,
    rightIcon,
    onRightIconClick,
    children,
    className = "",
  } = sectionProps

  return (
    <div className={`flex flex-col p-3 gap-3 ${className}`}>
      <header className="flex w-full items-center">
        <div className="flex flex-1 items-center gap-2">
          {leftIcon && <div>{leftIcon}</div>}
          <div>{title}</div>
        </div>
        {rightIcon && (
          <button type="button" onClick={onRightIconClick}>
            {rightIcon}
          </button>
        )}
      </header>
      <div>{children}</div>
    </div>
  )
}

export default Section
