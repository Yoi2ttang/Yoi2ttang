import { getApiServer } from "@/lib/api-server"
import apiClient from "@/lib/http-common"
import {
  MemberAutocompleteRequest,
  MemberAutocompleteResponse,
  MemberSearchRequest,
  MembersResponse,
  ProfileForEditRequest,
  ProfileForEditResponse,
  ProfileResponse,
} from "@/types/member"

// 프로필 조회
export const getProfile = async (nickname: string) => {
  const apiServer = await getApiServer()
  return await apiServer.get<ProfileResponse>(`/member/profile`, {
    params: {
      nickname,
    },
  })
}

// 팔로워 조회
export const getFollowers = async (
  targetId: number,
): Promise<MembersResponse> => {
  return await apiClient.get(`/member/${targetId}/followers`)
}

// 팔로잉 조회
export const getFollowings = async (
  targetId: number,
): Promise<MembersResponse> => {
  return await apiClient.get(`/member/${targetId}/followings`)
}

// 팔로잉
export const postFollow = async (targetId: number) => {
  return await apiClient.post(`/member/${targetId}/follow`)
}

// 언팔로잉
export const deleteFollow = async (targetId: number) => {
  return await apiClient.delete(`/member/${targetId}/unfollow`)
}

// 키워드에 맞는 유저 닉네임 조회
export const getUserNicknames = async ({
  keyword,
  pageToken,
}: MemberAutocompleteRequest): Promise<MemberAutocompleteResponse> => {
  return await apiClient.get(
    `/member/autocomplete?keyword=${keyword}&pageToken=${pageToken}`,
  )
}

// 키워드에 맞는 유저 조회
export const getUsers = async ({
  keyword,
  pageToken,
}: MemberSearchRequest): Promise<MembersResponse> => {
  return await apiClient.get(
    `/member/search?keyword=${keyword}&pageToken=${pageToken}`,
  )
}

// 프로필 수정 페이지 진입 시 프로필 조회
export const getProfileForEdit = async (): Promise<ProfileForEditResponse> => {
  const response = await apiClient.get("/member/profile/edit")
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

  return await apiClient.patch("/member/profile", formData)
}
