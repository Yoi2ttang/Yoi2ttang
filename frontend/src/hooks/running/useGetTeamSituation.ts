"use client"

import { useQuery } from "@tanstack/react-query"
import { getTeamSituation } from "@/services/running/api"

const useGetTeamSituation = (zodiacId: number) => {
  return useQuery({
    queryKey: ["teamSituation", zodiacId],
    queryFn: () => getTeamSituation(zodiacId),
    staleTime: 1000 * 60,
  })
}

export default useGetTeamSituation
