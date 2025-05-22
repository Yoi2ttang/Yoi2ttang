"use server"

import { getApiServer } from "@/lib/api-server"
import { Course } from "@/types/course/course.type"

export const getCourse = async (courseId: number) => {
  const apiServer = await getApiServer()
  return await apiServer.get<Course>(`/courses/${courseId}`)
}
