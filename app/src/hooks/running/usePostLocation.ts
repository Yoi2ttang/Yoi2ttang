import {useMutation} from '@tanstack/react-query';
import {postLocation} from '../../services/running/api';
import {Coordinates} from '../../types/map';

export interface PostLocationRequest {
  courseId?: number;
  runningId: number;
  beforePoint: Coordinates;
  nowPoint: Coordinates;
  currentTime: string;
}

export interface PostLocationResponse {
  geoHash: string;
  sw: Coordinates;
  ne: Coordinates;
}

export const usePostLocation = () => {
  return useMutation<PostLocationResponse, Error, PostLocationRequest>({
    mutationFn: postLocation,
  });
};
