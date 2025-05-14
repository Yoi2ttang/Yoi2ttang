"use client"

import { useMutation } from "@tanstack/react-query"
import { getTeamSituation } from "@/services/running/api"

const useGetTeamSituation = () => {
  return useMutation({
    mutationKey: ["teamSituation"],
    mutationFn: (zodiacId: number) => getTeamSituation(zodiacId),
  })
}

export default useGetTeamSituation
