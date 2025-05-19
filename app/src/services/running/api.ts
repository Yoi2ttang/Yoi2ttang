import {Coordinates, Tile} from '../../types/map';
import apiClient from '../http-common';

export interface StartRunningRequest {
  lat: number;
  lng: number;
  currentTime: string;
}

export interface StartRunningResponse {
  runningId: number;
  geoHash: string;
  sw: {
    lat: number;
    lng: number;
  };
  ne: {
    lat: number;
    lng: number;
  };
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

// 팀 타일 지도 응답 타입
export interface TileMapResponse {
  tileGetResponseList: Tile[];
}

// 전체 점령 지도 확인 (팀 상관없이 좌쵸 근처에 대한 타일의 정보 가져옴)
export const getTeamTileMap = async (params: {lat: number; lng: number}) => {
  const response = await apiClient.get<TileMapResponse>('tiles/teams', {
    params,
  });
  console.log(response.data);
  return response.data;
};

export interface TileCluster {
  zodiacId: number;
  count: number;
  geoPoint: {
    lat: number;
    lng: number;
  };
}

export interface TileMapClusterResponse {
  tileClusterGetResponseList: TileCluster[];
}

// 전체 점령 지도 클러스터 확인
export const getTeamTileMapCluster = async (params: {
  lat: number;
  lng: number;
  zoomLevel: number;
}) => {
  const response = await apiClient.get<TileMapClusterResponse>(
    'tiles/teams/cluster',
    {params},
  );

  console.log(response.data);
  return response.data;
};

export interface PostLocationRequest {
  courseId?: number;
  runningId: number;
  beforePoint: Coordinates;
  nowPoint: Coordinates;
  currentTime: string;
}

// 러닝 중 위치 보내기
export const postLocation = async (payload: PostLocationRequest) => {
  const response = await apiClient.post('/runnings/locations', payload);

  return response.data;
};
