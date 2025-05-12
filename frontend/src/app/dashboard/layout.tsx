import MainHeader from "@/components/layouts/Header/MainHeader"
import NavigationBar from "@/components/layouts/navigation-bar/NavigationBar"
import { ReactNode, Suspense } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="mb-20 flex flex-col gap-4">
      <MainHeader />
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      <NavigationBar />
    </div>
  )
}
export default DashboardLayout
