import { ReactNode } from "react"
import QueryProvider from "./QueryProvider"
import { ScriptProvider } from "./ScriptProvider"

interface RootProviderProps {
  children: ReactNode
}

const RootProvider = (data: RootProviderProps) => {
  const { children } = data

  return (
    <QueryProvider>
      <ScriptProvider />
      {children}
    </QueryProvider>
  )
}

export default RootProvider
