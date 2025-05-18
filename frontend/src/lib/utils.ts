import { Coordinates, ReverseGeocodeResponse } from "@/types/map/navermaps"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

export const getCookie = (name: string) => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift()
  }

  return null
}

export const getReverseGeocode = ({ lat, lng }: Coordinates) => {
  return new Promise<ReverseGeocodeResponse>((resolve, reject) => {
    naver.maps.Service.reverseGeocode(
      {
        coords: new naver.maps.LatLng({ lat, lng }),
        orders: [
          naver.maps.Service.OrderType.ROAD_ADDR, // 도로명 주소
          naver.maps.Service.OrderType.ADDR, // 지번 주소
        ].join(","),
      },
      (status, response) => {
        if (status === naver.maps.Service.Status.OK) {
          resolve(response)
        } else {
          reject(status)
        }
      },
    )
  })
}

// 현재 디바이스 타입 반환
export const getDeviceType = () => {
  const userAgent = navigator.userAgent

  if (
    userAgent.includes("iPhone") ||
    userAgent.includes("iPad") ||
    userAgent.includes("iPod")
  ) {
    return "mobile"
  }

  if (userAgent.includes("Android")) {
    return "android"
  }

  return "desktop"
}
