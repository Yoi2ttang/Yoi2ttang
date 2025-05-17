export interface Course {
  courseId: number
  courseName: string
  distance: number
  courseImageUrl: string
  endTime?: string
  completeRate?: number
  calories?: number
  times?: number
}

export interface CoursePaginationRequest {
  keyword: string
  pageToken: number
}

export interface CoursePaginationResponse {
  data: Course[]
  hasNext: boolean
  pageToken: number
}

export interface CourseClearedMember {
  memberId: number
  nickname: string
  profileImageUrl: string
}

export interface CourseClearedMemberPaginationRequest {
  courseId: number
  pageToken: number
}

export interface CourseClearedMemberPaginationResponse {
  data: CourseClearedMember[]
  hasNext: boolean
  pageToken: number
}
