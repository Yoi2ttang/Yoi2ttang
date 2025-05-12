import { getPayloadFromAccessToken } from "../decode-token"

export const checkNicknameValidity = (nickname: string) => {
  // 한글, 영어, 숫자만 입력 가능한 정규표현식
  const validCharRegex = /^[가-힣a-zA-Z0-9]+$/

  if (
    nickname.length < 2 ||
    nickname.length > 16 ||
    !validCharRegex.test(nickname)
  ) {
    return false
  }

  return true
}

export const checkSelf = async (nickname: string) => {
  const payload = await getPayloadFromAccessToken()
  console.log(payload?.nickname, nickname)
  return payload ? payload.nickname === nickname : false
}
