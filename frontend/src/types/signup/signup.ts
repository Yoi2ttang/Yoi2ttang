export enum SignupStep {
  TERM,
  NICKNAME,
  BIRTH,
  GENDER,
  WEIGHT,
  COMPLETED,
}

export type RequiredTerm = {
  privacy: boolean
  location: boolean
  marketing: boolean
}

// 다음 단계로 이동하는 함수를 위한 타입
export type NextStep = {
  [key in SignupStep]: SignupStep | null
}
