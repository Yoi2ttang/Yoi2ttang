import { getApiServer } from "@/lib/api-server"
import apiClient from "@/lib/http-common"
import {
  FollowListRequest,
  MemberAutocompleteRequest,
  MemberSearchRequest,
  ProfileForEditRequest,
  ProfileForEditResponse,
  ProfileResponse,
} from "@/types/member"

// 프로필 조회
export const getProfile = async (memberId: number) => {
  const apiServer = await getApiServer()
  return await apiServer.get<ProfileResponse>(`/members/${memberId}/profiles`)
}

// 팔로워 조회
export const getFollowers = async (followListRequest: FollowListRequest) => {
  const response = await apiClient.get(
    `/members/${followListRequest.targetId}/followers`,
    {
      params: {
        pageToken: followListRequest.pageToken,
      },
    },
  )
  return response.data
}

// 팔로잉 조회
export const getFollowings = async (followListRequest: FollowListRequest) => {
  const response = await apiClient.get(
    `/members/${followListRequest.targetId}/followings`,
    {
      params: {
        pageToken: followListRequest.pageToken,
        keyword: followListRequest.keyword,
      },
    },
  )
  return response.data
}

// 팔로잉
export const postFollow = async (targetId: number) => {
  return await apiClient.post(`/members/${targetId}/follow`)
}

// 언팔로잉
export const patchFollow = async (targetId: number) => {
  return await apiClient.patch(`/members/${targetId}/unfollow`)
}

// 키워드에 맞는 유저 닉네임 조회(자동완성)
export const getUserNicknames = async ({
  keyword,
  pageToken,
}: MemberAutocompleteRequest) => {
  return await apiClient.get(
    `/members/autocomplete?keyword=${keyword}&pageToken=${pageToken}`,
  )
}

// 키워드에 맞는 유저 조회
export const getUsers = async ({ keyword, pageToken }: MemberSearchRequest) => {
  return await apiClient.get(
    `/members/search?keyword=${keyword}&pageToken=${pageToken}`,
  )
}

// 프로필 수정 페이지 진입 시 프로필 조회
export const getProfileForEdit = async (): Promise<ProfileForEditResponse> => {
  const response = await apiClient.get("/members/profiles/edit")
  return response.data
}

// 프로필 수정
export const updateProfile = async (data: ProfileForEditRequest) => {
  const formData = new FormData()
  const memberData = new Blob([JSON.stringify(data.memberUpdateRequest)], {
    type: "application/json",
  })
  formData.append("memberUpdateRequest", memberData)
  if (data.image) {
    formData.append("image", data.image)
  }

  return await apiClient.patch("/members/profiles", formData)
}
