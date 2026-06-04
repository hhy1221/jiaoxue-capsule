'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ROLE_LABELS, UserRole } from '@/types'
import { Search, Check, ChevronRight, ChevronLeft } from 'lucide-react'

const AVAILABLE_TEAMS = [
  { id:'t1',name:'凡星支教队',school:'电子科技大学',location:'四川宜宾',years:11,members:18,logo:'🌟' },
  { id:'t2',name:'彩云之南志愿队',school:'云南大学',location:'云南西双版纳',years:6,members:22,logo:'🌈' },
  { id:'t3',name:'筑梦支教团',school:'西安交通大学',location:'宁夏固原',years:6,members:28,logo:'🏗️' },
  { id:'t4',name:'阳光支教队',school:'四川师范大学',location:'四川凉山',years:4,members:15,logo:'☀️' },
  { id:'t5',name:'青苗助学计划',school:'兰州大学',location:'甘肃天水',years:5,members:20,logo:'🌱' },
  { id:'t6',name:'追光者支教队',school:'青海大学',location:'青海玉树',years:5,members:16,logo:'💫' },
  { id:'t7',name:'蒲公英志愿者',school:'北京师范大学',location:'贵州毕节',years:8,members:25,logo:'🌬' },
  { id:'t8',name:'新希望支教团',school:'华中科技大学',location:'湖北恩施',years:3,members:14,logo:'🌻' },
  { id:'t9',name:'星光助学',school:'浙江大学',location:'广西河池',years:7,members:19,logo:'✨' },
]

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [roles, setRoles] = useState<UserRole[]>([])
  const [teamId, setTeamId] = useState('')
  const [teamSearch, setTeamSearch] = useState('')
  const [form, setForm] = useState({ name:'黄寒阳',email:'huang@uestc.edu.cn',password:'123456',phone:'',school:'' })
  const toggleRole=(r:UserRole)=>setRoles(prev=>prev.includes(r)?prev.filter(x=>x!==r):[...prev,r])
  const filteredTeams = AVAILABLE_TEAMS.filter(t=>!teamSearch.trim()||t.name.includes(teamSearch)||t.school.includes(teamSearch)||t.location.includes(teamSearch))
  const selectedTeam = AVAILABLE_TEAMS.find(t=>t.id===teamId)

  return (<div className="min-h-screen flex items-center justify-center p-6" style={{background:'linear-gradient(135deg,#3a5a2a 0%,#5a8a4a 40%,#8ab860 100%)'}}>
    <Card className="w-full max-w-[520px] border-0 shadow-2xl"><CardContent className="p-8">
      <div className="flex items-center gap-2 mb-6">{[1,2,3,4].map(s=>(<div key={s} className="flex items-center gap-2" style={{color:step>=s?'var(--primary)':'var(--faded)'}}>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold" style={{background:step>=s?'var(--primary)':'rgba(200,180,160,0.2)',color:step>=s?'#fff':'var(--faded)'}}>{s}</div>
        {s<4&&<div className="w-6 h-px" style={{background:step>s?'var(--primary)':'rgba(200,180,160,0.3)'}}/>}
      </div>))}</div>

      {/* Step 1: 选择队伍 */}
      {step===1&&<div>
        <h2 className="text-[18px] font-semibold text-[var(--text)] mb-1">选择支教队</h2>
        <p className="text-[12px] text-[var(--text-muted)] mb-4">已有 {AVAILABLE_TEAMS.length}+ 支队伍入驻平台，选择你所属的队伍或搜索。</p>
        <div className="relative mb-3"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{color:'var(--faded)'}}/>
          <input value={teamSearch} onChange={e=>setTeamSearch(e.target.value)} placeholder="搜索队伍名称或学校…" className="w-full pl-9 pr-4 py-2.5 rounded-xl text-[13px] outline-none" style={{border:'1.5px solid var(--border)',background:'var(--bg)',color:'var(--text)',fontFamily:'inherit'}}/></div>
        <div className="space-y-1.5 max-h-[240px] overflow-y-auto">{filteredTeams.map(t=>(
          <div key={t.id} onClick={()=>setTeamId(t.id)} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all" style={{background:teamId===t.id?'rgba(200,160,120,0.1)':'transparent',border:`1.5px solid ${teamId===t.id?'var(--primary)':'var(--border)'}`}}>
            <span className="text-2xl">{t.logo}</span><div className="flex-1"><p className="text-[13px] font-semibold text-[var(--text)]">{t.name}</p><p className="text-[10px] text-[var(--text-muted)]">{t.school} · {t.location} · {t.years}年 · {t.members}人</p></div>
            {teamId===t.id&&<Check size={16} style={{color:'var(--primary)'}}/>}
          </div>))}</div>
        <button onClick={()=>setStep(2)} disabled={!teamId} className="w-full mt-4 py-2.5 rounded-xl text-white text-[13px] font-medium border-none cursor-pointer disabled:opacity-40 flex items-center justify-center gap-1" style={{background:'var(--primary)'}}>下一步 <ChevronRight size={14}/></button>
      </div>}

      {/* Step 2: 选择身份 */}
      {step===2&&<div>
        <h2 className="text-[18px] font-semibold text-[var(--text)] mb-1">选择身份</h2>
        <p className="text-[12px] text-[var(--text-muted)] mb-4">可多选，支持一人多身份。{selectedTeam&&<span>正在加入 <strong>{selectedTeam.name}</strong></span>}</p>
        <div className="space-y-2">{(Object.keys(ROLE_LABELS) as UserRole[]).map(r=>(<button key={r} onClick={()=>toggleRole(r)} className="w-full p-3 rounded-xl border text-left text-[13px] font-medium transition-all" style={{background:roles.includes(r)?'rgba(200,160,120,0.08)':'transparent',borderColor:roles.includes(r)?'var(--primary)':'var(--border)',color:roles.includes(r)?'var(--primary)':'var(--text-secondary)'}}>{roles.includes(r)&&<Check size={12} className="inline mr-2"/>}{ROLE_LABELS[r]}</button>))}</div>
        <div className="flex gap-3 mt-4"><button onClick={()=>setStep(1)} className="flex-1 py-2.5 rounded-xl border text-[13px] bg-transparent cursor-pointer flex items-center justify-center gap-1" style={{borderColor:'var(--border)',color:'var(--text-secondary)'}}><ChevronLeft size={14}/>上一步</button>
        <button onClick={()=>setStep(3)} disabled={roles.length===0} className="flex-1 py-2.5 rounded-xl text-white text-[13px] font-medium border-none cursor-pointer disabled:opacity-40 flex items-center justify-center gap-1" style={{background:'var(--primary)'}}>下一步 <ChevronRight size={14}/></button></div>
      </div>}

      {/* Step 3: 填写信息 */}
      {step===3&&<div>
        <h2 className="text-[18px] font-semibold text-[var(--text)] mb-1">填写信息</h2>
        <p className="text-[12px] text-[var(--text-muted)] mb-4">完善个人资料，方便队友和社区成员认识你。</p>
        <div className="space-y-3">
          {[{p:'姓名',v:form.name,k:'name'},{p:'邮箱',v:form.email,k:'email'},{p:'手机号（选填）',v:form.phone,k:'phone'},{p:'学校/单位',v:form.school,k:'school'},{p:'密码',v:form.password,k:'password',type:'password'}].map(f=>(
            <input key={f.k} placeholder={f.p} value={f.v} type={f.type||'text'} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))}
              className="w-full px-4 py-2.5 rounded-xl border text-[13px] outline-none focus:border-[var(--primary)]"
              style={{borderColor:'var(--border)',background:'var(--bg)',color:'var(--text)',fontFamily:'inherit'}}/>
          ))}
        </div>
        <div className="flex gap-3 mt-4"><button onClick={()=>setStep(2)} className="flex-1 py-2.5 rounded-xl border text-[13px] bg-transparent cursor-pointer flex items-center justify-center gap-1" style={{borderColor:'var(--border)',color:'var(--text-secondary)'}}><ChevronLeft size={14}/>上一步</button>
        <button onClick={()=>setStep(4)} disabled={!form.name||!form.email||!form.password} className="flex-1 py-2.5 rounded-xl text-white text-[13px] font-medium border-none cursor-pointer disabled:opacity-40 flex items-center justify-center gap-1" style={{background:'var(--primary)'}}>完成注册 <ChevronRight size={14}/></button></div>
      </div>}

      {/* Step 4: 完成 */}
      {step===4&&<div className="text-center">
        <div className="text-5xl mb-4">🎉</div><h2 className="text-[18px] font-semibold text-[var(--text)] mb-2">注册成功！</h2>
        <p className="text-[13px] text-[var(--text-muted)] mb-1">{form.name}，欢迎加入<strong>{selectedTeam?.name||'支教星火'}</strong></p>
        <p className="text-[11px] text-[var(--text-muted)] mb-6">已有 {AVAILABLE_TEAMS.length} 支队伍 · 1,280+ 名学生 · 3,650+ 条评语</p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="inline-block px-6 py-2.5 rounded-xl border text-[13px] font-medium no-underline" style={{borderColor:'var(--border)',color:'var(--text-secondary)'}}>返回首页</Link>
          <Link href="/dashboard" className="inline-block px-6 py-2.5 rounded-xl text-white text-[13px] font-medium no-underline" style={{background:'var(--primary)'}}>进入教师端</Link>
        </div>
      </div>}

      <div className="text-center mt-6"><p className="text-[10px]" style={{color:'var(--faded)'}}>已有账号？<Link href="/auth/login" className="font-medium" style={{color:'var(--primary)'}}>立即登录</Link></p></div>
    </CardContent></Card></div>)
}
