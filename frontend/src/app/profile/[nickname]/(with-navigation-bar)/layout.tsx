import NavigationBar from "@/components/layouts/navigation-bar/NavigationBar"
import { ReactNode } from "react"

interface WithNavigationBarLayoutProps {
  children: ReactNode
}

const WithNavigationBarLayout = ({
  children,
}: WithNavigationBarLayoutProps) => {
  return (
    <div className="pb-yoi-navbar-height bg-neutral-50">
      {children}
      <NavigationBar />
    </div>
  )
}

export default WithNavigationBarLayout
