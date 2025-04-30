interface BadgeProps {
  className?: string
  bgColorClass?: string
  children?: React.ReactNode
}

const Badge = ({ className = "", children }: BadgeProps) => {
  return (
    <div
      className={`${className} flex items-center justify-center rounded-full py-0.5 px-1 w-20 h-6 text-xs text-white`}>
      {children ?? <span>기본 뱃지</span>}
    </div>
  )
}

export default Badge
