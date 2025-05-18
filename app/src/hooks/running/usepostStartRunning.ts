// src/hooks/usePostStartRunning.ts
import {useMutation} from '@tanstack/react-query';
import {
  postStartRunning,
  StartRunningRequest,
  StartRunningResponse,
} from '../../services/running/api';

export const usePostStartRunning = () => {
  return useMutation<StartRunningResponse, Error, StartRunningRequest>({
    mutationFn: postStartRunning,
  });
};
