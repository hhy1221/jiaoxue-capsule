'use client'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Search, CornerDownLeft, Hash, ArrowRight } from 'lucide-react'
import { buildFullIndex, SearchResult, SearchResultKind } from '@/lib/search-index'

// ═══ 分类配置 ═══
const KIND_CONFIG: Record<SearchResultKind, { label: string; color: string; sortOrder: number }> = {
  page:     { label: '页面',     color: '#c8862e', sortOrder: 0 },
  tool:     { label: 'AI工坊',   color: '#9880c8', sortOrder: 1 },
  question: { label: '教学问答', color: '#d4855e', sortOrder: 2 },
  resource: { label: '教学资源', color: '#7a9a5a', sortOrder: 3 },
  story:    { label: '支教故事', color: '#6baed6', sortOrder: 4 },
  recruit:  { label: '招募信息', color: '#e8a040', sortOrder: 5 },
  student:  { label: '学生档案', color: '#6aaa50', sortOrder: 6 },
  team:     { label: '支教队',   color: '#a78bfa', sortOrder: 7 },
  chat:     { label: '蒲公英',   color: '#e06060', sortOrder: 8 },
}

// ═══ 结果项（每一条搜索结果）═══
function ResultItem({ item, active, onSelect, onHover, searchQuery }: {
  item: SearchResult; active: boolean; onSelect: () => void; onHover: () => void; searchQuery: string
}) {
  const cfg = KIND_CONFIG[item.kind]
  const titleParts = highlightMatch(item.title, searchQuery)

  return (
    <div
      onClick={onSelect}
      onMouseEnter={onHover}
      className="flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors"
      style={{
        background: active ? 'rgba(200,160,120,0.1)' : 'transparent',
        borderLeft: active ? '3px solid var(--primary-skin)' : '3px solid transparent',
      }}
    >
      {/* Icon */}
      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
        style={{ background: `${cfg.color}12`, border: `1px solid ${cfg.color}20` }}>
        {item.icon}
      </div>
      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-semibold text-[var(--ink)] truncate">
            {titleParts.map((p, i) => p.match
              ? <mark key={i} style={{ background: 'rgba(210,180,110,0.35)', color: 'var(--ink)', borderRadius: 2, padding: '0 1px' }}>{p.text}</mark>
              : <span key={i}>{p.text}</span>
            )}
          </span>
          <span className="text-[8px] px-1.5 py-0.5 rounded-full flex-shrink-0" style={{ background: `${cfg.color}12`, color: cfg.color, border: `1px solid ${cfg.color}20` }}>
            {cfg.label}
          </span>
        </div>
        <p className="text-[10px] truncate" style={{ color: 'var(--faded)' }}>{item.subtitle}</p>
      </div>
      {/* Enter hint */}
      {active && (
        <span className="text-[9px] flex items-center gap-1 flex-shrink-0" style={{ color: 'var(--primary-skin)' }}>
          <CornerDownLeft size={11} /> 跳转
        </span>
      )}
    </div>
  )
}

// ═══ 高亮匹配 ═══
function highlightMatch(text: string, query: string): { text: string; match: boolean }[] {
  if (!query) return [{ text, match: false }]
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escaped})`, 'gi')
  const parts = text.split(regex)
  return parts.filter(Boolean).map(p => ({
    text: p, match: p.toLowerCase() === query.toLowerCase(),
  }))
}

// ═══ 主体 ═══
export default function SpotlightSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // 构建索引（数据量不大，实时 build 即可）
  const fullIndex = useMemo(() => buildFullIndex(), [])

  // 筛选 + 排序
  const results = useMemo(() => {
    if (!query.trim()) {
      // 空搜索：显示最高优先级的前 15 条
      return [...fullIndex].sort((a, b) => b.priority - a.priority).slice(0, 15)
    }
    const q = query.trim().toLowerCase()
    const qChars = q.split('') // 支持拼音首字母

    return fullIndex
      .filter(item => {
        const matchTitle = item.title.toLowerCase().includes(q)
        const matchSubtitle = item.subtitle.toLowerCase().includes(q)
        const matchTags = item.tags.some(t => t.toLowerCase().includes(q))
        return matchTitle || matchSubtitle || matchTags
      })
      .sort((a, b) => {
        // 标题精确匹配最优先
        const aTitleMatch = a.title.toLowerCase().startsWith(q) ? 1 : 0
        const bTitleMatch = b.title.toLowerCase().startsWith(q) ? 1 : 0
        if (aTitleMatch !== bTitleMatch) return bTitleMatch - aTitleMatch
        // 其次按 priority + kind sortOrder
        if (a.priority !== b.priority) return b.priority - a.priority
        return (KIND_CONFIG[a.kind].sortOrder - KIND_CONFIG[b.kind].sortOrder)
      })
      .slice(0, 20)
  }, [query, fullIndex])

  // 重置状态
  useEffect(() => {
    if (open) {
      setQuery(''); setActiveIdx(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // 键盘导航
  const navigate = useCallback((dir: 1 | -1) => {
    setActiveIdx(prev => {
      const next = prev + dir
      if (next < 0) return results.length - 1
      if (next >= results.length) return 0
      return next
    })
  }, [results.length])

  const selectCurrent = useCallback(() => {
    const item = results[activeIdx]
    if (!item) return
    setOpen(false)
    router.push(item.href)
  }, [results, activeIdx, router])

  // 全局 Ctrl+K 快捷键
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(prev => !prev)
      }
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    const customHandler = () => setOpen(true)
    window.addEventListener('keydown', handler)
    window.addEventListener('open-spotlight', customHandler)
    return () => {
      window.removeEventListener('keydown', handler)
      window.removeEventListener('open-spotlight', customHandler)
    }
  }, [open])

  // 滚动跟随
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-result-idx="${activeIdx}"]`)
    if (el) el.scrollIntoView({ block: 'nearest' })
  }, [activeIdx])

  if (!open) return null

  // 分组
  const grouped = new Map<SearchResultKind, SearchResult[]>()
  results.forEach(r => {
    if (!grouped.has(r.kind)) grouped.set(r.kind, [])
    grouped.get(r.kind)!.push(r)
  })

  return (
    <>
      {/* 遮罩 */}
      <div className="fixed inset-0 z-[200] bg-black/25 backdrop-blur-[2px]"
        onClick={() => setOpen(false)} />

      {/* ═══ 搜索面板 ═══ */}
      <div className="fixed z-[201] top-[15%] left-1/2 -translate-x-1/2 w-[560px] max-w-[95vw] max-h-[70vh] flex flex-col rounded-2xl overflow-hidden"
        style={{
          background: '#fefdf8',
          boxShadow: '0 4px 30px rgba(60,30,10,0.15), 0 16px 80px rgba(60,30,10,0.12), 0 0 0 1px rgba(200,180,160,0.25)',
        }}
        onClick={e => e.stopPropagation()}>

        {/* ── 输入区 ── */}
        <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: '1px solid rgba(200,180,160,0.15)' }}>
          <Search size={18} style={{ color: 'var(--faded)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveIdx(0) }}
            onKeyDown={e => {
              if (e.key === 'ArrowDown') { e.preventDefault(); navigate(1) }
              else if (e.key === 'ArrowUp') { e.preventDefault(); navigate(-1) }
              else if (e.key === 'Enter') { e.preventDefault(); selectCurrent() }
              else if (e.key === 'Escape') setOpen(false)
            }}
            placeholder="搜索页面、问答、资源、学生、故事…"
            className="flex-1 bg-transparent border-none outline-none text-[15px]"
            style={{ color: 'var(--ink)', fontFamily: 'inherit' }}
          />
          <kbd className="text-[10px] px-2 py-0.5 rounded flex-shrink-0"
            style={{ background: 'rgba(200,180,160,0.12)', color: 'var(--faded)', border: '1px solid rgba(200,180,160,0.2)', fontFamily: 'var(--font-mono), monospace', letterSpacing: '0.04em' }}>
            ESC
          </kbd>
        </div>

        {/* ── 结果区 ── */}
        <div ref={listRef} className="flex-1 overflow-y-auto py-1" style={{ scrollbarWidth: 'thin' }}>
          {results.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-4xl mb-3 opacity-20">🔍</div>
              <p className="text-[13px] handwriting" style={{ color: 'var(--faded)' }}>
                {query ? `没有找到与「${query}」相关的内容` : '输入关键词开始搜索…'}
              </p>
              <p className="text-[10px] mt-1 opacity-50" style={{ color: 'var(--faded)' }}>
                试试搜索"数学"、"教案"、"募捐"、"赵一曼"…
              </p>
            </div>
          ) : (
            <div>
              {Array.from(grouped.entries()).map(([kind, items]) => {
                const cfg = KIND_CONFIG[kind]
                return (
                  <div key={kind}>
                    {/* 分组标题 */}
                    <div className="flex items-center gap-2 px-4 py-1.5 mt-1">
                      <div className="h-px flex-1" style={{ background: 'rgba(200,180,160,0.15)' }} />
                    </div>
                    <div className="px-4 py-0.5">
                      <span className="text-[9px] font-semibold tracking-[0.1em] uppercase" style={{ color: cfg.color, fontFamily: 'var(--font-sans)' }}>
                        {cfg.label}
                      </span>
                    </div>
                    {/* 条目 */}
                    {items.map((item, i) => {
                      const globalIdx = results.indexOf(item)
                      return (
                        <div key={item.id} data-result-idx={globalIdx}>
                          <ResultItem
                            item={item}
                            active={globalIdx === activeIdx}
                            searchQuery={query}
                            onSelect={selectCurrent}
                            onHover={() => setActiveIdx(globalIdx)}
                          />
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between px-5 py-2.5" style={{ borderTop: '1px solid rgba(200,180,160,0.12)', background: 'rgba(245,240,230,0.3)' }}>
          <div className="flex items-center gap-3 text-[9px]" style={{ color: 'var(--faded)' }}>
            <span className="flex items-center gap-1">
              <kbd className="px-1 rounded text-[8px]" style={{ background: 'rgba(200,180,160,0.15)', color: 'var(--ink-soft)', border: '1px solid rgba(200,180,160,0.25)' }}>↑↓</kbd> 导航
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 rounded text-[8px]" style={{ background: 'rgba(200,180,160,0.15)', color: 'var(--ink-soft)', border: '1px solid rgba(200,180,160,0.25)' }}>Enter</kbd> 跳转
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 rounded text-[8px]" style={{ background: 'rgba(200,180,160,0.15)', color: 'var(--ink-soft)', border: '1px solid rgba(200,180,160,0.25)' }}>Esc</kbd> 关闭
            </span>
          </div>
          <span className="text-[9px]" style={{ color: 'var(--faded)', opacity: 0.5 }}>
            {results.length} 条结果
          </span>
        </div>
      </div>
    </>
  )
}
