import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { InputHTMLAttributes, ReactNode } from "react"

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  className?: string
  placeholder?: string
  hasBorder?: boolean
  Icon?: ReactNode
}

const inputVariants = cva(
  "transition-all w-full rounded-xl p-4 focus-within:outline-none focus-within:ring-2 focus-within:ring-neutral-600 focus-within:border-transparent bg-white",
  {
    variants: {
      variant: {
        default: "border-neutral-200",
        disabled: "border-transparent bg-neutral-100",
        error: "border-red-400",
        success: "border-green-400",
      },
      hasBorder: {
        true: "border-2",
        false: "border-none",
      },
    },
    defaultVariants: {
      hasBorder: true,
      variant: "default",
    },
  },
)

const Input = ({
  className,
  placeholder,
  hasBorder,
  Icon,
  variant,
  ...props
}: InputProps) => {
  return (
    <div
      className={cn(
        inputVariants({ hasBorder, variant }),
        className,
        Icon && "flex items-center gap-2",
      )}>
      <div className="text-neutral-400">{Icon}</div>
      <input
        disabled={variant === "disabled"}
        className="w-full bg-transparent text-sm outline-none"
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
}

export default Input
