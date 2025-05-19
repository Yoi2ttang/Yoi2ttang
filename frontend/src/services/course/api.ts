import apiClient from "@/lib/http-common"
import {
  CourseClearedMemberPaginationRequest,
  CoursePaginationRequest,
} from "@/types/course/course.type"

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
  const response = await apiClient.post("/courses", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return response.data
}

export const getCourses = async (request: CoursePaginationRequest) => {
  const response = await apiClient.get("/courses", {
    params: request,
  })
  return response.data
}

export const getCourseHistories = async (request: CoursePaginationRequest) => {
  const response = await apiClient.get("/courses/histories", {
    params: request,
  })
  return response.data
}

export const getCourseBookmarks = async (request: CoursePaginationRequest) => {
  const response = await apiClient.get("/courses/bookmarks", {
    params: request,
  })
  return response.data
}

export const getClearedMembers = async (
  request: CourseClearedMemberPaginationRequest,
) => {
  const response = await apiClient.get(
    `/courses/${request.courseId}/cleared-members`,
    {
      params: {
        pageToken: request.pageToken,
      },
    },
  )
  return response.data
}

export const updateBookmark = async (courseId: number) => {
  const response = await apiClient.post(`/courses/${courseId}/bookmarks`)
  return response.data
}
