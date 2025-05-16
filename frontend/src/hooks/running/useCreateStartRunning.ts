import { useMutation } from "@tanstack/react-query"
import { createStartRunning } from "@/services/running/api"
import {
  StartRunningRequest,
  StartRunningResponse,
} from "@/types/running/running.type"

export const useCreateStartRunning = () => {
  return useMutation<StartRunningResponse, Error, StartRunningRequest>({
    mutationFn: createStartRunning,
  })
}
