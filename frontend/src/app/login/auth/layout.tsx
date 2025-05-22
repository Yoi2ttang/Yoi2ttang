import Loading from "@/components/common/Loading"
import { ReactNode, Suspense } from "react"

interface LoginAuthLayoutProps {
  children: ReactNode
}

const LoginAuthLayout = ({ children }: LoginAuthLayoutProps) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>
}

export default LoginAuthLayout
