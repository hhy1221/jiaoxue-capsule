'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import CountUp from '@/components/animations/CountUp'
import {
  Undo2, Redo2, Save, Search, Printer, X, Combine, RotateCcw, Download,
  Sparkles, TrendingUp, BookOpen, Palette, Dumbbell, Heart, Wrench, Play,
  Calendar, Clock, BarChart3, Grid3X3, List, ChevronRight, Info, Zap,
} from 'lucide-react'

/* ═══════════════════════════════════════
   五育并举 · 课程分类色标系统
   ═══════════════════════════════════════ */
type WuYuCategory = '德' | '智' | '体' | '美' | '劳'

const WUYU_CONFIG: Record<WuYuCategory, { label: string; emoji: string; icon: React.ElementType; color: string; bg: string; borderColor: string; gradient: string; lightBg: string }> = {
  '德': { label: '德育', emoji: '🏛', icon: Heart,     color: '#d4855e', bg: 'rgba(212,133,94,0.12)',  borderColor: 'rgba(212,133,94,0.3)',  gradient: 'linear-gradient(135deg,#d4855e,#c07050)', lightBg: 'rgba(212,133,94,0.06)' },
  '智': { label: '智育', emoji: '📐', icon: BookOpen,  color: '#5a9ac0', bg: 'rgba(90,154,192,0.12)',  borderColor: 'rgba(90,154,192,0.3)',  gradient: 'linear-gradient(135deg,#5a9ac0,#4a80a8)', lightBg: 'rgba(90,154,192,0.06)' },
  '体': { label: '体育', emoji: '🏃', icon: Dumbbell,  color: '#6aaa50', bg: 'rgba(106,170,80,0.12)',  borderColor: 'rgba(106,170,80,0.3)',  gradient: 'linear-gradient(135deg,#6aaa50,#5a9040)', lightBg: 'rgba(106,170,80,0.06)' },
  '美': { label: '美育', emoji: '🎨', icon: Palette,   color: '#9880c8', bg: 'rgba(152,128,200,0.12)', borderColor: 'rgba(152,128,200,0.3)', gradient: 'linear-gradient(135deg,#9880c8,#8068b0)', lightBg: 'rgba(152,128,200,0.06)' },
  '劳': { label: '劳育', emoji: '🔧', icon: Wrench,    color: '#e8a040', bg: 'rgba(232,160,64,0.12)',  borderColor: 'rgba(232,160,64,0.3)',  gradient: 'linear-gradient(135deg,#e8a040,#d08830)', lightBg: 'rgba(232,160,64,0.06)' },
}

// ── 课程→五育分类图谱 ──
const COURSE_CATEGORY: Record<string, WuYuCategory> = {
  '开营仪式': '德', '红色文化教育': '德', '红色历史教育': '德', '榜样教育': '德', '中华传统文化': '德',
  '中华传统文化宣讲': '德', '中华传统文化科普': '德', '我与我的祖国': '德', '我是共产主义接班人': '德',
  '现代史科普教育': '德', '你好！历史君': '德', '马蹄声里看筠连': '德', '走遍中国': '智', '走遍四川': '智',
  'AI赋能营': '智', '碳足迹侦探营': '智', '生活中的数学小知识': '智', '小型辩论会': '智',
  '厨房里的科学小魔法': '智', '说文解字': '智', '像科学家一样提问': '智', '生活中的数学': '智',
  '安全知识小课堂': '智', '计算机初认识': '智', '科学小实验': '智', '生物知识小课堂': '智',
  '读书分享会': '智', '我是算数小能手': '智', '我是小侦探': '智', '趣味作文': '智',
  '智能环保科技营': '智', '妙墨中国心': '美', '唱响未来': '美', '妙手中国心': '美',
  '剪纸拼贴画制作': '美', '电影中的艺术': '美', '绘画小课堂': '美', '云上山歌': '美',
  '手工艺课': '美', '体育课': '体', '趣味运动会': '体',
  '低碳计划行动营': '劳', '"助碍前行"': '劳', '合作项目': '劳', '我的家乡有点燃': '劳',
  '家乡的叶子': '劳', '我的情绪我做主': '德', '结营仪式': '德', '结营准备': '劳',
}

function classifyCourse(cellHtml: string): WuYuCategory | null {
  const key = cellHtml.replace(/<[^>]*>/g, '').trim().split('\n')[0]
  const known = Object.keys(COURSE_CATEGORY).sort((a, b) => b.length - a.length)
  for (const k of known) { if (key.includes(k)) return COURSE_CATEGORY[k] }
  return null
}

/* ═══════════════════════════════════════
   课表数据
   ═══════════════════════════════════════ */
const TIMES = ['7:00–8:00', '8:00–9:00', '9:15–10:15', '10:30–11:30', '11:30–13:30', '14:30–15:30', '15:45–16:45', '17:00–18:00']
const TIME_ICONS = ['🌅', '🚶', '📖', '📖', '🍱', '📝', '🎯', '🌤']
const DAYS_ALL = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
const DAYS_W1 = [1, 2, 3, 4, 5, 6, 7]
const DAYS_W2 = [8, 9, 10, 11, 12, 13]
const DL: Record<number, string> = { 1: '7/19', 2: '7/20', 3: '7/21', 4: '7/22', 5: '7/23', 6: '7/24', 7: '7/25', 8: '7/26', 9: '7/27', 10: '7/28', 11: '7/29', 12: '7/30', 13: '7/31' }
const DAY_NAMES: Record<number, string> = { 1: '开营日', 2: '探索日', 3: '文化日', 4: '创意日', 5: '科学日', 6: '户外日', 7: '总结日', 8: '启程日', 9: '艺术日', 10: '科技日', 11: '传承日', 12: '实践日', 13: '结营日' }

const THEMES = {
  warm: { name: '📖', thBg: 'linear-gradient(135deg,#5a3a28,#7a5040,#8b5a3a)', thColor: '#fdf7ef', timeBg: '#f5ebe0', timeColor: '#6b4a2a', cellBg: '#fefcf7', stripeBg: 'rgba(245,240,230,0.3)', border: 'rgba(180,160,130,0.15)' },
  green: { name: '🌿', thBg: 'linear-gradient(135deg,#1A3C1A,#2E5A2E,#3A7D3A)', thColor: '#E8F5E9', timeBg: '#C8E6C9', timeColor: '#1B5E20', cellBg: '#fff', stripeBg: 'rgba(232,245,233,0.4)', border: 'rgba(76,175,80,0.1)' },
  blue: { name: '🔵', thBg: 'linear-gradient(135deg,#0D47A1,#1565C0,#1976D2)', thColor: '#E3F2FD', timeBg: 'rgba(21,101,192,0.15)', timeColor: '#1565C0', cellBg: '#fff', stripeBg: 'rgba(227,242,253,0.3)', border: 'rgba(66,165,245,0.08)' },
  orange: { name: '🍊', thBg: 'linear-gradient(135deg,#BF360C,#E65100,#FF9800)', thColor: '#FFF3E0', timeBg: '#FBE9E7', timeColor: '#BF360C', cellBg: '#FFFDF9', stripeBg: 'rgba(255,243,224,0.3)', border: 'rgba(255,152,0,0.08)' },
}
type ThemeKey = keyof typeof THEMES
type Row = string[]

const DEF: Row[] = [
  ['起床+早餐'],
  ['出发', '开营仪式', '碳足迹侦探营<br/><small>第一课时</small>', '走遍中国<br/><small>中国地理</small>', '读书分享会', '生物知识小课堂<br/><small>筠连动植物</small>', '生活中的数学小知识', '低碳计划行动营', '趣味作文<br/><small>作文能力提升</small>', '你好！历史君<br/><small>第三课时</small>', '中华传统文化宣讲', '读书分享会', '唱响未来<br/><small>音乐鉴赏</small>'],
  [], [], ['午休'],
  ['沟通准备·例会·试课', '科学小实验<br/><small>物理</small>', '中华传统文化', '你好！历史君<br/><small>第二课时</small>', '妙手中国心<br/><small>硬笔书法练习</small>', '榜样教育', '作业辅导', '红色历史教育<br/><small>长征</small>', '中华传统文化科普', '我是算数小能手', '"助碍前行"<br/><small>关爱残障人士</small>', '手工艺课', '结营仪式<br/><small>做更好的小朋友</small>'],
  [], [],
]

const R2_DATA = ['', 'AI赋能营<br/><small>第一课时</small>', '安全知识小课堂<br/><small>防溺水·居家安全</small>', '小型辩论会', '厨房里的科学小魔法<br/><small>物理化学</small>', '说文解字<br/><small>汉字发展历程</small>', '走遍四川<br/><small>四川地理文化</small>', '像科学家一样提问', '我的情绪我做主<br/><small>心理素质</small>', '妙墨中国心<br/><small>软笔书法</small>', '智能环保科技营', '科学小实验<br/><small>化学</small>', '我的家乡有点燃<br/><small>四川非遗文化</small>']
const R3_DATA = ['', '红色文化教育<br/><small>赵一曼</small>', '马蹄声里看筠连<br/><small>历史小课堂</small>', '碳足迹侦探营<br/><small>第二课时</small>', '计算机初认识<br/><small>计算机发展史</small>', '家乡的叶子<br/><small>茶叶与茶文化</small>', '我与我的祖国<br/><small>爱国主义教育</small>', '唱响未来<br/><small>唱歌表演</small>', '安全知识小课堂<br/><small>防山火·国家安全</small>', '我是共产主义接班人<br/><small>党史知识科普</small>', '榜样教育<br/><small>红色精神耀筠连</small>', '我是小侦探<br/><small>错别字·易错音</small>', '现代史科普教育<br/><small>航天</small>']
const R6_DATA = ['', '云上山歌<br/><small>筠连山歌·苗族大唢呐</small>', '作业辅导', '绘画小课堂<br/><small>画出家乡的风景</small>', '作业辅导', '电影中的艺术<br/><small>经典电影鉴赏</small>', '趣味运动会', '溶洞里的为什么<br/><small>喀斯特地貌科普</small>', '作业辅导', '剪纸拼贴画制作', '作业辅导', '合作项目<br/><small>小组搭建纸塔</small>', '结营准备<br/><small>整理教室</small>']
const R7_DATA = ['', 'AI赋能营<br/><small>第二课时</small>', '体育课', '自习/作业辅导', '体育课', '自习/作业辅导', '自习/作业辅导', '体育课', '自习/作业辅导', '体育课', '自习/作业辅导', '自习/作业辅导', '体育课', '自习/作业辅导']

const DEFAULT_GRID: Row[] = [DEF[0], DEF[1], R2_DATA, R3_DATA, DEF[4], DEF[5], R6_DATA, R7_DATA]
const ROWSPAN_CELLS: Record<number, Record<number, number>> = { 1: { 0: 3 }, 5: { 0: 3 } }
const ROWSPAN_SKIP: Record<number, Record<number, boolean>> = { 2: { 0: true }, 3: { 0: true }, 6: { 0: true }, 7: { 0: true } }
const SAVE_KEY = 'ssd4'
function clone(g: Row[]): Row[] { return g.map(r => [...r]) }

export default function SchedulePage() {
  const [grid, setGrid] = useState<Row[]>(() => {
    try { const s = localStorage.getItem(SAVE_KEY); if (s) return JSON.parse(s) } catch (e) { }
    return DEFAULT_GRID
  })
  const [undoS, setUndoS] = useState<Row[][]>([])
  const [redoS, setRedoS] = useState<Row[][]>([])
  const [week, setWeek] = useState<0 | 1 | 2>(1)
  const [theme, setTheme] = useState<ThemeKey>('warm')
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<{ ri: number; ci: number } | null>(null)
  const [editVal, setEditVal] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [findDlg, setFindDlg] = useState(false)
  const [findT, setFindT] = useState('')
  const [replT, setReplT] = useState('')
  const [msg, setMsg] = useState('')
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [expandedDay, setExpandedDay] = useState<number | null>(null)
  const tRef = useRef<HTMLTableElement>(null)
  const inpRef = useRef<HTMLTextAreaElement>(null)
  const tt = THEMES[theme]
  const vis = week === 0 ? DAYS_ALL : week === 1 ? DAYS_W1 : DAYS_W2
  const todayDay = 5
  const isToday = (d: number) => d === todayDay

  const stats = useMemo(() => {
    const counts: Record<WuYuCategory, number> = { '德': 0, '智': 0, '体': 0, '美': 0, '劳': 0 }
    let total = 0
    grid.forEach(row => { row.forEach(cell => { if (!cell || cell === '') return; const cat = classifyCourse(cell); if (cat) { counts[cat]++; total++ } }) })
    return { counts, total }
  }, [grid])

  const todayCourses = useMemo(() => {
    const courses: { time: string; content: string; cat: WuYuCategory | null }[] = []
    grid.forEach((row, ri) => {
      const cell = row.length === 1 ? row[0] : (row[todayDay - 1] ?? '')
      if (!cell || cell === '') return
      if (row.length === 1 && ['起床+早餐', '午休'].includes(cell.replace(/<[^>]*>/g, '').trim())) return
      courses.push({ time: TIMES[ri], content: cell, cat: classifyCourse(cell) })
    })
    return courses
  }, [grid])

  const heatmapData = useMemo(() => {
    return DAYS_ALL.map(d => {
      const cats: Record<WuYuCategory, number | string> = { '德': 0, '智': 0, '体': 0, '美': 0, '劳': 0 }
      grid.forEach(row => { if (row.length === 1) return; const cell = row[d - 1] ?? ''; if (!cell || cell === '') return; const c = classifyCourse(cell); if (c) (cats[c] as number)++ })
      return { day: d, date: DL[d], label: DAY_NAMES[d], catCounts: cats as Record<WuYuCategory, number> }
    })
  }, [grid])

  const statRefs = useRef<(HTMLDivElement | null)[]>([])
  const timelineRef = useRef<HTMLDivElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)
  const [timelineReady, setTimelineReady] = useState(false)

  useEffect(() => { setStatsVisible(true); setTimeout(() => setTimelineReady(true), 400) }, [])
  useEffect(() => { if (editing && inpRef.current) inpRef.current.focus() }, [editing])

  const pushUndo = () => { setUndoS(s => { const n = [...s, clone(grid)]; return n.length > 50 ? n.slice(-50) : n }); setRedoS([]) }
  const toast = (s: string) => { setMsg(s); setTimeout(() => setMsg(''), 2000) }
  const startEdit = (ri: number, ci: number) => { pushUndo(); setEditing({ ri, ci }); setEditVal(grid[ri].length === 1 ? grid[ri][0] : grid[ri][ci] || '') }
  const saveEdit = () => { if (!editing) return; const { ri, ci } = editing; setGrid(p => { const n = clone(p); if (n[ri].length === 1) n[ri][0] = editVal; else n[ri][ci] = editVal; return n }); setEditing(null) }
  const merge = () => {
    if (selected.size < 2) { toast('请选中至少2个相邻单元格'); return }; pushUndo()
    const cells = Array.from(selected).map(s => s.split('_').map(Number) as [number, number]); const ri = cells[0][0]; const cis = cells.map(c => c[1]).sort((a, b) => a - b)
    setGrid(p => { const n = clone(p); const row = n[ri]; if (row.length === 1) { toast('全行合并无需再合并'); return p }; const merged = cis.map(ci => row[ci]).filter(Boolean).join('<br/>'); row[cis[0]] = merged; for (let i = cis[0] + 1; i <= cis[cis.length - 1]; i++) row[i] = ''; return n })
    setSelected(new Set()); toast('已合并')
  }
  const undo = () => { if (!undoS.length) { toast('无操作'); return }; const prev = undoS[undoS.length - 1]; setRedoS(s => [...s, clone(grid)]); setGrid(prev); setUndoS(s => s.slice(0, -1)); toast('已撤销') }
  const redo = () => { if (!redoS.length) { toast('无操作'); return }; const next = redoS[redoS.length - 1]; setUndoS(s => [...s, clone(grid)]); setGrid(next); setRedoS(s => s.slice(0, -1)); toast('已重做') }
  const save = () => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(grid)); toast('已保存 ✓') } catch { toast('保存失败') } }
  const reset = () => { pushUndo(); setGrid(clone(DEFAULT_GRID)); toast('已恢复默认') }
  const clearAll = () => { pushUndo(); setGrid(p => { const n = clone(p); n.forEach(r => { if (r.length === 1) r[0] = ''; else r.forEach((_, i) => { r[i] = '' }) }); return n }); toast('已清空') }
  const findReplace = () => { if (!findT) return; let f = false; setGrid(p => { const n = clone(p); n.forEach(r => { r.forEach((c, i) => { if (c && c.includes(findT)) { r[i] = c.replaceAll(findT, '<mark>' + replT + '</mark>'); f = true } }) }); return n }); setFindDlg(false); toast(f ? '已替换' : '未找到') }
  const toggleSel = (ri: number, ci: number) => { setSelected(p => { const n = new Set(p); const k = ri + '_' + ci; n.has(k) ? n.delete(k) : n.add(k); return n }) }

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) { if (e.key === 'z') { e.preventDefault(); undo() }; if (e.key === 'y') { e.preventDefault(); redo() }; if (e.key === 's') { e.preventDefault(); save() }; if (e.key === 'f') { e.preventDefault(); setFindDlg(true) } }
      if (e.key === 'Escape') { setEditing(null); setFindDlg(false) }
    }; window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h)
  }, [])

  const hl = (html: string) => {
    if (!search.trim()) return <span dangerouslySetInnerHTML={{ __html: html }} />
    const esc = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    return <span dangerouslySetInnerHTML={{ __html: html.replace(new RegExp(`(${esc})`, 'gi'), '<mark style="background:rgba(255,235,59,0.45);padding:0 2px;border-radius:2px">$1</mark>') }} />
  }

  const RenderCell = ({ cell, ri, ci, rowspan }: { cell: string; ri: number; ci: number; rowspan?: number }) => {
    const k = ri + '_' + ci; const isSel = selected.has(k); const isEdit = editing && editing.ri === ri && editing.ci === ci
    const has = cell && cell !== ''; const cat = has ? classifyCourse(cell) : null; const cfg = cat ? WUYU_CONFIG[cat] : null
    if (isEdit) return (<td className="p-0 border relative" style={{ borderColor: tt.border }}><textarea ref={inpRef} value={editVal} onChange={e => setEditVal(e.target.value)} onBlur={saveEdit} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) saveEdit(); if (e.key === 'Escape') setEditing(null) }} className="w-full min-h-[32px] p-2 border-none outline-none resize-y text-[11px] text-center" style={{ background: '#fff', color: 'var(--ink)', border: '2px dashed var(--primary-skin)', fontFamily: 'inherit' }} autoFocus /></td>)
    return (<td onClick={() => toggleSel(ri, ci)} onDoubleClick={() => startEdit(ri, ci)} rowSpan={rowspan || 1} className={'p-2 text-center border align-middle cursor-pointer relative overflow-hidden transition-all duration-200 hover:scale-105 hover:z-10 hover:shadow-lg' + (isSel ? ' ring-2 ring-[var(--primary-skin)]' : '')} style={{ background: isSel ? 'rgba(200,160,120,0.18)' : cfg ? cfg.lightBg : tt.cellBg, borderColor: isSel ? 'var(--primary-skin)' : cfg ? cfg.borderColor : tt.border, borderLeft: cfg ? `4px solid ${cfg.color}` : undefined, fontSize: 11, fontWeight: has ? 600 : 400, transform: isSel ? 'scale(1.03)' : undefined }}>
      {cfg && !isSel && (<div className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: cfg.color, opacity: 0.5 }} />)}
      {has ? hl(cell) : <span className="opacity-25">—</span>}
    </td>)
  }

  const wuYuKeys = Object.keys(WUYU_CONFIG) as WuYuCategory[]

  return (<InnerLayout>
    <style>{`
      @keyframes scheduleFadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes statCardPop { 0% { opacity: 0; transform: scale(0.85) rotate(-2deg); } 60% { opacity: 1; transform: scale(1.04) rotate(0.5deg); } 80% { transform: scale(0.98) rotate(-0.2deg); } 100% { transform: scale(1) rotate(0deg); } }
      @keyframes timelineGrow { from { width: 0; opacity: 0; } to { width: 100%; opacity: 1; } }
      @keyframes timelineDotPulse { 0%,100% { transform: scale(1); box-shadow: 0 0 0 0 currentColor; } 50% { transform: scale(1.3); box-shadow: 0 0 0 6px transparent; } }
      @keyframes barGrow { from { height: 0; opacity: 0; } to { opacity: 1; } }
      .schedule-fade-up { animation: scheduleFadeUp 0.45s cubic-bezier(0.22,0.61,0.36,1) both; }
      .heatmap-bar { transform-origin: bottom; animation: barGrow 0.6s cubic-bezier(0.34,1.56,0.64,1) both; }
      .stat-card-pop { animation: statCardPop 0.6s cubic-bezier(0.34,1.56,0.64,1) both; }
    `}</style>

    {/* ═══ L1：顶部 Banner - 13天时间轴 ═══ */}
    <div ref={timelineRef} className="relative mb-5 rounded-2xl overflow-hidden schedule-fade-up" style={{ animationDelay: '0.05s', background: 'linear-gradient(135deg,rgba(200,150,100,0.1),rgba(180,130,80,0.05),rgba(220,180,140,0.04))', border: '1.5px solid rgba(200,160,120,0.2)', padding: '20px 28px' }}>
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-[21px] font-semibold tracking-[0.03em] text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>📅 课表管理</h1>
          <p className="text-[10px] mt-0.5 tracking-[0.06em]" style={{ color: 'var(--faded)' }}>13天×8时段 · 五育并举 · 双击编辑 · Ctrl+S保存</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(200,160,120,0.08)', border: '1px solid rgba(200,160,120,0.15)' }}>
          <Sparkles size={13} style={{ color: 'var(--primary-skin)' }} />
          <span className="text-[11px] font-medium" style={{ color: 'var(--ink-soft)' }}>Day {todayDay} · {DL[todayDay]} · {DAY_NAMES[todayDay]}</span>
        </div>
      </div>
      <div className="relative">
        <div className="absolute top-[50%] left-0 right-0 h-[2px] -translate-y-1/2 rounded-full" style={{ background: 'rgba(200,180,160,0.3)' }} />
        {timelineReady && (<div className="absolute top-[50%] left-0 h-[2px] -translate-y-1/2 rounded-full" style={{ background: 'linear-gradient(90deg, var(--primary-skin), rgba(200,160,100,0.4))', width: `${(Math.min(todayDay, 13) / 13) * 100}%`, animation: 'timelineGrow 1.2s cubic-bezier(0.22,0.61,0.36,1) both' }} />)}
        <div className="flex justify-between relative z-10">
          {DAYS_ALL.map((d, i) => {
            const isT = isToday(d); const isPast = d < todayDay; const visible = week === 0 || (week === 1 && d <= 7) || (week === 2 && d >= 8)
            return (<div key={d} className="flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-110" style={{ opacity: visible ? 1 : 0.25 }} onClick={() => { if (isPast) setWeek(0); setExpandedDay(expandedDay === d ? null : d) }}>
              <span className="text-[9px] font-medium mb-1" style={{ color: isT ? 'var(--primary-skin)' : 'var(--faded)', fontWeight: isT ? 700 : 400 }}>{DL[d]}</span>
              <div className="w-3.5 h-3.5 rounded-full flex-shrink-0 transition-all duration-300" style={{ background: isT ? 'var(--primary-skin)' : isPast ? 'rgba(200,160,120,0.4)' : 'rgba(200,180,160,0.25)', boxShadow: isT ? '0 0 0 4px rgba(200,134,46,0.2)' : 'none', animation: isT ? 'timelineDotPulse 2s infinite' : (timelineReady ? `scheduleFadeUp 0.4s ${0.08 * i}s both` : 'none'), border: isT ? '2px solid #fff' : 'none' }} />
              <span className="text-[10px] font-semibold mt-1" style={{ color: isT ? 'var(--ink)' : isPast ? 'var(--ink-soft)' : 'var(--faded)', opacity: isT ? 1 : isPast ? 0.8 : 0.5 }}>Day {d}</span>
            </div>)
          })}
        </div>
      </div>
      {expandedDay !== null && (<div className="mt-4 p-4 rounded-xl schedule-fade-up" style={{ background: 'rgba(245,238,220,0.5)', border: '1px solid rgba(200,160,120,0.15)' }}>
        <div className="flex items-center justify-between mb-2"><h4 className="text-[13px] font-semibold text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>🗓 Day {expandedDay} · {DL[expandedDay]} · {DAY_NAMES[expandedDay]}</h4><button onClick={() => setExpandedDay(null)} className="bg-transparent border-none cursor-pointer text-[var(--faded)] hover:text-[var(--ink)]"><X size={14} /></button></div>
        <div className="grid grid-cols-4 gap-2 max-md:grid-cols-2">{TIMES.map((t, i) => { const row = grid[i]; if (row.length === 1) return null; const cell = row[expandedDay - 1] ?? ''; if (!cell || cell === '') return null; const cat = classifyCourse(cell); const cfg = cat ? WUYU_CONFIG[cat] : null; return (<div key={i} className="p-2 rounded-lg text-[11px]" style={{ background: cfg ? cfg.lightBg : 'rgba(245,240,230,0.3)', borderLeft: cfg ? `3px solid ${cfg.color}` : '3px solid rgba(200,180,160,0.3)' }}><span className="text-[9px] opacity-50">{t}</span><br /><span className="font-medium">{cell.replace(/<[^>]*>/g, '').trim()}</span></div>) })}</div>
      </div>)}
    </div>

    {/* ═══ 工具栏 — 紧接 Header，操作入口 ═══ */}
    <div className="picture-book-card p-4 mb-5 schedule-fade-up" style={{ animationDelay: '0.12s', transform: 'rotate(-0.1deg)' }}>
      <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
        <div className="flex rounded-lg border p-0.5" style={{ borderColor: 'rgba(200,180,160,0.2)', background: 'rgba(245,240,230,0.3)' }}>
          {([{ v: 1, l: '第一周' }, { v: 2, l: '第二周' }, { v: 0, l: '全部' }] as { v: 0 | 1 | 2; l: string }[]).map(o => (<button key={o.v} onClick={() => setWeek(o.v)} className="px-3 py-1.5 rounded-md text-[11px] font-medium border-none cursor-pointer transition-all duration-200" style={{ background: week === o.v ? tt.thBg : 'transparent', color: week === o.v ? '#fff' : 'var(--ink-soft)', fontFamily: 'inherit' }}>{o.l}</button>))}
        </div>
        <div className="w-px h-6" style={{ background: 'rgba(200,180,160,0.2)' }} />
        <div className="flex rounded-lg border p-0.5" style={{ borderColor: 'rgba(200,180,160,0.2)', background: 'rgba(245,240,230,0.3)' }}>
          {(Object.keys(THEMES) as ThemeKey[]).map(k => (<button key={k} onClick={() => setTheme(k)} className="w-6 h-6 rounded-md text-[12px] border-none cursor-pointer flex items-center justify-center transition-all duration-200" style={{ background: theme === k ? tt.thBg : 'transparent', color: theme === k ? '#fff' : 'var(--ink-soft)' }} title={k}>{THEMES[k].name}</button>))}
        </div>
        <div className="w-px h-6" style={{ background: 'rgba(200,180,160,0.2)' }} />
        <div className="flex rounded-lg border p-0.5" style={{ borderColor: 'rgba(200,180,160,0.2)', background: 'rgba(245,240,230,0.3)' }}>
          <button onClick={() => setViewMode('table')} className="px-2.5 py-1.5 rounded-md text-[11px] font-medium border-none cursor-pointer transition-all flex items-center gap-1" style={{ background: viewMode === 'table' ? tt.thBg : 'transparent', color: viewMode === 'table' ? '#fff' : 'var(--ink-soft)', fontFamily: 'inherit' }}><Grid3X3 size={13} />表格</button>
          <button onClick={() => setViewMode('cards')} className="px-2.5 py-1.5 rounded-md text-[11px] font-medium border-none cursor-pointer transition-all flex items-center gap-1" style={{ background: viewMode === 'cards' ? tt.thBg : 'transparent', color: viewMode === 'cards' ? '#fff' : 'var(--ink-soft)', fontFamily: 'inherit' }}><List size={13} />卡片</button>
        </div>
        <div className="flex-1" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 搜索高亮..." className="px-2 py-1 rounded-lg border text-[10px] outline-none w-[120px]" style={{ borderColor: 'rgba(200,180,160,0.3)', background: 'var(--warm-white)', color: 'var(--ink-soft)', fontFamily: 'inherit' }} />
        {selected.size > 0 && <span className="text-[10px] font-medium text-[var(--primary-skin)]">{selected.size}个选中</span>}
      </div>
      <div className="flex items-center gap-1.5 flex-wrap">
        <button onClick={undo} className="picture-book-btn" style={{ fontSize: 10, padding: '3px 8px' }}><Undo2 size={12} />撤销</button>
        <button onClick={redo} className="picture-book-btn" style={{ fontSize: 10, padding: '3px 8px' }}><Redo2 size={12} />重做</button>
        <div className="w-px h-5 mx-0.5" style={{ background: 'rgba(200,180,160,0.2)' }} />
        <button onClick={merge} className="picture-book-btn" style={{ fontSize: 10, padding: '3px 8px', opacity: selected.size >= 2 ? 1 : 0.5 }} disabled={selected.size < 2}><Combine size={12} />合并{selected.size >= 2 ? `(${selected.size})` : ''}</button>
        <button onClick={() => { const cells = Array.from(selected).map(s => s.split('_').map(Number) as [number, number]); if (!cells.length) return; pushUndo(); setGrid(p => { const n = clone(p); cells.forEach(([ri, ci]) => { if (n[ri].length !== 1) n[ri][ci] = '' }); return n }); setSelected(new Set()); toast('已拆分') }} className="picture-book-btn" style={{ fontSize: 10, padding: '3px 8px', opacity: selected.size > 0 ? 1 : 0.5 }} disabled={selected.size === 0}>拆分</button>
        <button onClick={clearAll} className="picture-book-btn" style={{ fontSize: 10, padding: '3px 8px' }}><X size={12} />清空</button>
        <div className="w-px h-5 mx-0.5" style={{ background: 'rgba(200,180,160,0.2)' }} />
        <button onClick={() => setFindDlg(true)} className="picture-book-btn" style={{ fontSize: 10, padding: '3px 8px' }}><Search size={12} />查找</button>
        <button onClick={reset} className="picture-book-btn" style={{ fontSize: 10, padding: '3px 8px' }}><RotateCcw size={12} />默认</button>
        <div className="w-px h-5 mx-0.5" style={{ background: 'rgba(200,180,160,0.2)' }} />
        <button onClick={save} className="picture-book-btn primary" style={{ fontSize: 10, padding: '3px 10px' }}><Save size={12} />保存</button>
        <button onClick={() => window.print()} className="picture-book-btn" style={{ fontSize: 10, padding: '3px 8px' }}><Printer size={12} />打印</button>
        <button onClick={() => toast('导出功能需安装html-to-image')} className="picture-book-btn" style={{ fontSize: 10, padding: '3px 8px' }}><Download size={12} />导出</button>
      </div>
    </div>

    {/* ═══ 课表 + 今日概览 并排 (黄金位置) ═══ */}
    <div className="grid grid-cols-[1fr_248px] gap-5 mb-6 max-lg:grid-cols-1">
      {/* ── 左：课表主体 ── */}
      {viewMode === 'table' ? (
        <div className="overflow-x-auto rounded-2xl schedule-fade-up" style={{ animationDelay: '0.18s', boxShadow: 'var(--shadow-md)', border: '1.5px solid rgba(200,180,160,0.25)' }}>
          <div className="min-w-[700px]">
            <table ref={tRef} className="w-full border-collapse text-[11px]">
              <thead><tr>
                <th className="p-2.5 text-center font-bold text-[12px] border sticky left-0 z-[2]" style={{ background: tt.thBg, color: tt.thColor, borderColor: tt.border, minWidth: 95 }}>时间 \ 日期</th>
                {vis.map(d => { const tdy = isToday(d); return (<th key={d} className="p-2 text-center border relative" style={{ background: tdy ? 'linear-gradient(135deg,rgba(200,160,110,0.25),rgba(180,140,90,0.12))' : tt.thBg, color: tdy ? 'var(--ink)' : tt.thColor, borderColor: tt.border, borderBottom: tdy ? '3px solid var(--primary-skin)' : undefined }}><div className="text-[12px] font-semibold flex items-center justify-center gap-1">{tdy && <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--primary-skin)', animation: 'timelineDotPulse 2s infinite' }} />}Day {d}</div><div className="text-[9px] opacity-70">{DL[d]}</div>{tdy && <div className="text-[8px] text-[var(--primary-skin)] font-bold">今天</div>}</th>) })}
              </tr></thead>
              <tbody>
                {grid.map((row, ri) => {
                  const isFull = row.length === 1; const skip = ROWSPAN_SKIP[ri] || {}; const rspans = ROWSPAN_CELLS[ri] || {}; const cells: React.ReactNode[] = []
                  cells.push(<td key={'t' + ri} className="p-2 text-center font-bold text-[11px] border sticky left-0 z-[1] align-middle" style={{ background: tt.timeBg, color: tt.timeColor, borderColor: tt.border, minWidth: 95 }}><span className="mr-1">{TIME_ICONS[ri]}</span>{TIMES[ri]}</td>)
                  if (isFull) {
                    if (editing && editing.ri === ri) { cells.push(<td key={'ed'} colSpan={vis.length} className="p-0 border"><textarea value={editVal} onChange={e => setEditVal(e.target.value)} onBlur={saveEdit} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) saveEdit(); if (e.key === 'Escape') setEditing(null) }} className="w-full min-h-[36px] p-2 border-none outline-none resize-y text-[12px] text-center font-bold" style={{ background: '#fff', color: 'var(--ink)', border: '2px dashed var(--primary-skin)', fontFamily: 'inherit' }} autoFocus /></td>) }
                    else { cells.push(<td key={'fl'} colSpan={vis.length} className="p-2 text-center font-bold text-[13px] border cursor-pointer hover:ring-2 hover:ring-[var(--primary-skin)]/20 transition-all" style={{ background: tt.stripeBg, color: tt.timeColor, borderColor: tt.border }} onDoubleClick={() => startEdit(ri, 0)}>{row[0] && row[0] !== '' ? hl(row[0]) : <span className="opacity-30">双击编辑</span>}</td>) }
                  } else { vis.forEach(d => { const ci = d - 1; if (skip[ci]) return; const cell = row[ci] ?? ''; const rs = rspans[ci] || undefined; cells.push(<RenderCell key={'c' + ri + '_' + d} cell={cell} ri={ri} ci={ci} rowspan={rs} />) }) }
                  return <tr key={ri}>{cells}</tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-3 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
          {vis.map((d, idx) => {
            const courses: { time: string; icon: string; content: string; cat: WuYuCategory | null }[] = []
            grid.forEach((row, ri) => { const cell = row.length === 1 ? row[0] : (row[d - 1] ?? ''); if (!cell || cell === '') return; courses.push({ time: TIMES[ri], icon: TIME_ICONS[ri], content: cell, cat: classifyCourse(cell) }) })
            return (<div key={d} className="picture-book-card p-0 overflow-hidden schedule-fade-up hover:-translate-y-1 hover:shadow-lg transition-all duration-300" style={{ animationDelay: `${0.1 + idx * 0.04}s`, borderLeft: isToday(d) ? '4px solid var(--primary-skin)' : undefined }}>
              <div className="p-3 text-center" style={{ background: isToday(d) ? 'linear-gradient(135deg,rgba(200,160,110,0.2),rgba(180,140,90,0.1))' : 'linear-gradient(135deg,rgba(245,238,220,0.6),rgba(240,230,215,0.3))', borderBottom: '1px solid rgba(200,180,160,0.12)' }}><p className="text-[14px] font-bold text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>Day {d}</p><p className="text-[10px]" style={{ color: 'var(--faded)' }}>{DL[d]} · {DAY_NAMES[d]}</p>{isToday(d) && <span className="text-[9px] px-2 py-0.5 rounded-full inline-block mt-1" style={{ background: 'var(--primary-skin)', color: '#fff', fontWeight: 600 }}>今天</span>}</div>
              <div className="p-2 space-y-1">{courses.map((c, i) => { const cfg = c.cat ? WUYU_CONFIG[c.cat] : null; const text = c.content.replace(/<[^>]*>/g, '').trim(); return (<div key={i} className="flex items-center gap-1.5 p-1.5 rounded-md text-[10px]" style={{ background: cfg ? cfg.lightBg : 'rgba(245,240,230,0.3)', borderLeft: cfg ? `3px solid ${cfg.color}` : '3px solid rgba(200,180,160,0.2)' }}><span className="text-[9px] opacity-50">{c.icon}</span><span className="truncate font-medium" style={{ color: 'var(--ink-soft)' }}>{text}</span>{cfg && <span className="text-[8px] ml-auto flex-shrink-0" style={{ color: cfg.color }}>{cfg.emoji}</span>}</div>) })}</div>
            </div>)
          })}
        </div>
      )}

      {/* ── 右：今日概览 ── */}
      <div className="picture-book-card p-4 schedule-fade-up max-lg:hidden" style={{ animationDelay: '0.22s', transform: 'rotate(0.08deg)', borderLeft: '4px solid var(--primary-skin)', alignSelf: 'start', position: 'sticky', top: 20 }}>
        <h3 className="text-[13px] font-semibold mb-3 text-[var(--ink)] flex items-center gap-1.5" style={{ fontFamily: 'var(--font-serif)' }}><Zap size={13} style={{ color: 'var(--primary-skin)' }} />今日概览</h3>
        <div className="space-y-1.5">
          {todayCourses.map((c, i) => { const cfg = c.cat ? WUYU_CONFIG[c.cat] : null; return (<div key={i} className="flex items-center gap-2 p-1.5 rounded-md text-[10px]" style={{ background: cfg ? cfg.lightBg : 'rgba(245,240,230,0.2)' }}><span className="flex-shrink-0 w-14 text-center font-medium" style={{ color: 'var(--faded)' }}>{c.time}</span>{cfg && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cfg.color }} />}<span className="truncate font-medium" style={{ color: 'var(--ink-soft)' }} dangerouslySetInnerHTML={{ __html: c.content.replace(/<[^>]*>/g, '').trim() }} /></div>) })}
        </div>
        {/* 迷你五育分布 */}
        <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(200,180,160,0.12)' }}>
          <div className="flex gap-0.5">
            {wuYuKeys.map(key => { const cfg = WUYU_CONFIG[key]; const cnt = todayCourses.filter(c => c.cat === key).length; return (<div key={key} className="flex-1 text-center" title={`${cfg.label}: ${cnt}门`}><div className="h-1.5 rounded-full mb-0.5" style={{ background: cfg.color, opacity: cnt > 0 ? 1 : 0.15 }} /><span className="text-[8px]" style={{ color: cnt > 0 ? cfg.color : 'var(--faded)', fontWeight: cnt > 0 ? 600 : 400 }}>{cnt}</span></div>) })}
          </div>
        </div>
      </div>
    </div>

    {/* ═══ 五育统计卡片 ═══ */}
    <div className="grid grid-cols-6 gap-3 mb-6 max-lg:grid-cols-3 max-sm:grid-cols-2 schedule-fade-up" style={{ animationDelay: '0.3s' }}>
      {wuYuKeys.map((key, i) => { const cfg = WUYU_CONFIG[key]; const count = stats.counts[key]; const pct = stats.total > 0 ? Math.round((count / stats.total) * 100) : 0; return (<div key={key} ref={el => { statRefs.current[i] = el }} className="picture-book-card p-4 cursor-default hover:-translate-y-1 hover:shadow-md transition-all duration-300 stat-card-pop" style={{ animationDelay: `${0.1 + i * 0.1}s`, borderLeft: `4px solid ${cfg.color}` }}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: cfg.bg, color: cfg.color }}><cfg.icon size={16} /></div><span className="text-[10px] font-medium" style={{ color: 'var(--faded)' }}>{cfg.emoji} {cfg.label}</span></div><p className="text-[26px] font-bold text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>{statsVisible ? <CountUp target={count} /> : 0}<span className="text-[13px] font-normal ml-1" style={{ color: 'var(--faded)' }}>门</span></p><div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: cfg.lightBg }}><div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${pct}%`, background: cfg.gradient }} /></div></div>) })}
      <div className="picture-book-card p-4 cursor-default hover:-translate-y-1 hover:shadow-md transition-all duration-300 stat-card-pop" style={{ animationDelay: '0.6s', borderLeft: '4px solid var(--primary-skin)', background: 'linear-gradient(135deg,rgba(200,160,110,0.08),rgba(180,140,90,0.03))' }}><div className="flex items-center gap-2 mb-2"><div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(200,134,46,0.12)', color: 'var(--primary-skin)' }}><BookOpen size={16} /></div><span className="text-[10px] font-medium" style={{ color: 'var(--faded)' }}>📋 总课程</span></div><p className="text-[26px] font-bold text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>{statsVisible ? <CountUp target={stats.total} /> : 0}<span className="text-[13px] font-normal ml-1" style={{ color: 'var(--faded)' }}>门</span></p><div className="mt-2 flex gap-0.5">{wuYuKeys.map(key => { const cfg = WUYU_CONFIG[key]; const pct2 = stats.total > 0 ? (stats.counts[key] / stats.total) * 100 : 0; return <div key={key} className="h-1.5 rounded-full flex-1" style={{ background: cfg.color, opacity: 0.3 + pct2 / 200 }} title={`${cfg.label}: ${stats.counts[key]}`} /> })}</div></div>
    </div>

    {/* ═══ 热力图 + 图例 / 快捷键 ═══ */}
    <div className="grid grid-cols-[1fr_260px] gap-5 mb-4 max-lg:grid-cols-1 schedule-fade-up" style={{ animationDelay: '0.4s' }}>
      <div className="picture-book-card p-5" style={{ transform: 'rotate(0.05deg)' }}>
        <h3 className="text-[14px] font-semibold mb-4 text-[var(--ink)] flex items-center gap-1.5" style={{ fontFamily: 'var(--font-serif)' }}><BarChart3 size={14} style={{ color: '#d4855e' }} /> 13天课程密度热力图</h3>
        <div className="flex items-end gap-1.5 h-[100px]">
          {heatmapData.map((hd, i) => {
            const maxCats = Math.max(...Object.values(hd.catCounts), 1)
            return (
              <div key={hd.day} className="flex-1 flex flex-col items-center gap-1 group cursor-default">
                <div className="w-full flex flex-col-reverse items-center" style={{ height: 80 }}>
                  {wuYuKeys.map(catKey => {
                    const count = hd.catCounts[catKey]
                    const h = (count / maxCats) * 60
                    return h > 0 ? (
                      <div key={catKey} className="w-full rounded-t-[2px] heatmap-bar transition-all duration-300 group-hover:brightness-110"
                        style={{
                          height: h,
                          background: WUYU_CONFIG[catKey].gradient,
                          animationDelay: `${i * 0.1}s`,
                          opacity: 0.7 + (count / maxCats) * 0.3,
                        }} />
                    ) : null
                  })}
                </div>
                <span className="text-[9px] font-medium" style={{
                  color: isToday(hd.day) ? 'var(--primary-skin)' : 'var(--faded)',
                  fontWeight: isToday(hd.day) ? 700 : 400,
                }}>{hd.date}</span>
                {isToday(hd.day) && <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--primary-skin)' }} />}
              </div>
            )
          })}
        </div>
      </div>
      <div className="space-y-3">
        <div className="picture-book-card p-4" style={{ transform: 'rotate(-0.08deg)' }}>
          <h3 className="text-[12px] font-semibold mb-3 text-[var(--ink)] flex items-center gap-1.5" style={{ fontFamily: 'var(--font-serif)' }}><Info size={12} style={{ color: 'var(--faded)' }} /> 五育图例</h3>
          <div className="space-y-1.5">{wuYuKeys.map(key => { const cfg = WUYU_CONFIG[key]; return (<div key={key} className="flex items-center gap-2 text-[10px]"><div className="w-3 h-3 rounded-sm flex-shrink-0" style={{ background: cfg.gradient }} /><span style={{ color: 'var(--ink-soft)' }}>{cfg.emoji} {cfg.label}</span><span className="ml-auto font-medium" style={{ color: cfg.color }}>{stats.counts[key]}门</span></div>) })}</div>
        </div>
        <div className="picture-book-card p-4" style={{ transform: 'rotate(0.06deg)', background: 'linear-gradient(135deg,rgba(245,238,220,0.5),rgba(240,230,215,0.3))' }}>
          <h3 className="text-[12px] font-semibold mb-2 text-[var(--ink)] flex items-center gap-1.5" style={{ fontFamily: 'var(--font-serif)' }}>⌨️ 快捷键</h3>
          <div className="space-y-1 text-[10px]" style={{ color: 'var(--faded)' }}>
            <p><kbd className="px-1 py-0.5 rounded text-[9px] font-mono" style={{ background: 'rgba(200,180,160,0.15)', color: 'var(--ink-soft)', border: '1px solid rgba(200,180,160,0.3)' }}>Ctrl+Z</kbd> 撤销 · <kbd className="px-1 py-0.5 rounded text-[9px] font-mono" style={{ background: 'rgba(200,180,160,0.15)', color: 'var(--ink-soft)', border: '1px solid rgba(200,180,160,0.3)' }}>Ctrl+Y</kbd> 重做</p>
            <p><kbd className="px-1 py-0.5 rounded text-[9px] font-mono" style={{ background: 'rgba(200,180,160,0.15)', color: 'var(--ink-soft)', border: '1px solid rgba(200,180,160,0.3)' }}>Ctrl+S</kbd> 保存 · <kbd className="px-1 py-0.5 rounded text-[9px] font-mono" style={{ background: 'rgba(200,180,160,0.15)', color: 'var(--ink-soft)', border: '1px solid rgba(200,180,160,0.3)' }}>Ctrl+F</kbd> 查找</p>
            <p><kbd className="px-1 py-0.5 rounded text-[9px] font-mono" style={{ background: 'rgba(200,180,160,0.15)', color: 'var(--ink-soft)', border: '1px solid rgba(200,180,160,0.3)' }}>双击</kbd> 编辑 · <kbd className="px-1 py-0.5 rounded text-[9px] font-mono" style={{ background: 'rgba(200,180,160,0.15)', color: 'var(--ink-soft)', border: '1px solid rgba(200,180,160,0.3)' }}>Enter</kbd> 保存 · <kbd className="px-1 py-0.5 rounded text-[9px] font-mono" style={{ background: 'rgba(200,180,160,0.15)', color: 'var(--ink-soft)', border: '1px solid rgba(200,180,160,0.3)' }}>Esc</kbd> 取消</p>
          </div>
        </div>
      </div>
    </div>

    {/* ═══ Toast / 查找替换 ═══ */}
    {findDlg && <><div className="fixed inset-0 bg-black/20 z-[200]" onClick={() => setFindDlg(false)} /><div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] picture-book-card p-6 w-[380px]"><h3 className="text-[14px] font-semibold mb-4 text-[var(--ink)]">🔍 查找替换</h3><div className="space-y-3"><div className="flex items-center gap-2"><label className="text-[11px] w-12 text-[var(--faded)]">查找</label><input value={findT} onChange={e => setFindT(e.target.value)} className="flex-1 px-3 py-1.5 rounded-lg border text-[12px] outline-none" style={{ borderColor: 'rgba(180,160,130,0.3)', fontFamily: 'inherit' }} /></div><div className="flex items-center gap-2"><label className="text-[11px] w-12 text-[var(--faded)]">替换</label><input value={replT} onChange={e => setReplT(e.target.value)} className="flex-1 px-3 py-1.5 rounded-lg border text-[12px] outline-none" style={{ borderColor: 'rgba(180,160,130,0.3)', fontFamily: 'inherit' }} /></div></div><div className="flex gap-2 justify-end mt-4"><button onClick={() => setFindDlg(false)} className="picture-book-btn" style={{ fontSize: 11 }}>取消</button><button onClick={findReplace} className="picture-book-btn primary" style={{ fontSize: 11 }}>全部替换</button></div></div></>}
    {msg && <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] px-5 py-2 rounded-xl text-[12px] font-medium text-white shadow-lg schedule-fade-up" style={{ background: 'linear-gradient(135deg,#5a3a28,#8b5a3a)' }}>{msg}</div>}

    <div className="text-[10px] flex items-center justify-between flex-wrap gap-2" style={{ color: 'var(--faded)' }}>
      <span>💡 点击课表中课程单元格查看色彩分类 · 双击编辑 · Ctrl+S 保存</span>
      <span>凡星支教队 · 2026 筠连夏令营</span>
    </div>
  </InnerLayout>)
}
