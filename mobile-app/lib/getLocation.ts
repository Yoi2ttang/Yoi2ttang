import * as Location from "expo-location"

export const getCurrentLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== "granted") {
    console.warn("위치 접근 권한 없음")
    return null
  }

  const location = await Location.getCurrentPositionAsync({})
  return {
    lat: location.coords.latitude,
    lng: location.coords.longitude,
  }
}
