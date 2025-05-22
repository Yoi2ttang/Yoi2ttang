import Loading from "@/components/common/Loading"
import { ReactNode, Suspense } from "react"

interface SignupLayoutProps {
  children: ReactNode
}

const SignupLayout = ({ children }: SignupLayoutProps) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}

export default SignupLayout
