"use client"

import StackAnimated from "@/components/animated/StackAnimated"
import { ReactNode } from "react"

interface LoginLayoutProps {
  children: ReactNode
}

const LoginLayout = ({ children }: LoginLayoutProps) => {
  return <StackAnimated direction="forward">{children}</StackAnimated>
}

export default LoginLayout
