"use client"

import Button from "@/components/common/Button"
import TilesMap from "@/components/tiles/TilesMap"
import { ArrowLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { use } from "react"

interface TileMapPageProps {
  params: Promise<{
    type: "my" | "team"
  }>
}

const TileMapPage = ({ params }: TileMapPageProps) => {
  const { type } = use(params)
  const isMyTileMap = type === "my"

  const router = useRouter()

  return (
    <div className="relative flex h-dvh w-full flex-col gap-4 bg-amber-100">
      <TilesMap />
      <div className="absolute bottom-10 flex w-full items-center justify-center gap-2">
        <Button
          className="flex items-center gap-2"
          onClick={() => router.back()}>
          <ArrowLeftIcon className="size-4" />
          <span>돌아가기</span>
        </Button>
      </div>
    </div>
  )
}
export default TileMapPage
