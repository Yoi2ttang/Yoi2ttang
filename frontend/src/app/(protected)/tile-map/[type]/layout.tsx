"use client"

import StackAnimated from "@/components/animated/StackAnimated"
import { ReactNode } from "react"

interface TileMapLayoutProps {
  children: ReactNode
}

const TileMapLayout = ({ children }: TileMapLayoutProps) => {
  return <StackAnimated direction="forward">{children}</StackAnimated>
}
export default TileMapLayout
