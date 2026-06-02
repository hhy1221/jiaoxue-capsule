'use client'

import InnerLayout from '@/components/layout/InnerLayout'
import { QUESTIONS, STORIES, RECRUITS, OFFICIAL_ACCOUNTS, STUDENT_POSTS } from '@/lib/community-data'
import Link from 'next/link'
import { useState } from 'react'
import { Heart, MessageCircle, Eye, MapPin, Clock, ArrowRight, Search, ThumbsUp, BookOpen, Users, Star, CheckCircle, Calendar, Shield } from 'lucide-react'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'all'|'questions'|'stories'|'recruits'>('all')

  // 混合信息流
  const feedItems = (()=>{
    const items = [
      ...QUESTIONS.map(q=>({type:'question' as const,data:q,time:q.createdAt})),
      ...STORIES.map(s=>({type:'story' as const,data:s,time:s.createdAt})),
      ...RECRUITS.filter(r=>r.status==='active').map(r=>({type:'recruit' as const,data:r,time:r.createdAt})),
    ]
    items.sort((a,b)=>b.time.localeCompare(a.time))
    if (activeTab==='questions') return items.filter(i=>i.type==='question')
    if (activeTab==='stories') return items.filter(i=>i.type==='story')
    if (activeTab==='recruits') return items.filter(i=>i.type==='recruit')
    return items
  })()

  const totalQuestions = QUESTIONS.length
  const totalStories = STORIES.length
  const totalRecruits = RECRUITS.filter(r=>r.status==='active').length
  const totalAnswers = QUESTIONS.reduce((s,q)=>s+q.answers.length,0)
  const totalLikes = STORIES.reduce((s,x)=>s+x.likes,0)

  return (<InnerLayout>
    {/* ═══ 社区首页大Banner ═══ */}
    <header className="relative mb-6 rounded-2xl overflow-hidden" style={{
      background:'linear-gradient(135deg,rgba(200,150,100,0.12),rgba(180,130,80,0.08),rgba(220,180,140,0.06))',
      border:'1.5px solid rgba(200,160,120,0.2)',padding:'32px 36px',}}>
      <div className="max-w-[600px]">
        <h1 className="text-[28px] font-bold tracking-[0.03em] text-[var(--ink)] mb-2" style={{fontFamily:'var(--font-serif)'}}>
          🌐 支教社区
        </h1>
        <p className="text-[14px] leading-relaxed mb-5" style={{color:'var(--ink-soft)'}}>
          连接<strong>支教队员</strong>、<strong>一线教师</strong>、<strong>团委村支书</strong>和<strong>热心公众</strong>的温暖交流平台
        </p>
        <div className="flex items-center gap-5 flex-wrap">
          {[
            {icon:BookOpen,val:totalQuestions,label:'教学问答',color:'#c8862e'},
            {icon:Users,val:totalRecruits,label:'正在招募',color:'#d4855e'},
            {icon:Heart,val:totalStories,label:'支教故事',color:'#7a9a5a'},
            {icon:MessageCircle,val:totalAnswers,label:'教师回答',color:'#6baed6'},
          ].map(s=>(<div key={s.label} className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{background:`${s.color}15`,color:s.color}}><s.icon size={17}/></div>
            <div><p className="text-[17px] font-bold text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>{s.val}</p><p className="text-[9px] tracking-[0.06em]" style={{color:'var(--faded)'}}>{s.label}</p></div>
          </div>))}
        </div>
      </div>
    </header>

    {/* ═══ 内容区: 信息流(2/3) + 侧边栏(1/3) ═══ */}
    <div className="grid grid-cols-[1fr_320px] gap-6 max-lg:grid-cols-1">

      {/* ── 左：信息流 ── */}
      <div>
        {/* Tab 切换 */}
        <div className="flex items-center gap-1 mb-4 bg-white/50 rounded-full p-1 w-fit" style={{border:'1px solid rgba(200,180,160,0.15)'}}>
          {[
            {k:'all',l:'全部动态'},{k:'questions',l:'教学问答'},{k:'stories',l:'支教故事'},{k:'recruits',l:'招募信息'},
          ].map(t=>(<button key={t.k} onClick={()=>setActiveTab(t.k as any)}
            className="px-4 py-1.5 rounded-full text-[12px] border-none cursor-pointer transition-all"
            style={{
              background:activeTab===t.k?'linear-gradient(135deg,#9b7a4a,#7a5a3a)':'transparent',
              color:activeTab===t.k?'#fff':'var(--ink-soft)',fontWeight:activeTab===t.k?600:400,fontFamily:'inherit',
            }}>{t.l}</button>))}
        </div>

        {/* 信息流列表 */}
        <div className="space-y-4">
          {feedItems.map(item=>{
            if (item.type==='question') return <QuestionCard key={item.data.id} q={item.data} />
            if (item.type==='story') return <StoryCard key={item.data.id} s={item.data} />
            if (item.type==='recruit') return <RecruitCard key={item.data.id} r={item.data} />
            return null
          })}
        </div>
      </div>

      {/* ── 右：侧边栏 ── */}
      <div className="space-y-4 max-lg:hidden">
        {/* 认证账号 */}
        <div className="picture-book-card p-4" style={{transform:'rotate(0.06deg)'}}>
          <h3 className="text-[13px] font-semibold mb-3 text-[var(--ink)] flex items-center gap-1.5" style={{fontFamily:'var(--font-serif)'}}>
            <Star size={13} style={{color:'#d4a853'}}/> 认证账号</h3>
          <div className="space-y-2.5">
            {OFFICIAL_ACCOUNTS.slice(0,5).map(oa=>(<div key={oa.id} className="flex items-center gap-2.5">
              <span className="text-base w-7 text-center">{oa.avatar}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold text-[var(--ink)] flex items-center gap-1">{oa.name}
                  {oa.verified&&<CheckCircle size={9} style={{color:'#4a8a4a'}}/>}</p>
                <p className="text-[9px] truncate" style={{color:'var(--faded)'}}>{oa.location}</p>
              </div>
            </div>))}
          </div>
        </div>

        {/* 热门话题 */}
        <div className="picture-book-card p-4" style={{transform:'rotate(-0.04deg)'}}>
          <h3 className="text-[13px] font-semibold mb-3 text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>🔥 热门话题</h3>
          <div className="flex flex-wrap gap-1.5">
            {['课堂管理','留守儿童','低成本教学','游戏教学','写作指导','心理辅导','短期支教','文化传承','物资互助','英语启蒙'].map(t=>(<Link key={t} href={`/community/questions?tag=${t}`}
              className="no-underline text-[10px] px-2.5 py-1 rounded-full transition-all hover:-translate-y-0.5"
              style={{background:'rgba(200,160,120,0.06)',color:'var(--ink-soft)',border:'1px solid rgba(200,160,120,0.12)'}}>#{t}</Link>))}
          </div>
        </div>

        {/* 社区 Slogan */}
        <div className="p-5 rounded-lg text-center" style={{background:'linear-gradient(135deg,rgba(245,238,220,0.5),rgba(240,225,210,0.3))',border:'1.5px solid rgba(200,180,160,0.15)'}}>
          <p className="handwriting text-[16px] tracking-[0.06em]" style={{color:'var(--ink-soft)'}}>让知识跨越山海<br/>让温暖传遍乡村 🌍</p>
          <p className="text-[10px] mt-2 tracking-[0.06em]" style={{color:'var(--faded)'}}>{OFFICIAL_ACCOUNTS.length} 个认证组织 · 持续服务中</p>
        </div>
      </div>
    </div>
  </InnerLayout>)
}

/* ── 问答卡片 ── */
function QuestionCard({q}:{q:typeof QUESTIONS[0]}) {
  const answerCount = q.answers.length
  const hasBest = q.answers.some(a=>a.isAccepted)
  return (
    <Link href={`/community/questions`} className="no-underline block">
      <div className="picture-book-card p-5 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300"
        style={{borderLeft:`4px solid ${hasBest?'rgba(122,180,90,0.4)':'rgba(240,180,60,0.3)'}`}}>
        {/* 类型标签 */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{background:'rgba(200,160,120,0.08)',color:'var(--ink-soft)',border:'1px solid rgba(200,160,120,0.15)'}}>📚 问答</span>
          {answerCount>0&&<span className="text-[9px] px-2 py-0.5 rounded-full" style={{background:hasBest?'rgba(122,180,90,0.1)':'rgba(240,180,60,0.1)',color:hasBest?'#5a8a3a':'#b08030',border:`1px solid ${hasBest?'rgba(122,180,90,0.2)':'rgba(240,180,60,0.15)'}`}}>{hasBest?'已解答':`${answerCount} 回答`}</span>}
        </div>

        <h3 className="text-[15px] font-semibold text-[var(--ink)] mb-2 leading-snug" style={{fontFamily:'var(--font-serif)'}}>{q.title}</h3>
        <p className="text-[12px] leading-relaxed line-clamp-2 mb-3" style={{color:'var(--ink-soft)'}}>{q.content.split('\n')[0]}</p>

        {/* 标签 */}
        <div className="flex flex-wrap gap-1 mb-3">
          {q.tags.slice(0,3).map(t=><span key={t} className="text-[9px] px-2 py-0.5 rounded-full" style={{background:'rgba(200,180,160,0.06)',color:'var(--faded)',border:'1px solid rgba(200,180,160,0.12)'}}>#{t}</span>)}
        </div>

        {/* 作者 + 互动 */}
        <div className="flex items-center justify-between text-[10px]" style={{color:'var(--faded)'}}>
          <div className="flex items-center gap-2">
            {q.author.verified?(
              <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0" style={{border:'1.5px solid #fff',outline:'1px solid rgba(180,150,120,0.3)',boxShadow:'0 1px 3px rgba(0,0,0,0.06)'}}>
                {typeof q.author.avatar==='string'&&q.author.avatar.includes('/')?<img src={q.author.avatar} alt="" className="w-full h-full object-cover"/>:<span className="text-[10px]">{q.author.avatar}</span>}
              </div>
            ):<span className="text-sm">{q.author.avatar}</span>}
            <span className="font-medium text-[var(--ink-soft)]">{q.author.name}</span>
            {q.author.verified&&<CheckCircle size={9} style={{color:'#4a8a4a'}}/>}
            <span>{q.createdAt}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Eye size={10}/> {q.views}</span>
            <span className="flex items-center gap-1"><MessageCircle size={10}/> {answerCount}</span>
            <span className="flex items-center gap-1"><ThumbsUp size={10}/> {q.likes}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ── 故事卡片 ── */
function StoryCard({s}:{s:typeof STORIES[0]}) {
  const hasPhoto = s.images.length>0 && s.images[0].startsWith('/')
  return (
    <Link href={`/community/stories`} className="no-underline block">
      <div className="picture-book-card p-0 overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300">
        {/* 图片 */}
        <div className="relative overflow-hidden" style={{aspectRatio:'21/9',background:'linear-gradient(135deg,rgba(220,200,170,0.2),rgba(200,180,150,0.1))'}}>
          {hasPhoto?<img src={s.images[0]} alt={s.title} className="w-full h-full object-cover"/>:
          <div className="flex items-center justify-center h-full text-[40px] opacity-40">{s.images[0]||'📸'}</div>}
          {/* 类型标签浮在图上 */}
          <span className="absolute top-3 left-3 text-[9px] px-2 py-0.5 rounded-full bg-white/80 text-[var(--ink-soft)]" style={{backdropFilter:'blur(4px)',border:'1px solid rgba(200,180,160,0.2)'}}>📸 支教故事</span>
        </div>

        <div className="p-4">
          <h3 className="text-[15px] font-semibold text-[var(--ink)] mb-2 leading-snug" style={{fontFamily:'var(--font-serif)'}}>{s.title}</h3>
          <p className="text-[12px] leading-relaxed line-clamp-2 mb-3" style={{color:'var(--ink-soft)'}}>{s.content.split('\n')[0]}</p>

          <div className="flex items-center justify-between text-[10px]" style={{color:'var(--faded)'}}>
            <div className="flex items-center gap-1.5">
              {s.author.verified?(<div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0" style={{border:'1.5px solid #fff',outline:'1px solid rgba(180,150,120,0.3)'}}>
                {typeof s.author.avatar==='string'&&s.author.avatar.includes('/')?<img src={s.author.avatar} alt="" className="w-full h-full object-cover"/>:<span className="text-[9px]">{s.author.avatar}</span>}
              </div>):<span className="text-xs">{s.author.avatar}</span>}
              <span className="font-medium text-[var(--ink-soft)]">{s.teamName}</span>
              <MapPin size={9}/><span>{s.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><Heart size={10}/> {s.likes}</span>
              <span className="flex items-center gap-1"><MessageCircle size={10}/> {s.comments.length}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* ── 招募卡片 ── */
function RecruitCard({r}:{r:typeof RECRUITS[0]}) {
  const emojis:Record<string,string> = {team_recruit:'🌟',volunteer_wanted:'📍',material_request:'📦',self_recommend:'🙋'}
  return (
    <Link href={`/community/recruit`} className="no-underline block">
      <div className="picture-book-card p-5 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[9px] px-2 py-0.5 rounded-full font-medium" style={{background:'rgba(212,133,94,0.08)',color:'#a06030',border:'1px solid rgba(212,133,94,0.2)'}}>{emojis[r.type]||'📋'} 招募</span>
          {r.status==='closed'&&<span className="text-[9px] px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500 border border-zinc-200">已结束</span>}
          {r.status==='active'&&<span className="flex items-center gap-1 text-[9px]" style={{color:'var(--faded)'}}><MapPin size={9}/> {r.region}</span>}
        </div>
        <h3 className="text-[15px] font-semibold text-[var(--ink)] mb-2 leading-snug" style={{fontFamily:'var(--font-serif)'}}>{r.title}</h3>
        <p className="text-[12px] leading-relaxed line-clamp-2 mb-3" style={{color:'var(--ink-soft)'}}>{r.content.split('\n')[0]}</p>

        <div className="flex items-center justify-between text-[10px]" style={{color:'var(--faded)'}}>
          <div className="flex items-center gap-1.5">
            <span>{r.author.avatar}</span>
            <span className="font-medium text-[var(--ink-soft)]">{r.author.name}</span>
            {r.author.verified&&<CheckCircle size={9} style={{color:'#4a8a4a'}}/>}
          </div>
          <div className="flex items-center gap-3">
            {r.deadline&&<span className="flex items-center gap-1"><Calendar size={10}/> {r.deadline}</span>}
            <span className="flex items-center gap-1"><Eye size={10}/> {r.views}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
