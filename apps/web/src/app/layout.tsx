import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "@/styles/globals.css"
import styles from "./layout.module.css"
import clsx from "clsx"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "LuNimo",
  description: "生理記録と予測ができる最小限のアプリ",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body
        className={clsx(
          geistSans.variable,
          geistMono.variable,
          styles.body,
          "antialiased",
        )}
      >
        {children}
      </body>
    </html>
  )
}
