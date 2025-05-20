import { ReactNode } from "react"
import DeviceProvider from "../DeviceProvider"
import QueryProvider from "./QueryProvider"
import { ScriptProvider } from "./ScriptProvider"
import WebViewProvider from "./WebViewProvider"

interface RootProviderProps {
  children: ReactNode
}

const RootProvider = (data: RootProviderProps) => {
  const { children } = data

  return (
    <WebViewProvider>
      <QueryProvider>
        <DeviceProvider>
          <ScriptProvider />
          {children}
        </DeviceProvider>
      </QueryProvider>
    </WebViewProvider>
  )
}

export default RootProvider
