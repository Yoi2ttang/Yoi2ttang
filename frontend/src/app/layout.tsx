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
      <body className={`${pretendard.className} bg-neutral-100`}>
        <div className="max-w-yoi-width mx-auto flex h-dvh max-h-dvh flex-col bg-neutral-50">
          <div className="flex-1 pb-16">{children}</div>
          <nav className="max-w-yoi-width h-yoi-navbar-height fixed bottom-0 w-full">
            {/* 여기에 컴포넌트 넣기 */}
          </nav>
        </div>
      </body>
    </html>
  )
}
