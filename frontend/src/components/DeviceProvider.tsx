"use client"

import { getDeviceType } from "@/lib/utils"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

type DeviceType = "mobile" | "android" | "desktop"

interface DeviceContextType {
  deviceType: DeviceType
  isDesktop: boolean
  isMobile: boolean
}

const DeviceContext = createContext<DeviceContextType>({
  deviceType: "desktop",
  isDesktop: true,
  isMobile: false,
})

export const useDevice = () => useContext(DeviceContext)

export default function DeviceProvider({ children }: { children: ReactNode }) {
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null)

  useEffect(() => {
    setDeviceType(getDeviceType() as DeviceType)
  }, [])

  const isDesktop = deviceType === "desktop"
  const isMobile = !isDesktop

  if (!deviceType) {
    return null
  }

  return (
    <DeviceContext.Provider value={{ deviceType, isDesktop, isMobile }}>
      {children}
    </DeviceContext.Provider>
  )
}
