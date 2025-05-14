import { getPayloadFromAccessToken } from "@/lib/decode-token"
import { redirect } from "next/navigation"

export const getPayloadOrRedirect = async () => {
  const payload = await getPayloadFromAccessToken()

  if (!payload) {
    redirect("/login")
  }

  return payload
}
