import { useMutation } from "@tanstack/react-query"
import { postLocation } from "@/services/running/api"
import {
  PostLocationRequest,
  PostLocationResponse,
} from "@/types/running/running.type"

export const usePostLocation = () => {
  return useMutation<PostLocationResponse, Error, PostLocationRequest>({
    mutationFn: postLocation,
  })
}
