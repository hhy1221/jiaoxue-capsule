'use client'
import InnerLayout from '@/components/layout/InnerLayout'
import { useState } from 'react'
import {
  MapPin, Edit3, Heart, BookOpen, Star, FileText, Send, Calendar, Clock,
  CheckCircle, Users, Megaphone, Award, Plus, X, Sparkles, Globe,
} from 'lucide-react'
import { CommunityIdentity, IDENTITY_LABELS } from '@/types'

// ── 当前用户模拟数据（黄寒阳）──
const MOCK_PROFILE = {
  id: 'u1', name: '黄寒阳', avatar: '🌱',
  identity: 'team_leader' as CommunityIdentity, verified: true,
  location: '四川宜宾筠连县', organization: '电子科技大学 · 凡星支教队', badge: '凡星支教队·队长',
  bio: '电子科技大学计算机学院大一学生。2026年暑假带队前往筠连县支教，希望用技术为乡村教育做点实事。擅长科学实验课、AI启蒙课，也喜欢用相机记录孩子们的笑容。',
  tags: ['AI启蒙', '科学实验', '摄影记录', '五育并举', 'Lesson Plan'],
  skills: ['编程教学', '摄影摄像', '科学实验', '文案写作'],
  interests: ['短期支教', 'AI教育', '少数民族文化', '课程设计'],
  localNeeds: [
    { title: '招募2027年暑期支教队员', description: '凡星支教队2027年计划前往筠连县+新增一个支教点。需要15-20名队员，特别欢迎有美术、音乐、体育特长的同学。面试时间：2027年5月。', contactInfo: '公众号: 凡星支教 / 微信: fanxing_team', deadline: '2027-05-15' },
    { title: '募集二手笔记本电脑（5台）', description: '用于乡村小学计算机启蒙课。不需要高配，能开机、能装Python即可。新旧均可，学生自用。', contactInfo: '微信: hhy_study', deadline: '2027-06-01' },
  ],
  stats: { questionsAnswered: 8, resourcesShared: 15, storiesWritten: 8, recruitsPosted: 2, joinedAt: '2026-01-15' },
}

const IDENTITY_OPTIONS: { v: CommunityIdentity; e: string; l: string; desc: string }[] = [
  { v: 'teacher', e: '👩‍🏫', l: '一线教师', desc: '正在或曾在乡村学校任教' },
  { v: 'volunteer', e: '🙋', l: '志愿者', desc: '参与过或希望参与支教的大学生/社会人士' },
  { v: 'team_leader', e: '🌟', l: '支教队长', desc: '支教队的组织者和负责人' },
  { v: 'local_official', e: '🏛', l: '地方团委/村支书', desc: '支教接收地的基层工作者' },
  { v: 'school', e: '🏫', l: '学校代表', desc: '乡村学校校长或教师代表' },
  { v: 'expert', e: '🎓', l: '教育专家', desc: '教育领域研究者或资深从业者' },
  { v: 'organization', e: '🏢', l: '公益组织', desc: '教育公益组织或基金会' },
]

export default function ProfilePage() {
  const [profile, setProfile] = useState(MOCK_PROFILE)
  const [editBio, setEditBio] = useState(false)
  const [bioDraft, setBioDraft] = useState(profile.bio)
  const [tagInput, setTagInput] = useState('')
  const [needTitle, setNeedTitle] = useState('')
  const [needDesc, setNeedDesc] = useState('')
  const [needContact, setNeedContact] = useState('')
  const [needDeadline, setNeedDeadline] = useState('')
  const [showNeedForm, setShowNeedForm] = useState(false)
  const [editIdentity, setEditIdentity] = useState(false)

  const isOfficial = ['local_official', 'school', 'team_leader', 'organization'].includes(profile.identity)

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !profile.tags.includes(t)) setProfile(p => ({ ...p, tags: [...p.tags, t] }))
    setTagInput('')
  }
  const removeTag = (t: string) => setProfile(p => ({ ...p, tags: p.tags.filter(x => x !== t) }))
  const saveBio = () => { setProfile(p => ({ ...p, bio: bioDraft })); setEditBio(false) }
  const addNeed = () => {
    if (!needTitle.trim() || !needDesc.trim()) return
    setProfile(p => ({ ...p, localNeeds: [...(p.localNeeds || []), { title: needTitle.trim(), description: needDesc.trim(), contactInfo: needContact.trim() || '请私信联系', deadline: needDeadline.trim() || undefined }] }))
    setNeedTitle(''); setNeedDesc(''); setNeedContact(''); setNeedDeadline(''); setShowNeedForm(false)
  }
  const removeNeed = (i: number) => setProfile(p => ({ ...p, localNeeds: (p.localNeeds || []).filter((_, idx) => idx !== i) }))

  const statCards = [
    { icon: BookOpen, label: '回答问题', value: profile.stats.questionsAnswered, color: '#c8862e' },
    { icon: FileText, label: '分享资源', value: profile.stats.resourcesShared, color: '#7a9a5a' },
    { icon: Heart, label: '支教故事', value: profile.stats.storiesWritten, color: '#d4855e' },
    { icon: Megaphone, label: '发布招募', value: profile.stats.recruitsPosted, color: '#6baed6' },
  ]

  return (
    <InnerLayout>
      <header className="relative mb-6 rounded-2xl overflow-hidden" style={{
        background: 'linear-gradient(135deg,rgba(160,130,100,0.1),rgba(140,110,80,0.06))',
        border: '1.5px solid rgba(200,160,120,0.18)', padding: '24px 30px',
      }}>
        <h1 className="text-[24px] font-bold tracking-[0.03em] text-[var(--ink)] mb-1" style={{ fontFamily: 'var(--font-serif)' }}>🏠 我的主页</h1>
        <p className="text-[13px]" style={{ color: 'var(--faded)' }}>管理个人信息、标签和需求 · 让别人更容易找到你</p>
      </header>

      <div className="grid grid-cols-[300px_1fr] gap-6 max-lg:grid-cols-1">
        {/* ═══ 左栏：头像 + 身份 + 统计 ═══ */}
        <div className="space-y-4">
          {/* 头像卡片 */}
          <div className="picture-book-card p-6 text-center" style={{ transform: 'rotate(-0.06deg)' }}>
            <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-3"
              style={{ background: 'linear-gradient(135deg,#e8ddd0,#d4c4a8)', border: '3px solid #fff', outline: '1.5px solid rgba(180,150,120,0.3)', boxShadow: '0 3px 12px rgba(80,40,20,0.1)' }}>
              {profile.avatar}
            </div>
            <h2 className="text-[18px] font-bold text-[var(--ink)]" style={{ fontFamily: 'var(--font-serif)' }}>{profile.name}</h2>
            {profile.badge && <p className="text-[11px] font-medium mt-0.5" style={{ color: 'var(--primary-skin)' }}>{profile.badge}</p>}
            {profile.verified && (
              <span className="text-[9px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-1.5"
                style={{ background: 'rgba(74,180,74,0.1)', color: '#4a8a4a', border: '1px solid rgba(74,180,74,0.2)' }}>
                <CheckCircle size={9} /> 已认证
              </span>
            )}
            <div className="flex items-center justify-center gap-1 mt-2 text-[10px]" style={{ color: 'var(--faded)' }}>
              <MapPin size={10} /> {profile.location}
            </div>
            {profile.organization && (
              <p className="text-[10px] mt-1" style={{ color: 'var(--faded)' }}>{profile.organization}</p>
            )}
          </div>

          {/* 身份选择 */}
          <div className="picture-book-card p-4" style={{ transform: 'rotate(0.04deg)' }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[12px] font-semibold text-[var(--ink)] flex items-center gap-1.5" style={{ fontFamily: 'var(--font-serif)' }}>
                <Users size={12} style={{ color: 'var(--faded)' }} /> 身份
              </h3>
              <button onClick={() => setEditIdentity(!editIdentity)} className="text-[9px] bg-transparent border-none cursor-pointer" style={{ color: 'var(--faded)' }}>
                {editIdentity ? '收起' : '切换'}
              </button>
            </div>
            {editIdentity ? (
              <div className="space-y-1">
                {IDENTITY_OPTIONS.map(o => (
                  <div key={o.v} onClick={() => { setProfile(p => ({ ...p, identity: o.v })); setEditIdentity(false) }}
                    className="flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all hover:bg-[rgba(200,160,120,0.06)] text-[10px]"
                    style={{ background: profile.identity === o.v ? 'rgba(200,160,120,0.1)' : 'transparent', border: `1px solid ${profile.identity === o.v ? 'rgba(200,160,120,0.3)' : 'transparent'}` }}>
                    <span>{o.e}</span>
                    <div><p className="font-semibold text-[var(--ink)]">{o.l}</p><p style={{ color: 'var(--faded)', fontSize: 9 }}>{o.desc}</p></div>
                    {profile.identity === o.v && <CheckCircle size={12} className="ml-auto" style={{ color: 'var(--primary-skin)' }} />}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-[11px]">
                <span>{IDENTITY_OPTIONS.find(o => o.v === profile.identity)?.e}</span>
                <span className="font-semibold text-[var(--ink)]">{IDENTITY_LABELS[profile.identity]}</span>
              </div>
            )}
          </div>

          {/* 统计 */}
          <div className="picture-book-card p-4" style={{ transform: 'rotate(-0.03deg)' }}>
            <h3 className="text-[12px] font-semibold mb-3 text-[var(--ink)] flex items-center gap-1.5" style={{ fontFamily: 'var(--font-serif)' }}>
              <Star size={12} style={{ color: '#d4a853' }} /> 社区贡献
            </h3>
            <div className="space-y-1.5">
              {statCards.map(s => (
                <div key={s.label} className="flex items-center justify-between text-[10px]">
                  <span className="flex items-center gap-1.5" style={{ color: 'var(--faded)' }}>
                    <s.icon size={11} style={{ color: s.color }} /> {s.label}
                  </span>
                  <span className="font-bold text-[var(--ink)]">{s.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 text-[9px] flex items-center gap-1" style={{ borderTop: '1px solid rgba(200,180,160,0.1)', color: 'var(--faded)' }}>
              <Calendar size={9} /> 加入于 {profile.stats.joinedAt}
            </div>
          </div>
        </div>

        {/* ═══ 右栏：自我介绍 + 标签 + 需求 ═══ */}
        <div className="space-y-4">
          {/* 自我介绍 */}
          <div className="picture-book-card p-5" style={{ transform: 'rotate(0.05deg)' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[14px] font-semibold text-[var(--ink)] flex items-center gap-1.5" style={{ fontFamily: 'var(--font-serif)' }}>
                <Edit3 size={13} style={{ color: 'var(--faded)' }} /> 自我介绍
              </h3>
              {!editBio && <button onClick={() => { setBioDraft(profile.bio); setEditBio(true) }} className="text-[10px] bg-transparent border-none cursor-pointer" style={{ color: 'var(--faded)' }}>编辑</button>}
            </div>
            {editBio ? (
              <div>
                <textarea value={bioDraft} onChange={e => setBioDraft(e.target.value)} rows={4}
                  className="w-full p-3 rounded-xl text-[12px] outline-none resize-none mb-2" style={{ border: '1.5px solid rgba(200,180,160,0.25)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setEditBio(false)} className="picture-book-btn" style={{ fontSize: 10 }}>取消</button>
                  <button onClick={saveBio} className="picture-book-btn primary" style={{ fontSize: 10 }}>保存</button>
                </div>
              </div>
            ) : (
              <p className="text-[12px] leading-[1.9]" style={{ color: 'var(--ink-soft)' }}>{profile.bio}</p>
            )}
          </div>

          {/* 标签 + 技能 + 兴趣 */}
          <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
            {/* 个人标签 */}
            <div className="picture-book-card p-4" style={{ transform: 'rotate(-0.04deg)' }}>
              <h3 className="text-[12px] font-semibold mb-3 text-[var(--ink)] flex items-center gap-1.5" style={{ fontFamily: 'var(--font-serif)' }}>🏷 标签</h3>
              <div className="flex flex-wrap gap-1 mb-2">
                {profile.tags.map(t => (
                  <span key={t} className="text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1"
                    style={{ background: 'rgba(200,160,120,0.08)', color: 'var(--ink-soft)', border: '1px solid rgba(200,160,120,0.18)' }}>
                    {t} <button onClick={() => removeTag(t)} className="bg-transparent border-none cursor-pointer text-[8px]" style={{ color: 'var(--faded)' }}>✕</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-1.5">
                <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') addTag() }}
                  placeholder="新标签…" className="flex-1 px-2 py-1 rounded-lg text-[10px] outline-none"
                  style={{ border: '1.5px solid rgba(200,180,160,0.2)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
                <button onClick={addTag} className="picture-book-btn" style={{ fontSize: 10, padding: '2px 8px' }} disabled={!tagInput.trim()}>+</button>
              </div>
            </div>

            {/* 技能 + 兴趣 */}
            <div className="picture-book-card p-4" style={{ transform: 'rotate(0.03deg)' }}>
              <h3 className="text-[12px] font-semibold mb-2 text-[var(--ink)] flex items-center gap-1.5" style={{ fontFamily: 'var(--font-serif)' }}>🔧 技能</h3>
              <div className="flex flex-wrap gap-1 mb-3">
                {profile.skills.map(s => <span key={s} className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(212,133,94,0.08)', color: '#a06030', border: '1px solid rgba(212,133,94,0.2)' }}>{s}</span>)}
              </div>
              <h3 className="text-[12px] font-semibold mb-2 text-[var(--ink)] flex items-center gap-1.5" style={{ fontFamily: 'var(--font-serif)' }}>💡 兴趣方向</h3>
              <div className="flex flex-wrap gap-1">
                {profile.interests.map(s => <span key={s} className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(106,170,80,0.08)', color: '#4a7a3a', border: '1px solid rgba(106,170,80,0.2)' }}>{s}</span>)}
              </div>
            </div>
          </div>

          {/* ═══ 地方需求（仅官方 / 队长可见）═══ */}
          {isOfficial && (
            <div className="picture-book-card p-5" style={{ transform: 'rotate(-0.02deg)', borderLeft: '4px solid var(--primary-skin)' }}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[14px] font-semibold text-[var(--ink)] flex items-center gap-1.5" style={{ fontFamily: 'var(--font-serif)' }}>
                  <Globe size={13} style={{ color: 'var(--primary-skin)' }} /> 地方需求 / 招募安排
                </h3>
                <button onClick={() => setShowNeedForm(!showNeedForm)}
                  className="picture-book-btn flex items-center gap-1" style={{ fontSize: 10, padding: '3px 10px' }}>
                  {showNeedForm ? <X size={11} /> : <Plus size={11} />}
                  {showNeedForm ? '取消' : '新增'}
                </button>
              </div>

              {/* 新增需求表单 */}
              {showNeedForm && (
                <div className="mb-4 p-4 rounded-xl" style={{ background: 'rgba(245,238,220,0.5)', border: '1px solid rgba(200,160,120,0.15)' }}>
                  <input value={needTitle} onChange={e => setNeedTitle(e.target.value)} placeholder="需求标题（如：招募2027暑期队员）"
                    className="w-full px-3 py-2 rounded-lg text-[11px] outline-none mb-2" style={{ border: '1.5px solid rgba(200,180,160,0.2)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
                  <textarea value={needDesc} onChange={e => setNeedDesc(e.target.value)} placeholder="详细描述…" rows={3}
                    className="w-full px-3 py-2 rounded-lg text-[11px] outline-none resize-none mb-2" style={{ border: '1.5px solid rgba(200,180,160,0.2)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
                  <div className="flex gap-2 mb-2">
                    <input value={needContact} onChange={e => setNeedContact(e.target.value)} placeholder="联系方式（微信/电话）"
                      className="flex-1 px-3 py-2 rounded-lg text-[10px] outline-none" style={{ border: '1.5px solid rgba(200,180,160,0.2)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
                    <input value={needDeadline} onChange={e => setNeedDeadline(e.target.value)} placeholder="截止日期（如2027-06-01）"
                      className="flex-1 px-3 py-2 rounded-lg text-[10px] outline-none" style={{ border: '1.5px solid rgba(200,180,160,0.2)', background: 'var(--surface)', color: 'var(--ink)', fontFamily: 'inherit' }} />
                  </div>
                  <button onClick={addNeed} className="picture-book-btn primary" style={{ fontSize: 11 }} disabled={!needTitle.trim() || !needDesc.trim()}>
                    <Send size={11} /> 发布需求
                  </button>
                </div>
              )}

              {/* 已有需求列表 */}
              {(profile.localNeeds || []).length > 0 ? (
                <div className="space-y-2.5">
                  {(profile.localNeeds || []).map((n, i) => (
                    <div key={i} className="p-3.5 rounded-xl" style={{ background: 'rgba(245,238,220,0.4)', border: '1px solid rgba(200,160,120,0.12)' }}>
                      <div className="flex items-start justify-between mb-1.5">
                        <h4 className="text-[13px] font-semibold text-[var(--ink)]">{n.title}</h4>
                        <button onClick={() => removeNeed(i)} className="bg-transparent border-none cursor-pointer" style={{ color: 'var(--faded)' }}><X size={12} /></button>
                      </div>
                      <p className="text-[11px] leading-relaxed mb-2" style={{ color: 'var(--ink-soft)' }}>{n.description}</p>
                      <div className="flex items-center gap-3 text-[9px]" style={{ color: 'var(--faded)' }}>
                        <span>📞 {n.contactInfo}</span>
                        {n.deadline && <span className="flex items-center gap-1"><Clock size={9} /> {n.deadline} 截止</span>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] text-center py-4 handwriting" style={{ color: 'var(--faded)' }}>
                  还没有发布需求。点击右上角"新增"按钮添加支教队招募或地方需求。
                </p>
              )}
            </div>
          )}

          {/* 非官方用户 — 提示可切换身份 */}
          {!isOfficial && (
            <div className="picture-book-card p-4 text-center" style={{ transform: 'rotate(0.02deg)', background: 'linear-gradient(135deg,rgba(240,230,215,0.3),rgba(235,225,210,0.15))' }}>
              <Sparkles size={16} className="mx-auto mb-1.5" style={{ color: 'var(--faded)', opacity: 0.4 }} />
              <p className="text-[10px]" style={{ color: 'var(--faded)' }}>
                如果你是地方团委、村支书或学校代表，可以在左侧切换到对应身份，发布当地社会实践安排与需求。
              </p>
            </div>
          )}
        </div>
      </div>
    </InnerLayout>
  )
}
