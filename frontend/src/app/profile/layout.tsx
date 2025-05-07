import NavigationBar from "@/components/layouts/navigation-bar/NavigationBar"
import { ReactNode } from "react"

interface ProfileLayoutProps {
  children: ReactNode
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className="pb-yoi-navbar-height h-full bg-neutral-50">
      {children}
      <NavigationBar />
    </div>
  )
}

export default ProfileLayout
