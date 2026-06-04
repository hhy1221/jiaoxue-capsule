'use client'
import { MOCK_TEAM, MOCK_STUDENTS, MOCK_DASHBOARD } from '@/lib/mock-data'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
export default function SharePage() {
  const d=MOCK_DASHBOARD
  return (<div className="min-h-screen" style={{background:'var(--bg)'}}>
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12"><div className="text-5xl mb-4">{MOCK_TEAM.logo}</div><h1 className="text-[36px] font-bold text-[var(--text)] tracking-wide" style={{fontFamily:"var(--font-serif)"}}>{MOCK_TEAM.name}</h1><p className="text-[14px] text-[var(--text-muted)] tracking-wider mt-2">{MOCK_TEAM.description}</p></div>
      <div className="grid grid-cols-4 gap-4 mb-12 max-md:grid-cols-2">{[{n:d.studentCount,l:'学生'},{n:d.diaryCount,l:'评语'},{n:d.photoCount,l:'照片'},{n:d.classCount,l:'课程'}].map(s=>(<Card key={s.l} className="border-[var(--border)] bg-[var(--surface)] text-center"><CardContent className="p-6"><p className="text-[32px] font-bold text-[var(--primary)]" style={{fontFamily:"var(--font-serif)"}}>{s.n}</p><p className="text-[12px] text-[var(--text-muted)] tracking-wider">{s.l}</p></CardContent></Card>))}</div>
      <div className="text-center mb-8"><h2 className="text-[20px] font-semibold text-[var(--text)] tracking-wide" style={{fontFamily:"var(--font-serif)"}}>🌱 孩子们</h2></div>
      <div className="flex flex-wrap justify-center gap-4 mb-12">{MOCK_STUDENTS.slice(0,8).map(s=>(<Card key={s.id} className="border-[var(--border)] bg-[var(--surface)] hover:-translate-y-1 hover:shadow-md transition-all w-[140px]"><CardContent className="p-4 text-center"><div className="w-12 h-12 rounded-full bg-[var(--bg)] flex items-center justify-center text-2xl mx-auto mb-2">{s.avatar}</div><p className="text-[13px] font-semibold text-[var(--text)]">{s.name}</p><p className="text-[10px] text-[var(--text-muted)]">{s.grade}</p></CardContent></Card>))}</div>
      <div className="text-center"><p className="text-[14px] text-[var(--text-muted)] tracking-wider">全国支教平台 · 连接每颗星火</p></div>
    </div></div>)
}
