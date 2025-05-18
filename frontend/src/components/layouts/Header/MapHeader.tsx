import Button from "@/components/common/Button"
import { cn } from "@/lib/utils"
import { ArrowLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface MapHeaderProps {
  title: string
  showBackButton?: boolean
  onBack?: () => void
  showMenuButton?: boolean
  onMenu?: () => void
}

const MapHeader = ({
  title,
  showBackButton,
  onBack,
  showMenuButton,
  onMenu,
}: MapHeaderProps) => {
  const router = useRouter()

  const handleOnClickBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.back()
    }
  }

  return (
    <div className="absolute top-2 left-0 z-100 flex h-16 w-full items-center justify-between">
      <div className="flex h-full w-full items-center justify-between gap-2 py-3">
        {/* 뒤로가기 버튼 */}
        <div className="flex h-full basis-1/5 items-center justify-center">
          {showBackButton && (
            <Button
              onClick={handleOnClickBack}
              variant="outline"
              className="size-10 rounded-full p-0">
              <ArrowLeftIcon />
            </Button>
          )}
        </div>

        {/* 타일 지도 타이틀 */}
        <div className="border-yoi-600 flex h-full flex-1 items-center justify-center rounded-full border-2 bg-white text-center">
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>

        {/* 타일 지도 타이틀 */}
        <div
          className={cn(
            "flex items-center justify-center",
            showMenuButton ? "basis-1/5" : "basis-1/6",
          )}></div>
      </div>
    </div>
  )
}
export default MapHeader
