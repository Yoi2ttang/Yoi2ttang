import { ReactNode } from "react"

interface CourseLayoutProps {
  children: ReactNode
}

const CourseLayout = ({ children }: CourseLayoutProps) => {
  return <>{children}</>
}

export default CourseLayout
