import RootProvider from "@/components/providers/RootProvider"
import ResponsiveContainer from "@/components/ResponsiveContainer"
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
  icons: {
    icon: "/favicon.svg",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="ko">
      <link rel="preconnect" href="https://openapi.map.naver.com/" />
      <link
        rel="preload"
        as="script"
        href={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_MAP_CLIENT_ID}&submodules=geocoder`}
      />
      <body className={`${pretendard.className} bg-neutral-100`}>
        <RootProvider>
          <ResponsiveContainer>
            <div className="flex-1">{children}</div>
          </ResponsiveContainer>
        </RootProvider>
      </body>
    </html>
  )
}

export default RootLayout
