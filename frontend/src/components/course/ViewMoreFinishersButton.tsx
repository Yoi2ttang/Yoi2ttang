"use client"

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import useDrawer from "@/hooks/common/useDrawer"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import RunnerItem from "../profile/RunnerItem"

const ViewMoreFinishersButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  useDrawer({
    key: "view-more=finisher",
    isOpen,
    onClose: () => setIsOpen(false),
  })

  return (
    <div>
      <button
        className="flex cursor-pointer items-center gap-1"
        onClick={() => setIsOpen(true)}>
        <span className="text-caption text-neutral-400">전체 보기</span>
        <ChevronRight className="size-5 text-neutral-300" />
      </button>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader className="p-2">
            <DrawerTitle className="text-title-sm text-center">
              코스 완주 러너
            </DrawerTitle>
            <DrawerDescription className="text-center text-neutral-500">
              🏆 명예로운 러너님들을 만나보세요
            </DrawerDescription>
          </DrawerHeader>

          <div className="h-dvh overflow-y-auto">
            {Array.from({ length: 3 }).map((_, index) => (
              <RunnerItem
                key={index}
                targetId={index + 1}
                nickname={`호랑이${index + 1}`}
                animalType="TIGER"
                profileImageUrl={""}
              />
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default ViewMoreFinishersButton
