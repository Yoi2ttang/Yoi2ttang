"use client"

import { getDeviceType } from "@/lib/utils"
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

type DeviceType = "mobile" | "android" | "desktop" | "yoi2ttang-webview"

interface DeviceContextType {
  deviceType: DeviceType | null
  isDesktop: boolean
  isMobile: boolean
  isAndroid: boolean
  isWebView: boolean
}

const DeviceContext = createContext<DeviceContextType>({
  deviceType: "desktop",
  isDesktop: true,
  isMobile: false,
  isAndroid: false,
  isWebView: false,
})

export const useDevice = () => useContext(DeviceContext)

export default function DeviceProvider({ children }: { children: ReactNode }) {
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null)

  useEffect(() => {
    setDeviceType(getDeviceType() as DeviceType)
  }, [])

  const isDesktop = deviceType === "desktop"
  const isMobile = deviceType === "mobile" || deviceType === "android"
  const isAndroid = deviceType === "android"
  const isWebView = deviceType === "yoi2ttang-webview"

  return (
    <DeviceContext.Provider
      value={{ deviceType, isDesktop, isMobile, isAndroid, isWebView }}>
      {children}
    </DeviceContext.Provider>
  )
}
