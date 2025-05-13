"use client"

import Input from "@/components/common/Input"
import { SearchIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

interface SearchBarProps {
  placeholder?: string
  className?: string
}

const SearchBar = ({ placeholder, className }: SearchBarProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const keyword = formData.get("search")?.toString()
    if (!keyword) {
      return
    }

    router.replace(`${pathname}?keyword=${keyword}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="search"
        Icon={<SearchIcon />}
        placeholder={placeholder}
        className={className}
      />
    </form>
  )
}

export default SearchBar
