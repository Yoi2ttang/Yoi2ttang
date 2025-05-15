"use client"

import HeaderWrapper from "@/components/layouts/Header/HeaderWrapper"
import { ChevronLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"

interface StackHeaderProps {
  title: string
  supplement?: string | ReactNode
  onClick?: () => void
}

const StackHeader = ({ title, supplement, onClick }: StackHeaderProps) => {
  const router = useRouter()

  const handleClick = () => {
    onClick ? onClick() : router.back()
  }

  return (
    <HeaderWrapper>
      <div className="flex h-full w-full items-center">
        <button
          className="flex h-full basis-1/5 cursor-pointer items-center"
          onClick={handleClick}>
          <ChevronLeftIcon className="size-7" />
        </button>
        <div className="text-title-sm flex-1 text-center">{title}</div>
        <div className="flex basis-1/5 justify-end">{supplement}</div>
      </div>
    </HeaderWrapper>
  )
}

export default StackHeader
