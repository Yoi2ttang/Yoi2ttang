import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';

interface Payload {
  sub: string;
  nickname: string;
  zodiacId: string;
  zodiacTeam: string;
  iat: number;
  exp: number;
}

export const getPayload = async (): Promise<Payload | null> => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  if (!accessToken) {
    return null;
  }

  try {
    const decoded = jwtDecode<Payload>(accessToken);
    return decoded;
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
};
