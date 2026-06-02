'use client'

import InnerLayout from '@/components/layout/InnerLayout'
import { STUDENT_POSTS, INTEREST_GROUPS } from '@/lib/community-data'
import { useState } from 'react'
import { Heart, Shield, Sparkles, MessageCircle, UserCheck } from 'lucide-react'

export default function SocialPage() {
  const [selectedGroup, setSelectedGroup] = useState<string|null>(null)

  const filtered = selectedGroup
    ? STUDENT_POSTS.filter(p=>p.interestGroup===selectedGroup)
    : STUDENT_POSTS

  return (<InnerLayout>
    <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative" style={{borderBottom:'1.5px solid rgba(180,160,130,0.25)'}}>
      <div>
        <h1 className="text-[22px] font-semibold tracking-[0.03em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>👦 学生天地</h1>
        <p className="text-[12px] mt-0.5 tracking-[0.06em]" style={{color:'var(--faded)'}}>安全社交空间 · 作品展示 · 结交纯真朋友</p>
      </div>
    </header>

    {/* 安全提示横幅 */}
    <div className="p-4 mb-5 rounded-xl flex items-start gap-3" style={{
      background:'linear-gradient(135deg,rgba(107,174,214,0.08),rgba(90,152,204,0.05))',
      border:'1.5px solid rgba(107,174,214,0.2)',
    }}>
      <Shield size={20} style={{color:'#4a8ab8',flexShrink:0,marginTop:2}}/>
      <div>
        <p className="text-[12px] font-semibold text-[var(--ink)]">🛡️ 安全提示</p>
        <p className="text-[11px] leading-relaxed mt-0.5" style={{color:'var(--ink-soft)'}}>
          所有学生账号均由所在支教队或学校认证后开通，信息经过严格审核。孩子们在这里分享作品、交流兴趣，不透露真实姓名和联系方式。如发现不当内容，请立即举报。
        </p>
      </div>
    </div>

    {/* 兴趣小组 */}
    <h3 className="text-[14px] font-semibold tracking-[0.04em] mb-3 text-[var(--ink)] flex items-center gap-2" style={{fontFamily:'var(--font-serif)'}}>
      <span className="inline-block w-6 h-3 rounded-[1px]" style={{background:'rgba(107,174,214,0.4)',transform:'rotate(-2deg)'}}/>
      🎯 兴趣小组
    </h3>
    <div className="flex gap-2 mb-6 flex-wrap">
      <button onClick={()=>setSelectedGroup(null)}
        className="px-3 py-1.5 rounded-full text-[11px] border-none cursor-pointer transition-all"
        style={{
          background:!selectedGroup?'linear-gradient(135deg,rgba(107,174,214,0.15),rgba(90,152,204,0.1))':'transparent',
          border:`1.5px solid ${!selectedGroup?'rgba(107,174,214,0.35)':'rgba(200,180,160,0.18)'}`,
          color:!selectedGroup?'var(--ink)':'var(--faded)',fontWeight:!selectedGroup?600:400,fontFamily:'inherit',
        }}>🎨 全部</button>
      {INTEREST_GROUPS.map(g=>(
        <button key={g.id} onClick={()=>setSelectedGroup(selectedGroup===g.name?null:g.name)}
          className="px-3 py-1.5 rounded-full text-[11px] border-none cursor-pointer transition-all"
          style={{
            background:selectedGroup===g.name?'linear-gradient(135deg,rgba(107,174,214,0.15),rgba(90,152,204,0.1))':'transparent',
            border:`1.5px solid ${selectedGroup===g.name?'rgba(107,174,214,0.35)':'rgba(200,180,160,0.18)'}`,
            color:selectedGroup===g.name?'var(--ink)':'var(--faded)',fontWeight:selectedGroup===g.name?600:400,fontFamily:'inherit',
          }}>{g.emoji} {g.name} <span style={{opacity:0.5,fontSize:9}}>{g.memberCount}</span></button>
      ))}
    </div>

    {/* 学生作品瀑布流 */}
    <div className="columns-2 gap-5 max-md:columns-1">
      {filtered.map((p,i)=>(
        <div key={p.id} className="picture-book-card tape-top mb-5 break-inside-avoid overflow-hidden"
          style={{transform:`rotate(${i%2===0?'-0.25deg':'0.2deg'})`}}>
          {/* 作品展示 */}
          {p.image.startsWith('/') ? (
            <div style={{height:220,overflow:'hidden'}}>
              <img src={p.image} alt={p.studentName+'的作品'} className="w-full h-full object-cover"/>
            </div>
          ) : (
            <div className="flex items-center justify-center p-6"
              style={{background:'linear-gradient(180deg,rgba(240,235,220,0.4),transparent)',fontSize:56}}>{p.image}</div>
          )}

          <div className="px-4 pb-4">
            {/* 学生信息 */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                style={{background:'linear-gradient(135deg,#f5e6d0,#e8d4b8)',color:'var(--ink-soft)',border:'2px solid #fff',outline:'1px solid rgba(180,150,120,0.3)'}}>{p.studentAvatar}</div>
              <div>
                <p className="text-[12px] font-semibold text-[var(--ink)]">{p.studentName}</p>
                <p className="text-[9px]" style={{color:'var(--faded)'}}>{p.grade} · {p.school} <span className="text-[8px] text-green-600">✓已验证</span></p>
              </div>
            </div>

            <p className="text-[13px] leading-relaxed mb-3" style={{color:'var(--ink-soft)'}}>{p.content}</p>

            {/* 类型标签 */}
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className="text-[9px] px-2 py-0.5 rounded-full"
                style={{background:'rgba(200,180,160,0.06)',color:'var(--faded)',border:'1px solid rgba(200,180,160,0.12)'}}>
                {p.type==='artwork'?'🎨 作品':p.type==='story'?'📖 故事':p.type==='greeting'?'👋 问候':'❓ 提问'}
              </span>
              {p.interestGroup&&<span className="text-[9px] px-2 py-0.5 rounded-full"
                style={{background:'rgba(107,174,214,0.06)',color:'#5a8ab8',border:'1px solid rgba(107,174,214,0.15)'}}>{p.interestGroup}</span>}
            </div>

            <div className="flex items-center justify-between text-[10px]" style={{color:'var(--faded)'}}>
              <span className="flex items-center gap-2">
                <button className="flex items-center gap-1 bg-transparent border-none cursor-pointer" style={{color:'var(--faded)',fontFamily:'inherit',fontSize:10}}>
                  <Heart size={11}/> {p.likes}
                </button>
                <button className="flex items-center gap-1 bg-transparent border-none cursor-pointer" style={{color:'var(--faded)',fontFamily:'inherit',fontSize:10}}>
                  <MessageCircle size={11}/> 评论
                </button>
              </span>
              <span>{p.createdAt}</span>
            </div>
          </div>
        </div>
      ))}
    </div>

    {filtered.length===0&&(
      <div className="text-center py-12" style={{color:'var(--faded)'}}>
        <p className="text-4xl mb-3 opacity-30">🎨</p>
        <p className="handwriting text-[15px]">该兴趣小组还没有作品，快来当第一个！</p>
      </div>
    )}
  </InnerLayout>)
}
