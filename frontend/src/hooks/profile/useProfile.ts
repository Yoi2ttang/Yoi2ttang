import { getProfile } from "@/services/members/api"
import { ProfileResponse } from "@/types/member"

const useProfile = async (nickname: string) => {
  let data: ProfileResponse | null = null
  let isError = false

  try {
    const response = await getProfile(nickname)
    data = await response.json()
  } catch (error) {
    console.error(error)
    isError = true
  }

  return { data, isError }
}

export default useProfile
