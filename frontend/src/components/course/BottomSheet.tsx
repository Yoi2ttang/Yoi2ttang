import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ReactNode } from "react"

interface BottomSheetProps {
  isOpen: boolean
  children: ReactNode
}

const BottomSheet = ({ isOpen, children }: BottomSheetProps) => {
  return (
    <motion.div
      className={cn(
        "absolute right-0 bottom-0 left-0 z-101 h-3/10 rounded-t-3xl bg-white inset-shadow-2xs",
      )}
      animate={{ y: isOpen ? 0 : 200 }}
      transition={{ duration: 0.3 }}>
      <div className="flex h-full w-full flex-col justify-start gap-4 px-4 py-6 pb-8">
        {children}
      </div>
    </motion.div>
  )
}
export default BottomSheet
