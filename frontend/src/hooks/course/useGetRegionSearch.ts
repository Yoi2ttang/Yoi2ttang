import { getRegionSearch } from "@/services/course/api"
import { useQuery } from "@tanstack/react-query"

const useGetRegionSearch = (params: {
  query: string
  display?: number
  start?: number
  sort?: "random" | "comment"
}) => {
  return useQuery({
    queryKey: ["regionSearch", params],
    queryFn: () => getRegionSearch(params),
    enabled: !!params.query,
  })
}

export default useGetRegionSearch
