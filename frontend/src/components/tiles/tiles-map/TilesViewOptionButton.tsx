import Button from "@/components/common/Button"
import { motion } from "framer-motion"
import { MenuIcon, XIcon } from "lucide-react"

interface TilesViewOptionButtonProps {
  isOpen: boolean
  onClick: () => void
}

const TilesViewOptionButton = ({
  isOpen,
  onClick,
}: TilesViewOptionButtonProps) => {
  const variants = {
    animate: (isOpen: boolean) => ({
      rotate: isOpen ? 180 : 0,
      transition: { duration: 0.3 },
    }),
    exit: {
      rotate: 0,
      transition: { duration: 0.3 },
    },
  }
  return (
    <motion.div
      custom={isOpen}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit">
      <Button
        className="flex size-12 items-center justify-center rounded-full p-1"
        onClick={onClick}>
        {isOpen ? (
          <XIcon className="size-6" />
        ) : (
          <MenuIcon className="size-6" />
        )}
      </Button>
    </motion.div>
  )
}
export default TilesViewOptionButton
