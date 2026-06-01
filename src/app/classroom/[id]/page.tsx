'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { MOCK_CLASSROOMS } from '@/lib/mock-data'
import { useParams, useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Bell, CheckCircle2, Download, FileText, Camera, PenLine, Clock, MapPin, User, Plus, Sparkles, Heart, Star } from 'lucide-react'

const MIME_ICONS:Record<string,{icon:string;color:string;bg:string}> = {
  ppt:{icon:'📊',color:'#d4855e',bg:'rgba(212,133,94,0.08)'},
  pdf:{icon:'📕',color:'#e06060',bg:'rgba(224,96,96,0.08)'},
  word:{icon:'📝',color:'#5a8ab5',bg:'rgba(90,138,181,0.08)'},
  image:{icon:'🖼️',color:'#5a9a6a',bg:'rgba(90,154,106,0.08)'},
  video:{icon:'🎬',color:'#9880c8',bg:'rgba(152,128,200,0.08)'},
  other:{icon:'📎',color:'#888',bg:'rgba(136,136,136,0.08)'},
}

export default function ClassroomDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const c = MOCK_CLASSROOMS.find(x=>x.id===id)
  const [showNotified, setShowNotified] = useState(false)
  const [activeTab, setActiveTab] = useState('materials')

  if (!c) return (<InnerLayout><div className="text-center py-20"><p className="text-4xl mb-4">🔍</p><p style={{color:'var(--faded)'}}>课堂未找到</p><Link href="/classroom" className="handwriting text-[var(--primary-skin)] mt-4 inline-block no-underline">← 返回列表</Link></div></InnerLayout>)

  return (<InnerLayout>
    {/* ═══ 返回按钮 ═══ */}
    <button onClick={()=>router.back()} className="inline-flex items-center gap-1.5 text-[12px] tracking-wider mb-4 no-underline hover:opacity-70 transition-opacity bg-transparent border-none cursor-pointer"
      style={{color:'var(--ink-soft)'}}><ArrowLeft size={14}/>返回</button>

    {/* ═══ 课程头卡 ═══ */}
    <div className="picture-book-card p-0 overflow-hidden mb-6 relative" style={{transform:'rotate(-0.15deg)'}}>
      {/* Color top bar */}
      <div className="h-1.5" style={{background:`linear-gradient(90deg, ${c.courseColor}, ${c.courseColor}88, transparent)`}}/>

      <div className="p-6">
        <div className="flex items-start gap-5 flex-wrap">
          {/* Big emoji */}
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 relative"
            style={{background:`${c.courseColor}12`,border:`2px solid ${c.courseColor}25`,boxShadow:`0 4px 16px ${c.courseColor}0a`}}>
            {c.courseEmoji}
            {/* Tape corner */}
            <div className="absolute -top-2 -right-2 w-7 h-3.5 rounded-[1px] z-[2]"
              style={{background:'rgba(228,180,165,0.45)',transform:'rotate(14deg)',boxShadow:'0 1px 2px rgba(0,0,0,0.04)'}}/>
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-[22px] font-bold tracking-[0.03em] text-[var(--ink)] mb-1" style={{fontFamily:'var(--font-serif)'}}>
              {c.courseName}
            </h1>
            <div className="flex items-center gap-3 text-[12px] flex-wrap" style={{color:'var(--faded)'}}>
              <span className="flex items-center gap-1"><User size={13}/>{c.teacher}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><MapPin size={13}/>{c.location}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock size={13}/>{c.timeSlot}</span>
              <span>·</span>
              <span>Day {c.dayNum} · {c.date}</span>
            </div>
          </div>

          {/* Notification status */}
          <div className="flex-shrink-0">
            {c.preNotified ? (
              <div className="picture-book-card p-3 text-center" style={{transform:'rotate(-0.3deg)'}}>
                <div className="flex items-center gap-1.5 mb-1">
                  <CheckCircle2 size={14} style={{color:'#6a8a4a'}}/>
                  <span className="text-[11px] font-medium tracking-[0.04em]" style={{color:'#5a7a3a'}}>课前已通知</span>
                </div>
                <p className="text-[8px] tracking-[0.06em]" style={{color:'var(--faded)'}}>
                  {c.notifiedTeachers.join(' · ')} 已收到
                </p>
              </div>
            ) : (
              <button className="picture-book-btn primary" style={{fontSize:11}}
                onClick={()=>{setShowNotified(true);c.preNotified=true;c.notifiedTeachers=['黄老师','周老师']}}>
                <Bell size={13}/> {showNotified?'已发送 ✓':'发送课前通知'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>

    {/* ═══ 3Tabs ═══ */}
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="mb-6" style={{background:'rgba(245,240,230,0.3)',border:'1px solid rgba(200,180,160,0.15)',padding:2}}>
        <TabsTrigger value="materials" className="text-[12px] tracking-[0.04em] gap-1.5 data-[state=active]:bg-[var(--surface)]">
          <FileText size={13}/>课件资料 ({c.materials.length})
        </TabsTrigger>
        <TabsTrigger value="moments" className="text-[12px] tracking-[0.04em] gap-1.5 data-[state=active]:bg-[var(--surface)]">
          <Camera size={13}/>精彩瞬间 ({c.moments.length})
        </TabsTrigger>
        <TabsTrigger value="notes" className="text-[12px] tracking-[0.04em] gap-1.5 data-[state=active]:bg-[var(--surface)]">
          <PenLine size={13}/>教学笔记 ({c.teachingNotes.length})
        </TabsTrigger>
      </TabsList>

      {/* ═══ 课件Tab ═══ */}
      <TabsContent value="materials" className="mt-0">
        {c.materials.length===0?(
          <div className="picture-book-card p-12 text-center"><p className="text-4xl mb-3">📭</p><p className="handwriting text-[15px]" style={{color:'var(--faded)'}}>暂未上传课件资料</p></div>
        ):(
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
            {c.materials.map((m,i)=>{
              const mi=MIME_ICONS[m.type]||MIME_ICONS.other
              return(<div key={m.id} className="picture-book-card tape-top p-5 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300 group" style={{transform:`rotate(${i%2===0?'-0.25deg':'0.15deg'})`}}>
                {/* File icon */}
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4 flex-shrink-0"
                  style={{background:mi.bg,border:`1.5px solid ${mi.color}25`}}>
                  {mi.icon}
                </div>
                {/* Title + type */}
                <h3 className="text-[13px] font-semibold tracking-[0.03em] text-[var(--ink)] mb-1 leading-tight" style={{fontFamily:'var(--font-serif)'}}>
                  {m.title}
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="outline" className="text-[9px] px-1.5 py-0 h-4" style={{borderColor:`${mi.color}25`,color:mi.color}}>
                    {m.type.toUpperCase()}
                  </Badge>
                  <span className="text-[9px] tracking-[0.04em]" style={{color:'var(--faded)'}}>{m.fileSize}</span>
                </div>
                {/* Footer */}
                <div className="flex items-center justify-between pt-2" style={{borderTop:'1px solid rgba(200,180,160,0.1)'}}>
                  <span className="text-[9px] tracking-[0.04em]" style={{color:'var(--faded)'}}>{m.uploadedBy} · {m.uploadedAt}</span>
                  <button className="picture-book-btn group-hover:scale-105 transition-transform" style={{fontSize:10,padding:'3px 10px'}}>
                    <Download size={11}/>下载
                  </button>
                </div>
              </div>)
            })}
          </div>
        )}
        <button className="add-new-btn mt-4">＋ 上传课件（支持PPT/PDF/Word/图片/视频）</button>
      </TabsContent>

      {/* ═══ 精彩瞬间Tab ═══ */}
      <TabsContent value="moments" className="mt-0">
        {c.moments.length===0?(
          <div className="picture-book-card p-12 text-center"><p className="text-4xl mb-3">📭</p><p className="handwriting text-[15px]" style={{color:'var(--faded)'}}>暂未记录精彩瞬间</p></div>
        ):(
          <>
            {/* Gallery link hint */}
            <div className="flex items-center gap-2 mb-4 text-[11px]" style={{color:'var(--faded)'}}>
              <Camera size={13}/>
              <span>{c.moments.filter(m=>m.type==='photo').length}张照片 · {c.moments.filter(m=>m.type==='video').length}段视频</span>
              <span className="handwriting text-[10px] ml-2" style={{color:'var(--primary-skin)'}}>
                → 已同步到相册「{c.date} {c.courseName.slice(0,8)}」
              </span>
            </div>

            {/* Photo wall — polaroid style */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-5">
              {c.moments.map((m,i)=>{
                const rots=['-2.2deg','1.5deg','-0.8deg','1.8deg','-1.5deg','2.0deg','-1.0deg','0.8deg']
                return(<div key={m.id} className="group cursor-pointer transition-all duration-300 hover:z-10"
                  style={{transform:`rotate(${rots[i%8]})`}}>
                  {/* Photo card */}
                  <div className="bg-white p-2 pb-7 rounded-[2px] shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 group-hover:rotate-0">
                    {/* Image area */}
                    <div className="w-full aspect-[4/3] rounded-[2px] flex items-center justify-center text-4xl relative overflow-hidden"
                      style={{background:`linear-gradient(135deg, ${c.courseColor}08, ${c.courseColor}04)`}}>
                      {m.url}
                      {m.type==='video' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center text-white text-lg">▶</div>
                        </div>
                      )}
                      {/* Hover overlay */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                        style={{background:'rgba(0,0,0,0.08)'}}>
                        <span className="text-[10px] px-3 py-1 rounded-full bg-white/80 text-[var(--ink)] tracking-[0.06em]">
                          {m.type==='video'?'▶ 播放':'🔍 查看'}
                        </span>
                      </div>
                    </div>
                    {/* Caption */}
                    <p className="text-[11px] leading-relaxed mt-2 px-0.5 text-[var(--ink-soft)] line-clamp-2">
                      {m.caption}
                    </p>
                    {/* Tags */}
                    <div className="flex gap-1 mt-1.5 flex-wrap">
                      {m.tags.slice(0,3).map(t=>(<span key={t} className="text-[8px] px-1.5 py-0.5 rounded"
                        style={{background:`${c.courseColor}08`,color:'var(--ink-faint)'}}>#{t}</span>))}
                    </div>
                    {/* Note input */}
                    <input placeholder="+ 写备注..." className="w-full mt-2 px-2 py-1 text-[10px] rounded border border-dashed outline-none bg-transparent transition-colors"
                      style={{borderColor:'rgba(200,180,160,0.2)',color:'var(--ink-faint)'}}
                      onFocus={e=>{e.target.style.borderColor='rgba(160,130,100,0.4)'}}
                      onBlur={e=>{e.target.style.borderColor='rgba(200,180,160,0.2)'}}/>
                  </div>
                </div>)
              })}
            </div>
          </>
        )}
        <button className="add-new-btn mt-6">＋ 添加照片/视频（自动同步到相册）</button>
      </TabsContent>

      {/* ═══ 教学笔记Tab ═══ */}
      <TabsContent value="notes" className="mt-0">
        <div className="max-w-[800px]">
          {c.teachingNotes.length===0?(
            <div className="picture-book-card p-12 text-center"><p className="text-4xl mb-3">📭</p><p className="handwriting text-[15px]" style={{color:'var(--faded)'}}>暂未添加教学笔记</p></div>
          ):(
            <div className="relative pl-10 hand-drawn-timeline">
              {c.teachingNotes.map((n,i)=>{
                const moodMap:Record<string,string>={感动:'😢',惊喜:'😍',开心:'😊',满意:'😌',正常:'🤔',期待:'🌱'}
                return(<div key={n.id} className="mb-6">
                  {/* Timeline node */}
                  <div className="flex items-center gap-3 py-2" style={{marginLeft:-40}}>
                    <div className="timeline-dot"/>
                    <span className="text-[18px]">{moodMap[n.mood||'']||'📝'}</span>
                    <span className="text-[12px] font-semibold tracking-[0.04em] text-[var(--ink)]">{n.author}</span>
                    <span className="text-[10px] tracking-[0.06em]" style={{color:'var(--faded)'}}>{n.createdAt}</span>
                    <div className="flex-1 h-px" style={{background:'linear-gradient(90deg,rgba(200,185,160,0.3),transparent)'}}/>
                    <div className="flex gap-1">
                      {n.tags?.slice(0,2).map(t=>(<Badge key={t} variant="secondary" className="text-[8px] px-1.5 py-0 h-4" style={{background:'rgba(210,195,170,0.12)',color:'var(--ink-faint)'}}>{t}</Badge>))}
                    </div>
                  </div>

                  {/* Note card — old letter style */}
                  <div className="picture-book-card tape-top p-6 relative"
                    style={{
                      transform:'rotate(0.15deg)',
                      background:'linear-gradient(170deg, #fefcf7, #fdf9f0, #fefcf7)',
                      border:'1.5px solid rgba(200,180,160,0.25)',
                    }}>
                    {/* Paper texture */}
                    <div className="absolute inset-0 pointer-events-none opacity-30 rounded-[7px]"
                      style={{backgroundImage:`url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)' opacity='0.018'/%3E%3C/svg%3E")`}}/>

                    {/* Content */}
                    <div className="relative z-[1]">
                      <p className="text-[14px] leading-[2.1] text-[var(--ink-soft)] whitespace-pre-line" style={{fontFamily:'var(--font-serif)'}}>
                        {n.content}
                      </p>

                      {/* Footer: mood + actions */}
                      <div className="flex items-center justify-between mt-4 pt-3" style={{borderTop:'1px solid rgba(200,180,160,0.12)'}}>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] tracking-[0.06em]" style={{color:'var(--faded)'}}>
                            {moodMap[n.mood||'']||'📝'} {n.mood||'记录'}
                          </span>
                          {n.tags?.map(t=>(<span key={t} className="text-[9px] px-1.5 py-0 rounded handwriting" style={{background:'rgba(200,180,160,0.08)',color:'var(--faded)'}}>#{t}</span>))}
                        </div>
                        <div className="flex gap-2">
                          <button className="text-[10px] tracking-[0.04em] bg-transparent border-none cursor-pointer hover:underline handwriting" style={{color:'var(--faded)'}}>✏️ 编辑</button>
                          <button className="text-[10px] tracking-[0.04em] bg-transparent border-none cursor-pointer hover:underline handwriting" style={{color:'#e06060'}}>🗑️</button>
                        </div>
                      </div>
                    </div>

                    {/* Decorative paperclip on first card */}
                    {i===0&&(<div className="absolute -top-0.5 right-8 w-6 h-3 rounded-[2px] border border-[rgba(150,130,110,0.25)] border-b-0 border-l-transparent border-r-transparent"/>)}
                  </div>
                </div>)
              })}
            </div>
          )}
          <button className="add-new-btn mt-4">＋ 添加教学笔记</button>
        </div>
      </TabsContent>
    </Tabs>
  </InnerLayout>)
}
