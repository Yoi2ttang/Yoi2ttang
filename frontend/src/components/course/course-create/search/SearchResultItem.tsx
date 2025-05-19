import { SearchResult } from "@/types/course.type"

interface SearchResultItemProps {
  searchData: SearchResult
  handleSelectLocation: (searchResult: SearchResult) => void
}

const SearchResultItem = ({
  searchData,
  handleSelectLocation,
}: SearchResultItemProps) => {
  const { addressPOI, roadAddress, lat, lng } = searchData
  return (
    <li
      tabIndex={0}
      onClick={(e) => {
        handleSelectLocation({
          addressPOI,
          roadAddress,
          lat: parseFloat(lat + "") / 1e7,
          lng: parseFloat(lng + "") / 1e7,
        })
        e.currentTarget.focus()
      }}
      key={addressPOI}
      className="flex cursor-pointer flex-col gap-4 rounded-lg bg-white px-4 py-3 transition-all duration-200 hover:bg-gray-50 focus:scale-[1.02] focus:bg-white focus:shadow-md focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2 focus:outline-none">
      <span className="text-title-sm">{addressPOI}</span>
      <span className="text-caption">{roadAddress}</span>
    </li>
  )
}
export default SearchResultItem
