import type { ReactNode } from "react"

interface RankingLayoutProps {
  children: ReactNode
}

const RankingLayout = ({ children }: RankingLayoutProps) => {
  return <div>{children}</div>
}
export default RankingLayout
