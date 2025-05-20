import { NavigationDirection } from "@/types/course.type"
import { AnimatePresence, motion } from "framer-motion"
import { ReactNode } from "react"

interface StackAnimatedProps<T extends string | number> {
  duration?: number
  step?: T
  children: ReactNode
  direction: NavigationDirection
}

const StackAnimated = <T extends string | number>({
  duration = 0.4,
  step,
  children,
  direction,
}: StackAnimatedProps<T>) => {
  const variants = {
    initial: (direction: NavigationDirection) => ({
      x: direction === "forward" ? 800 : -800,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration },
    },
    exit: {
      x: 0,
      opacity: 0.9,
      transition: { duration },
    },
  }
  return (
    <AnimatePresence mode="popLayout" custom={direction}>
      <motion.div
        key={step}
        custom={direction}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit">
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
export default StackAnimated
