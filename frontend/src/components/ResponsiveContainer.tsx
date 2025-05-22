"use client"

import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import { useDevice } from "./DeviceProvider"

export default function ResponsiveContainer({
  children,
}: {
  children: ReactNode
}) {
  const { isDesktop, isMobile } = useDevice()

  return (
    <div
      className={cn(
        "mx-auto flex min-h-dvh flex-col bg-neutral-50",
        isDesktop && "w-full",
        isMobile && "max-w-yoi-width",
      )}>
      {children}
    </div>
  )
}
