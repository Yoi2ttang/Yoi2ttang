"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

interface QueryProviderProps {
  children: ReactNode
}

const queryClient = new QueryClient()

const QueryProvider = (data: QueryProviderProps) => {
  const { children } = data

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default QueryProvider
