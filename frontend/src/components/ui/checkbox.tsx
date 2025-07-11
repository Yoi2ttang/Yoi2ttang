"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  checkClassName?: string // 체크 아이콘 스타일 커스터마이징
  checkedBgClassName?: string // 체크 상태일 때의 배경 색상 클래스
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, checkClassName, checkedBgClassName, ...props }, ref) => {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer ring-offset-background focus-visible:ring-ring border-primary h-4 w-4 shrink-0 rounded-sm border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        checkedBgClassName
          ? `data-[state=checked]:${checkedBgClassName}`
          : "data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
        className,
      )}
      {...props}>
      <CheckboxPrimitive.Indicator
        className={cn(
          "flex items-center justify-center text-current",
          checkClassName,
        )}>
        <Check className="h-4 w-4" style={{ strokeWidth: 2.5 }} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
