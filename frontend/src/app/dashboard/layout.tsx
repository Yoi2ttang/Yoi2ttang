import MainHeader from "@/components/layouts/Header/MainHeader"
import NavigationBar from "@/components/layouts/navigation-bar/NavigationBar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex flex-col gap-4 pb-12">
      <MainHeader />
      {children}
      <NavigationBar />
    </div>
  )
}
export default DashboardLayout
