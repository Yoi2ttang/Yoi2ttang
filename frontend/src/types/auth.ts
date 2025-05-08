export enum SignupStep {
  TERM,
  NICKNAME,
  BIRTH,
  GENDER,
  WEIGHT,
  COMPLETED,
}

export type SignUpData = {
  socialId: string
  agreements: {
    privacy: boolean
    location: boolean
    marketing: boolean
  }
  nickname: string
  birth: {
    year: string
    month: string
    day: string
  }
  gender: string
  weight: number
}

export type LoginResponse = {
  memberId: number | null
  accessToken: string | null
  socialId: string | null
}

export const MIN_WEIGHT = 1
export const MAX_WEIGHT = 1_000
