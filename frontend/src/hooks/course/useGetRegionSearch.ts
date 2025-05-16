import { getRegionSearch } from "@/services/course/api"
import { useMutation } from "@tanstack/react-query"

const useGetRegionSearch = () => {
  return useMutation({
    mutationKey: ["regionSearch"],
    mutationFn: (params: {
      query: string
      display?: number
      start?: number
      sort?: "random" | "comment"
    }) => getRegionSearch(params),
  })
}

export default useGetRegionSearch
