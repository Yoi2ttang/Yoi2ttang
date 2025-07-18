"use client"

import * as ProgressPrimitive from "@radix-ui/react-progress"
import * as React from "react"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string
}

function Progress({
  className,
  value,
  indicatorClassName,
  ...props
}: ProgressProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!value) {
      return
    }

    const timer = setTimeout(() => setProgress(value), 300)
    return () => {
      clearTimeout(timer)
    }
  }, [value])

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-3 w-full overflow-hidden rounded-full",
        className,
      )}
      {...props}>
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          `bg-primary h-full w-full flex-1 transition-transform ease-in-out ${indicatorClassName}`,
        )}
        style={{ transform: `translateX(-${100 - (progress || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
