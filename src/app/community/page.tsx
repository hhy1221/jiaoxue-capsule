'use client'

import InnerLayout from '@/components/layout/InnerLayout'
import { MOCK_QUESTIONS, MOCK_STORIES, MOCK_RECRUITS, MOCK_STUDENT_POSTS, MOCK_OFFICIAL_ACCOUNTS } from '@/lib/mock-data'
import Link from 'next/link'
import { MessageCircle, Users, BookOpen, Heart, ArrowRight, MapPin, Clock } from 'lucide-react'

export default function CommunityPage() {
  const totalAnswers = MOCK_QUESTIONS.reduce((s,q)=>s+q.answers.length,0)
  const totalTeams = MOCK_OFFICIAL_ACCOUNTS.filter(a=>a.type==='team').length
  const totalLikes = MOCK_STORIES.reduce((s,x)=>s+x.likes,0)
  const activeRecruits = MOCK_RECRUITS.filter(r=>r.status==='active').length

  const entryCards = [
    { href:'/community/questions',title:'教学问答',emoji:'📚',desc:'教学难题求助 · 经验教师解答',color:'#c8862e',stat:MOCK_QUESTIONS.length+'个问题',sub:'等待你的回答'},
    { href:'/community/recruit',title:'招募广场',emoji:'🌟',desc:'支教队招新 · 志愿者匹配 · 物资求助',color:'#d4855e',stat:activeRecruits+'条有效',sub:'正在招募中'},
    { href:'/community/stories',title:'支教故事',emoji:'📸',desc:'课堂瞬间 · 成长故事 · 温暖记录',color:'#7a9a5a',stat:MOCK_STORIES.length+'篇故事',sub:'收到 '+totalLikes+' 个赞'},
    { href:'/community/social',title:'学生天地',emoji:'👦',desc:'安全社交 · 作品展示 · 兴趣小组',color:'#6baed6',stat:MOCK_STUDENT_POSTS.length+'个孩子',sub:'在社区分享快乐'},
  ]

  return (<InnerLayout>
    <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative" style={{borderBottom:'1.5px solid rgba(180,160,130,0.25)'}}>
      <div>
        <h1 className="text-[22px] font-semibold tracking-[0.03em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>🌐 支教社区</h1>
        <p className="text-[12px] mt-0.5 tracking-[0.06em]" style={{color:'var(--faded)'}}>连接支教队员、教师、学生和热心公众的温暖交流平台</p>
      </div>
    </header>

    <div className="picture-book-card p-4 mb-6 flex items-center flex-wrap gap-x-8 gap-y-2 justify-center" style={{transform:'rotate(-0.06deg)'}}>
      {[
        {icon:BookOpen,val:MOCK_QUESTIONS.length,label:'教学问答',color:'#c8862e'},
        {icon:MessageCircle,val:totalAnswers,label:'教师回答',color:'#7a9a5a'},
        {icon:Users,val:totalTeams,label:'认证支教队',color:'#6baed6'},
        {icon:Heart,val:MOCK_STORIES.length,label:'支教故事',color:'#d4855e'},
      ].map((s,i,arr)=>(<div key={s.label} className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{background:s.color+'12',color:s.color}}><s.icon size={17}/></div>
          <div><p className="text-[18px] font-bold text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>{s.val}</p><p className="text-[10px] tracking-[0.06em]" style={{color:'var(--faded)'}}>{s.label}</p></div>
        </div>
        {i<arr.length-1&&<span className="w-[3px] h-[3px] rounded-full mx-2" style={{background:'rgba(180,150,120,0.3)'}}/>}
      </div>))}
    </div>

    <div className="grid grid-cols-2 gap-4 mb-6 max-md:grid-cols-1">
      {entryCards.map(card=>(<Link key={card.href} href={card.href} className="no-underline group">
        <div className="picture-book-card p-5 h-full cursor-pointer transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg" style={{transform:'rotate(-0.1deg)'}}>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-[24px] flex-shrink-0" style={{background:card.color+'12',border:'1.5px solid '+card.color+'25'}}>{card.emoji}</div>
            <div className="flex-1 min-w-0">
              <h3 className="text-[16px] font-semibold tracking-[0.04em] text-[var(--ink)] mb-1 flex items-center gap-2" style={{fontFamily:'var(--font-serif)'}}>
                {card.title}<ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-1" style={{color:card.color}}/>
              </h3>
              <p className="text-[12px] leading-relaxed mb-3" style={{color:'var(--ink-soft)'}}>{card.desc}</p>
              <div className="flex items-center gap-2 pt-2" style={{borderTop:'1px solid rgba(200,180,160,0.12)'}}>
                <span className="text-[11px] font-semibold" style={{color:card.color}}>{card.stat}</span>
                <span className="text-[10px]" style={{color:'var(--faded)'}}>{card.sub}</span>
              </div>
            </div>
          </div>
        </div></Link>
      ))}
    </div>

    <div className="grid grid-cols-[1.2fr_1fr] gap-5 max-lg:grid-cols-1">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-semibold tracking-[0.04em] text-[var(--ink)] flex items-center gap-2" style={{fontFamily:'var(--font-serif)'}}>
            <span className="inline-block w-6 h-3 rounded-[1px]" style={{background:'rgba(200,160,120,0.4)',transform:'rotate(-2deg)'}}/>📚 最新问答</h3>
          <Link href="/community/questions" className="text-[11px] handwriting no-underline" style={{color:'var(--primary-skin)'}}>更多 →</Link></div>
        {MOCK_QUESTIONS.slice(0,3).map(q=>(
          <div key={q.id} className="picture-book-card p-4 cursor-pointer hover:-translate-y-0.5 hover:shadow-md transition-all" style={{transform:'rotate(-0.08deg)'}}>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0" style={{background:'rgba(200,160,120,0.1)',color:'var(--ink-soft)',border:'1.5px solid rgba(200,160,120,0.15)'}}>{q.author.avatar}</div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[13px] font-semibold text-[var(--ink)] mb-1.5">{q.title}</h4>
                <div className="flex items-center gap-3 text-[10px]" style={{color:'var(--faded)'}}>
                  <span className="flex items-center gap-1"><Users size={10}/> {q.author.name}</span>
                  <span className="flex items-center gap-1"><MessageCircle size={10}/> {q.answers.length}回答</span>
                  <span>{q.createdAt}</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[9px]" style={{background:q.status==='open'?'rgba(240,180,60,0.1)':'rgba(122,180,90,0.1)',color:q.status==='open'?'#b08030':'#5a8a3a',border:'1px solid '+(q.status==='open'?'rgba(240,180,60,0.2)':'rgba(122,180,90,0.2)')}}>{q.status==='open'?'待回答':'已回答'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <div className="picture-book-card p-5" style={{transform:'rotate(0.08deg)'}}>
          <h3 className="text-[14px] font-semibold tracking-[0.04em] mb-3 text-[var(--ink)] flex items-center gap-1.5" style={{fontFamily:'var(--font-serif)'}}>✅ 认证账号</h3>
          <div className="space-y-2">
            {MOCK_OFFICIAL_ACCOUNTS.slice(0,4).map(oa=>(<div key={oa.id} className="flex items-center gap-2.5 py-1.5">
              <span className="text-lg">{oa.avatar}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-[var(--ink)] flex items-center gap-1">{oa.name}<span className="text-[8px] px-1 py-0 rounded-full" style={{background:'rgba(74,180,74,0.12)',color:'#4a8a4a'}}>✓</span></p>
                <p className="text-[10px] truncate" style={{color:'var(--faded)'}}>{oa.description}</p>
              </div>
            </div>))}
          </div>
        </div>

        {MOCK_STORIES.slice(0,1).map(s=>(
          <div key={s.id} className="picture-book-card tape-top p-5" style={{transform:'rotate(0.05deg)'}}>
            <div className="flex items-center gap-1 text-[10px] mb-2" style={{color:'var(--faded)'}}><MapPin size={10}/> {s.location} · <Clock size={10}/> {s.createdAt}</div>
            <h4 className="text-[14px] font-semibold text-[var(--ink)] mb-2" style={{fontFamily:'var(--font-serif)'}}>{s.title}</h4>
            <p className="text-[12px] leading-relaxed line-clamp-2 mb-3" style={{color:'var(--ink-soft)'}}>{s.content}</p>
            <div className="flex items-center justify-between">
              <span className="text-[10px]" style={{color:'var(--faded)'}}>❤️ {s.likes} · 💬 {s.comments.length}</span>
              <Link href="/community/stories" className="text-[11px] handwriting no-underline" style={{color:'var(--primary-skin)'}}>阅读更多 →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="mt-8 p-6 rounded-lg text-center" style={{background:'linear-gradient(135deg,rgba(245,238,220,0.4),rgba(240,230,210,0.3))',border:'1.5px solid rgba(200,180,160,0.15)'}}>
      <p className="handwriting text-[18px] tracking-[0.06em]" style={{color:'var(--ink-soft)'}}>让知识跨越山海，让温暖传遍乡村 🌍</p>
      <p className="text-[11px] mt-1 tracking-[0.08em]" style={{color:'var(--faded)'}}>连接 {MOCK_OFFICIAL_ACCOUNTS.length} 个认证组织 · 服务支教事业</p>
    </div>
  </InnerLayout>)
}
