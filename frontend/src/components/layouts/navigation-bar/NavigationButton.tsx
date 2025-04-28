"use client"

import Link from "next/link"
import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavigationButtonProps {
  href: string
  icon: ReactNode
  label: string
}

const NavigationButton = (data: NavigationButtonProps) => {
  const { href, icon, label } = data
  const pathname = usePathname()

  return (
    <Link
      href={href}
      className={cn(
        "flex flex-col items-center gap-0.5",
        pathname.startsWith(href) ? "text-orange-600" : "text-neutral-300",
      )}>
      {icon}
      <p className="text-xs">{label}</p>
    </Link>
  )
}

export default NavigationButton
