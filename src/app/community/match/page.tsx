'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { TEAM_PROFILES } from '@/lib/community-resources'
import { useState, useMemo } from 'react'
import { MapPin, Users, Calendar, Heart, ArrowRight, Sparkles, BookOpen, Search, Edit3 } from 'lucide-react'

const SKILL_CHIPS = ['编程教学','摄影摄像','文案写作','美术教学','民族文化研究','视频剪辑','科技制作','书法教学','体育特长','心理咨询','数学教学','体育活动组织','阅读推广','科学实验','心理辅导','藏语基础','英语教学','高原适应']
const SUBJECT_CHIPS = ['科学','语文','数学','美术','音乐','体育','计算机','英语','心理','地理','历史']
const REGION_CHIPS = ['不限','四川','云南','甘肃','青海','宁夏','陕西','贵州']

export default function MatchPage() {
  const [mySkills, setMySkills] = useState<string[]>([])
  const [mySubjects, setMySubjects] = useState<string[]>([])
  const [myRegion, setMyRegion] = useState('不限')
  const [skillInput, setSkillInput] = useState('')
  const [subjectInput, setSubjectInput] = useState('')

  const addSkill = (s: string) => {
    const trimmed = s.trim()
    if (trimmed && !mySkills.includes(trimmed)) setMySkills(prev => [...prev, trimmed])
    setSkillInput('')
  }
  const addSubject = (s: string) => {
    const trimmed = s.trim()
    if (trimmed && !mySubjects.includes(trimmed)) setMySubjects(prev => [...prev, trimmed])
    setSubjectInput('')
  }

  const matches = useMemo(() => {
    const hasFilter = mySkills.length > 0 || mySubjects.length > 0 || myRegion !== '不限'
    if (!hasFilter) {
      // Default: show all teams, sorted by recruitment urgency
      return TEAM_PROFILES.map(t => ({
        ...t, matchScore: t.recruitmentStatus === 'urgent' ? 85 : t.recruitmentStatus === 'open' ? 70 : 50,
        matchReasons: t.recruitmentStatus === 'urgent' ? ['🔥 急需招募'] : ['招募中'],
      })).sort((a, b) => b.matchScore - a.matchScore)
    }
    return TEAM_PROFILES.map(team => {
      let score = 0; const reasons: string[] = []
      const skillOverlap = mySkills.filter(s => team.skillsNeeded.some(n => n.includes(s) || s.includes(n)))
      if (skillOverlap.length > 0) { score += skillOverlap.length * 30; reasons.push(`${skillOverlap.length}项技能匹配`) }
      const subjectOverlap = mySubjects.filter(s => team.subjects.some(n => n.includes(s) || s.includes(n)))
      if (subjectOverlap.length > 0) { score += subjectOverlap.length * 20; reasons.push(`${subjectOverlap.length}门科目匹配`) }
      if (myRegion !== '不限' && team.location.includes(myRegion)) { score += 25; reasons.push('地区匹配') }
      if (team.recruitmentStatus === 'urgent') score += 15
      return { ...team, matchScore: Math.min(score, 100), matchReasons: reasons.length > 0 ? reasons : ['浏览推荐'] }
    }).sort((a, b) => b.matchScore - a.matchScore)
  }, [mySkills, mySubjects, myRegion])

  const renderTeamCard = (team: typeof matches[0], i: number) => {
    const urgencyColor = team.recruitmentStatus === 'urgent' ? '#d4855e' : team.recruitmentStatus === 'open' ? '#7a9a5a' : 'var(--faded)'
    const urgencyLabel = team.recruitmentStatus === 'urgent' ? '🔥急招' : team.recruitmentStatus === 'open' ? '招募中' : '已满'
    return (
      <div key={team.id} className="picture-book-card p-5 hover:shadow-md transition-all duration-300"
        style={{ transform: `rotate(${i % 2 === 0 ? '-0.06deg' : '0.04deg'})`, borderLeft: `4px solid ${i === 0 ? '#e08050' : i === 1 ? '#d4a040' : 'rgba(200,180,160,0.3)'}` }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{team.logo}</span>
            <div>
              <h3 className="text-[15px] font-semibold text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>{team.name}</h3>
              <p className="text-[9px]" style={{ color: 'var(--faded)' }}>{team.duration} · {team.teamSize}人队伍</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-[28px] font-bold" style={{ color: i === 0 ? '#e08050' : 'var(--primary-skin)', fontFamily: 'var(--font-serif)' }}>{team.matchScore}%</div>
            <div className="text-[8px] tracking-[0.08em]" style={{ color: 'var(--faded)' }}>匹配度</div>
          </div>
        </div>
        {team.matchReasons && team.matchReasons.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">{team.matchReasons.map((r, j) => <span key={j} className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(200,160,120,0.08)', color: 'var(--ink-soft)', border: '1px solid rgba(200,160,120,0.15)' }}>✨ {r}</span>)}</div>
        )}
        <p className="text-[11px] leading-relaxed mb-3" style={{ color: 'var(--ink-soft)' }}>{team.description}</p>
        <div className="flex items-center gap-3 flex-wrap text-[10px] mb-3" style={{ color: 'var(--faded)' }}>
          <span className="flex items-center gap-1"><MapPin size={10} /> {team.location}</span>
          <span className="flex items-center gap-1"><Users size={10} /> {team.teamSize}人</span>
          <span className="flex items-center gap-1"><Calendar size={10} /> {team.duration}</span>
          <span className="px-2 py-0.5 rounded-full" style={{ background: `${urgencyColor}12`, color: urgencyColor, border: `1px solid ${urgencyColor}25`, fontWeight: 600 }}>{urgencyLabel}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {team.skillsNeeded.map(s => {
            const matched = mySkills.includes(s)
            return <span key={s} className="text-[8px] px-2 py-0.5 rounded-full" style={{ background: matched ? 'rgba(122,180,90,0.12)' : 'rgba(200,180,160,0.06)', color: matched ? '#5a8a3a' : 'var(--faded)', border: `1px solid ${matched ? 'rgba(122,180,90,0.25)' : 'rgba(200,180,160,0.12)'}` }}>{matched ? '✅ ' : ''}{s}</span>
          })}
        </div>
        <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(200,180,160,0.1)' }}>
          <div className="flex items-center gap-2 text-[10px]" style={{ color: 'var(--faded)' }}><BookOpen size={10} /> {team.subjects.slice(0, 3).join('、')}{team.subjects.length > 3 ? '…' : ''}</div>
          <button className="picture-book-btn primary flex items-center gap-1" style={{ fontSize: 10, padding: '4px 12px' }}>联系队伍 <ArrowRight size={10} /></button>
        </div>
      </div>
    )
  }

  const hasFilter = mySkills.length > 0 || mySubjects.length > 0 || myRegion !== '不限'

  return (
    <InnerLayout>
      <header className="relative mb-6 rounded-2xl overflow-hidden" style={{
        background: 'linear-gradient(135deg,rgba(212,133,94,0.1),rgba(200,120,80,0.06))',
        border: '1.5px solid rgba(212,133,94,0.18)', padding: '24px 30px',
      }}>
        <h1 className="text-[24px] font-bold tracking-[0.03em] text-[var(--ink)] mb-1" style={{ fontFamily: 'var(--font-serif)' }}>🔗 寻找你的队伍</h1>
        <p className="text-[13px]" style={{ color: 'var(--faded)' }}>{matches.length} 支队伍等待你的加入 · 选择偏好获得智能匹配</p>
      </header>

      <div className="grid grid-cols-[1fr_390px] gap-6 max-lg:grid-cols-1">
        {/* 左：匹配表单 */}
        <div>
          <div className="picture-book-card p-5 mb-5" style={{ transform: 'rotate(-0.06deg)' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[14px] font-semibold text-[var(--ink)] flex items-center gap-1.5" style={{ fontFamily: 'var(--font-serif)' }}>
                <Heart size={14} style={{ color: '#d4855e' }} /> 关于你
              </h3>
              {hasFilter && (
                <button onClick={() => { setMySkills([]); setMySubjects([]); setMyRegion('不限'); setSkillInput(''); setSubjectInput('') }}
                  className="text-[10px] bg-transparent border-none cursor-pointer handwriting" style={{ color: 'var(--faded)' }}>清除全部</button>
              )}
            </div>
            <p className="text-[10px] mb-4" style={{ color: 'var(--faded)' }}>点击标签或自由输入，匹配越精准。没想好的可以不选，右栏默认展示全部队伍。</p>

            {/* 技能 — 选择 + 输入 */}
            <div className="mb-4">
              <p className="text-[11px] font-semibold mb-2 text-[var(--ink-soft)]">🔧 你有什么技能？</p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {SKILL_CHIPS.map(s => {
                  const active = mySkills.includes(s)
                  return (
                    <button key={s} onClick={() => setMySkills(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                      className="px-3 py-1.5 rounded-full text-[10px] border-none cursor-pointer transition-all"
                      style={{
                        background: active ? 'linear-gradient(135deg,rgba(212,133,94,0.2),rgba(200,120,80,0.12))' : 'rgba(245,240,230,0.3)',
                        border: `1.5px solid ${active ? 'rgba(212,133,94,0.4)' : 'rgba(200,180,160,0.15)'}`,
                        color: active ? 'var(--ink)' : 'var(--faded)', fontWeight: active ? 600 : 400, fontFamily: 'inherit',
                      }}>{s}</button>
                  )
                })}
              </div>
              <div className="flex gap-2">
                <input value={skillInput} onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') addSkill(skillInput) }}
                  placeholder="输入自定义技能，按Enter添加…"
                  className="flex-1 px-3 py-1.5 rounded-lg text-[10px] outline-none"
                  style={{ border: '1.5px solid rgba(200,180,160,0.2)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
                <button onClick={() => addSkill(skillInput)} className="picture-book-btn" style={{ fontSize: 10, padding: '3px 10px' }} disabled={!skillInput.trim()}>
                  <Edit3 size={11} /> 添加
                </button>
              </div>
              {/* 自定义技能标签 */}
              {mySkills.filter(s => !SKILL_CHIPS.includes(s)).length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {mySkills.filter(s => !SKILL_CHIPS.includes(s)).map(s => (
                    <span key={s} className="text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 cursor-pointer"
                      style={{ background: 'rgba(212,133,94,0.12)', color: '#a06030', border: '1px solid rgba(212,133,94,0.3)' }}
                      onClick={() => setMySkills(prev => prev.filter(x => x !== s))}>{s} ✕</span>
                  ))}
                </div>
              )}
            </div>

            {/* 科目偏好 — 选择 + 输入 */}
            <div className="mb-4">
              <p className="text-[11px] font-semibold mb-2 text-[var(--ink-soft)]">📖 你擅长/想教什么科目？</p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {SUBJECT_CHIPS.map(s => {
                  const active = mySubjects.includes(s)
                  return (
                    <button key={s} onClick={() => setMySubjects(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])}
                      className="px-3 py-1.5 rounded-full text-[10px] border-none cursor-pointer transition-all"
                      style={{
                        background: active ? 'linear-gradient(135deg,rgba(106,170,80,0.2),rgba(90,150,65,0.12))' : 'rgba(245,240,230,0.3)',
                        border: `1.5px solid ${active ? 'rgba(106,170,80,0.4)' : 'rgba(200,180,160,0.15)'}`,
                        color: active ? 'var(--ink)' : 'var(--faded)', fontWeight: active ? 600 : 400, fontFamily: 'inherit',
                      }}>{s}</button>
                  )
                })}
              </div>
              <div className="flex gap-2">
                <input value={subjectInput} onChange={e => setSubjectInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') addSubject(subjectInput) }}
                  placeholder="输入自定义科目，按Enter添加…"
                  className="flex-1 px-3 py-1.5 rounded-lg text-[10px] outline-none"
                  style={{ border: '1.5px solid rgba(200,180,160,0.2)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
                <button onClick={() => addSubject(subjectInput)} className="picture-book-btn" style={{ fontSize: 10, padding: '3px 10px' }} disabled={!subjectInput.trim()}>
                  <Edit3 size={11} /> 添加
                </button>
              </div>
              {mySubjects.filter(s => !SUBJECT_CHIPS.includes(s)).length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {mySubjects.filter(s => !SUBJECT_CHIPS.includes(s)).map(s => (
                    <span key={s} className="text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1 cursor-pointer"
                      style={{ background: 'rgba(106,170,80,0.12)', color: '#4a7a3a', border: '1px solid rgba(106,170,80,0.3)' }}
                      onClick={() => setMySubjects(prev => prev.filter(x => x !== s))}>{s} ✕</span>
                  ))}
                </div>
              )}
            </div>

            {/* 地区 */}
            <div>
              <p className="text-[11px] font-semibold mb-2 text-[var(--ink-soft)]">🗺 你想去哪里？</p>
              <div className="flex flex-wrap gap-1.5">
                {REGION_CHIPS.map(r => (
                  <button key={r} onClick={() => setMyRegion(r)}
                    className="px-3 py-1.5 rounded-full text-[10px] border-none cursor-pointer transition-all"
                    style={{
                      background: myRegion === r ? 'linear-gradient(135deg,rgba(90,154,192,0.2),rgba(70,135,175,0.12))' : 'rgba(245,240,230,0.3)',
                      border: `1.5px solid ${myRegion === r ? 'rgba(90,154,192,0.4)' : 'rgba(200,180,160,0.15)'}`,
                      color: myRegion === r ? 'var(--ink)' : 'var(--faded)', fontWeight: myRegion === r ? 600 : 400, fontFamily: 'inherit',
                    }}>{r}</button>
                ))}
              </div>
            </div>
          </div>

          {/* 匹配结果摘要 */}
          <div className="picture-book-card p-4 flex items-center gap-3" style={{ transform: 'rotate(0.03deg)' }}>
            <Sparkles size={20} style={{ color: 'var(--primary-skin)' }} />
            <div>
              <p className="text-[12px] font-semibold text-[var(--ink)]">
                {hasFilter ? `匹配到 ${matches.length} 支队伍` : `全部 ${matches.length} 支队伍`}
              </p>
              <p className="text-[9px]" style={{ color: 'var(--faded)' }}>
                {hasFilter ? '按匹配度降序排列' : '选择偏好后开启智能匹配'}
              </p>
            </div>
          </div>
        </div>

        {/* 右：匹配结果 — 始终有内容 */}
        <div className="space-y-3">
          {matches.map((team, i) => renderTeamCard(team, i))}
        </div>
      </div>

      <div className="mt-6 picture-book-card p-4 text-center" style={{ background: 'linear-gradient(135deg,rgba(240,230,215,0.3),rgba(235,225,210,0.15))' }}>
        <p className="text-[11px] tracking-[0.04em]" style={{ color: 'var(--ink-faint)' }}>
          🤝 匹配算法基于技能重合度、科目关联性和地区偏好自动计算 · 数据来自各支教队官方档案
        </p>
      </div>
    </InnerLayout>
  )
}
