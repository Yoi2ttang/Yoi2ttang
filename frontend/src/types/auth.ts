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
