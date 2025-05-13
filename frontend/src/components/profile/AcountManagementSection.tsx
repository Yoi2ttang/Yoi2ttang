"use client"

import { BellIcon, ChevronRight, InfoIcon, LogOutIcon } from "lucide-react"
import Section from "../common/Section"
import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const AccountManagementSection = () => {
  const [curIndex, setCurIndex] = useState(-1)

  const handleClick = (index: number) => {
    setCurIndex(index === curIndex ? -1 : index)
  }

  return (
    <Section title="계정 관리" className="rounded-2xl bg-white p-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div
            className="flex cursor-pointer items-center gap-3"
            onClick={() => handleClick(0)}>
            <InfoIcon className="size-4" />
            <p>약관 및 정책</p>
          </div>

          <div
            className={cn(
              "grid transition-all duration-300 ease-in-out",
              curIndex === 0 ? "grid-rows-[1fr]" : "-mt-4 grid-rows-[0fr]",
            )}>
            <div className="flex flex-col gap-3 overflow-hidden px-2">
              <Link href="/terms/1">개인정보 처리 방침</Link>
              <Link href="/terms/2">위치 기반 서비스 이용약관</Link>
              <Link href="/terms/3">마케팅 알림 수신</Link>
            </div>
          </div>
        </div>

        <div
          className="flex cursor-pointer items-center gap-3"
          onClick={() => handleClick(0)}>
          <LogOutIcon className="size-4" />
          <p>로그아웃</p>
        </div>
      </div>
    </Section>
  )
}

export default AccountManagementSection
