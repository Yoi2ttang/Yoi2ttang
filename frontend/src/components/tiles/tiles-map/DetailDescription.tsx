import Button from "@/components/common/Button"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { InfoIcon } from "lucide-react"
import { useState } from "react"

interface DetailDescriptionProps {}

const metadata = [
  {
    title: "내 타일",
    color: "bg-[#37E851]/40",
  },
  {
    title: "내 타일 점령 못한 타일",
    color: "bg-[#FF5959]/40",
  },
  {
    title: "점령 못한 타일",
    color: "bg-[#000000]/40",
  },
]
const DetailDescription = ({}: DetailDescriptionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)

    setTimeout(() => {
      setIsOpen(false)
    }, 3000)
  }
  return (
    <div className="absolute top-20 left-5 z-102">
      <Button
        className="flex items-center justify-center rounded-full border-2 border-neutral-200 bg-white p-2 drop-shadow-2xl"
        onClick={handleClick}>
        <InfoIcon className="size-5 text-neutral-500" />
      </Button>
      {
        <AnimatePresence mode="wait">
          <motion.section
            key={isOpen ? "open" : "close"}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col rounded-2xl bg-white drop-shadow-md">
            {metadata.map(({ color, title }, index) => (
              <div key={index} className="flex items-center gap-2 px-3 py-2">
                <span
                  className={cn(
                    "text-caption aspect-square size-5 rotate-5 rounded-md",
                    color,
                  )}></span>
                <span className="text-caption text-neutral-500">{title}</span>
              </div>
            ))}
          </motion.section>
        </AnimatePresence>
      }
    </div>
  )
}
export default DetailDescription
