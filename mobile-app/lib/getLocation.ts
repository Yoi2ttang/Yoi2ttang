import * as Location from "expo-location"

export const getCurrentLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync()
  if (status !== "granted") {
    console.warn("Permission to access location was denied")
    return null
  }

  const location = await Location.getCurrentPositionAsync({})
  return {
    lat: location.coords.latitude,
    lng: location.coords.longitude,
  }
}
