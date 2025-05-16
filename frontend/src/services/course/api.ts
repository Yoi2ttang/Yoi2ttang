import apiClient from "@/lib/http-common"
import { objectToSearchParams } from "@/lib/utils-server"

// 네이버 지역 검색 API
export const getRegionSearch = async (params: {
  query: string
  display?: number
  start?: number
  sort?: "random" | "comment"
}) => {
  const paramsToUrl = objectToSearchParams(params)
  const response = await fetch(`/api/naver-local?${paramsToUrl}`)

  return await response.json()
}

// 코스 생성
export const createCourse = async (body: FormData) => {
  const response = await apiClient.post("/course", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return response.data
}
