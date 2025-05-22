import RootProvider from "@/components/providers/RootProvider"
import ResponsiveContainer from "@/components/ResponsiveContainer"
import { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { ReactNode, unstable_ViewTransition as ViewTransition } from "react"
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: "요이땅",
  description: "요이땅",
  icons: {
    icon: "/favicon.svg",
  },
}

interface RootLayoutProps {
  children: ReactNode
  params: Promise<{
    teamId: string
  }>
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
            <ViewTransition name="main-layout">
              <div className="flex-1">{children}</div>
            </ViewTransition>
          </ResponsiveContainer>
        </RootProvider>
      </body>
    </html>
  )
}

export default RootLayout
