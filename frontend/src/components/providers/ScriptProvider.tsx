"use client"

import { createContext, useState, useContext, ReactNode } from "react"
import Script from "next/script"

const ScriptContext = createContext({ loaded: false })

interface ScriptProviderProps {
  children: ReactNode
}

export const ScriptProvider = ({ children }: ScriptProviderProps) => {
  const [loaded, setLoaded] = useState<boolean>(false)

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}`}
        onLoad={() => setLoaded(true)}
      />
      <ScriptContext.Provider value={{ loaded }}>
        {children}
      </ScriptContext.Provider>
    </>
  )
}

export const useScriptLoaded = () => useContext(ScriptContext)
