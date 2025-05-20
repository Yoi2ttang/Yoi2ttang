import { ReactNode } from "react"

interface ProfileLayoutProps {
  children: ReactNode
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return <>{children}</>
}

export default ProfileLayout
