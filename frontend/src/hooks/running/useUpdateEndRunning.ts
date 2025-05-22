import { useMutation } from "@tanstack/react-query"
import { updateEndRunning } from "@/services/running/api"

export const useUpdateEndRunning = () => {
  return useMutation({
    mutationFn: ({
      runningId,
      endTime,
    }: {
      runningId: number
      endTime: string
    }) => updateEndRunning(runningId, endTime),
  })
}
