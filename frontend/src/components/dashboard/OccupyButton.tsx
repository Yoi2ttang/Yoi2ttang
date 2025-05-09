"use client"

import Button from "@/components/common/Button"
import { PersonStanding } from "lucide-react"
import { useRouter } from "next/navigation"
const OccupyButton = () => {
  const router = useRouter()

  const handleClick = () => {
    router.push("/running/start")
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={handleClick}
        className="active:bg-yoi-50 flex items-center justify-center gap-2 transition active:scale-95"
        variant="outline">
        <span className="text-title-sm">점령하러가기</span>
        <PersonStanding className="text-yoi-500 size-5" />
      </Button>
    </div>
  )
}
export default OccupyButton
