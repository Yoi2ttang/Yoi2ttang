"use server"

import { getApiServer } from "@/lib/api-server"
import { Course, CourseClearedMember } from "@/types/course/course.type"

export const getCourse = async (courseId: number) => {
  const apiServer = await getApiServer()
  return await apiServer.get<Course>(`/courses/${courseId}`)
}

export const getCourseHistoryPreview = async () => {
  const apiServer = await getApiServer()
  return await apiServer.get<Course[]>(
    "/courses/histories/preview",
    {},
    {
      next: { tags: ["course-histories-preview"] },
    },
  )
}

export const getCourseBookmarkPreview = async () => {
  const apiServer = await getApiServer()
  return await apiServer.get<Course[]>(
    "/courses/bookmarks/preview",
    {},
    {
      next: { tags: ["course-bookmarks-preview"] },
    },
  )
}

export const getCourseRecommendPreview = async () => {
  const apiServer = await getApiServer()
  return await apiServer.get<Course[]>(
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
