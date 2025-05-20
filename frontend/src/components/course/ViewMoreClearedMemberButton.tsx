"use client"

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import useDrawer from "@/hooks/common/useDrawer"
import useClearedMembers from "@/hooks/course/useClearedMembers"
import { CourseClearedMemberPaginationResponse } from "@/types/course/course.type"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
import Skeleton from "../common/skeleton"
import RunnerItem from "../profile/RunnerItem"

interface ViewMoreClearedMemberButtonProps {
  courseId: number
}

const ViewMoreClearedMemberButton = ({
  courseId,
}: ViewMoreClearedMemberButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const { targetRef, data, isLoading, isFetchingNextPage } =
    useClearedMembers(courseId)

  useDrawer({
    key: "cleared-members",
    isOpen,
    onClose: () => setIsOpen(false),
  })

  const isEmpty = !data?.pages.some(
    (page: CourseClearedMemberPaginationResponse) => page.data.length > 0,
  )

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
            <DrawerDescription className="text-yoi-500 text-center">
              🏆 명예로운 러너님들을 만나보세요
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex h-dvh flex-col gap-4 overflow-y-auto p-4">
            {isEmpty ? (
              <div className="flex items-center justify-center rounded-xl py-6 text-neutral-300">
                <p className="text-center">
                  아직 완주한 러너가 없어요
                  <br />첫 번째로 이 코스를 완주해 보세요!
                </p>
              </div>
            ) : isLoading ? (
              Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} className="h-16 shrink-0" />
              ))
            ) : (
              <>
                {data?.pages.map(
                  (page: CourseClearedMemberPaginationResponse) =>
                    page.data.map((item) => (
                      <RunnerItem
                        key={item.memberId}
                        targetId={item.memberId}
                        nickname={item.nickname}
                        animalType={"TIGER"}
                        profileImageUrl={item.profileImageUrl}
                        isFollow={null}
                      />
                    )),
                )}

                {isFetchingNextPage ? (
                  <Skeleton className="h-16" />
                ) : (
                  <div ref={targetRef} />
                )}
              </>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default ViewMoreClearedMemberButton
