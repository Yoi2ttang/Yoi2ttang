"use client"

import Badge from "@/components/common/Badge"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"

interface ActivityChangeItemProps {
  title: string
  rateOfChange: number
  changeDirection: "INCREASE" | "DECREASE" | "NO_CHANGE"
}

const ActivityChangeItem = ({
  title,
  rateOfChange,
  changeDirection,
}: ActivityChangeItemProps) => {
  const isIncrease = changeDirection === "INCREASE"
  const isDecrease = changeDirection === "DECREASE"
  const isNoChange = changeDirection === "NO_CHANGE"

  const color = isIncrease
    ? "bg-yoi-500"
    : isDecrease
      ? "bg-blue-500"
      : "bg-neutral-400"

  return (
    <div className="flex w-full items-center justify-between gap-2">
      {/* left */}
      <div className="flex items-center gap-2">
        <div className={cn("h-2 w-2 rounded-full", color)} />
        <span className="text-caption text-neutral-400">{title}</span>
      </div>
      {/* right */}
      <div className="flex items-center gap-2">
        <span className="text-caption text-black">
          {isIncrease ? "+" : isDecrease ? "-" : ""}
          {rateOfChange ? rateOfChange.toFixed(1) : 0}
        </span>
        <motion.div
          initial={{ y: 10 }}
          animate={{
            y: isIncrease ? [-2, 2, -2] : isDecrease ? [2, -2, 2] : 0,
          }}
          exit={{ y: 10 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}>
          <Badge className={cn(color, "w-full")}>
            {isIncrease ? (
              <ArrowUp className="size-4" />
            ) : isDecrease ? (
              <ArrowDown className="size-4" />
            ) : (
              <Minus className="size-4" />
            )}
          </Badge>
        </motion.div>
      </div>
    </div>
  )
}
export default ActivityChangeItem
