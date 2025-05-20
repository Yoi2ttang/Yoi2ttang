import Loading from "@/components/common/Loading"
import { ReactNode, Suspense } from "react"

interface SignupLayoutProps {
  children: ReactNode
}

const SignupLayout = ({ children }: SignupLayoutProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="h-dvh overflow-hidden">{children}</div>
    </Suspense>
  )
}

export default SignupLayout
