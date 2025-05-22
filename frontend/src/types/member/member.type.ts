export interface Profile {
  memberId: number
  nickname: string
  profileImageUrl: string
  zodiacName: string
  stateMessage: string
  followingCount: number
  followerCount: number
  isFollow: boolean
  time: {
    hour: number
    minute: number
    seconds: number
  }
  totalDistance: number
  totalTileCount: number
  courses: [
    {
      courseId: number
      courseName: string
      distance: number
      courseImageUrl: string
    },
  ]
}

export interface ProfileForEdit {
  memberId: number
  nickname: string
  profileImageUrl: string
  birthdate: string
  stateMessage: string
  disclosureStatus: string
  gender: string
  weight: number
  email: string
}

export interface MemberPreview {
  memberId: number
  nickname: string
  profileImageUrl: string
  zodiacName: string
  isFollow: boolean | null
}

export interface MemberAutocomplete {
  memberId: number
  nickname: string
}

export type ProfileResponse = Profile

export interface MemberSearchPaginationRequest {
  keyword: string
  pageToken: number
}

export interface FollowListPaginationRequest {
  targetId: number
  keyword: string
  pageToken: number
}

export interface MemberPaginationResponse {
  data: MemberPreview[]
  hasNext: boolean
  pageToken: string
}

export interface ProfileForEditRequest {
  memberUpdateRequest: {
    nickname: string
    weight: number
    stateMessage: string
    disclosureStatus: "ALL" | "ONLY_ME"
  }
  image: File | null
}

export type ProfileForEditResponse = ProfileForEdit

export interface MemberAutocompletePaginationRequest {
  keyword: string
  pageToken: number
}

export interface MemberAutocompletePaginationResponse {
  data: MemberAutocomplete[]
  hasNext: boolean
  pageToken: string
}
