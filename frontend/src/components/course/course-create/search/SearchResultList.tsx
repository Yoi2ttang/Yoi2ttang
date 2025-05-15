import { SearchResult } from "@/types/course.type"

interface SearchResultListProps {
  searchLocation: SearchResult[]
  handleSelectLocation: (searchResult: SearchResult) => void
}

const SearchResultList = ({
  searchLocation,
  handleSelectLocation,
}: SearchResultListProps) => {
  return (
    <div className="scrollbar-hide max-h-96 w-full flex-1 overflow-y-auto">
      <ul className="flex flex-col gap-4">
        {searchLocation.map(({ title, roadAddress, lat, lng }: any) => (
          <li
            tabIndex={0}
            onClick={(e) => {
              handleSelectLocation({ title, roadAddress, lat, lng })
              e.currentTarget.focus()
            }}
            key={title}
            className="flex cursor-pointer flex-col gap-4 rounded-lg bg-white px-4 py-3 transition-all duration-200 focus:scale-103 focus:bg-neutral-200">
            <span className="text-title-sm">{title}</span>
            <span className="text-sm">{roadAddress}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default SearchResultList
