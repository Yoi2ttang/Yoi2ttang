"use server"

import { getApiServer } from "@/lib/api-server"
import {
  CourseClearedMember,
  CourseDetail,
  CourseWithProgress,
} from "@/types/course/course.type"

export const getCourse = async (courseId: number) => {
  const apiServer = await getApiServer()
  return await apiServer.get<CourseDetail>(`/courses/${courseId}`)
}

export const getCourseHistoryPreview = async () => {
  const apiServer = await getApiServer()
  return await apiServer.get<CourseWithProgress[]>(
    "/courses/histories/preview",
    {},
    {
      next: { tags: ["course-histories-preview"] },
    },
  )
}

export const getCourseBookmarkPreview = async () => {
  const apiServer = await getApiServer()
  return await apiServer.get<CourseWithProgress[]>(
    "/courses/bookmarks/preview",
    {},
    {
      next: { tags: ["course-bookmarks-preview"] },
    },
  )
}

export const getCourseRecommendPreview = async () => {
  const apiServer = await getApiServer()
  return await apiServer.get<CourseWithProgress[]>(
    "/courses/preview",
    {},
    {
      cache: "no-store",
    },
  )
}

export const getClearMemberPreview = async (courseId: number) => {
  const apiServer = await getApiServer()
  return await apiServer.get<CourseClearedMember[]>(
    `/courses/${courseId}/cleared-members/preview`,
    {},
    {
      cache: "no-store",
    },
  )
}
