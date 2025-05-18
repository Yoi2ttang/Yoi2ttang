import { ReactNode } from "react"
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
        <ScriptProvider />
        {children}
      </QueryProvider>
    </WebViewProvider>
  )
}

export default RootProvider
