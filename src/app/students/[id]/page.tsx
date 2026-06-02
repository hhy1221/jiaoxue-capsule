'use client'

import InnerLayout from '@/components/layout/InnerLayout'
import { MOCK_STUDENTS, MOCK_RECORDS } from '@/lib/mock-data'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import AddGrowthRecordForm from '@/components/forms/AddGrowthRecordForm'
import { useToast } from '@/components/animations/Toast'

const TAG_COLORS = [
  { bg: 'linear-gradient(135deg,#f5e6d0,#eedcc8)', rot: '-1.3deg' },
  { bg: 'linear-gradient(135deg,#d8e8d4,#d0e0cc)', rot: '0.9deg' },
  { bg: 'linear-gradient(135deg,#f0e4d8,#e8d8c8)', rot: '-0.6deg' },
  { bg: 'linear-gradient(135deg,#d8dce8,#d0d4e0)', rot: '1.6deg' },
]

const EMOJI_MAP: Record<string, string> = { photo: '📸', note: '📝', achievement: '🏆', milestone: '🌟' }
const TYPE_EMOJI: Record<string, string> = { photo: '📸', note: '📝', achievement: '🏆', milestone: '🌟' }

function StudentPhoto({src,fallback}:{src:string;fallback:string}) {
  const [ok,setOk]=useState(true)
  if(!ok) return <span className="absolute inset-0 flex items-center justify-center text-[42px]" style={{background:'linear-gradient(135deg,#ecdcc8,#ddc8b0,#e4d4c0)'}}>{fallback}</span>
  return <img src={src} alt="" className="w-full h-full object-cover" onError={()=>setOk(false)}/>
}

export default function StudentDetailPage() {
  const { id } = useParams()
  const student = MOCK_STUDENTS.find(s => s.id === id)
  const records = MOCK_RECORDS.filter(r => r.studentId === id)
  const [showAI, setShowAI] = useState(false)
  const [showRecordForm, setShowRecordForm] = useState(false)
  const { toast } = useToast()

  if (!student) {
    return (<InnerLayout><div className="text-center py-20"><p className="text-4xl mb-4">🔍</p><p style={{color:'var(--faded)'}}>学生未找到</p><Link href="/students" className="text-[#8b6a3a] text-sm mt-4 inline-block handwriting">← 返回列表</Link></div></InnerLayout>)
  }

  return (
    <InnerLayout>
      {/* 顶栏 */}
      <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative"
        style={{ borderBottom: '1.5px solid rgba(180,160,130,0.25)' }}>
        <Link href="/students" className="flex items-center gap-1.5 no-underline hover:opacity-70 transition-opacity"
          style={{ color: 'var(--ink-soft)', fontSize: 13, fontWeight: 500 }}>
          ← 返回学生列表
        </Link>
        <div className="text-center">
          <div className="text-[19px] font-semibold tracking-[0.03em] text-[var(--ink)]"
            style={{ fontFamily: "var(--font-serif)" }}>
            📒 {student.name}的成长手记
          </div>
          <div className="text-[11px] mt-0.5 tracking-[0.06em]" style={{ color: 'var(--faded)' }}>
            凡星支教队 · 筠连 · 2026夏
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="picture-book-btn" style={{ fontSize: 12 }} onClick={()=>toast('编辑功能已开启，可直接修改下方信息','info')}>✏️ 编辑档案</button>
          <Link href={`/letters`} className="picture-book-btn primary no-underline" style={{ fontSize: 12 }}>✉️ 生成临别信</Link>
        </div>
        {/* 虚线装饰 */}
        <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 text-[7px] tracking-[7px] whitespace-nowrap"
          style={{ color: 'rgba(180,160,130,0.5)' }}>
          · · · · · · · · · · · ·
        </div>
      </header>

      {/* 主布局：左侧卡片 + 右侧时间线 */}
      <div className="grid grid-cols-[290px_1fr] gap-6 max-lg:grid-cols-1 relative">
        {/* ═══ 左侧：学生卡片 ═══ */}
        <aside className="relative self-start sticky top-7 max-lg:static max-lg:mb-5"
          style={{
            background: 'var(--warm-white)',
            borderRadius: 8,
            boxShadow: 'var(--shadow-md)',
            border: '1.5px solid rgba(200,180,160,0.3)',
            padding: '36px 26px 28px',
            textAlign: 'center',
            transform: 'rotate(0.3deg)',
          }}>
          {/* 背后压一张便签纸 */}
          <div className="absolute -inset-4 -bottom-3 -right-3 rounded-[3px] -z-[2]"
            style={{
              background: 'linear-gradient(135deg, rgba(240,225,205,0.55), rgba(235,218,198,0.5))',
              transform: 'rotate(-2.5deg)',
              boxShadow: 'var(--shadow-sm)',
            }} />
          {/* 再背后压一张提醒便签 */}
          <div className="absolute -top-6 -right-7 w-[90px] p-2 rounded-[1px] -z-[1] handwriting text-left leading-snug"
            style={{
              background: 'linear-gradient(135deg, #fff9e8, #fef4d8)',
              fontSize: 13, color: '#6b5a3e',
              transform: 'rotate(6deg)',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}>
            别忘了写今日评语！
          </div>

          {/* 线装孔 */}
          <div className="absolute top-[18px] left-[14px] right-[14px] flex justify-between z-[2]">
            {[...Array(11)].map((_, i) => (
              <span key={i} className="block w-[7px] h-[7px] rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #fff, #d4c8b0)',
                  boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.2)',
                }}
              />
            ))}
          </div>

          {/* 头像 — 水彩光晕 + 拍立得框 */}
          <div className="relative mx-auto mt-7 mb-4" style={{ width: 96, height: 96 }}>
            <div className="absolute -inset-4 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(220,180,160,0.18), rgba(200,160,140,0.08) 40%, transparent 70%)' }} />
            <div className="absolute -inset-6 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(210,190,175,0.08), transparent 60%)' }} />
            <div className="w-24 h-24 rounded-full relative z-[1] overflow-hidden"
              style={{
                boxShadow: '0 3px 16px rgba(100,70,40,0.15)',
                border: '3.5px solid #fff',
                outline: '1.5px solid rgba(180,150,120,0.4)',
              }}>
              <StudentPhoto src={student.photo} fallback={student.avatar}/>
            </div>
            {/* 胶带贴住头像一角 */}
            <div className="absolute -top-2.5 -right-2 w-8 h-3.5 rounded-[1px] z-[5]"
              style={{ background: 'rgba(228,180,165,0.5)', transform: 'rotate(15deg)', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }} />
          </div>

          <div className="text-[22px] font-bold tracking-[0.05em] mb-1 text-[var(--ink)]"
            style={{ fontFamily: "var(--font-serif)" }}>
            {student.name}
          </div>
          <p className="handwriting text-[14px] mb-2.5 tracking-[0.04em]" style={{ color: 'var(--ink-faint)' }}>
            —— {student.personality.slice(0, 10)}的{student.grade.split('年')[0]}年级生
          </p>

          <div className="flex justify-center gap-2 flex-wrap text-[11px] mb-1.5"
            style={{ color: 'var(--ink-soft)' }}>
            <span>{student.grade}</span><span style={{color:'var(--faded)'}}>·</span>
            <span>{student.age}岁</span>
          </div>

          <div className="picture-book-divider" />

          {/* 标签 */}
          <div className="flex flex-wrap gap-1.5 justify-center my-3.5">
            {student.tags.map((tag, ti) => (
              <span key={tag} className="picture-book-tag"
                style={{
                  transform: `rotate(${TAG_COLORS[ti % 4].rot})`,
                  background: TAG_COLORS[ti % 4].bg,
                }}>
                {tag}
              </span>
            ))}
          </div>

          <div className="picture-book-divider" />

          {/* 统计 */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[
              { val: records.length, lbl: '记录数' },
              { val: student.tags.length, lbl: '标签数' },
              { val: 'D' + (records.length + 4), lbl: '当前进度' },
              { val: student.age, lbl: '岁' },
            ].map((s, si) => (
              <div key={si} className="text-center p-2.5 rounded relative"
                style={{
                  background: 'rgba(245,240,230,0.4)',
                  border: '1px solid rgba(200,180,160,0.15)',
                }}>
                <div className="text-[18px] font-bold text-[var(--ink)]" style={{ fontFamily: "var(--font-serif)" }}>{s.val}</div>
                <div className="text-[9px] tracking-[0.06em]" style={{ color: 'var(--ink-faint)' }}>{s.lbl}</div>
                {/* 回形针 */}
                {si === 1 && (
                  <div className="absolute -top-2.5 right-2.5 w-[18px] h-[7px] rounded-[2px] border-t-0 border-b-0"
                    style={{ border: '1.5px solid rgba(180,160,140,0.5)' }} />
                )}
              </div>
            ))}
          </div>

          {/* 圆形贴纸 */}
          <div className="flex justify-center gap-2.5 mt-4">
            {[{ e: '⭐', c: 'linear-gradient(135deg,#fef4d0,#f8e8b0)' },
              { e: '💗', c: 'linear-gradient(135deg,#fce4d8,#f8d4c8)' },
              { e: '🍃', c: 'linear-gradient(135deg,#e0e8d4,#d4e0c8)' }].map(s => (
              <div key={s.e} className="sticker-circle" style={{ background: s.c }}>
                {s.e}
              </div>
            ))}
          </div>
        </aside>

        {/* ═══ 右侧：时间线 ═══ */}
        <div className="relative pl-8 hand-drawn-timeline">
          {records.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">📭</p>
              <p className="handwriting text-[14px]" style={{ color: 'var(--faded)' }}>还没有记录，开始写第一条吧</p>
              <button className="picture-book-btn primary mt-4" style={{ fontSize: 13 }} onClick={()=>setShowRecordForm(true)}>＋ 添加第一条记录</button>
            </div>
          ) : (
            records.map((record, ri) => (
              <div key={record.id}>
                {/* 时间线节点 */}
                <div className="flex items-center gap-3 py-3 pl-[-35px] ml-[-32px] relative z-[2]">
                  <div className="timeline-dot" />
                  <span className="text-[11px] font-bold px-3 py-0.5 rounded"
                    style={{
                      color: 'var(--ink-soft)', letterSpacing: '0.06em',
                      background: 'rgba(210,195,170,0.15)',
                    }}>
                    Day {records.length * 2 - ri * 3}
                  </span>
                  <span className="text-[10px]" style={{ color: 'var(--faded)' }}>
                    {record.date}
                  </span>
                  <div className="flex-1 h-px"
                    style={{ background: 'linear-gradient(90deg, rgba(200,185,160,0.3), transparent)' }} />
                </div>

                {/* 日记卡片 */}
                <div className="picture-book-card tape-top relative p-6 mb-1.5"
                  style={{ transform: `rotate(${ri % 2 === 0 ? 0.2 : -0.15}deg)` }}>
                  {/* 标题 */}
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="text-lg">{TYPE_EMOJI[record.type]}</span>
                    <span className="text-[13px] font-semibold tracking-[0.04em] text-[var(--ink)]">
                      {record.title}
                    </span>
                  </div>

                  {/* 正文 — 暖黄高亮 */}
                  <p className="text-[14px] leading-[2.05] mb-2.5" style={{ color: '#4a3828' }}>
                    {record.content.split('。').map((seg, i) => (
                      <span key={i}>
                        {i > 0 ? '。' : ''}
                        {i === 0 || seg.includes('第一次') || seg.includes('主动') || seg.includes('偷偷')
                          ? <em className="text-warm-highlight">{seg}</em>
                          : seg}
                      </span>
                    ))}
                  </p>

                  {/* 情绪标签 */}
                  <div className="flex items-center gap-1.5 pt-1.5 flex-wrap"
                    style={{ borderTop: '1px solid rgba(200,180,160,0.12)', color: 'var(--ink-soft)', fontSize: 11 }}>
                    {record.mood === 'happy' ? '😊 开心' : record.mood === 'sad' ? '😢 低落' : '😐 平常'}
                    {record.tags.map(t => (
                      <span key={t} className="ml-1 opacity-60" style={{ fontSize: 10 }}>
                        · {t}
                      </span>
                    ))}
                  </div>

                  {/* 边栏批注（手写红字）— 仅关键记录 */}
                  {ri < records.length - 2 && (
                    <div className="absolute -right-[95px] w-20 handwriting text-left leading-relaxed text-[#8b3a3a] max-lg:hidden"
                      style={{ fontSize: 14, top: ri === 0 ? 12 : 24, transform: 'rotate(2deg)' }}>
                      {ri === 0 && <><span className="block text-[#c89838] text-lg tracking-wider mb-1">★★★</span>这一天<br />等了很久</>}
                      {ri === 1 && <><span className="block text-[#c89838] text-lg tracking-wider mb-1">★★</span>里程碑！</>}
                      {ri === 2 && <><span className="block text-[#c89838] text-lg tracking-wider mb-1">★</span>那个偷偷看画的小孩……</>}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {/* AI 按钮区 */}
          <div className="flex gap-2.5 mt-6 flex-wrap">
            <button className="picture-book-btn primary" onClick={() => setShowAI(!showAI)}>
              ✨ AI 分析成长轨迹
            </button>
            <button className="picture-book-btn" onClick={() => setShowAI(!showAI)}>
              📸 AI 扩写最新评语
            </button>
            <button className="picture-book-btn" onClick={()=>toast('AI正在为'+student.name+'生成手绘插图…','success')}>🎨 AI 生成手绘插图</button>
          </div>

          {/* AI 输出 */}
          {showAI && (
            <div className="ai-output-card paperclip-top mt-4">
              <div className="text-[10px] tracking-[0.12em] mb-2.5 font-semibold"
                style={{ color: 'var(--faded)' }}>
                ✨ AI 成长分析报告
              </div>
              <div className="text-[13px] leading-[2.1]" style={{ color: '#4a3828' }}>
                从 Day1 到 Day{records.length * 2}，{student.name}完成了令人惊喜的蜕变。<br /><br />
                <b>关键转折：Day7 首次举手。</b>学业自信是他打开社交之门的钥匙。<br /><br />
                <b>最动人的细节：</b>{student.notes}<br /><br />
                建议临别信用「老友絮语」的语气——从怕生到大方相助，这段旅程值得最真诚的讲述。
              </div>
              <div className="flex gap-2 mt-3.5 flex-wrap">
                {['+ 小领袖', '+ 有耐心', '+ 敢于表达', '+ 细腻内心', '+ 温暖他人'].map(t => (
                  <span key={t} className="picture-book-tag" style={{
                    background: 'rgba(180,150,120,0.1)',
                    border: '1px solid rgba(200,180,150,0.3)',
                    color: '#5a3e2b', fontWeight: 500, fontSize: 11,
                    padding: '4px 14px',
                  }}>{t}</span>
                ))}
              </div>
            </div>
          )}

          <button className="add-new-btn" onClick={()=>setShowRecordForm(true)}>＋ 新增今日记录</button>
          <AddGrowthRecordForm open={showRecordForm} onClose={()=>setShowRecordForm(false)} studentName={student.name} />

          {/* 页码 */}
          <div className="text-right mt-7 pt-3 flex items-center justify-end gap-2 text-[11px]"
            style={{ borderTop: '1px solid rgba(200,180,160,0.18)', color: 'var(--faded)', letterSpacing: '0.06em' }}>
            ✦ 学生档案 · {student.name} · 第 {records.length + 4} 页
          </div>
        </div>
      </div>
    </InnerLayout>
  )
}
