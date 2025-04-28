import { cn } from "@/lib/utils"
import { ChangeEvent, Dispatch, SetStateAction } from "react"

interface TextareaProps {
  maxLength?: number
  content: string
  placeholder?: string
  className?: string
  onChange: Dispatch<SetStateAction<string>>
}

const Textarea = (data: TextareaProps) => {
  const {
    maxLength = 64,
    placeholder = "텍스트를 입력해 주세요",
    content,
    className,
    onChange,
  } = data

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    onChange(
      newContent.length > maxLength
        ? newContent.substring(0, maxLength)
        : newContent,
    )
  }

  return (
    <div className="px-2 py-3 bg-white border rounded-lg border-neutral-200">
      <textarea
        className={cn(
          "w-full resize-none placeholder-neutral-300 p-2 outline-black",
          className,
        )}
        placeholder={placeholder}
        value={content}
        onChange={handleChange}
      />

      <p
        className={cn(
          "text-xs bottom-4 right-4 text-end",
          content.length === maxLength ? "text-rose-500" : "text-neutral-300",
        )}>
        {content.length} / {maxLength}
      </p>
    </div>
  )
}

export default Textarea
