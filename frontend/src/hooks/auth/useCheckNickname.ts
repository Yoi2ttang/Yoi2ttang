"use client"

import { checkNicknameValidity } from "@/lib/auth/util"
import { getIsNicknameDuplicated } from "@/services/auth/api"
import { useQuery } from "@tanstack/react-query"

const useCheckNicknameDuplication = (nickname: string) => {
  return useQuery({
    queryKey: ["checkNickname", nickname],
    queryFn: () => getIsNicknameDuplicated(nickname),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: checkNicknameValidity(nickname),
  })
}

export default useCheckNicknameDuplication
