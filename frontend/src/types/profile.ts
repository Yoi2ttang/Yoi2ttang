export type ProfileData = {
  profileImage: File | null
  nickname: string
  weight: number
  stateMessage: string
  disclosureStatus: "ALL" | "ONLY_ME"
}
