import { Metadata } from "next"
import localFont from "next/font/local"
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>{children}</body>
    </html>
  )
}
