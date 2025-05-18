import apiClient from '../http-common';

export interface StartRunningRequest {
  lat: number;
  lng: number;
  currentTime: string;
}

export interface StartRunningResponse {
  runningId: number;
  message: string;
}

// 러닝 시작하기
export const postStartRunning = async (payload: StartRunningRequest) => {
  const response = await apiClient.post<StartRunningResponse>(
    '/runnings/free',
    payload,
  );
  return response.data;
};

// 러닝 끝내기
export const updateEndRunning = async (runningId: number, endTime: string) => {
  const response = await apiClient.patch(`/runnings/${runningId}/end`, {
    endTime,
  });

  return response.data;
};
