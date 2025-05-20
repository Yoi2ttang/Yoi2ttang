import NavigationBar from "@/components/layouts/navigation-bar/NavigationBar"
import { ReactNode } from "react"

interface ProfileWithNavigationBarLayoutProps {
  children: ReactNode
}

const ProfileWithNavigationBarLayout = ({
  children,
}: ProfileWithNavigationBarLayoutProps) => {
  return (
    <div className="pb-yoi-navbar-height">
      {children}
      <NavigationBar />
    </div>
  )
}

export default ProfileWithNavigationBarLayout
