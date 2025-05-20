import Loading from "@/components/common/Loading"
import { ReactNode, Suspense } from "react"

interface QuestCreateLayoutProps {
  children: ReactNode
}

const QuestCreateLayout = ({ children }: QuestCreateLayoutProps) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}
export default QuestCreateLayout
