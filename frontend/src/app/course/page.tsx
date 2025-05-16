"use client"

import Button from "@/components/common/Button"
import Image from "next/image"
import Link from "next/link"

interface QuestPageProps {}

const QuestPage = ({}: QuestPageProps) => {
  return (
    <div className="relative flex h-dvh flex-1 flex-col gap-10 px-4">
      <div className="mt-6 w-full">
        <h1 className="mb-4 text-2xl font-bold">퀘스트 목록</h1>

        <Image
          src="/api/map-capture"
          alt="map"
          width={1000}
          height={1000}
          className="w-full"
        />
      </div>

      <div className="fixed right-4 bottom-4">
        <Link href="/course/create">
          <Button>퀘스트 생성</Button>
        </Link>
      </div>
    </div>
  )
}
export default QuestPage
