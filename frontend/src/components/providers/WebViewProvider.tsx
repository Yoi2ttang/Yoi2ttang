"use client"

import { WebViewContextData } from "@/types/app/app.type"
import { ReactNode, createContext, useEffect } from "react"

export const WebViewContext = createContext<WebViewContextData>({
  sendMessage: null,
})

interface WebViewProviderProps {
  children: ReactNode
}

const WebViewProvider = ({ children }: WebViewProviderProps) => {
  const sendMessage = (type: string, data: object) => {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({
        type,
        ...data,
      }),
    )
  }

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      try {
        if (typeof event.data !== "string") {
          return
        }

        const data = JSON.parse(event.data)

        if (typeof data !== "object" || data === null || !("type" in data)) {
          return
        }

        if (data.type === "REISSUE_TOKEN_REQUEST") {
          const response = await fetch("/api/reissue")
          if (response.ok) {
            const json = await response.json()
            sendMessage("REISSUE_TOKEN_RESPONSE", {
              accessToken: json.accessToken,
            })
          } else {
            console.error("WebViewProvider: 리이슈 실패")
          }
        }
      } catch (error) {
        console.error("WebViewProvider: 메시지 처리 실패", error)
      }
    }

    window.addEventListener("message", handleMessage)
    return () => {
      window.removeEventListener("message", handleMessage)
    }
  }, [])

  return (
    <>
      <WebViewContext value={{ sendMessage }}>{children}</WebViewContext>
    </>
  )
}

export default WebViewProvider
