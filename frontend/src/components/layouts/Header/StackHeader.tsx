"use client"

import HeaderWrapper from "@/components/layouts/Header/HeaderWrapper"
import { cn } from "@/lib/utils"
import { ChevronLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface StackHeaderProps {
  align?: "left" | "center"
  title: string
  description?: string
}

const StackHeader = ({
  title,
  align = "center",
  description,
}: StackHeaderProps) => {
  const router = useRouter()

  return (
    <HeaderWrapper>
      <div className="flex w-full items-center justify-between">
        <div
          className={cn(
            `flex w-full items-center gap-4`,
            align === "left" && "justify-start",
            align === "center" && "justify-between",
          )}>
          <div className="basis-1/3">
            <button
              className="h-full cursor-pointer p-3"
              onClick={() => router.back()}>
              <ChevronLeftIcon className="size-7" />
            </button>
          </div>
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
