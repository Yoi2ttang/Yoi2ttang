import RootProvider from "@/components/providers/RootProvider"
import { Metadata } from "next"
import localFont from "next/font/local"
import { ReactNode } from "react"
import "./globals.css"

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/pretendard/PretendardVariable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-pretendard",
})

export const metadata: Metadata = {
  title: "요이땅",
  description: "요이땅",
}

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} bg-neutral-100`}>
        <RootProvider>
          <div className="flex-1">{children}</div>
        </RootProvider>
      </body>
    </html>
  )
}

export default RootLayout
