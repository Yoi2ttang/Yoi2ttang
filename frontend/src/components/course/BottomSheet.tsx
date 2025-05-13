import { ReactNode } from "react"

interface BottomSheetProps {
  children: ReactNode
}

const BottomSheet = ({ children }: BottomSheetProps) => {
  return (
    <div className="absolute right-0 bottom-0 left-0 z-101 h-1/3 rounded-t-3xl bg-white inset-shadow-2xs">
      <div className="flex h-full w-full flex-col justify-start gap-5 px-4 py-6 pb-8">
        {children}
      </div>
    </div>
  )
}
export default BottomSheet
