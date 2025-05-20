"use client"

import BlockIcon from "@/assets/icons/profile/block-icon.svg"
import { animalMetaData, animalNumberMap } from "@/constants/animals"
import { cn } from "@/lib/utils"
import { AnimalType } from "@/types/animal"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const variant = {
  hidden: { y: 20, opacity: 0 },
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 5,
      delay: i * 0.15,
    },
  }),
}

const movePositions = [
  { x: "0%", y: "0%" },
  { x: "-50%", y: "35%" },
  { x: "-115%", y: "60%" },
  { x: "-50%", y: "100%" },
  { x: "-115%", y: "140%" },
  { x: "-115%", y: "140%" },
]

const LoginAnimation = () => {
  const [step, setStep] = useState(0)
  const [animalType, setAnimalType] = useState<AnimalType | null>(null)
  const AnimalIcon = animalType ? animalMetaData[animalType]?.icon : null
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const animalTypes = Object.values(animalNumberMap)
    const randomIndex = Math.floor(Math.random() * animalTypes.length)
    setAnimalType(animalTypes[randomIndex])

    timerRef.current = setInterval(() => {
      setStep((prev) => {
        if (prev < movePositions.length - 1) {
          return prev + 1
        } else {
          if (timerRef.current) {
            clearInterval(timerRef.current)
          }
          return prev
        }
      })
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  return (
    <div className="relative h-72 w-80 max-w-full self-center">
      {/* 3 */}
      <motion.div
        custom={0}
        variants={variant}
        initial="hidden"
        animate="show"
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[115%]",
        )}>
        <BlockIcon className="size-24 stroke-black text-neutral-200" />
      </motion.div>

      {/* 6 */}
      <motion.div
        custom={0}
        variants={variant}
        initial="hidden"
        animate="show"
        className={cn(
          "absolute top-1/2 left-1/2 translate-x-[10%] -translate-y-[80%]",
        )}>
        <BlockIcon
          className={cn(
            "size-24 stroke-black text-neutral-200 transition-colors duration-200",
            step >= 2 && "text-yoi-500",
          )}
        />
      </motion.div>

      {/* 9 */}
      <motion.div
        custom={0}
        variants={variant}
        initial="hidden"
        animate="show"
        className={cn(
          "absolute top-1/2 left-1/2 translate-x-[70%] -translate-y-1/2",
        )}>
        <BlockIcon className="size-24 stroke-black text-neutral-200" />
      </motion.div>

      {/* 2 */}
      <motion.div
        custom={1}
        variants={variant}
        initial="hidden"
        animate="show"
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-[110%] -translate-y-[80%]",
        )}>
        <BlockIcon className="size-24 stroke-black text-neutral-200" />
      </motion.div>

      {/* 5 */}
      <motion.div
        custom={1}
        variants={variant}
        initial="hidden"
        animate="show"
        className={cn("absolute top-1/2 left-1/2 -translate-1/2")}>
        <BlockIcon
          className={cn(
            "size-24 stroke-black text-neutral-200 transition-colors duration-200",
            step >= 3 && "text-yoi-500",
          )}
        />
      </motion.div>

      {/* 8 */}
      <motion.div
        custom={1}
        variants={variant}
        initial="hidden"
        animate="show"
        className={cn(
          "absolute top-1/2 left-1/2 translate-x-[10%] -translate-y-[10%]",
        )}>
        <BlockIcon
          className={cn(
            "size-24 stroke-black text-neutral-200 transition-colors duration-200",
            step >= 4 && "text-yoi-500",
          )}
        />
      </motion.div>

      {/* 1 */}
      <motion.div
        custom={2}
        variants={variant}
        initial="hidden"
        animate="show"
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-[170%] -translate-y-1/2",
        )}>
        <BlockIcon className="size-24 stroke-black text-neutral-200" />
      </motion.div>

      {/* 4 */}
      <motion.div
        custom={2}
        variants={variant}
        initial="hidden"
        animate="show"
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-[110%] -translate-y-[10%]",
        )}>
        <BlockIcon className="size-24 stroke-black text-neutral-200" />
      </motion.div>

      {/* 7 */}
      <motion.div
        custom={2}
        variants={variant}
        initial="hidden"
        animate="show"
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[30%]",
        )}>
        <BlockIcon
          className={cn(
            "size-24 stroke-black text-neutral-200 transition-colors duration-200",
            step >= 5 && "text-yoi-500",
          )}
        />
      </motion.div>

      {AnimalIcon && (
        <motion.div
          animate={
            step < 5
              ? {
                  x: movePositions[step].x,
                  y: movePositions[step].y,
                  opacity: 1,
                }
              : {
                  x: movePositions[step].x,
                  y: ["140%", "130%", "140%"],
                  opacity: 1,
                  transition: {
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  },
                }
          }
          initial={{ opacity: 0 }}
          transition={
            step < 5
              ? {
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: 0.5,
                }
              : undefined
          }
          className="absolute -top-2 right-0">
          <AnimalIcon className="size-24" />
        </motion.div>
      )}
    </div>
  )
}

export default LoginAnimation
