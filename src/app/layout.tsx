import type { Metadata } from "next"
import { Noto_Serif_SC, Noto_Sans_SC } from "next/font/google"
import "./globals.css"
import { SkinProvider } from "@/lib/skin-context"
import HeroCurtain from "@/components/layout/HeroCurtain"

const notoSerif = Noto_Serif_SC({
  variable: "--font-serif", subsets: ["latin"],
  weight: ["200","300","400","500","600","700","900"],
})
const notoSans = Noto_Sans_SC({
  variable: "--font-sans", subsets: ["latin"],
  weight: ["300","400","500","700","900"],
})

export const metadata: Metadata = {
  title: "支教记忆胶囊 — AI 赋能支教，让记忆不散场",
  description: "记录每个孩子的成长，支教结束时 AI 自动生成专属临别信。凡星支教队 2026 筠连夏令营。",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Liu+Jian+Mao+Cao&family=ZCOOL+KuaiLe&display=swap" rel="stylesheet"/>
      </head>
      <body className="font-[family-name:var(--font-sans)]">
        <SkinProvider>
          <HeroCurtain />
          {children}
        </SkinProvider>
      </body>
    </html>
  )
}
