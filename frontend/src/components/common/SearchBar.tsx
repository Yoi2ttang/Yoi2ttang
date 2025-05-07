"use client"

import { cn } from "@/lib/utils"
import { SearchIcon } from "lucide-react"
import { useState } from "react"
import Input from "./Input"

interface SearchBarProps {
  placeholder?: string
  className?: string
}

const SearchBar = ({ placeholder, className }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="relative">
      <Input
        Icon={<SearchIcon />}
        placeholder={placeholder}
        className={cn("bg-white", className)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {isFocused && (
        <div className="absolute top-full mt-2 flex h-fit max-h-52 w-full flex-col gap-3 rounded-b-lg bg-white p-4 shadow-md">
          <p
            className="cursor-pointer"
            onMouseDown={() => console.log("타이거JK 선택됨.")}>
            타이거JK
          </p>
          <p
            className="cursor-pointer"
            onMouseDown={() => console.log("타이거JJ 선택됨.")}>
            타이거JJ
          </p>
          <p
            className="cursor-pointer"
            onMouseDown={() => console.log("타이거JJ 선택됨.")}>
            타이거JJ
          </p>
          <p
            className="cursor-pointer"
            onMouseDown={() => console.log("타이거JJ 선택됨.")}>
            타이거JJ
          </p>
          <p
            className="cursor-pointer"
            onMouseDown={() => console.log("타이거JJ 선택됨.")}>
            타이거JJ
          </p>
        </div>
      )}
    </div>
  )
}

export default SearchBar
