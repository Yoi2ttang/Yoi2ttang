import NavigationBar from "@/components/layouts/navigation-bar/NavigationBar"
import { ReactNode } from "react"

interface CourseWithNavigationBarLayoutProps {
  children: ReactNode
}

const CourseWithNavigationBarLayout = ({
  children,
}: CourseWithNavigationBarLayoutProps) => {
  return (
    <div className="pb-yoi-navbar-height">
      {children}
      <NavigationBar />
    </div>
  )
}

export default CourseWithNavigationBarLayout
