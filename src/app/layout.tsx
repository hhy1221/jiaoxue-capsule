import type { Metadata } from "next"
import { Noto_Serif_SC, Noto_Sans_SC } from "next/font/google"
import "./globals.css"
import AppProviders from "@/components/layout/AppProviders"

const notoSerif = Noto_Serif_SC({
  variable: "--font-serif", subsets: ["latin"],
  weight: ["200","300","400","500","600","700","900"],
})
const notoSans = Noto_Sans_SC({
  variable: "--font-sans", subsets: ["latin"],
  weight: ["300","400","500","700","900"],
})

export const metadata: Metadata = {
  title: "支教星火 — 全国支教工作者的一站式平台",
  description: "连接全国支教队员、一线教师、地方团委与热心公众。记录孩子成长，AI 生成临别信，教学资源共享，让每一段支教故事被看见。",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${notoSans.variable} ${notoSerif.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Liu+Jian+Mao+Cao&family=ZCOOL+KuaiLe&display=swap" rel="stylesheet"/>
      </head>
      <body className="font-[family-name:var(--font-sans)]">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
