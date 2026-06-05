'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { MOCK_LETTERS, MOCK_STUDENTS } from '@/lib/mock-data'
import { TONE_LABELS, TONE_EMOJIS, LetterTone } from '@/types'
import { useToast } from '@/components/animations/Toast'
import BatchLetterDialog from '@/components/forms/BatchLetterDialog'
import { JOURNAL_ENTRIES } from '@/lib/journal-data'
import { useState, useMemo, useRef } from 'react'
import { Sparkles, Loader2, Download, Copy, RefreshCw, Wand2 } from 'lucide-react'
import { generatePlaceholderImage } from '@/lib/ai/tongyi-image'

const SEARCHABLE_TONES: Record<LetterTone, string> = {
  poetic: '温柔诗意', friendly: '老友絮语', strict: '严师慈言', energetic: '燃系励志', playful: '童趣轻松',
}
const TONE_COLORS: Record<LetterTone, { dot: string; text: string; border: string; bg: string }> = {
  poetic:    { dot: '#c87870', text: '#8b4a3a', border: 'rgba(200,130,120,0.25)', bg: 'rgba(228,180,165,0.1)' },
  friendly:  { dot: '#6a90b8', text: '#4a6080', border: 'rgba(130,170,200,0.25)', bg: 'rgba(175,198,218,0.1)' },
  strict:    { dot: '#8b7d6b', text: '#5a4a3a', border: 'rgba(160,150,140,0.25)', bg: 'rgba(200,190,180,0.1)' },
  energetic: { dot: '#d4a040', text: '#7a5a20', border: 'rgba(200,160,100,0.25)', bg: 'rgba(240,200,130,0.1)' },
  playful:   { dot: '#7aaa70', text: '#4a6a3a', border: 'rgba(140,180,145,0.25)', bg: 'rgba(185,210,190,0.1)' },
}

export default function LettersPage() {
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState(MOCK_LETTERS[0]?.id || null)
  const [showBatch, setShowBatch] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiLetters, setAiLetters] = useState<Record<string, string>>({})
  const [aiError, setAiError] = useState('')
  const [aiImageUrl, setAiImageUrl] = useState('')
  const [aiImageLoading, setAiImageLoading] = useState(false)
  const [aiImageError, setAiImageError] = useState('')
  const lettersRef = useRef(MOCK_LETTERS)
  const { toast } = useToast()

  const filtered = useMemo(() => {
    if (!search.trim()) return lettersRef.current
    const q = search.trim().toLowerCase()
    return lettersRef.current.filter(l =>
      l.studentName.toLowerCase().includes(q) ||
      l.content.toLowerCase().includes(q) ||
      SEARCHABLE_TONES[l.tone].includes(q)
    )
  }, [search])

  const selected = lettersRef.current.find(l => l.id === selectedId)
  const student = selected ? MOCK_STUDENTS.find(s => s.id === selected.studentId) : null
  const activeAiLetter = selected ? aiLetters[selected.id] : null

  // Gather key moments from journal data
  const getStudentMoments = (studentName: string) => {
    return JOURNAL_ENTRIES
      .flatMap(e => e.keyMoments.filter(m => m.forLetter && e.studentReflections.some(sr => sr.studentName === studentName || m.content.includes(studentName))))
      .map(m => m.content)
      .slice(0, 5)
  }

  const generateAI = async () => {
    if (!selected || !student) return
    setAiLoading(true)
    setAiError('')
    try {
      const moments = getStudentMoments(selected.studentName)
      const res = await fetch('/api/ai/generate-letter', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: student.name,
          studentAge: String(student.age),
          studentGrade: student.grade,
          studentPersonality: student.personality,
          studentTags: student.tags,
          studentNotes: student.notes || '',
          keyMoments: moments,
          tone: selected.tone,
          teacherName: '黄老师',
          teamName: '凡星支教队',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setAiLetters(prev => ({ ...prev, [selected.id]: data.content }))
        toast('AI 信件已生成！', 'success')
      } else {
        setAiError(data.error || '生成失败')
        toast('生成失败，请重试', 'error')
      }
    } catch {
      setAiError('网络错误，请检查连接')
      toast('网络错误', 'error')
    } finally {
      setAiLoading(false)
    }
  }

  const displayedContent = activeAiLetter || selected?.content || ''

  function highlight(text: string, query: string) {
    if (!query) return text
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const parts = text.split(new RegExp(`(${escaped})`, 'gi'))
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase()
        ? <mark key={i} style={{ background: 'rgba(210,180,110,0.35)', color: 'var(--ink)', borderRadius: 2, padding: '0 1px' }}>{part}</mark>
        : part
    )
  }

  function searchSnippet(content: string, query: string): string {
    if (!query) return content.slice(0, 60) + '……'
    const q = query.toLowerCase()
    const idx = content.toLowerCase().indexOf(q)
    if (idx < 0) return content.slice(0, 60) + '……'
    const start = Math.max(0, idx - 10)
    const end = Math.min(content.length, idx + q.length + 18)
    return (start > 0 ? '…' : '') + content.slice(start, end) + (end < content.length ? '…' : '')
  }

  return (<InnerLayout>
    <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative"
      style={{ borderBottom: '1.5px solid rgba(180,160,130,0.25)' }}>
      <div>
        <h1 className="text-[19px] font-semibold tracking-[0.03em] text-[var(--ink)]"
          style={{ fontFamily: "var(--font-serif)" }}>✉️ 临别信</h1>
        <p className="text-[11px] mt-0.5 tracking-[0.06em]" style={{ color: 'var(--faded)' }}>
          AI 自动生成 · {lettersRef.current.length} 封 · 基于成长日志素材
        </p>
      </div>
      <div className="flex gap-2 flex-wrap">
        <button className="picture-book-btn" style={{ fontSize: 12 }} onClick={() => window.print()}>📥 打印</button>
        <button className="picture-book-btn primary" style={{ fontSize: 12 }} onClick={() => setShowBatch(true)}>✨ 批量生成</button>
      </div>
      <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 text-[7px] tracking-[7px]"
        style={{ color: 'rgba(180,160,130,0.5)' }}>· · · · · · · · · · · ·</div>
    </header>

    <div className="grid grid-cols-[280px_1fr] gap-10 max-lg:grid-cols-1">
      <div className="space-y-2">
        <div className="relative mb-3">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[15px] pointer-events-none" style={{ color: 'var(--faded)', opacity: 0.5 }}>🔍</span>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索学生姓名或信的内容…"
            className="w-full pl-9 pr-8 py-2.5 rounded-[24px] text-[12px] outline-none transition-all duration-200"
            style={{ border: '1.5px solid rgba(180,150,120,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit', letterSpacing: '0.03em' }} />
          {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none text-sm cursor-pointer" style={{ color: 'var(--faded)', opacity: 0.5, fontFamily: 'inherit', lineHeight: 1 }}>✕</button>}
        </div>
        <p className="text-[10px] mb-2" style={{ color: 'var(--faded)', letterSpacing: '0.04em' }}>
          {search.trim() ? `找到 ${filtered.length} 封 · 共 ${lettersRef.current.length} 封` : `共 ${lettersRef.current.length} 封信`}
        </p>
        {filtered.length > 0 ? filtered.map(letter => {
          const tc = TONE_COLORS[letter.tone]
          const snippet = searchSnippet(aiLetters[letter.id] || letter.content, search.trim())
          const hasAI = !!aiLetters[letter.id]
          return (
            <div key={letter.id} className="picture-book-card p-4 cursor-pointer transition-all duration-300"
              style={selectedId === letter.id ? { borderColor: 'rgba(160,120,70,0.5)', boxShadow: 'var(--shadow-md)', background: 'linear-gradient(135deg,#fefdf8,#fbf5ea)' } : {}}
              onClick={() => setSelectedId(letter.id)}>
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="text-[14px] font-semibold tracking-[0.04em]" style={{ color: 'var(--ink)' }}>
                  {TONE_EMOJIS[letter.tone]} 致{search.trim() ? highlight(letter.studentName, search.trim()) : letter.studentName}
                </h3>
                {hasAI && <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(122,180,90,0.1)', color: '#5a8a3a', border: '1px solid rgba(122,180,90,0.2)' }}>🤖</span>}
              </div>
              <p className="text-[11px] leading-relaxed mb-2 line-clamp-2" style={{ color: 'var(--ink-faint)' }}>
                {search.trim() ? highlight(snippet, search.trim()) : snippet}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-medium flex items-center gap-1" style={{ color: tc.text }}>
                  <span className="inline-block w-[7px] h-[7px] rounded-full" style={{ background: tc.dot }} />{TONE_LABELS[letter.tone]}
                </span>
                <span className="text-[9px]" style={{ color: 'var(--faded)' }}>{letter.createdAt}</span>
              </div>
            </div>
          )
        }) : (
          <div className="text-center py-8" style={{ color: 'var(--faded)' }}>
            <div className="text-3xl mb-2 opacity-30">📭</div>
            <p className="text-[11px]">没有找到匹配的信件</p>
          </div>
        )}
      </div>

      <div className="sticky top-7 self-start">
        {selected ? (
          <div>
            <div className="max-w-[720px] mx-auto rounded-[2px] overflow-hidden"
              style={{ background: '#fefdf8', boxShadow: '0 2px 16px rgba(60,30,10,0.05), 0 8px 40px rgba(60,30,10,0.07)' }}>
              <div className="flex items-center justify-between px-10 py-4" style={{ borderBottom: '1px solid rgba(180,150,120,0.15)' }}>
                <span className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: 'var(--primary-skin)' }}>✦ 临别信专栏</span>
                <span className="text-[10px]" style={{ color: 'var(--faded)', letterSpacing: '0.08em' }}>No. 00{selected.id.slice(1)} / {selected.createdAt}</span>
              </div>
              <div className="px-14 py-12 max-sm:px-6 max-sm:py-8 relative">
                {/* AI生成状态条 */}
                {activeAiLetter && (
                  <div className="mb-6 px-4 py-2 rounded-full text-center text-[10px]" style={{ background: 'rgba(122,180,90,0.08)', color: '#5a8a3a', border: '1px solid rgba(122,180,90,0.2)' }}>
                    🤖 AI DeepSeek 已根据学生档案和成长日志生成 · <button onClick={generateAI} className="bg-transparent border-none cursor-pointer underline" style={{ color: 'var(--primary-skin)', fontFamily: 'inherit', fontSize: 10 }}><RefreshCw size={9} /> 重新生成</button>
                  </div>
                )}
                {aiError && (
                  <div className="mb-6 px-4 py-2 rounded-full text-center text-[10px]" style={{ background: 'rgba(200,100,80,0.08)', color: '#b06050', border: '1px solid rgba(200,100,80,0.2)' }}>
                    ⚠️ {aiError}
                  </div>
                )}
                <div className="text-center mb-10">
                  <div className="text-[12px] font-medium tracking-[0.15em] mb-2.5" style={{ color: 'var(--faded)' }}>
                    {TONE_EMOJIS[selected.tone]} {TONE_LABELS[selected.tone]} · 致{selected.studentName}同学
                  </div>
                  <h2 key={selected.id} className="handwrite-title handwriting text-[46px] font-normal tracking-[0.06em] leading-tight mb-3.5 max-sm:text-[34px]" style={{ color: 'var(--ink)' }}>
                    {selected.title || `致 ${selected.studentName}`}
                  </h2>
                  <div className="text-[12px] italic" style={{ color: 'var(--faded)', letterSpacing: '0.08em' }}>— 全国支教平台 · 黄老师 —</div>
                </div>
                <div className="grid grid-cols-[2fr_1fr] gap-8 items-start max-md:grid-cols-1">
                  <div className="text-[14px] leading-[2.1]" style={{ color: 'var(--ink)' }}>
                    {displayedContent.split('\n\n').map((p, pi) => {
                      if (pi === 0 && p.length <= 20) return <p key={pi} className="mb-2.5">{p}</p>
                      if (pi === 0) {
                        return <p key={pi} className="mb-2.5"><span className="handwriting float-left text-[56px] leading-[0.8] pr-2 pt-1" style={{ color: 'var(--ink)' }}>{p.charAt(0)}</span>{p.slice(1)}</p>
                      }
                      return <p key={pi} className="mb-2.5" style={{ textIndent: p.startsWith('—') ? 0 : '2em' }}>{p}</p>
                    })}
                    <p className="text-right mt-4">— <span className="handwriting text-[22px]" style={{ color: 'var(--ink)' }}>黄老师</span></p>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="text-center handwriting text-[18px] leading-[1.6] py-4" style={{ borderTop: '2px solid rgba(180,150,120,0.2)', borderBottom: '2px solid rgba(180,150,120,0.2)', color: 'var(--primary-skin)', letterSpacing: '0.04em' }}>"你的好奇心和勇气，是你最宝贵的东西。"</div>
                    <div className="bg-white pt-1.5 pb-7 px-1.5 rounded-[2px] relative transform rotate-[1.5deg]" style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
                      {aiImageUrl ? (
                        <img src={aiImageUrl} alt={`${selected.studentName}的AI插图`} className="w-full h-[120px] rounded-[2px] object-cover" />
                      ) : aiImageLoading ? (
                        <div className="w-full h-[100px] rounded-[2px] flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e8ddd0, #d5c8b0)' }}>
                          <Loader2 size={20} className="animate-spin" style={{ color: 'var(--faded)' }} />
                        </div>
                      ) : (
                        <div className="w-full h-[100px] rounded-[2px] flex items-center justify-center text-[28px]" style={{ background: 'linear-gradient(135deg, #e8ddd0, #d5c8b0)' }}>{TONE_EMOJIS[selected.tone]}</div>
                      )}
                      <p className="absolute bottom-1.5 left-1.5 right-1.5 handwriting text-[10px] text-center" style={{ color: 'var(--ink-soft)' }}>{aiImageUrl ? 'AI DeepSeek · 手绘插图' : `${selected.studentName}的成长印记`}</p>
                    </div>
                    {/* 🎨 AI插图按钮 */}
                    <button
                      onClick={async () => {
                        if (!student) return
                        setAiImageLoading(true); setAiImageError('')
                        try {
                          const res = await fetch('/api/ai/generate-image', {
                            method: 'POST', headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ prompt: `一个${student.age}岁的${student.grade}学生，名叫${student.name}，性格${student.personality}，喜欢${student.tags.slice(0,3).join('、')}。在乡村教室里的温暖场景。`, style: 'illustration', n: 1, size: '1024*1024' })
                          })
                          const data = await res.json()
                          if (data.success && data.urls?.length) {
                            setAiImageUrl(data.urls[0])
                            toast('AI插图已生成！', 'success')
                          } else {
                            // 降级：Canvas 占位图
                            setAiImageUrl(generatePlaceholderImage(student.name, 'illustration'))
                            toast('已生成本地插图（API暂不可用）', 'info')
                          }
                        } catch {
                          setAiImageUrl(generatePlaceholderImage(student.name, 'illustration'))
                          toast('已生成本地插图', 'info')
                        } finally { setAiImageLoading(false) }
                      }}
                      disabled={aiImageLoading}
                      className="picture-book-btn flex items-center gap-1.5 text-[9px] mt-3 w-full justify-center"
                      style={{ padding: '4px 10px' }}>
                      {aiImageLoading ? <><Loader2 size={11} className="animate-spin"/> 生成中...</> : <><Wand2 size={11} /> {aiImageUrl ? '重新生成AI插图' : '🎨 AI生成手绘插图'}</>}
                    </button>
                    {student && (
                      <div className="rounded p-3.5 text-[10px] leading-[1.8]" style={{ background: 'rgba(245,238,220,0.5)', border: '1px solid rgba(180,150,120,0.18)' }}>
                        <div className="text-[10px] font-semibold tracking-[0.1em] mb-1" style={{ color: 'var(--ink-soft)' }}>📋 学生档案摘要</div>
                        <div className="flex gap-2 mb-0.5"><span style={{ color: 'var(--faded)' }}>姓名</span><span style={{ color: 'var(--ink-soft)' }}>{student.name}</span></div>
                        <div className="flex gap-2 mb-0.5"><span style={{ color: 'var(--faded)' }}>年龄</span><span style={{ color: 'var(--ink-soft)' }}>{student.age} 岁 · {student.grade}</span></div>
                        <div className="flex flex-wrap gap-1 mt-1">{student.tags.map(tag => (<span key={tag} className="px-1.5 py-px rounded-[10px] text-[9px]" style={{ background: 'rgba(200,140,80,0.08)', color: 'var(--ink-soft)' }}>{tag}</span>))}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between px-10 py-4 text-[10px]" style={{ borderTop: '1px solid rgba(180,150,120,0.12)', color: 'var(--faded)', letterSpacing: '0.06em' }}>
                <span>全国支教平台 · 星火相传</span>
                <div className="flex gap-1.5">{[0,0,1,0,0].map((accent,i)=>(<span key={i} className={`inline-block rounded-full ${accent?'w-1.5 h-1.5':'w-1 h-1'}`} style={{background:accent?'var(--primary-skin)':'rgba(180,150,120,0.3)'}}/>))}</div>
                <span>P. 001</span>
              </div>
            </div>
            <div className="flex gap-3 mt-5 justify-center flex-wrap">
              {!activeAiLetter ? (
                <button onClick={generateAI} disabled={aiLoading} className="picture-book-btn primary flex items-center gap-2" style={{ padding: '10px 28px' }}>
                  {aiLoading ? <><Loader2 size={15} className="animate-spin"/> 生成中...</> : <><Sparkles size={15} /> AI DeepSeek 生成信</>}
                </button>
              ) : (
                <button onClick={generateAI} disabled={aiLoading} className="picture-book-btn flex items-center gap-2" style={{ padding: '10px 28px' }}>
                  {aiLoading ? <><Loader2 size={15} className="animate-spin"/> 重新生成...</> : <><RefreshCw size={15} /> 重新生成</>}
                </button>
              )}
              <button className="picture-book-btn" style={{ padding: '10px 28px' }} onClick={() => window.print()}>🖨️ 打印</button>
              <button className="picture-book-btn" style={{ padding: '10px 28px' }} onClick={() => {
                navigator.clipboard.writeText(displayedContent).then(() => toast('已复制！', 'success')).catch(() => toast('复制失败', 'error'))
              }}>📋 复制</button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center"><div className="text-5xl mb-4">✉️</div><p className="handwriting text-[15px]" style={{ color: 'var(--faded)' }}>选择左侧信件预览</p></div>
          </div>
        )}
      </div>
    </div>
    <BatchLetterDialog open={showBatch} onClose={() => setShowBatch(false)} />
  </InnerLayout>)
}
