import { ReactNode } from "react"
import QueryProvider from "./QueryProvider"
import { ScriptProvider } from "./ScriptProvider"
import DeviceProvider from "../DeviceProvider"
import ResponsiveContainer from "../ResponsiveContainer"

interface RootProviderProps {
  children: ReactNode
}

const RootProvider = (data: RootProviderProps) => {
  const { children } = data

  return (
    <QueryProvider>
      <DeviceProvider>
        <ResponsiveContainer>
          <ScriptProvider />
          {children}
        </ResponsiveContainer>
      </DeviceProvider>
    </QueryProvider>
  )
}

export default RootProvider
