'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { Undo2, Redo2, Save, Search, Printer, X, Combine, RotateCcw, Download } from 'lucide-react'

/* ═══════════════════════════════════════
   课表数据 + 编辑
   ═══════════════════════════════════════ */
const TIMES = ['7:00–8:00','8:00–9:00','9:15–10:15','10:30–11:30','11:30–13:30','14:30–15:30','15:45–16:45','17:00–18:00']
const DAYS_ALL=[1,2,3,4,5,6,7,8,9,10,11,12,13]
const DAYS_W1=[1,2,3,4,5,6,7]
const DAYS_W2=[8,9,10,11,12,13]
const DL:Record<number,string>={1:'7/19',2:'7/20',3:'7/21',4:'7/22',5:'7/23',6:'7/24',7:'7/25',8:'7/26',9:'7/27',10:'7/28',11:'7/29',12:'7/30',13:'7/31'}

const THEMES={ warm:{ name:'📖',thBg:'linear-gradient(135deg,#5a3a28,#7a5040,#8b5a3a)',thColor:'#fdf7ef',timeBg:'#f5ebe0',timeColor:'#6b4a2a',cellBg:'#fefcf7',stripeBg:'rgba(245,240,230,0.3)',border:'rgba(180,160,130,0.15)'}, green:{ name:'🌿',thBg:'linear-gradient(135deg,#1A3C1A,#2E5A2E,#3A7D3A)',thColor:'#E8F5E9',timeBg:'#C8E6C9',timeColor:'#1B5E20',cellBg:'#fff',stripeBg:'rgba(232,245,233,0.4)',border:'rgba(76,175,80,0.1)'}, blue:{ name:'🔵',thBg:'linear-gradient(135deg,#0D47A1,#1565C0,#1976D2)',thColor:'#E3F2FD',timeBg:'rgba(21,101,192,0.15)',timeColor:'#1565C0',cellBg:'#fff',stripeBg:'rgba(227,242,253,0.3)',border:'rgba(66,165,245,0.08)'}, orange:{ name:'🍊',thBg:'linear-gradient(135deg,#BF360C,#E65100,#FF9800)',thColor:'#FFF3E0',timeBg:'#FBE9E7',timeColor:'#BF360C',cellBg:'#FFFDF9',stripeBg:'rgba(255,243,224,0.3)',border:'rgba(255,152,0,0.08)'}}
type Theme = typeof THEMES['orange']
type Row = string[]

/* ── 默认数据，Blank cells filled with appropriate content ── */
const DEF:Row[] = [
  ['起床+早餐'],   // row 0: full colspan
  ['出发','开营仪式','碳足迹侦探营<br/><small>第一课时</small>','走遍中国<br/><small>中国地理</small>','读书分享会','生物知识小课堂<br/><small>筠连动植物</small>','生活中的数学小知识','低碳计划行动营','趣味作文<br/><small>作文能力提升</small>','你好！历史君<br/><small>第三课时</small>','中华传统文化宣讲','读书分享会','唱响未来<br/><small>音乐鉴赏</small>'],
  [], // row 2: Day1 covered by 出发 rowspan
  [], // row 3: Day1 covered by 出发 rowspan
  ['午休'],        // row 4: full colspan
  ['沟通准备·例会·试课','科学小实验<br/><small>物理</small>','中华传统文化','你好！历史君<br/><small>第二课时</small>','妙手中国心<br/><small>硬笔书法练习</small>','榜样教育','作业辅导','红色历史教育<br/><small>长征</small>','中华传统文化科普','我是算数小能手','"助碍前行"<br/><small>关爱残障人士</small>','手工艺课','结营仪式<br/><small>做更好的小朋友</small>'],
  [], // row 6: Day1 covered by 准备 rowspan
  [], // row 7: Day1 covered by 准备 rowspan
]

// row 2 (9:15-10:15): all 13 days, Day1 covered
const R2_DATA = ['','AI赋能营<br/><small>第一课时</small>','安全知识小课堂<br/><small>防溺水·居家安全</small>','小型辩论会','厨房里的科学小魔法<br/><small>物理化学</small>','说文解字<br/><small>汉字发展历程</small>','走遍四川<br/><small>四川地理文化</small>','像科学家一样提问','我的情绪我做主<br/><small>心理素质</small>','妙墨中国心<br/><small>软笔书法</small>','智能环保科技营','科学小实验<br/><small>化学</small>','我的家乡有点燃<br/><small>四川非遗文化</small>']
// row 3 (10:30-11:30): all 13 days, Day1 covered
const R3_DATA = ['','红色文化教育<br/><small>赵一曼</small>','马蹄声里看筠连<br/><small>历史小课堂</small>','碳足迹侦探营<br/><small>第二课时</small>','计算机初认识<br/><small>计算机发展史</small>','家乡的叶子<br/><small>茶叶与茶文化</small>','我与我的祖国<br/><small>爱国主义教育</small>','唱响未来<br/><small>唱歌表演</small>','安全知识小课堂<br/><small>防山火·国家安全</small>','我是共产主义接班人<br/><small>党史知识科普</small>','榜样教育<br/><small>红色精神耀筠连</small>','我是小侦探<br/><small>错别字·易错音</small>','现代史科普教育<br/><small>航天</small>']
// row 6 (15:45-16:45): all 13 days, Day1 covered
const R6_DATA = ['','云上山歌<br/><small>筠连山歌·苗族大唢呐</small>','作业辅导','绘画小课堂<br/><small>画出家乡的风景</small>','作业辅导','电影中的艺术<br/><small>经典电影鉴赏</small>','趣味运动会','溶洞里的为什么<br/><small>喀斯特地貌科普</small>','作业辅导','剪纸拼贴画制作','作业辅导','合作项目<br/><small>小组搭建纸塔</small>','结营准备<br/><small>整理教室</small>']
// row 7 (17:00-18:00): all 13 days, Day1 covered
const R7_DATA = ['','AI赋能营<br/><small>第二课时</small>','体育课','自习/作业辅导','体育课','自习/作业辅导','自习/作业辅导','体育课','自习/作业辅导','体育课','自习/作业辅导','自习/作业辅导','体育课','自习/作业辅导']

/* ═══ RowSpan tracking ═══
   "出发" rowspan=3: row 1(td defined) covers rows 1-3. rows 2-3 {0} skipped
   "准备" rowspan=3: row 5(td defined) covers rows 5-7. rows 6-7 {0} skipped
*/
const FULL_GRID_FILL = [DEF[0],R2_DATA,R3_DATA,DEF[4],R6_DATA,R7_DATA]
// Map: row ri (0-7) -> which col indices have their own cell defined
// ri 2 = index 1 in FULL_GRID_FILL, so row indices: 0→DEF[0], 1→R2_DATA, 2→R3_DATA, 3→DEF[4], 4→R6_DATA, 5→R7_DATA
// But TIMES is 8 rows (0-7), and GRID is 6 rows. So I need an 8-row grid.
// Actually let me restructure: the GRID is 8 rows matching TIMES exactly.
const DEFAULT_GRID:Row[] = [
  DEF[0],               // 7:00-8:00  full span
  DEF[1],               // 8:00-9:00  "出发" rows=1-3 col0
  R2_DATA,              // 9:15-10:15
  R3_DATA,              // 10:30-11:30
  DEF[4],               // 11:30-13:30 full span
  DEF[5],               // 14:30-15:30 "准备" rows=5-7 col0
  R6_DATA,              // 15:45-16:45
  R7_DATA,              // 17:00-18:00
]

// ROWSPAN_CELLS: which cells need rowSpan > 1 on rendering
// {ri: {ci: rowspan}}
// "出发" is at ROW[1][0] with rowspan=3 → ROWSPAN_CELLS[1] = {0: 3}
// "准备" is at ROW[5][0] with rowspan=3 → ROWSPAN_CELLS[5] = {0: 3}
const ROWSPAN_CELLS:Record<number,Record<number,number>> = {
  1: {0: 3},  // 出发: col 0, span 3 rows (rows 1,2,3)
  5: {0: 3},  // 准备: col 0, span 3 rows (rows 5,6,7)
}
// ROWSPAN_SKIP: rows where a cell position is occupied by rowspan from above
// Row 2 col 0 covered by row 1's 出发 → {2: {0: true}}
// Row 3 col 0 covered by row 1's 出发 → {3: {0: true}}
// Row 6 col 0 covered by row 5's 准备 → {6: {0: true}}
// Row 7 col 0 covered by row 5's 准备 → {7: {0: true}}
const ROWSPAN_SKIP:Record<number,Record<number,boolean>> = {
  2: {0: true}, 3: {0: true}, 6: {0: true}, 7: {0: true},
}

const SAVE_KEY='ssd4'

function clone(g:Row[]):Row[]{return g.map(r=>[...r])}

export default function SchedulePage() {
  const [grid,setGrid]=useState<Row[]>(()=>{
    try{const s=localStorage.getItem(SAVE_KEY);if(s)return JSON.parse(s)}catch(e){}
    return DEFAULT_GRID
  })
  const [undoS,setUndoS]=useState<Row[][]>([])
  const [redoS,setRedoS]=useState<Row[][]>([])
  const [week,setWeek]=useState<0|1|2>(1)
  const [theme,setTheme]=useState<'warm'|'green'|'blue'|'orange'>('warm')
  const [search,setSearch]=useState('')
  const [editing,setEditing]=useState<{ri:number;ci:number}|null>(null)
  const [editVal,setEditVal]=useState('')
  const [selected,setSelected]=useState<Set<string>>(new Set())
  const [findDlg,setFindDlg]=useState(false)
  const [findT,setFindT]=useState('')
  const [replT,setReplT]=useState('')
  const [msg,setMsg]=useState('')
  const tRef=useRef<HTMLTableElement>(null)
  const inpRef=useRef<HTMLTextAreaElement>(null)
  const tt=THEMES[theme]
  const vis=week===0?DAYS_ALL:week===1?DAYS_W1:DAYS_W2

  useEffect(()=>{if(editing&&inpRef.current)inpRef.current.focus()},[editing])

  const pushUndo=()=>{setUndoS(s=>{const n=[...s,clone(grid)];return n.length>50?n.slice(-50):n});setRedoS([])}
  const toast=(s:string)=>{setMsg(s);setTimeout(()=>setMsg(''),2000)}

  const startEdit=(ri:number,ci:number)=>{
    pushUndo();setEditing({ri,ci});setEditVal(grid[ri].length===1?grid[ri][0]:grid[ri][ci]||'')
  }
  const saveEdit=()=>{if(!editing)return;const{ri,ci}=editing;setGrid(p=>{const n=clone(p);if(n[ri].length===1)n[ri][0]=editVal;else n[ri][ci]=editVal;return n});setEditing(null)}
  const merge=()=>{if(selected.size<2){toast('请选中至少2个相邻单元格');return}pushUndo();const cells=Array.from(selected).map(s=>s.split('_').map(Number)as[number,number]);const ri=cells[0][0];const cis=cells.map(c=>c[1]).sort((a,b)=>a-b);setGrid(p=>{const n=clone(p);const row=n[ri];if(row.length===1){toast('全行合并无需再合并');return p};const merged=cis.map(ci=>row[ci]).filter(Boolean).join('<br/>');row[cis[0]]=merged;for(let i=cis[0]+1;i<=cis[cis.length-1];i++)row[i]='';return n});setSelected(new Set());toast('已合并')}
  const undo=()=>{if(!undoS.length){toast('无操作');return};const prev=undoS[undoS.length-1];setRedoS(s=>[...s,clone(grid)]);setGrid(prev);setUndoS(s=>s.slice(0,-1));toast('已撤销')}
  const redo=()=>{if(!redoS.length){toast('无操作');return};const next=redoS[redoS.length-1];setUndoS(s=>[...s,clone(grid)]);setGrid(next);setRedoS(s=>s.slice(0,-1));toast('已重做')}
  const save=()=>{try{localStorage.setItem(SAVE_KEY,JSON.stringify(grid));toast('已保存 ✓')}catch{toast('保存失败')}}
  const reset=()=>{pushUndo();setGrid(clone(DEFAULT_GRID));toast('已恢复默认')}
  const clearAll=()=>{pushUndo();setGrid(p=>{const n=clone(p);n.forEach(r=>{if(r.length===1)r[0]='';else r.forEach((_,i)=>{r[i]=''})});return n});toast('已清空')}
  const findReplace=()=>{if(!findT)return;let f=false;setGrid(p=>{const n=clone(p);n.forEach(r=>{r.forEach((c,i)=>{if(c&&c.includes(findT)){r[i]=c.replaceAll(findT,'<mark>'+replT+'</mark>');f=true}})});return n});setFindDlg(false);toast(f?'已替换':'未找到')}
  const toggleSel=(ri:number,ci:number)=>{setSelected(p=>{const n=new Set(p);const k=ri+'_'+ci;n.has(k)?n.delete(k):n.add(k);return n})}

  useEffect(()=>{const h=(e:KeyboardEvent)=>{
    if(e.ctrlKey||e.metaKey){
      if(e.key==='z'){e.preventDefault();undo()}
      if(e.key==='y'){e.preventDefault();redo()}
      if(e.key==='s'){e.preventDefault();save()}
      if(e.key==='f'){e.preventDefault();setFindDlg(true)}
    }
    if(e.key==='Escape'){setEditing(null);setFindDlg(false)}
  };window.addEventListener('keydown',h);return ()=>window.removeEventListener('keydown',h)},[])

  const hl=(html:string)=>{
    if(!search.trim())return <span dangerouslySetInnerHTML={{__html:html}}/>
    const esc=search.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')
    return <span dangerouslySetInnerHTML={{__html:html.replace(new RegExp(`(${esc})`,'gi'),'<mark style="background:rgba(255,235,59,0.45);padding:0 2px;border-radius:2px">$1</mark>')}}/>
  }

  // Render a single editable cell
  const RenderCell=({cell,ri,ci,rowspan}:{cell:string;ri:number;ci:number;rowspan?:number})=>{
    const k=ri+'_'+ci
    const isSel=selected.has(k)
    const isEdit=editing&&editing.ri===ri&&editing.ci===ci
    const has=cell&&cell!==''
    if(isEdit)return(<td className="p-0 border" style={{borderColor:tt.border}}><textarea ref={inpRef} value={editVal} onChange={e=>setEditVal(e.target.value)} onBlur={saveEdit} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey)saveEdit();if(e.key==='Escape')setEditing(null)}} className="w-full min-h-[32px] p-2 border-none outline-none resize-y text-[11px] text-center" style={{background:'#fff',color:'var(--ink)',border:'2px dashed var(--primary-skin)'}} autoFocus/></td>)
    return(<td onClick={()=>toggleSel(ri,ci)} onDoubleClick={()=>startEdit(ri,ci)} rowSpan={rowspan||1}
      className={'p-2 text-center border transition-all align-middle cursor-pointer'+(isSel?' ring-2 ring-[var(--primary-skin)]':'')}
      style={{background:isSel?'rgba(200,160,120,0.12)':tt.cellBg,borderColor:tt.border,fontSize:11,fontWeight:has?600:400}}>
      {has?hl(cell):<span className="opacity-25">—</span>}
    </td>)
  }

  return (<InnerLayout>
    <header className="pb-[22px] mb-4 relative" style={{borderBottom:'1.5px solid rgba(180,160,130,0.25)'}}>
      <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
        <div><h1 className="text-[19px] font-semibold tracking-[0.03em] text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>📅 课表管理</h1><p className="text-[11px] mt-0.5 tracking-[0.06em]" style={{color:'var(--faded)'}}>13天×8时段 · 双击编辑 · 点击选中合并 · Ctrl+S保存</p></div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Week */}
          <div className="flex rounded-lg border p-0.5" style={{borderColor:'rgba(200,180,160,0.2)',background:'rgba(245,240,230,0.3)'}}>
            {([{v:1,l:'第一周'},{v:2,l:'第二周'},{v:0,l:'全部'}] as {v:0|1|2;l:string}[]).map(o=>(<button key={o.v} onClick={()=>setWeek(o.v)} className="px-3 py-1.5 rounded-md text-[11px] font-medium border-none cursor-pointer transition-colors" style={{background:week===o.v?tt.thBg:'transparent',color:week===o.v?'#fff':'var(--ink-soft)'}}>{o.l}</button>))}
          </div>
          <div className="w-px h-6" style={{background:'rgba(200,180,160,0.2)'}}/>
          {/* Theme */}
          <div className="flex rounded-lg border p-0.5" style={{borderColor:'rgba(200,180,160,0.2)',background:'rgba(245,240,230,0.3)'}}>
            {(Object.keys(THEMES) as Array<keyof typeof THEMES>).map(k=>(<button key={k} onClick={()=>setTheme(k)} className="w-6 h-6 rounded-md text-[12px] border-none cursor-pointer flex items-center justify-center transition-colors" style={{background:theme===k?tt.thBg:'transparent',color:theme===k?'#fff':'var(--ink-soft)'}} title={k}>{THEMES[k].name}</button>))}
          </div>
        </div>
      </div>
      {/* Toolbar row 2 — all edit operations */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <button onClick={undo} className="picture-book-btn" style={{fontSize:10,padding:'3px 8px'}}><Undo2 size={12}/>撤销</button>
        <button onClick={redo} className="picture-book-btn" style={{fontSize:10,padding:'3px 8px'}}><Redo2 size={12}/>重做</button>
        <div className="w-px h-5 mx-0.5" style={{background:'rgba(200,180,160,0.2)'}}/>
        <button onClick={merge} className="picture-book-btn" style={{fontSize:10,padding:'3px 8px'}} disabled={selected.size<2}><Combine size={12}/>合并{selected.size>=2?`(${selected.size})`:''}</button>
        <button onClick={()=>{pushUndo();const cells=Array.from(selected).map(s=>s.split('_').map(Number)as[number,number]);if(!cells.length)return;setGrid(p=>{const n=clone(p);cells.forEach(([ri,ci])=>{if(n[ri].length!==1)n[ri][ci]=''});return n});setSelected(new Set());toast('已拆分')}} className="picture-book-btn" style={{fontSize:10,padding:'3px 8px'}} disabled={selected.size===0}>拆分</button>
        <button onClick={clearAll} className="picture-book-btn" style={{fontSize:10,padding:'3px 8px'}}><X size={12}/>清空</button>
        <div className="w-px h-5 mx-0.5" style={{background:'rgba(200,180,160,0.2)'}}/>
        <button onClick={()=>setFindDlg(true)} className="picture-book-btn" style={{fontSize:10,padding:'3px 8px'}}><Search size={12}/>查找替换</button>
        <button onClick={reset} className="picture-book-btn" style={{fontSize:10,padding:'3px 8px'}}><RotateCcw size={12}/>默认</button>
        <div className="w-px h-5 mx-0.5" style={{background:'rgba(200,180,160,0.2)'}}/>
        <button onClick={save} className="picture-book-btn primary" style={{fontSize:10,padding:'3px 10px'}}><Save size={12}/>保存</button>
        <button onClick={()=>window.print()} className="picture-book-btn" style={{fontSize:10,padding:'3px 8px'}}><Printer size={12}/>打印</button>
        <button onClick={()=>toast('导出功能需安装html-to-image')} className="picture-book-btn" style={{fontSize:10,padding:'3px 8px'}}><Download size={12}/>导出</button>
        <div className="flex-1"/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 搜索高亮..." className="px-2 py-1 rounded-lg border text-[10px] outline-none w-[120px]" style={{borderColor:'rgba(200,180,160,0.3)',background:'var(--warm-white)',color:'var(--ink-soft)'}}/>
        <span className="text-[9px]" style={{color:'var(--faded)'}}>{selected.size>0?`${selected.size}个选中`:''}</span>
      </div>
      <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 text-[7px] tracking-[7px] whitespace-nowrap" style={{color:'rgba(180,160,130,0.5)'}}>· · · · · · · · · · · ·</div>
    </header>

    {/* Table */}
    <div className="overflow-x-auto rounded-2xl" style={{boxShadow:'var(--shadow-md)',border:'1.5px solid rgba(200,180,160,0.25)'}}>
      <div className="min-w-[700px]">
        <table ref={tRef} className="w-full border-collapse text-[11px]">
          <thead><tr>
            <th className="p-2.5 text-center font-bold text-[12px] border sticky left-0 z-[2]" style={{background:tt.thBg,color:tt.thColor,borderColor:tt.border,minWidth:95}}>时间 \ 日期</th>
            {vis.map(d=>(<th key={d} className="p-2 text-center border" style={{background:tt.thBg,color:tt.thColor,borderColor:tt.border}}><div className="text-[12px] font-semibold">Day {d}</div><div className="text-[9px] opacity-70">{DL[d]}</div></th>))}
          </tr></thead>
          <tbody>
            {grid.map((row,ri)=>{
              const isFull = row.length===1
              const skip = ROWSPAN_SKIP[ri]||{}
              const rspans = ROWSPAN_CELLS[ri]||{}
              const cells:React.ReactNode[] = []
              cells.push(<td key={'t'+ri} className="p-2 text-center font-bold text-[11px] border sticky left-0 z-[1] align-middle" style={{background:tt.timeBg,color:tt.timeColor,borderColor:tt.border,minWidth:95}}>{TIMES[ri]}</td>)

              if (isFull) {
                if (editing&&editing.ri===ri) {
                  cells.push(<td key={'ed'} colSpan={vis.length} className="p-0 border"><textarea value={editVal} onChange={e=>setEditVal(e.target.value)} onBlur={saveEdit} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey)saveEdit();if(e.key==='Escape')setEditing(null)}} className="w-full min-h-[36px] p-2 border-none outline-none resize-y text-[12px] text-center font-bold" style={{background:'#fff',color:'var(--ink)',border:'2px dashed var(--primary-skin)'}} autoFocus/></td>)
                } else {
                  cells.push(<td key={'fl'} colSpan={vis.length} className="p-2 text-center font-bold text-[13px] border cursor-pointer hover:ring-2 hover:ring-[var(--primary-skin)]/20 transition-all" style={{background:tt.stripeBg,color:tt.timeColor,borderColor:tt.border}} onDoubleClick={()=>startEdit(ri,0)}>{row[0]&&row[0]!==''?hl(row[0]):<span className="opacity-30">双击编辑</span>}</td>)
                }
              } else {
                vis.forEach(d=>{
                  const ci = d-1 // day 1→col 0
                  if (skip[ci]) return null
                  const cell = row[ci]??''
                  const rs = rspans[ci]||undefined
                  cells.push(<RenderCell key={'c'+ri+'_'+d} cell={cell} ri={ri} ci={ci} rowspan={rs}/>)
                })
              }
              return <tr key={ri}>{cells}</tr>
            })}
          </tbody>
        </table>
      </div>
    </div>

    {/* Find/Replace dialog */}
    {findDlg&&<>
      <div className="fixed inset-0 bg-black/20 z-[200]" onClick={()=>setFindDlg(false)}/>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[201] picture-book-card p-6 w-[380px]">
        <h3 className="text-[14px] font-semibold mb-4 text-[var(--ink)]">🔍 查找替换</h3>
        <div className="space-y-3"><div className="flex items-center gap-2"><label className="text-[11px] w-12 text-[var(--faded)]">查找</label><input value={findT} onChange={e=>setFindT(e.target.value)} className="flex-1 px-3 py-1.5 rounded-lg border text-[12px] outline-none" style={{borderColor:'rgba(180,160,130,0.3)'}}/></div><div className="flex items-center gap-2"><label className="text-[11px] w-12 text-[var(--faded)]">替换</label><input value={replT} onChange={e=>setReplT(e.target.value)} className="flex-1 px-3 py-1.5 rounded-lg border text-[12px] outline-none" style={{borderColor:'rgba(180,160,130,0.3)'}}/></div></div>
        <div className="flex gap-2 justify-end mt-4"><button onClick={()=>setFindDlg(false)} className="picture-book-btn" style={{fontSize:11}}>取消</button><button onClick={findReplace} className="picture-book-btn primary" style={{fontSize:11}}>全部替换</button></div>
      </div>
    </>}

    {msg&&<div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[300] px-5 py-2 rounded-xl text-[12px] font-medium text-white shadow-lg" style={{background:'linear-gradient(135deg,#5a3a28,#8b5a3a)'}}>{msg}</div>}

    <div className="mt-3 text-[10px] flex items-center justify-between" style={{color:'var(--faded)'}}>
      <span>💡 双击编辑 · 点击选中 · 选中相邻后合并 · Ctrl+Z/Y撤销重做 · Ctrl+S保存 · Ctrl+F查找替换 · Enter保存 · Esc取消</span>
    </div>
  </InnerLayout>)
}
