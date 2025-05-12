"use client"

import { checkNicknameValidity } from "@/lib/auth/util"
import { getIsNicknameDuplicated } from "@/services/auth/api"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

const useCheckNickname = (nickname: string, initNickname: string = "") => {
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"valid" | "invalid">("valid")

  const { data: isDuplicated } = useQuery({
    queryKey: ["checkNickname", nickname],
    queryFn: () => getIsNicknameDuplicated(nickname),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: checkNicknameValidity(nickname),
  })

  useEffect(() => {
    if (nickname === "" || nickname === initNickname) {
      setMessage("")
      setMessageType("valid")
      return
    }

    if (!checkNicknameValidity(nickname)) {
      setMessage("한글, 영어, 숫자 조합으로 2~16자만 가능해요")
      setMessageType("invalid")
      return
    }

    if (isDuplicated) {
      setMessage("이미 사용 중인 닉네임이에요")
      setMessageType("invalid")
    } else {
      setMessage("사용 가능한 닉네임이에요")
      setMessageType("valid")
    }
  }, [nickname, isDuplicated])

  return { message, messageType }
}

export default useCheckNickname
