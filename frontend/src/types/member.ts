export type Profile = {
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

export type ProfileForEdit = {
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

export type MemberPreview = {
  memberId: number
  nickname: string
  profileImageUrl: string
  zordiacName: string
  isFollow: boolean
}

export type MemberAutocomplete = {
  memberId: number
  nickname: string
}

// request type
export type MemberAutocompleteRequest = {
  keyword: string
  pageToken: number
}

export type MemberSearchRequest = {
  keyword: string
  pageToken: number
}

export type ProfileForEditRequest = {
  memberUpdateRequest: {
    nickname: string
    weight: number
    stateMessage: string
    disclosureStatus: "ALL" | "ONLY_ME"
  }
  image: File | null
}

// response type
export type ProfileResponse = Profile

export type MembersResponse = {
  data: MemberPreview[]
  hasNext: boolean
  pageToken: string
}

export type ProfileForEditResponse = ProfileForEdit

export type MemberAutocompleteResponse = {
  data: MemberAutocomplete[]
  hasNext: boolean
  pageToken: string
}
