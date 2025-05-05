import apiClient from "@/lib/http-common"

export const getIsNicknameDuplicated = async (nickname: string) => {
  const response = await apiClient.get(
    `/auth/check-nickname?nickname=${nickname}`,
  )
  return response.data
}
