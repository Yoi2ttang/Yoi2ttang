"use client"

import { cn } from "@/lib/utils"
import { ChangeEvent, TextareaHTMLAttributes } from "react"

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxLength?: number
  content: string
  onContentChange: (content: string) => void
}

const Textarea = (data: TextareaProps) => {
  const {
    maxLength = 64,
    placeholder = "텍스트를 입력해 주세요",
    className,
    content,
    onContentChange,
    disabled,
  } = data

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    onContentChange(
      newContent.length > maxLength
        ? newContent.substring(0, maxLength)
        : newContent,
    )
  }

  return (
    <div className="rounded-lg border-2 border-neutral-200 bg-white px-2 py-3 focus-within:border-black">
      <textarea
        className={cn(
          "w-full resize-none p-2 placeholder-neutral-300 outline-none",
          className,
        )}
        placeholder={placeholder}
        disabled={disabled}
        value={content}
        onChange={handleChange}
      />

      <p
        className={cn(
          "right-4 bottom-4 text-end text-xs",
          content.length === maxLength ? "text-rose-500" : "text-neutral-300",
        )}>
        {content.length} / {maxLength}
      </p>
    </div>
  )
}

export default Textarea
