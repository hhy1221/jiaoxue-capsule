'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { MOCK_MEMBERS, MOCK_TEAM } from '@/lib/mock-data'
import { ROLE_LABELS, UserRole } from '@/types'
import { useState, useMemo } from 'react'
import InviteMemberForm from '@/components/forms/InviteMemberForm'
import { Users, UserCheck, Shield, Heart } from 'lucide-react'

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg,#f5e6d0,#e8d4b8)','linear-gradient(135deg,#d8e8d4,#c8dcc0)',
  'linear-gradient(135deg,#d8dce8,#c8d4e0)','linear-gradient(135deg,#f8e4d8,#f0d4c8)',
  'linear-gradient(135deg,#e8d8e0,#dcc8d4)',
]
const AVATAR_TEXT_COLORS = ['#8b5a30','#4a6a3a','#4a6078','#8b5040','#6a4060']
const CARD_BORDERS = ['rgba(220,190,160,0.25)','rgba(180,210,170,0.25)','rgba(180,200,225,0.25)','rgba(230,190,170,0.25)','rgba(210,180,200,0.25)']

const ROLE_COLORS: Record<UserRole,string> = {
  captain:'#c8862e',vice_captain:'#d4a040',teacher:'#7a9a5a',advisor:'#6baed6',local_contact:'#d4855e',alumni:'#a78bfa',
}

export default function MembersPage() {
  const [showForm, setShowForm] = useState(false)

  const roleStats = useMemo(() => {
    const dist: Partial<Record<UserRole,number>> = {}
    MOCK_MEMBERS.forEach(m => { m.roles.forEach(r => { dist[r] = (dist[r]||0)+1 }) })
    return dist
  }, [])

  return (<InnerLayout>
    <style>{`
      @keyframes memberPop { 0%{opacity:0;transform:scale(0.9) rotate(-2deg)} 60%{transform:scale(1.03) rotate(0.5deg)} 100%{opacity:1;transform:scale(1) rotate(0)} }
      .member-card { animation:memberPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
    `}</style>
    <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative"
      style={{ borderBottom: '1.5px solid rgba(180,160,130,0.25)' }}>
      <div>
        <h1 className="text-[19px] font-semibold tracking-[0.03em] text-[var(--ink)]" style={{ fontFamily:"var(--font-serif)" }}>👥 成员</h1>
        <p className="text-[11px] mt-0.5 tracking-[0.06em]" style={{ color:'var(--faded)' }}>{MOCK_TEAM.name} · {MOCK_MEMBERS.length}位成员</p>
      </div>
      <button className="picture-book-btn primary" style={{fontSize:11}} onClick={()=>setShowForm(true)}>＋ 邀请成员</button>
      <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 text-[7px] tracking-[7px]" style={{ color:'rgba(180,160,130,0.5)' }}>· · · · · · · · · · · ·</div>
    </header>

    {/* 角色分布Banner */}
    <div className="picture-book-card p-5 mb-5 flex items-center justify-center gap-10 flex-wrap" style={{transform:'rotate(-0.06deg)'}}>
      {[{icon:Users,val:MOCK_MEMBERS.length,l:'总成员',color:'#c8862e'},
        {icon:Shield,val:Object.keys(roleStats).length,l:'角色种类',color:'#7a9a5a'},
        {icon:Heart,val:1,l:'队伍',color:'#d4855e'}].map(s=>(
        <div key={s.l} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{background:`${s.color}15`,color:s.color}}><s.icon size={18}/></div>
          <div><p className="text-[20px] font-bold text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>{s.val}</p><p className="text-[10px] tracking-[0.06em]" style={{color:'var(--faded)'}}>{s.l}</p></div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
      {MOCK_MEMBERS.map((m, i) => {
        const grad = AVATAR_GRADIENTS[i % 5]
        const txtCol = AVATAR_TEXT_COLORS[i % 5]
        const border = CARD_BORDERS[i % 5]
        return (
          <div key={m.id} className="picture-book-card tape-top p-5 member-card hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            style={{
              animationDelay:`${i*0.1}s`,
              transform: `rotate(${(i%2===0?-0.3:0.2)}deg)`,
              borderColor: border,
            }}>
            <div className="flex items-center gap-4">
              {/* 彩色头像 */}
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-[22px] font-bold flex-shrink-0 relative"
                style={{
                  background: grad,
                  color: txtCol,
                  boxShadow: '0 2px 10px rgba(100,70,40,0.1)',
                  border: '3px solid #fff',
                  outline: '1.5px solid rgba(180,150,120,0.4)',
                }}>
                {m.avatar}
                {/* 胶带角 */}
                <div className="absolute -top-1 -right-1.5 w-5 h-2.5 rounded-[1px]"
                  style={{
                    background: i%2===0?'rgba(228,180,165,0.5)':'rgba(175,198,218,0.45)',
                    transform: `rotate(${i%2===0?12:-10}deg)`,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                  }} />
              </div>

              <div className="min-w-0">
                <h3 className="text-[16px] font-bold text-[var(--ink)] tracking-[0.04em]"
                  style={{ fontFamily: "var(--font-serif)" }}>
                  {m.name}
                </h3>
                <p className="text-[11px] tracking-[0.04em] handwriting"
                  style={{ color: 'var(--ink-faint)' }}>
                  {m.email}
                </p>
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {m.roles.map((r, ri) => {
                    const rc = ROLE_COLORS[r] || 'var(--faded)'
                    return (
                    <span key={r} className="picture-book-tag"
                      style={{
                        transform: `rotate(${ri%2===0?-0.8:0.6}deg)`,
                        background: `${rc}15`,
                        color: rc,
                        border: `1px solid ${rc}30`,
                      }}>
                      {ROLE_LABELS[r]}
                    </span>
                  )})}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>

    <button className="add-new-btn mt-6" onClick={()=>setShowForm(true)}>＋ 邀请新成员</button>
    <InviteMemberForm open={showForm} onClose={()=>setShowForm(false)} />
  </InnerLayout>)
}
