import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { SearchIcon } from "lucide-react"
import { InputHTMLAttributes } from "react"

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  className?: string
  placeholder?: string
  hasBorder?: boolean
  hasSearchIcon?: boolean
  variant?: "default" | "error" | "success" | "disabled"
}

const inputVariants = cva(
  "transition-all w-full rounded-xl px-4 py-5 focus-within:ring-2 focus-within:ring-neutral-800",
  {
    variants: {
      variant: {
        default: "ring-neutral-200",
        disabled: "ring-neutral-100 bg-neutral-100",
        error: "ring-red-400",
        success: "ring-green-400",
      },
      hasBorder: {
        true: "ring-2",
        false: "border-none",
      },
      hasSearchIcon: {
        true: "flex items-center gap-2",
        false: "",
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
  hasSearchIcon,
  variant,
  ...props
}: InputProps) => {
  return (
    <div
      className={cn(
        inputVariants({ hasBorder, hasSearchIcon, variant }),
        className,
      )}>
      {hasSearchIcon && <SearchIcon className="text-neutral-400" />}
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
