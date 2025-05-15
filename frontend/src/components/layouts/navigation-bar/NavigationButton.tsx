"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

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
        pathname.startsWith(href) ? "text-yoi-500" : "text-neutral-300",
      )}>
      {icon}
      <p className="text-xs">{label}</p>
    </Link>
  )
}

export default NavigationButton
