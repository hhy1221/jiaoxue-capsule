'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { QUESTIONS, STORIES, RECRUITS, OFFICIAL_ACCOUNTS } from '@/lib/community-data'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { Heart, MessageCircle, Eye, MapPin, Clock, ArrowRight, BookOpen, Users, Star, CheckCircle, Calendar, ThumbsUp, TrendingUp, Flame, Award } from 'lucide-react'

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'all'|'questions'|'stories'|'recruits'>('all')

  const hasImage = (item: typeof QUESTIONS[0] | typeof STORIES[0] | typeof RECRUITS[0]) => {
    if ('images' in item && Array.isArray(item.images) && item.images.length > 0) {
      return item.images[0].startsWith('/')
    }
    return false
  }
  const { leftCol, rightCol } = useMemo(() => {
    type FeedItem = { type: 'question' | 'story' | 'recruit'; data: typeof QUESTIONS[0] | typeof STORIES[0] | typeof RECRUITS[0]; time: string }
    const qs: FeedItem[] = QUESTIONS.map(q => ({ type: 'question', data: q, time: q.createdAt }))
    const ss: FeedItem[] = STORIES.map(s => ({ type: 'story', data: s, time: s.createdAt }))
    const rs: FeedItem[] = RECRUITS.filter(r => r.status === 'active').map(r => ({ type: 'recruit', data: r, time: r.createdAt }))

    const all = [...qs, ...ss, ...rs]
    const imgItems = all.filter(i => hasImage(i.data))
    const noImgItems = all.filter(i => !hasImage(i.data))

    const byDate = (a: FeedItem, b: FeedItem) => b.time.localeCompare(a.time)
    imgItems.sort(byDate)
    noImgItems.sort(byDate)

    // ── 硬控左右两列 ──
    const leftCol: FeedItem[] = []
    const rightCol: FeedItem[] = []
    let ni = 0 // noImgItems 游标
    let ii = 0 // imgItems 游标

    // 左[0] = 🦕 恐龙（第1张图）
    if (imgItems[ii]) leftCol.push(imgItems[ii++])

    // 右[0] = 普通文章（占位 filler）
    if (noImgItems[ni]) rightCol.push(noImgItems[ni++])

    // 右[1] = ✉️ 女孩的信（第2张图）
    if (imgItems[ii]) rightCol.push(imgItems[ii++])

    // 左右交替填入剩余内容
    while (ni < noImgItems.length || ii < imgItems.length) {
      // 左列取下一个
      if (ni < noImgItems.length) { leftCol.push(noImgItems[ni++]) }
      else if (ii < imgItems.length) { leftCol.push(imgItems[ii++]) }
      // 右列取下一个
      if (ni < noImgItems.length) { rightCol.push(noImgItems[ni++]) }
      else if (ii < imgItems.length) { rightCol.push(imgItems[ii++]) }
    }

    const filterCol = (col: FeedItem[]) => {
      if (activeTab === 'questions') return col.filter(i => i.type === 'question')
      if (activeTab === 'stories') return col.filter(i => i.type === 'story')
      if (activeTab === 'recruits') return col.filter(i => i.type === 'recruit')
      return col
    }

    return { leftCol: filterCol(leftCol), rightCol: filterCol(rightCol) }
  }, [activeTab])

  const tQ=QUESTIONS.length, tS=STORIES.length, tR=RECRUITS.filter(r=>r.status==='active').length
  const tAns=QUESTIONS.reduce((s,q)=>s+q.answers.length,0)
  const topStories=[...STORIES].sort((a,b)=>b.likes-a.likes).slice(0,4)

  return (<InnerLayout>
    <header className="relative mb-6 rounded-2xl overflow-hidden" style={{background:'linear-gradient(135deg,rgba(200,150,100,0.12),rgba(180,130,80,0.08),rgba(220,180,140,0.06))',border:'1.5px solid rgba(200,160,120,0.2)',padding:'28px 32px'}}>
      <div className="max-w-[700px]">
        <h1 className="text-[28px] font-bold tracking-[0.03em] text-[var(--ink)] mb-2" style={{fontFamily:'var(--font-serif)'}}>🌐 支教社区</h1>
        <p className="text-[13px] leading-relaxed mb-4" style={{color:'var(--ink-soft)'}}>连接<strong>支教队员</strong>·<strong>一线教师</strong>·<strong>团委村支书</strong>·<strong>热心公众</strong>——全国支教工作者的温暖家园</p>
        <div className="flex items-center gap-6 flex-wrap">
          {[{icon:BookOpen,v:tQ,l:'教学问答',c:'#c8862e'},{icon:Users,v:tR,l:'正在招募',c:'#d4855e'},{icon:Heart,v:tS,l:'支教故事',c:'#7a9a5a'},{icon:MessageCircle,v:tAns,l:'教师回答',c:'#6baed6'}].map(s=>(
            <div key={s.l} className="flex items-center gap-2"><div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{background:`${s.c}15`,color:s.c}}><s.icon size={17}/></div><div><p className="text-[18px] font-bold text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>{s.v}</p><p className="text-[9px] tracking-[0.06em]" style={{color:'var(--faded)'}}>{s.l}</p></div></div>
          ))}</div></div></header>

    <div className="grid grid-cols-[1fr_320px] gap-6 max-lg:grid-cols-1">
      <div>
        {/* Tab */}
        <div className="flex items-center gap-1 mb-4 bg-white/50 rounded-full p-1 w-fit" style={{border:'1px solid rgba(200,180,160,0.15)'}}>
          {([{k:'all',l:'全部动态'},{k:'questions',l:'教学问答'},{k:'stories',l:'支教故事'},{k:'recruits',l:'招募信息'}] as const).map(t=>(
            <button key={t.k} onClick={()=>setActiveTab(t.k)} className="px-4 py-1.5 rounded-full text-[12px] border-none cursor-pointer transition-all"
              style={{background:activeTab===t.k?'linear-gradient(135deg,#9b7a4a,#7a5a3a)':'transparent',color:activeTab===t.k?'#fff':'var(--ink-soft)',fontWeight:activeTab===t.k?600:400,fontFamily:'inherit'}}>{t.l}</button>
          ))}</div>

        {/* 双列信息流 — 硬控左右列：左[0]=恐龙图，右[1]=女孩的信 */}
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          <div className="flex flex-col gap-4">
            {leftCol.map(item => {
              if (item.type === 'story') return <StoryCardMini key={item.data.id} s={item.data as typeof STORIES[0]} />
              if (item.type === 'question') return <QuestionCardMini key={item.data.id} q={item.data as typeof QUESTIONS[0]} />
              return <RecruitCardMini key={item.data.id} r={item.data as typeof RECRUITS[0]} />
            })}
          </div>
          <div className="flex flex-col gap-4">
            {rightCol.map(item => {
              if (item.type === 'story') return <StoryCardMini key={item.data.id} s={item.data as typeof STORIES[0]} />
              if (item.type === 'question') return <QuestionCardMini key={item.data.id} q={item.data as typeof QUESTIONS[0]} />
              return <RecruitCardMini key={item.data.id} r={item.data as typeof RECRUITS[0]} />
            })}
          </div>
        </div>
      </div>

      {/* 右栏 */}
      <div className="space-y-4 max-lg:hidden">
        <div className="picture-book-card p-4" style={{transform:'rotate(0.04deg)'}}>
          <h3 className="text-[13px] font-semibold mb-3 text-[var(--ink)] flex items-center gap-1.5" style={{fontFamily:'var(--font-serif)'}}><Flame size={13} style={{color:'#e08050'}}/> 热门故事</h3>
          {topStories.map((s,i)=>(<Link key={s.id} href="/community/stories" className="no-underline block py-2 group" style={{borderBottom:i<3?'1px solid rgba(200,180,160,0.08)':'none'}}>
            <div className="flex gap-2"><span className="text-[18px] font-bold flex-shrink-0" style={{color:i===0?'#e08050':i===1?'#d4a040':i===2?'#b89860':'var(--faded)',fontFamily:'var(--font-serif)',width:24,textAlign:'center'}}>{i+1}</span>
              <div className="min-w-0"><p className="text-[11px] leading-snug line-clamp-2 group-hover:text-[var(--ink)] transition-colors">{s.title}</p>
                <p className="text-[9px] mt-0.5" style={{color:'var(--faded)'}}>❤️ {s.likes}</p></div></div>
          </Link>))}</div>

        <div className="picture-book-card p-4" style={{transform:'rotate(-0.03deg)'}}>
          <h3 className="text-[13px] font-semibold mb-3 text-[var(--ink)] flex items-center gap-1.5" style={{fontFamily:'var(--font-serif)'}}><TrendingUp size={13} style={{color:'#6baed6'}}/> 热门话题</h3>
          <div className="flex flex-wrap gap-1.5">
            {['课堂管理','留守儿童','低成本教学','游戏教学','写作指导','心理辅导','短期支教','文化传承','物资互助','英语启蒙','高原支教','少数民族教育','支教队鉴别','手机管理'].map(t=>(<Link key={t} href="/community/questions"
              className="no-underline text-[10px] px-2.5 py-1 rounded-full transition-all hover:-translate-y-0.5"
              style={{background:'rgba(200,160,120,0.06)',color:'var(--ink-soft)',border:'1px solid rgba(200,160,120,0.12)'}}>#{t}</Link>))}</div></div>

        <div className="picture-book-card p-4" style={{transform:'rotate(-0.05deg)'}}>
          <h3 className="text-[13px] font-semibold mb-3 text-[var(--ink)] flex items-center gap-1.5" style={{fontFamily:'var(--font-serif)'}}><Star size={13} style={{color:'#d4a853'}}/> 认证组织</h3>
          <div className="space-y-2">{OFFICIAL_ACCOUNTS.slice(0,6).map(oa=>(<div key={oa.id} className="flex items-center gap-2.5">
            <span className="text-base w-6 text-center">{oa.avatar}</span><div className="flex-1 min-w-0"><p className="text-[11px] font-semibold text-[var(--ink)] flex items-center gap-1">{oa.name}{oa.verified&&<CheckCircle size={9} style={{color:'#4a8a4a'}}/>}</p><p className="text-[9px] truncate" style={{color:'var(--faded)'}}>{oa.location}</p></div></div>))}</div></div>

        <div className="p-5 rounded-lg text-center" style={{background:'linear-gradient(135deg,rgba(245,238,220,0.5),rgba(240,225,210,0.3))',border:'1.5px solid rgba(200,180,160,0.15)'}}>
          <p className="handwriting text-[16px] tracking-[0.04em]" style={{color:'var(--ink-soft)'}}>让知识跨越山海<br/>让温暖传遍乡村 🌍</p>
          <p className="text-[10px] mt-2 tracking-[0.06em]" style={{color:'var(--faded)'}}>{OFFICIAL_ACCOUNTS.length} 个认证组织 · 服务中</p></div></div></div>
  </InnerLayout>)}

/* ── 迷你故事卡（双列，有图片优先） ── */
function StoryCardMini({s}:{s:typeof STORIES[0]}) {
  const hasImg = s.images.length>0&&s.images[0].startsWith('/')
  return (<Link href="/community/stories" className="no-underline block group">
    <div className="picture-book-card overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300">
      <div style={{height:hasImg?150:0,overflow:'hidden',background:hasImg?'transparent':'transparent'}}>
        {hasImg&&<img src={s.images[0]} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy"/>}
        {!hasImg&&s.images[0]&&<div className="flex items-center justify-center h-full text-[32px] opacity-25" style={{background:'linear-gradient(135deg,rgba(220,200,170,0.15),rgba(200,180,150,0.08))'}}>{s.images[0]}</div>}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-[10px] mb-2"><span className="px-1.5 py-0.5 rounded-full" style={{background:'rgba(122,154,90,0.08)',color:'#6a8a4a',border:'1px solid rgba(122,154,90,0.15)'}}>📸 故事</span><span style={{color:'var(--faded)'}}>{s.createdAt}</span></div>
        <h3 className="text-[14px] font-semibold text-[var(--ink)] mb-1.5 leading-snug group-hover:text-[var(--primary-skin)] transition-colors" style={{fontFamily:'var(--font-serif)'}}>{s.title}</h3>
        <p className="text-[11px] leading-relaxed line-clamp-2 mb-3" style={{color:'var(--ink-soft)'}}>{s.content.split('\n')[0].slice(0,80)}</p>
        <div className="flex items-center justify-between text-[10px]" style={{color:'var(--faded)'}}>
          <span className="flex items-center gap-1"><MapPin size={9}/>{s.location}</span>
          <div className="flex items-center gap-2"><span className="flex items-center gap-1"><Heart size={10}/>{s.likes}</span><span className="flex items-center gap-1"><MessageCircle size={10}/>{s.comments.length}</span></div>
  </div></div></div></Link>)}

function QuestionCardMini({q}:{q:typeof QUESTIONS[0]}) {
  const aCount=q.answers.length,hasBest=q.answers.some(a=>a.isAccepted)
  return (<Link href="/community/questions" className="no-underline block">
    <div className="picture-book-card p-4 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300" style={{borderLeft:`3px solid ${hasBest?'rgba(122,180,90,0.35)':'rgba(240,180,60,0.25)'}`}}>
      <div className="flex items-center gap-2 text-[10px] mb-2"><span className="px-1.5 py-0.5 rounded-full" style={{background:'rgba(200,160,120,0.07)',color:'var(--ink-soft)',border:'1px solid rgba(200,160,120,0.12)'}}>📚 问答</span>{hasBest&&<span className="px-1.5 py-0.5 rounded-full text-[9px]" style={{background:'rgba(122,180,90,0.08)',color:'#5a8a3a',border:'1px solid rgba(122,180,90,0.15)'}}>已解答</span>}</div>
      <h3 className="text-[13px] font-semibold text-[var(--ink)] mb-1.5 leading-snug" style={{fontFamily:'var(--font-serif)'}}>{q.title}</h3>
      <p className="text-[11px] leading-relaxed line-clamp-2 mb-2.5" style={{color:'var(--ink-soft)'}}>{q.content.split('\n')[0]}</p>
      <div className="flex items-center justify-between text-[10px]" style={{color:'var(--faded)'}}>
        <span>{q.author.name}</span>
        <div className="flex items-center gap-2"><span>{q.views} 浏览</span><span className="flex items-center gap-1"><MessageCircle size={9}/>{aCount}</span></div>
  </div></div></Link>)}

function RecruitCardMini({r}:{r:typeof RECRUITS[0]}) {
  const e:Record<string,string>={team_recruit:'🌟',volunteer_wanted:'📍',material_request:'📦',self_recommend:'🙋'}
  return (<Link href="/community/recruit" className="no-underline block">
    <div className="picture-book-card p-4 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300">
      <div className="flex items-center gap-2 text-[10px] mb-2"><span className="px-1.5 py-0.5 rounded-full" style={{background:'rgba(212,133,94,0.07)',color:'#a06030',border:'1px solid rgba(212,133,94,0.12)'}}>{e[r.type]} 招募</span><span className="flex items-center gap-1" style={{color:'var(--faded)'}}><MapPin size={9}/>{r.region}</span></div>
      <h3 className="text-[13px] font-semibold text-[var(--ink)] mb-1.5 leading-snug" style={{fontFamily:'var(--font-serif)'}}>{r.title}</h3>
      <p className="text-[11px] leading-relaxed line-clamp-2 mb-2.5" style={{color:'var(--ink-soft)'}}>{r.content.split('\n')[0]}</p>
      <div className="flex items-center justify-between text-[10px]" style={{color:'var(--faded)'}}>
        <span>{r.author.name}</span>
        <div className="flex items-center gap-2">{r.deadline&&<span className="flex items-center gap-1"><Calendar size={9}/>{r.deadline}</span>}<span>{r.views} 浏览</span></div>
  </div></div></Link>)}
