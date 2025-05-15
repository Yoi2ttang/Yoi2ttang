import { objectToSearchParams } from "@/lib/utils-server"

// 네이버 지역 검색 API
export const getRegionSearch = async (params: {
  query: string
  display?: number
  start?: number
  sort?: "random" | "comment"
}) => {
  const baseUrl = "/api/naver-local"

  const paramsToUrl = objectToSearchParams(params)
  const url = `${baseUrl}?${paramsToUrl}`

  const response = await fetch(url)

  return await response.json()
}
