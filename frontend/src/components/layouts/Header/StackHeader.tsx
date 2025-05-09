"use client"

import HeaderWrapper from "@/components/layouts/Header/HeaderWrapper"
import { cn } from "@/lib/utils"
import { ChevronLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface StackHeaderProps {
  align?: "left" | "center"
  title: string
  description?: string
  onClick?: () => void
}

const StackHeader = ({
  title,
  align = "center",
  description,
  onClick,
}: StackHeaderProps) => {
  const router = useRouter()

  const handleClick = () => {
    onClick ? onClick() : router.back()
  }

  return (
    <HeaderWrapper>
      <div className="flex h-full w-full items-center justify-between">
        <div
          className={cn(
            `flex w-full items-center gap-4`,
            align === "left" && "justify-start",
            align === "center" && "justify-between",
          )}>
          <button
            className="flex h-full cursor-pointer items-center justify-center"
            onClick={handleClick}>
            <ChevronLeftIcon className="size-7" />
          </button>
          <div className="text-title-sm">{title}</div>
          <div></div>
        </div>
        {/*  */}
        <div className="flex basis-1/3 items-center justify-end text-neutral-400">
          <p className="text-caption">{description}</p>
        </div>
      </div>
    </HeaderWrapper>
  )
}

export default StackHeader
