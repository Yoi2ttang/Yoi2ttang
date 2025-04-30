import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"
import Link from "next/link"
import { ChangeEvent } from "react"

interface TermCheckItemProps {
  type: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const TermCheckItem = ({
  type,
  checked,
  label,
  onChange,
}: TermCheckItemProps) => {
  const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked)
  }

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-3">
        <input
          id={type}
          type="checkbox"
          checked={checked}
          onChange={handleCheck}
          className="checked:bg-yoi-500 size-4 cursor-pointer appearance-none rounded-full border-2 border-neutral-300 bg-neutral-300"
        />
        <label htmlFor={type} className={cn(type === "all" ? "text-lg" : "")}>
          {label}
        </label>
      </div>

      {type !== "all" && (
        <Link href={`/terms/${type}?from=signup`} className="cursor-pointer">
          <ChevronRight className="stroke-neutral-200" />
        </Link>
      )}
    </div>
  )
}

export default TermCheckItem
