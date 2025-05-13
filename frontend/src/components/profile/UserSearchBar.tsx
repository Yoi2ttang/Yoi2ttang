"use client"

import useSearchNickname from "@/hooks/auth/useSearchNickname"
import { MemberAutocomplete, MemberAutocompleteResponse } from "@/types/member"
import { debounce } from "lodash-es"
import { SearchIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"
import Input from "../common/Input"

interface UserSearchBarProps {
  placeholder?: string
  keyword: string
  onChange: (keyword: string) => void
  className?: string
}

const UserSearchBar = ({
  placeholder,
  className,
  keyword,
  onChange,
}: UserSearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const { targetRef, data, isLoading, isFetchingNextPage } =
    useSearchNickname(keyword)
  const router = useRouter()

  const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }, 300)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsFocused(false)
    router.push(`/profile/search?keyword=${keyword}`)
  }

  const handleClick = (memberId: number) => {
    router.push(`/profile/${memberId}`)
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Input
        Icon={<SearchIcon />}
        placeholder={placeholder}
        className={className}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleChange}
      />

      {isFocused && (
        <div className="absolute top-full z-9999 mt-2 flex h-fit max-h-52 w-full flex-col gap-3 overflow-y-auto rounded-b-lg bg-white px-4 shadow-md">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="h-4 animate-pulse bg-neutral-300" />
            ))
          ) : (
            <>
              {data?.pages.map((page: MemberAutocompleteResponse) =>
                page.data.map((item: MemberAutocomplete) => (
                  <div
                    key={item.memberId}
                    className="cursor-pointer"
                    onMouseDown={() => handleClick(item.memberId)}>
                    {item.nickname}
                  </div>
                )),
              )}

              {isFetchingNextPage ? (
                <div className="h-4 animate-pulse bg-neutral-300" />
              ) : (
                <div ref={targetRef} />
              )}
            </>
          )}
        </div>
      )}
    </form>
  )
}

export default UserSearchBar
