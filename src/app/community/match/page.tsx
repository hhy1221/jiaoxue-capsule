'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { TEAM_PROFILES } from '@/lib/community-resources'
import { useState, useMemo } from 'react'
import { Search, MapPin, Users, Calendar, Heart, Star, Zap, ArrowRight, Sparkles, CheckCircle, Clock, BookOpen } from 'lucide-react'

const SKILLS = ['编程教学','摄影摄像','文案写作','美术教学','民族文化研究','视频剪辑','科技制作','书法教学','体育特长','心理咨询','数学教学','体育活动组织','阅读推广','科学实验','心理辅导','藏语基础','英语教学','高原适应']
const SUBJECTS = ['科学','语文','数学','美术','音乐','体育','计算机','英语','心理','地理','历史']
const REGIONS = ['不限','四川','云南','甘肃','青海','宁夏','陕西','贵州']

export default function MatchPage() {
  const [mySkills, setMySkills] = useState<string[]>([])
  const [mySubjects, setMySubjects] = useState<string[]>([])
  const [myRegion, setMyRegion] = useState('不限')
  const [started, setStarted] = useState(false)

  const toggleSkill = (s: string) => {
    setMySkills(prev => prev.includes(s) ? prev.filter(x=>x!==s) : [...prev, s])
    if (!started) setStarted(true)
  }
  const toggleSubject = (s: string) => {
    setMySubjects(prev => prev.includes(s) ? prev.filter(x=>x!==s) : [...prev, s])
    if (!started) setStarted(true)
  }

  // Simple matching algorithm: score based on skill overlap + subject overlap + region
  const matches = useMemo(() => {
    if (!started || (mySkills.length===0 && mySubjects.length===0)) return []
    return TEAM_PROFILES.map(team => {
      let score = 0
      const reasons: string[] = []
      const skillOverlap = mySkills.filter(s => team.skillsNeeded.includes(s))
      if (skillOverlap.length > 0) {
        score += skillOverlap.length * 30
        reasons.push(`${skillOverlap.length}项技能匹配：${skillOverlap.slice(0,2).join('、')}`)
      }
      const subjectOverlap = mySubjects.filter(s => team.subjects.includes(s))
      if (subjectOverlap.length > 0) {
        score += subjectOverlap.length * 20
        reasons.push(`${subjectOverlap.length}门科目匹配`)
      }
      if (myRegion !== '不限' && team.location.includes(myRegion)) {
        score += 25
        reasons.push('地区匹配')
      }
      // Urgent teams get bonus
      if (team.recruitmentStatus === 'urgent') score += 15
      return { ...team, matchScore: Math.min(score, 100), matchReasons: reasons }
    }).filter(t => t.matchScore > 0).sort((a,b) => b.matchScore - a.matchScore)
  }, [mySkills, mySubjects, myRegion, started])

  return (
    <InnerLayout>
      <header className="relative mb-6 rounded-2xl overflow-hidden" style={{
        background:'linear-gradient(135deg,rgba(212,133,94,0.1),rgba(200,120,80,0.06))',
        border:'1.5px solid rgba(212,133,94,0.18)',padding:'24px 30px',
      }}>
        <h1 className="text-[24px] font-bold tracking-[0.03em] text-[var(--ink)] mb-1" style={{fontFamily:'var(--font-serif)'}}>🔗 寻找你的队伍</h1>
        <p className="text-[13px]" style={{color:'var(--faded)'}}>选择你的技能和偏好 → 智能匹配最适合你的支教队</p>
      </header>

      <div className="grid grid-cols-[1fr_380px] gap-6 max-lg:grid-cols-1">
        {/* 左：匹配表单 */}
        <div>
          <div className="picture-book-card p-5 mb-5" style={{transform:'rotate(-0.06deg)'}}>
            <h3 className="text-[14px] font-semibold mb-1 text-[var(--ink)] flex items-center gap-1.5" style={{fontFamily:'var(--font-serif)'}}>
              <Heart size={14} style={{color:'#d4855e'}}/> 关于你
            </h3>
            <p className="text-[10px] mb-4" style={{color:'var(--faded)'}}>选择越多，匹配越精准。没想好的可以不选。</p>

            {/* 技能 */}
            <div className="mb-4">
              <p className="text-[11px] font-semibold mb-2 text-[var(--ink-soft)]">🔧 你有什么技能？</p>
              <div className="flex flex-wrap gap-1.5">
                {SKILLS.map(s=>{
                  const active = mySkills.includes(s)
                  return (
                    <button key={s} onClick={()=>toggleSkill(s)}
                      className="px-3 py-1.5 rounded-full text-[10px] border-none cursor-pointer transition-all"
                      style={{
                        background:active?'linear-gradient(135deg,rgba(212,133,94,0.2),rgba(200,120,80,0.12))':'rgba(245,240,230,0.3)',
                        border:`1.5px solid ${active?'rgba(212,133,94,0.4)':'rgba(200,180,160,0.15)'}`,
                        color:active?'var(--ink)':'var(--faded)',fontWeight:active?600:400,fontFamily:'inherit',
                      }}>{s}</button>
                  )
                })}
              </div>
            </div>

            {/* 科目偏好 */}
            <div className="mb-4">
              <p className="text-[11px] font-semibold mb-2 text-[var(--ink-soft)]">📖 你擅长/想教什么科目？</p>
              <div className="flex flex-wrap gap-1.5">
                {SUBJECTS.map(s=>{
                  const active = mySubjects.includes(s)
                  return (
                    <button key={s} onClick={()=>toggleSubject(s)}
                      className="px-3 py-1.5 rounded-full text-[10px] border-none cursor-pointer transition-all"
                      style={{
                        background:active?'linear-gradient(135deg,rgba(106,170,80,0.2),rgba(90,150,65,0.12))':'rgba(245,240,230,0.3)',
                        border:`1.5px solid ${active?'rgba(106,170,80,0.4)':'rgba(200,180,160,0.15)'}`,
                        color:active?'var(--ink)':'var(--faded)',fontWeight:active?600:400,fontFamily:'inherit',
                      }}>{s}</button>
                  )
                })}
              </div>
            </div>

            {/* 地区 */}
            <div>
              <p className="text-[11px] font-semibold mb-2 text-[var(--ink-soft)]">🗺 你想去哪里？</p>
              <div className="flex flex-wrap gap-1.5">
                {REGIONS.map(r=>(
                  <button key={r} onClick={()=>setMyRegion(r)}
                    className="px-3 py-1.5 rounded-full text-[10px] border-none cursor-pointer transition-all"
                    style={{
                      background:myRegion===r?'linear-gradient(135deg,rgba(90,154,192,0.2),rgba(70,135,175,0.12))':'rgba(245,240,230,0.3)',
                      border:`1.5px solid ${myRegion===r?'rgba(90,154,192,0.4)':'rgba(200,180,160,0.15)'}`,
                      color:myRegion===r?'var(--ink)':'var(--faded)',fontWeight:myRegion===r?600:400,fontFamily:'inherit',
                    }}>{r}</button>
                ))}
              </div>
            </div>
          </div>

          {/* 无选择提示 */}
          {!started && (
            <div className="text-center py-8 picture-book-card" style={{transform:'rotate(0.04deg)'}}>
              <Sparkles size={32} className="mx-auto mb-3" style={{color:'var(--faded)',opacity:0.3}}/>
              <p className="handwriting text-[14px]" style={{color:'var(--faded)'}}>👆 选择你的技能和偏好，智能匹配开始…</p>
            </div>
          )}
        </div>

        {/* 右：匹配结果 */}
        <div className="space-y-3">
          {started && matches.length === 0 && (
            <div className="picture-book-card p-6 text-center" style={{transform:'rotate(-0.03deg)'}}>
              <p className="text-4xl mb-3 opacity-25">🔍</p>
              <p className="text-[13px] font-medium" style={{color:'var(--ink-soft)'}}>还没有匹配结果</p>
              <p className="text-[10px] mt-1" style={{color:'var(--faded)'}}>试试选择更多技能或科目</p>
            </div>
          )}
          {matches.map((team, i) => {
            const urgencyColor = team.recruitmentStatus === 'urgent' ? '#d4855e' : team.recruitmentStatus === 'open' ? '#7a9a5a' : 'var(--faded)'
            const urgencyLabel = team.recruitmentStatus === 'urgent' ? '🔥急招' : team.recruitmentStatus === 'open' ? '招募中' : '已满'
            return (
              <div key={team.id} className="picture-book-card p-5 hover:shadow-md transition-all duration-300"
                style={{transform:`rotate(${i%2===0?'-0.06deg':'0.04deg'})`,borderLeft:`4px solid ${i===0?'#e08050':i===1?'#d4a040':'rgba(200,180,160,0.3)'}`}}>
                {/* 匹配度 */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{team.logo}</span>
                    <div>
                      <h3 className="text-[15px] font-semibold text-[var(--ink)]" style={{fontFamily:'var(--font-serif)'}}>{team.name}</h3>
                      <p className="text-[9px]" style={{color:'var(--faded)'}}>{team.duration} · {team.teamSize}人队伍</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-[28px] font-bold" style={{color:i===0?'#e08050':'var(--primary-skin)',fontFamily:'var(--font-serif)'}}>
                      {team.matchScore}%
                    </div>
                    <div className="text-[8px] tracking-[0.08em]" style={{color:'var(--faded)'}}>匹配度</div>
                  </div>
                </div>

                {/* 匹配理由 */}
                {team.matchReasons && team.matchReasons.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {team.matchReasons.map((r,j)=><span key={j} className="text-[9px] px-2 py-0.5 rounded-full"
                      style={{background:'rgba(200,160,120,0.08)',color:'var(--ink-soft)',border:'1px solid rgba(200,160,120,0.15)'}}>✨ {r}</span>)}
                  </div>
                )}

                <p className="text-[11px] leading-relaxed mb-3" style={{color:'var(--ink-soft)'}}>{team.description}</p>

                {/* 信息标签 */}
                <div className="flex items-center gap-3 flex-wrap text-[10px] mb-3" style={{color:'var(--faded)'}}>
                  <span className="flex items-center gap-1"><MapPin size={10}/> {team.location}</span>
                  <span className="flex items-center gap-1"><Users size={10}/> {team.teamSize}人</span>
                  <span className="flex items-center gap-1"><Calendar size={10}/> {team.duration}</span>
                  <span className="px-2 py-0.5 rounded-full" style={{background:`${urgencyColor}12`,color:urgencyColor,border:`1px solid ${urgencyColor}25`,fontWeight:600}}>{urgencyLabel}</span>
                </div>

                {/* 所需技能 */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {team.skillsNeeded.map(s=>(
                    <span key={s} className="text-[8px] px-2 py-0.5 rounded-full"
                      style={{
                        background: mySkills.includes(s) ? 'rgba(122,180,90,0.12)' : 'rgba(200,180,160,0.06)',
                        color: mySkills.includes(s) ? '#5a8a3a' : 'var(--faded)',
                        border: `1px solid ${mySkills.includes(s) ? 'rgba(122,180,90,0.25)' : 'rgba(200,180,160,0.12)'}`,
                      }}>{mySkills.includes(s) ? '✅ ' : ''}{s}</span>
                  ))}
                </div>

                {/* 联系 */}
                <div className="flex items-center justify-between pt-3" style={{borderTop:'1px solid rgba(200,180,160,0.1)'}}>
                  <div className="flex items-center gap-2 text-[10px]" style={{color:'var(--faded)'}}>
                    <BookOpen size={10}/> {team.subjects.slice(0,3).join('、')}{team.subjects.length>3?'…':''}
                  </div>
                  <button className="picture-book-btn primary flex items-center gap-1" style={{fontSize:10,padding:'4px 12px'}}>
                    联系队伍 <ArrowRight size={10}/>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-6 picture-book-card p-4 text-center" style={{background:'linear-gradient(135deg,rgba(240,230,215,0.3),rgba(235,225,210,0.15))'}}>
        <p className="text-[11px] tracking-[0.04em]" style={{color:'var(--ink-faint)'}}>
          🤝 匹配算法基于技能重合度、科目关联性和地区偏好自动计算 · 数据来自各支教队官方档案
        </p>
      </div>
    </InnerLayout>
  )
}
