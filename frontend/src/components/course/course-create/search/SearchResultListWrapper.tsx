import useGetRegionSearch from "@/hooks/course/useGetRegionSearch"
import { SearchResult } from "@/types/course.type"
import SearchResultItem from "./SearchResultItem"

interface SearchResultListWrapperProps {
  query: string
  handleSelectLocation: (searchResult: SearchResult) => void
}

const SearchResultListWrapper = ({
  query,
  handleSelectLocation,
}: SearchResultListWrapperProps) => {
  const { data: searchLocation, isLoading } = useGetRegionSearch({
    query,
  })

  const searchList = searchLocation?.items?.map((item: any) => ({
    addressPOI: item.title.replace(/<[^>]+>/g, ""),
    roadAddress: item.roadAddress,
    lat: item.mapy,
    lng: item.mapx,
  })) as SearchResult[] | undefined

  return (
    <div className="scrollbar-hide w-full flex-1 overflow-y-auto">
      <ul className="flex h-90 flex-col gap-4 p-2">
        {isLoading && (
          <div className="text-title-sm w-full text-center text-neutral-400">
            검색 중입니다...
          </div>
        )}
        {searchList &&
          searchList.map((searchData, index) => (
            <SearchResultItem
              key={`${searchData.lat + searchData.lng}-${index}`}
              searchData={searchData}
              handleSelectLocation={handleSelectLocation}
            />
          ))}
      </ul>
    </div>
  )
}
export default SearchResultListWrapper
