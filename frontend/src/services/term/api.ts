import { getApiServer } from "@/lib/api-server"

export const getTerm = async (termId: number) => {
  const apiServer = await getApiServer()
  return await apiServer.get(`/terms/${termId}`)
}
