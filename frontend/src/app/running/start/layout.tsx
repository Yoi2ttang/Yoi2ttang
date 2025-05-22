import "@/app/globals.css"
import MainHeader from "@/components/layouts/Header/MainHeader"
import NavigationBar from "@/components/layouts/navigation-bar/NavigationBar"
import { ReactNode } from "react"

interface LayoutProps {
  children: ReactNode
}

const RunningStartLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-dvh max-h-dvh w-full flex-col">
      <MainHeader />
      <div className="flex flex-1 p-4">{children}</div>
      <NavigationBar />
    </div>
  )
}

export default RunningStartLayout
