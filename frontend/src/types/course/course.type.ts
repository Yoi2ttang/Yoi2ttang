export interface Course {
  courseId: number
  courseName: string
  distance: number
  courseImageUrl: string
}

export interface CompletedCourse extends Course {
  endTime: string
}

export interface CourseWithProgress extends Course {
  completeRate: number
}

export interface CourseDetail extends Course {
  calories: number
  times: number
}

export interface CoursePaginationRequest {
  keyword: string
  pageToken: string
}

export interface CoursePaginationResponse {
  data: Course[]
  hasNext: boolean
  pageToken: string
}

export interface CourseClearedMember {
  memberId: number
  nickname: string
  profileImageUrl: string
}

export interface CourseClearedMemberPaginationRequest {
  courseId: number
  pageToken: string
}

export interface CourseClearedMemberPaginationResponse {
  data: CourseClearedMember[]
  hasNext: boolean
  pageToken: string
}
