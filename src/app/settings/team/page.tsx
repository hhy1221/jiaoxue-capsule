'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { MOCK_TEAM, MOCK_SEMESTER } from '@/lib/mock-data'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
export default function TeamSettingsPage() {
  const [team] = useState(MOCK_TEAM)
  return (<InnerLayout>
    <div className="max-w-2xl"><div className="mb-8"><h1 className="text-[28px] font-bold text-[var(--text)] tracking-wide" style={{fontFamily:"var(--font-serif)"}}>⚙️ 队伍设置</h1></div>
    <Card className="border-[var(--border)] bg-[var(--surface)] mb-6"><CardContent className="p-6"><h3 className="text-[14px] font-semibold text-[var(--text)] mb-4">队伍信息</h3>
    <div className="space-y-4">{[{l:'队伍名称',v:team.name},{l:'简介',v:team.description},{l:'创建时间',v:team.createdAt}].map(f=>(<div key={f.l} className="flex justify-between items-center py-2 border-b border-[var(--border)]"><span className="text-[12px] text-[var(--text-muted)]">{f.l}</span><span className="text-[13px] text-[var(--text)]">{f.v}</span></div>))}</div></CardContent></Card>
    <Card className="border-[var(--border)] bg-[var(--surface)] mb-6"><CardContent className="p-6"><h3 className="text-[14px] font-semibold text-[var(--text)] mb-4">当前学期</h3>
    <div className="space-y-2">{[{l:'名称',v:MOCK_SEMESTER.name},{l:'地点',v:MOCK_SEMESTER.location},{l:'日期',v:`${MOCK_SEMESTER.startDate} ~ ${MOCK_SEMESTER.endDate}`}].map(f=>(<div key={f.l} className="flex justify-between py-2 border-b border-[var(--border)]"><span className="text-[12px] text-[var(--text-muted)]">{f.l}</span><span className="text-[13px] text-[var(--text)]">{f.v}</span></div>))}<Badge className="mt-2 bg-green-50 text-green-600 border-green-200 text-[10px]">进行中</Badge></div></CardContent></Card>
    <Card className="border-[var(--border)] bg-[var(--surface)]"><CardContent className="p-6"><h3 className="text-[14px] font-semibold text-[var(--text)] mb-4">数据导出</h3><p className="text-[12px] text-[var(--text-muted)] mb-3">导出全部队伍数据，包括学生档案、评语记录、照片、临别信等</p><div className="flex gap-3 flex-wrap"><button className="px-4 py-2 rounded-xl bg-[var(--primary)] text-white text-[12px] tracking-wider border-none cursor-pointer">导出全部数据</button><button className="px-4 py-2 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] text-[12px] tracking-wider bg-transparent cursor-pointer">导出学生数据</button></div></CardContent></Card>
    </div></InnerLayout>)
}
