import { ReactNode } from "react"
import QueryProvider from "./QueryProvider"

interface RootProviderProps {
  children: ReactNode
}

const RootProvider = (data: RootProviderProps) => {
  const { children } = data

  return <QueryProvider>{children}</QueryProvider>
}

export default RootProvider
