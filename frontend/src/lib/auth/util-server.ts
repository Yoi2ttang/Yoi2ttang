"use server"

import { getPayloadFromAccessToken } from "../decode-token"

export const checkSelf = async (nickname: string) => {
  const payload = await getPayloadFromAccessToken()
  return payload ? payload.nickname === nickname : false
}
