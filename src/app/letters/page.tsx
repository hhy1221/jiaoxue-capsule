'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { MOCK_LETTERS } from '@/lib/mock-data'
import { TONE_LABELS, TONE_EMOJIS, LetterTone } from '@/types'
import { useState } from 'react'

const TONE_BADGES: Record<LetterTone, { bg:string; border:string; text:string }> = {
  poetic:    { bg:'rgba(228,180,165,0.1)', border:'rgba(200,130,120,0.25)', text:'#8b4a3a' },
  friendly:  { bg:'rgba(175,198,218,0.1)', border:'rgba(130,170,200,0.25)', text:'#4a6080' },
  strict:    { bg:'rgba(200,190,180,0.1)', border:'rgba(160,150,140,0.25)', text:'#5a4a3a' },
  energetic: { bg:'rgba(240,200,130,0.1)', border:'rgba(200,160,100,0.25)', text:'#7a5a20' },
  playful:   { bg:'rgba(185,210,190,0.1)', border:'rgba(140,180,145,0.25)', text:'#4a6a3a' },
}

export default function LettersPage() {
  const [selectedId, setSelectedId] = useState(MOCK_LETTERS[0]?.id||null)
  const selected = MOCK_LETTERS.find(l=>l.id===selectedId)

  return (<InnerLayout>
    {/* ═══════════════════════════════════════
       顶栏 — 绘本风
       ═══════════════════════════════════════ */}
    <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative"
      style={{ borderBottom: '1.5px solid rgba(180,160,130,0.25)' }}>
      <div>
        <h1 className="text-[19px] font-semibold tracking-[0.03em] text-[var(--ink)]"
          style={{ fontFamily: "var(--font-serif)" }}>✉️ 临别信</h1>
        <p className="text-[11px] mt-0.5 tracking-[0.06em]" style={{ color: 'var(--faded)' }}>
          AI自动生成 · 5种语气 · {MOCK_LETTERS.length}封已生成
        </p>
      </div>
      <div className="flex gap-2 flex-wrap">
        <button className="picture-book-btn" style={{fontSize:12}}>📥 导出PDF</button>
        <button className="picture-book-btn primary" style={{fontSize:12}}>✨ 批量生成</button>
      </div>
      <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 text-[7px] tracking-[7px]"
        style={{ color: 'rgba(180,160,130,0.5)' }}>· · · · · · · · · · · ·</div>
    </header>

    <div className="grid grid-cols-[340px_1fr] gap-5 max-lg:grid-cols-1">

      {/* ═══ 左栏：信件列表 ═══ */}
      <div className="space-y-2.5 max-h-[70vh] overflow-y-auto pr-1">
        {/* 语气筛选 */}
        <div className="flex gap-1.5 flex-wrap mb-3">
          {(['poetic','friendly','strict','energetic','playful'] as LetterTone[]).map(tone=>(
            <span key={tone} className="picture-book-tag cursor-pointer text-[10px]"
              style={{background:TONE_BADGES[tone].bg,border:`1px solid ${TONE_BADGES[tone].border}`,color:TONE_BADGES[tone].text}}>
              {TONE_EMOJIS[tone]} {TONE_LABELS[tone]}
            </span>
          ))}
        </div>

        {MOCK_LETTERS.map((letter,i)=>(
          <div key={letter.id} className="picture-book-card tape-top p-4 cursor-pointer"
            style={{
              transform:`rotate(${i===0?'-0.3deg':i===1?'0.2deg':'-0.15deg'})`,
              ...(selectedId===letter.id?{borderColor:'rgba(160,130,100,0.5)',boxShadow:'var(--shadow-md)',background:'linear-gradient(135deg,#fefcf7,#fdf7ee)'}:{}),
            }}
            onClick={()=>setSelectedId(letter.id)}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{TONE_EMOJIS[letter.tone]}</span>
                <h3 className="text-[13px] font-semibold tracking-[0.04em] text-[var(--ink)]"
                  style={{fontFamily:"var(--font-serif)"}}>致 {letter.studentName}</h3>
              </div>
              <span className="picture-book-tag text-[9px]"
                style={{background:TONE_BADGES[letter.tone].bg,border:`1px solid ${TONE_BADGES[letter.tone].border}`,color:TONE_BADGES[letter.tone].text}}>
                {TONE_LABELS[letter.tone]}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed line-clamp-2 mb-2 handwriting"
              style={{color:'var(--ink-faint)'}}>{letter.content.slice(0,80)}……</p>
            <div className="flex items-center justify-between">
              <span className="text-[9px] tracking-[0.06em]" style={{color:'var(--faded)'}}>{letter.createdAt}</span>
              {!letter.isRead&&<span className="text-[8px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">未读</span>}
            </div>
          </div>
        ))}
      </div>

      {/* ═══ 右栏：旧书信预览 ═══ */}
      <div className="sticky top-7 self-start">
        {selected ? (
          <div className="relative max-w-[720px]" style={{
            background:'#ece0cc',
            padding:'48px 36px 56px',
            borderRadius:4,
            boxShadow:'0 4px 24px rgba(60,30,8,0.1)',
          }}>
            {/* ── 桌面背景层 ── */}
            <div className="absolute inset-0 rounded-[4px] pointer-events-none"
              style={{
                background:`repeating-linear-gradient(2deg,rgba(180,160,140,0.06) 0px,rgba(180,160,140,0.06) 1px,transparent 1px,transparent 40px),
                  linear-gradient(170deg,#ddd0be 0%,#e0d4c2 25%,#d8ccb8 50%,#e4d8c6 75%,#ddd0be 100%)`,
              }}/>

            {/* ── 信封壳 ── */}
            <div className="absolute -inset-2 -bottom-3 -right-2 -z-[1] rounded-[2px]"
              style={{
                background:'linear-gradient(155deg,#ece0c8,#e8d8bc,#ede0c8)',
                border:'1px solid rgba(160,140,110,0.18)',
                transform:'rotate(-0.8deg)',
                boxShadow:'0 3px 16px rgba(60,35,10,0.07),0 8px 40px rgba(60,35,10,0.04)',
              }}>
              {/* 锯齿撕边 */}
              <div className="absolute -top-px left-[60px] right-[30px] h-[30px]"
                style={{
                  background:`linear-gradient(180deg,#ece0c8 0%,#ece0c8 40%,transparent 40%,transparent 50%,#e8d8bc 50%,#e8d8bc 55%,transparent 55%,transparent 65%,#ece0c8 65%,#ece0c8 70%,transparent 70%,transparent 80%,#e8d8bc 80%,#ece0c8 100%)`,
                  clipPath:'polygon(0% 100%,8% 55%,16% 100%,24% 60%,32% 95%,40% 50%,48% 100%,56% 62%,64% 92%,72% 48%,80% 100%,88% 58%,100% 100%)',
                }}/>
              {/* 邮票虚线框 */}
              <div className="absolute top-6 right-8 w-[52px] h-[60px] rounded-[2px]"
                style={{border:'1px dashed rgba(160,140,100,0.3)'}}/>
            </div>

            {/* ── 主信纸 ── */}
            <div className="relative z-[2]"
              style={{
                background:'#f6f0e0',
                padding:'52px 56px 48px',
                boxShadow:'0 1px 3px rgba(60,30,8,0.05),0 4px 18px rgba(60,30,8,0.06),0 12px 48px rgba(60,30,8,0.05)',
                transform:'rotate(0.3deg)',
              }}>
              {/* 纸纹理 */}
              <div className="absolute inset-0 pointer-events-none z-0"
                style={{backgroundImage:`url("data:image/svg+xml,%3Csvg width='160' height='160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)' opacity='0.022'/%3E%3C/svg%3E")`}}/>
              {/* 四周暗角 */}
              <div className="absolute inset-0 pointer-events-none z-0" style={{
                background:`radial-gradient(ellipse at 0% 0%,rgba(139,105,20,0.06),transparent 30%),
                  radial-gradient(ellipse at 100% 0%,rgba(139,105,20,0.05),transparent 30%),
                  radial-gradient(ellipse at 0% 100%,rgba(139,105,20,0.07),transparent 30%),
                  radial-gradient(ellipse at 100% 100%,rgba(139,105,20,0.05),transparent 30%)`,
              }}/>

              {/* 折痕 */}
              {[38,68].map(p=>(<div key={p} className="absolute left-0 right-0 z-[1] pointer-events-none h-0" style={{top:`${p}%`}}>
                <div className="absolute left-0 right-0 -top-px h-[2px]"
                  style={{background:'linear-gradient(90deg,transparent 5%,rgba(160,130,90,0.08) 20%,rgba(160,130,90,0.06) 50%,rgba(160,130,90,0.08) 80%,transparent 95%)'}}/>
              </div>))}

              {/* ── 信头 ── */}
              <div className="flex justify-between items-start pb-6 mb-5 relative z-[2]"
                style={{borderBottom:'1px solid rgba(139,105,20,0.1)'}}>
                <div className="text-[12px] leading-relaxed" style={{color:'#8b7a60',letterSpacing:'0.06em'}}>
                  凡星支教队<br/>四川·筠连<br/>2026年7月
                </div>
                <div className="text-right text-[11px] leading-relaxed" style={{color:'#8b7a60',letterSpacing:'0.04em'}}>
                  致 {selected.studentName} 同学<br/>
                  {selected.createdAt}
                  {/* 邮票框 */}
                  <div className="inline-block w-[52px] h-[62px] mt-2 relative text-center text-[10px] leading-snug"
                    style={{border:'2px solid rgba(139,105,20,0.18)',background:'rgba(255,255,255,0.2)',color:'#8b7a60'}}>
                    <div className="absolute -inset-1" style={{
                      background:`radial-gradient(circle 3px,transparent 2px,rgba(139,105,20,0.15) 2px,rgba(139,105,20,0.15) 3px,transparent 3px) 0 0/8px 8px round`,
                    }}/>
                    记忆<br/>胶囊
                  </div>
                </div>
              </div>

              {/* ── 标题 ── */}
              <div className="text-center py-6 relative z-[2]">
                <div className="text-[12px] tracking-[0.1em] mb-2" style={{color:'#8b7a60'}}>
                  {TONE_EMOJIS[selected.tone]} {TONE_LABELS[selected.tone]}
                </div>
                <h2 className="handwriting text-[42px] tracking-[0.08em] leading-tight mb-1"
                  style={{color:'#3a2818'}}>
                  {selected.title||`致 ${selected.studentName}`}
                </h2>
                <div className="flex items-center justify-center gap-2.5 text-[9px] tracking-[4px] mt-1.5"
                  style={{color:'rgba(139,105,20,0.25)'}}>
                  <div className="w-10 h-px" style={{background:'linear-gradient(90deg,transparent,rgba(139,105,20,0.15),transparent)'}}/>
                  ✦
                  <div className="w-10 h-px" style={{background:'linear-gradient(90deg,transparent,rgba(139,105,20,0.15),transparent)'}}/>
                </div>
              </div>

              {/* ── 正文 — 旧书信排版 ── */}
              <div className="text-[14px] leading-[2.3] relative z-[2] px-1 whitespace-pre-line"
                style={{color:'#3a2818'}}>
                {selected.content.split('\n\n').map((p,pi) => (
                  <p key={pi} className={`mb-4 ${pi===0?'':''}`}
                    style={{textIndent:pi===0||p.startsWith('—')?'0':'2em'}}>
                    {p}
                  </p>
                ))}
              </div>

              {/* ── 回忆引用块 ── */}
              <div className="block my-7 py-4 px-5 text-[12px] leading-relaxed relative z-[2]"
                style={{
                  borderLeft:'3px solid rgba(139,105,20,0.18)',
                  background:'rgba(139,105,20,0.02)',
                  color:'#5c4a32',
                }}>
                <p className="handwriting text-[14px] text-right mt-2" style={{color:'#8b7a60'}}>
                  — 支教第12天，写于筠连
                </p>
              </div>

              {/* ── 插图卡 ── */}
              <div className="flex gap-3 my-7 justify-center relative z-[3] flex-wrap">
                {['photo','art','star'].map((icon,i)=>(<div key={i} className="w-[110px] pt-1.5 pb-7 px-1.5 bg-white rounded-[2px] relative text-center"
                  style={{
                    boxShadow:'0 2px 6px rgba(0,0,0,0.05),0 3px 14px rgba(0,0,0,0.03)',
                    transform:`rotate(${[-2.5,1.8,-1.2][i]}deg)`,
                  }}>
                  <div className="w-full h-[72px] rounded-[2px] flex items-center justify-center text-[28px]"
                    style={{background:'linear-gradient(135deg,#e8ddd0,#ddd0c0,#e4d8c8)'}}>
                    {icon==='photo'?<span>📸</span>:icon==='art'?<span>🖼️</span>:<span>🌟</span>}
                  </div>
                  <p className="absolute bottom-1.5 left-1.5 right-1.5 handwriting text-[11px]"
                    style={{color:'#5c4a32'}}>
                    {['课堂瞬间','作品展示','成长印记'][i]}
                  </p>
                </div>))}
              </div>

              {/* ── 署名 + 火漆印章 ── */}
              <div className="text-right pt-6 mt-5 relative z-[2]"
                style={{borderTop:'1px solid rgba(139,105,20,0.08)'}}>
                <div className="handwriting text-[28px]" style={{color:'#3a2818'}}>黄老师</div>
                <div className="text-[10px] tracking-[0.06em]" style={{color:'#8b7a60'}}>
                  凡星支教队 · 2026年夏 · 筠连
                </div>
              </div>

              {/* ── 火漆印章 ── */}
              <div className="flex justify-center relative z-[5] -mt-2.5">
                {/* 丝带 */}
                <div className="absolute w-[120px] h-[24px] -z-[1] top-3.5 left-1/2 -translate-x-1/2 opacity-55"
                  style={{background:'linear-gradient(180deg,#a04030,#b85040 20%,#a04030 40%,#903828 60%,#a04030 80%,#b85040)'}}/>
                {/* 火漆 */}
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg relative"
                  style={{
                    background:'linear-gradient(135deg,#8b2810,#a04030,#8b2810)',
                    color:'rgba(255,255,255,0.5)',
                    boxShadow:'0 3px 12px rgba(100,20,8,0.25),inset 0 1px 4px rgba(255,255,255,0.12),inset 0 -2px 6px rgba(0,0,0,0.15)',
                  }}>
                  <div className="absolute top-2 left-3 w-3.5 h-2 rounded-full opacity-15 bg-white -rotate-[20deg]"/>
                  ✉
                  {/* 蜡滴 */}
                  <div className="absolute -top-[18px] left-[11px] w-[14px] h-[10px] rounded-[2px] -rotate-[12deg]"
                    style={{background:'linear-gradient(180deg,rgba(180,150,130,0.4),rgba(160,100,80,0.3))'}}/>
                </div>
              </div>

              {/* ── 干花标本 ── */}
              <div className="absolute top-[62%] right-4 z-[3] pointer-events-none opacity-60 max-lg:hidden">
                <span className="block text-[38px] rotate-[15deg]"
                  style={{filter:'sepia(0.5) saturate(0.7) brightness(0.9)'}}>🌸</span>
              </div>

              {/* ── 红色批注 ── */}
              <div className="absolute -right-[105px] top-[28%] z-[4] pointer-events-none handwriting text-[14px] leading-loose max-lg:hidden"
                style={{color:'#8b2500',transform:'rotate(3deg)'}}>
                <span className="block text-lg">←</span>
                这里写到了<br/>最动情的<br/>一段回忆
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-3 mt-6">
              <button className="picture-book-btn primary flex-1" style={{justifyContent:'center',fontSize:12}}>
                📥 导出 PDF
              </button>
              <button className="picture-book-btn flex-1" style={{justifyContent:'center',fontSize:12}}>
                🖨️ 打印
              </button>
              <button className="picture-book-btn" style={{fontSize:12}}>
                📋 复制
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="text-5xl mb-4">✉️</div>
              <p className="handwriting text-[15px]" style={{color:'var(--faded)'}}>选择左侧信件预览</p>
            </div>
          </div>
        )}
      </div>
    </div>
  </InnerLayout>)
}
