import MainHeader from "@/components/layouts/Header/MainHeader"
import NavigationBar from "@/components/layouts/navigation-bar/NavigationBar"
import { ReactNode } from "react"

interface CourseWithFullLayoutProps {
  children: ReactNode
}

const CourseWithFullLayout = ({ children }: CourseWithFullLayoutProps) => {
  return (
    <div className="pb-yoi-navbar-height">
      <MainHeader />
      {children}
      <NavigationBar />
    </div>
  )
}

export default CourseWithFullLayout
