import { Payload } from "@/types/auth/auth.type"
import { create } from "zustand"

interface UserStore {
  zodiacId: number
  userId: string
  nickname: string
  zodiacTeam: string
  setZodiacId: (zodiacId: number) => void
  setUserId: (userId: string) => void
  setNickname: (nickname: string) => void
  setZodiacTeam: (zodiacTeam: string) => void
  setPayload: (payload: Payload) => void
}

const useUserStore = create<UserStore>((set) => ({
  zodiacId: 0,
  userId: "",
  nickname: "",
  zodiacTeam: "",
  setZodiacId: (zodiacId: number) => set({ zodiacId }),
  setUserId: (userId: string) => set({ userId }),
  setNickname: (nickname: string) => set({ nickname }),
  setZodiacTeam: (zodiacTeam: string) => set({ zodiacTeam }),
  setPayload: (payload: Payload) =>
    set({
      zodiacId: +payload.zodiacId,
      userId: payload.sub,
      nickname: payload.nickname,
      zodiacTeam: payload.zodiacTeam,
    }),
}))

export default useUserStore
