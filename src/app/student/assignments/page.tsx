'use client'
import StudentLayout from '@/components/layout/StudentLayout'
import { useState } from 'react'
import { Clock, Send, Check, Star, FileText, Download, Upload, Camera, Image, Paperclip } from 'lucide-react'

const ASSIGNMENTS = [
  { id:'a1',title:'画一幅"我眼中的家乡"',subject:'美术',teacher:'王老师',dueDate:'7/22',status:'done',desc:'用水彩或蜡笔画一幅画，画出你心中家乡最美的风景。可以是山、河、房子、大树，或者你和家人在一起的场景。',myWork:'我画了一大片向日葵田，因为我觉得家乡应该是金色的。还画了奶奶坐在门口。'},
  { id:'a2',title:'写一篇短日记——"今天最开心的一件事"',subject:'语文',teacher:'周老师',dueDate:'7/23',status:'done',desc:'写50-100字的短日记。可以写课堂上发生的有趣的事，或者和朋友一起玩的经历。',myWork:'今天最开心的是数学课上的数字炸弹游戏。我虽然被炸到了，但大家都笑了，我也笑了。我觉得和同学们一起玩游戏最开心。'},
  { id:'a3',title:'观察一种植物并画下来',subject:'科学',teacher:'周老师',dueDate:'7/25',status:'doing',desc:'在家附近找一种你认识的植物（树、花、草都可以），仔细观察它的叶子形状、颜色、大小，然后画下来并写3-5句话描述它。'},
  { id:'a4',title:'学会一首山歌',subject:'音乐',teacher:'黄老师',dueDate:'7/26',status:'todo',desc:'请家里的长辈教你一首当地的山歌或民谣，学会之后可以在课堂上给大家表演。如果长辈不会唱也没关系，学一首你喜欢的歌也可以。'},
  { id:'a5',title:'创意手工——制作"我的梦想"主题卡片',subject:'手工',teacher:'黄老师',dueDate:'7/28',status:'todo',desc:'用废纸、树叶、布片等任何你能找到的材料，制作一张卡片。卡片上画或写出你的梦想——长大后想做什么？想去哪里？'},
]

const STATUS_CONFIG: Record<string,{label:string;color:string;bg:string}> = {
  todo: {label:'待完成',color:'#d4855e',bg:'rgba(212,133,94,0.08)'},
  doing: {label:'进行中',color:'#5a9ac0',bg:'rgba(90,154,192,0.08)'},
  done: {label:'已完成 ✅',color:'#7a9a5a',bg:'rgba(122,154,90,0.08)'},
}

export default function AssignmentsPage() {
  const [filter, setFilter] = useState<string>('all')
  const [expandedId, setExpandedId] = useState<string|null>(null)

  const filtered = filter === 'all' ? ASSIGNMENTS : ASSIGNMENTS.filter(a => a.status === filter)

  return (
    <StudentLayout>
      <div className="mb-6">
        <h1 className="text-[24px] font-bold text-[var(--ink)] flex items-center gap-2" style={{ fontFamily:'var(--font-serif)' }}>
          📝 我的作业
        </h1>
        <p className="text-[13px] mt-1" style={{ color:'var(--faded)' }}>
          共 {ASSIGNMENTS.length} 项作业 · {ASSIGNMENTS.filter(a=>a.status==='done').length} 项已完成 · 记得按时提交哦
        </p>
      </div>

      {/* 筛选 */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {[{k:'all',l:'📋 全部'},{k:'todo',l:'📌 待完成'},{k:'doing',l:'✏️ 进行中'},{k:'done',l:'✅ 已完成'}].map(f=>(
          <button key={f.k} onClick={()=>setFilter(f.k)}
            className="px-3 py-1.5 rounded-full text-[12px] border-none cursor-pointer transition-all"
            style={{
              background:filter===f.k?'linear-gradient(135deg,#7a9a5a,#5a7a3a)':'transparent',
              color:filter===f.k?'#fff':'var(--faded)',fontWeight:filter===f.k?600:400,
              fontFamily:'inherit',border:`1.5px solid ${filter===f.k?'transparent':'rgba(200,180,160,0.2)'}`,
            }}>{f.l}</button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((a,i)=>{
          const status = STATUS_CONFIG[a.status]
          const expanded = expandedId === a.id
          return (
            <div key={a.id} onClick={()=>setExpandedId(expanded?null:a.id)}
              className="picture-book-card p-5 cursor-pointer hover:shadow-md transition-all duration-300"
              style={{ borderLeft:`4px solid ${status.color}`,opacity:a.status==='done'?0.7:1 }}>
              <div className="flex items-start gap-4">
                {/* 状态图标 */}
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background:status.bg,border:`1.5px solid ${status.color}30` }}>
                  {a.status==='done'?'✅':a.status==='doing'?'✏️':'📌'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
                    <h3 className="text-[16px] font-bold text-[var(--ink)]" style={{ fontFamily:'var(--font-serif)' }}>{a.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background:status.bg,color:status.color,border:`1px solid ${status.color}25` }}>{status.label}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] mb-2" style={{ color:'var(--faded)' }}>
                    <span>📖 {a.subject}</span>
                    <span>👨‍🏫 {a.teacher}</span>
                    <span className="flex items-center gap-1"><Clock size={10}/> {a.dueDate} 截止</span>
                  </div>
                  <p className="text-[13px] leading-relaxed line-clamp-2" style={{ color:'var(--ink-soft)' }}>{a.desc}</p>

                  {/* 展开：详细 + 我的作业 */}
                  {expanded && (
                    <div className="mt-4 pt-4 space-y-3" style={{ borderTop:'1px solid rgba(200,160,120,0.12)' }}>
                      <p className="text-[12px] leading-[1.8]" style={{ color:'var(--ink-soft)' }}>{a.desc}</p>
                      {a.myWork ? (
                        <div className="p-4 rounded-xl" style={{ background:'rgba(245,238,220,0.5)',border:'1px solid rgba(200,160,120,0.12)' }}>
                          <p className="text-[11px] font-semibold mb-1" style={{ color:'var(--primary-skin)' }}>我的作业：</p>
                          <p className="text-[13px] leading-relaxed" style={{ color:'var(--ink-soft)' }}>{a.myWork}</p>
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl text-center" style={{ background:'rgba(245,240,230,0.3)',border:'1px dashed rgba(200,180,160,0.2)' }}>
                          <p className="text-[13px]" style={{ color:'var(--faded)' }}>还没有提交作业，点击下方按钮上传</p>
                          <div className="flex gap-2 justify-center mt-3 flex-wrap">
                            <button className="picture-book-btn flex items-center gap-1" style={{fontSize:11}}><Upload size={12}/>上传文件</button>
                            <button className="picture-book-btn flex items-center gap-1" style={{fontSize:11}}><Camera size={12}/>拍照</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length===0 && (
        <div className="text-center py-12" style={{ color:'var(--faded)' }}>
          <div className="text-5xl mb-3 opacity-25">📝</div>
          <p className="text-[15px] font-semibold">没有找到作业</p>
        </div>
      )}
    </StudentLayout>
  )
}
