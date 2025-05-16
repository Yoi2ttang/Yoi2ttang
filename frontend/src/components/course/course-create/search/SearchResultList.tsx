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
    <div className="scrollbar-hide w-full flex-1 overflow-y-auto">
      <ul className="flex h-90 flex-col gap-4 p-2">
        {searchLocation.map(({ addressPOI, roadAddress, lat, lng }: any) => (
          <li
            tabIndex={0}
            onClick={(e) => {
              handleSelectLocation({
                addressPOI,
                roadAddress,
                lat: parseFloat(lat) / 1e7,
                lng: parseFloat(lng) / 1e7,
              })
              e.currentTarget.focus()
            }}
            key={addressPOI}
            className="flex cursor-pointer flex-col gap-4 rounded-lg bg-white px-4 py-3 transition-all duration-200 hover:bg-gray-50 focus:scale-[1.02] focus:bg-white focus:shadow-md focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2 focus:outline-none">
            <span className="text-title-sm">{addressPOI}</span>
            <span className="text-caption">{roadAddress}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default SearchResultList
