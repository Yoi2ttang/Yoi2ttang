import { useMutation } from "@tanstack/react-query"
import { postStartRunning } from "@/services/running/api"
import {
  StartRunningRequest,
  StartRunningResponse,
} from "@/types/running/running.type"

export const usePostStartRunning = () => {
  return useMutation<StartRunningResponse, Error, StartRunningRequest>({
    mutationFn: postStartRunning,
  })
}
