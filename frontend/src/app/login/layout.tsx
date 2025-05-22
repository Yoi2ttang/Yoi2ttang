"use client"

import StackAnimated from "@/components/animated/StackAnimated"
import { ReactNode } from "react"

interface LoginLayoutProps {
  children: ReactNode
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return (
    <StackAnimated direction="up" duration={0.6}>
      {children}
    </StackAnimated>
  )
}

export default LoginLayout
