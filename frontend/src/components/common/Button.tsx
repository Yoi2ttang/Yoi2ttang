"use client"

import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"
import { ButtonHTMLAttributes } from "react"

const buttonVariants = cva(
  "flex justify-center items-center rounded-xl cursor-pointer transition-colors duration-200 font-semibold text-white px-5 py-3",
  {
    variants: {
      variant: {
        default: "bg-yoi-500",
        outline: "bg-white text-black border-2 border-yoi-600",
        disabled: "bg-neutral-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = (data: ButtonProps) => {
  const { className, children, variant, ...props } = data

  return (
    <button className={cn(buttonVariants({ variant }), className)} {...props}>
      {children}
    </button>
  )
}

export default Button
