import StackHeader from "@/components/layouts/Header/StackHeader"
import type { ReactNode } from "react"

interface RankingLayoutProps {
  children: ReactNode
}

const RankingLayout = ({ children }: RankingLayoutProps) => {
  return (
    <div>
      <StackHeader title="팀 랭킹" align="left" description="12시 기준" />
      <div className="bg-neutral-50 px-4">{children}</div>
    </div>
  )
}
export default RankingLayout
