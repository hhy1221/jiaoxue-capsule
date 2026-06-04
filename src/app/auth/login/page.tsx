'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false)
  return (<div className="min-h-screen flex items-center justify-center p-6" style={{background:'linear-gradient(135deg,#2E7D32 0%,#4CAF50 40%,#81C784 100%)'}}>
    <Card className="w-full max-w-[400px] border-0 shadow-2xl"><CardContent className="p-8">
      <div className="text-center mb-8"><div className="text-4xl mb-3">🌱</div><h1 className="text-[22px] font-bold text-[var(--text)] tracking-wide" style={{fontFamily:"var(--font-serif)"}}>支教支教星火</h1><p className="text-[12px] text-[var(--text-muted)] tracking-wider mt-1">全国支教平台 · 连接每颗星火</p></div>
      <div className="space-y-4"><div><label className="text-[11px] font-medium text-[var(--text)] tracking-wider mb-1 block">邮箱</label><input type="email" defaultValue="huang@uestc.edu.cn" className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[13px] outline-none focus:border-[var(--primary)] transition-colors"/></div>
      <div><label className="text-[11px] font-medium text-[var(--text)] tracking-wider mb-1 block">密码</label><div className="relative"><input type={showPw?'text':'password'} defaultValue="123456" className="w-full px-4 py-2.5 rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[13px] outline-none focus:border-[var(--primary)] transition-colors pr-10"/><button onClick={()=>setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer text-[var(--text-muted)]">{showPw?<EyeOff size={16}/>:<Eye size={16}/>}</button></div></div>
      <Link href="/dashboard" className="block w-full text-center py-2.5 rounded-xl bg-[var(--primary)] text-white text-[13px] font-medium tracking-wider no-underline hover:opacity-90 transition-opacity">登录</Link></div>
      <div className="mt-6 text-center"><p className="text-[12px] text-[var(--text-muted)]">还没有账号？<Link href="/auth/register" className="text-[var(--primary)] no-underline hover:underline">注册</Link></p></div>
    </CardContent></Card></div>)
}
