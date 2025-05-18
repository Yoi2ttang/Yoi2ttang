"use client"

import apiClient from "@/lib/http-common"
import {
  CourseClearedMemberPaginationRequest,
  CoursePaginationRequest,
} from "@/types/course/course.type"

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
