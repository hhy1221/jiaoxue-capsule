'use client'
import StudentLayout from '@/components/layout/StudentLayout'
import { useState } from 'react'
import { Send, MessageCircle, Phone, Mail, Check, Star } from 'lucide-react'

const TEACHERS = [
  { name:'黄老师',avatar:'👨',role:'班主任',subject:'科学 · 手工',available:true,lastMsg:'大家今天的恐龙做得太棒了！🌟' },
  { name:'周老师',avatar:'👩',role:'副班主任',subject:'语文 · 地理 · 文化',available:true,lastMsg:'明天记得带彩笔来上课哦' },
  { name:'王老师',avatar:'👩',role:'美术老师',subject:'美术 · 音乐',available:false,lastMsg:'小雨画的向日葵贴在走廊了' },
  { name:'体育老师',avatar:'💪',role:'体育老师',subject:'体育',available:true },
]

export default function StudentContactPage() {
  const [activeTeacher, setActiveTeacher] = useState<typeof TEACHERS[0] | null>(null)
  const [msg, setMsg] = useState('')
  const [sent, setSent] = useState(false)

  const sendToTeacher = () => {
    if (!msg.trim()) return
    setSent(true)
    setTimeout(()=>{setSent(false);setMsg('');setActiveTeacher(null)},2000)
  }

  return (
    <StudentLayout>
      <div className="mb-6">
        <h1 className="text-[24px] font-bold text-[var(--ink)] flex items-center gap-2" style={{ fontFamily:'var(--font-serif)' }}>
          ✉️ 联系老师
        </h1>
        <p className="text-[13px] mt-1" style={{ color:'var(--faded)' }}>有问题随时给老师发消息 · 老师看到后会回复你</p>
      </div>

      {/* 老师列表 */}
      {!activeTeacher && (
        <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
          {TEACHERS.map(t=>(
            <div key={t.name} onClick={()=>setActiveTeacher(t)}
              className="picture-book-card p-5 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300"
              style={{ borderLeft:`4px solid ${t.available?'#7a9a5a':'var(--faded)'}` }}>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-[56px] h-[56px] rounded-2xl flex items-center justify-center text-2xl relative"
                  style={{ background:'linear-gradient(135deg,#f5e6d0,#e8d4b8)',border:'2px solid #fff' }}>
                  {t.avatar}
                  {t.available && <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full" style={{ background:'#6aaa50',border:'2px solid #fff' }}/>}
                </div>
                <div>
                  <h3 className="text-[17px] font-bold text-[var(--ink)]" style={{ fontFamily:'var(--font-serif)' }}>{t.name}</h3>
                  <p className="text-[12px]" style={{ color:'var(--faded)' }}>{t.role}</p>
                  <p className="text-[11px] mt-0.5" style={{ color:'var(--ink-soft)' }}>{t.subject}</p>
                </div>
              </div>
              {t.lastMsg && (
                <div className="p-3 rounded-xl text-[12px]" style={{ background:'rgba(245,238,220,0.5)',border:'1px solid rgba(200,160,120,0.1)',color:'var(--ink-soft)' }}>
                  💬 {t.lastMsg}
                </div>
              )}
              <div className="flex items-center justify-between mt-3">
                <span className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ background:t.available?'rgba(122,180,90,0.08)':'rgba(200,180,160,0.06)',color:t.available?'#5a8a3a':'var(--faded)',border:`1px solid ${t.available?'rgba(122,180,90,0.2)':'rgba(200,180,160,0.12)'}` }}>
                  {t.available?'🟢 在线':'⏰ 暂时离线'}
                </span>
                <button className="picture-book-btn primary flex items-center gap-1" style={{fontSize:12}}>
                  <MessageCircle size={13}/>发消息
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 消息面板 */}
      {activeTeacher && (
        <div className="picture-book-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button onClick={()=>setActiveTeacher(null)} className="bg-transparent border-none cursor-pointer text-[var(--faded)]">← 返回</button>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background:'linear-gradient(135deg,#f5e6d0,#e8d4b8)',border:'2px solid #fff' }}>{activeTeacher.avatar}</div>
              <div>
                <h3 className="text-[16px] font-bold text-[var(--ink)]" style={{ fontFamily:'var(--font-serif)' }}>{activeTeacher.name}</h3>
                <p className="text-[11px]" style={{ color:'var(--faded)' }}>{activeTeacher.role}</p>
              </div>
            </div>
            {activeTeacher.available && <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background:'rgba(122,180,90,0.08)',color:'#5a8a3a' }}>在线</span>}
          </div>
          {sent ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">✉️</div>
              <p className="text-[16px] font-semibold text-green-600">消息已发送！</p>
              <p className="text-[12px] mt-1" style={{ color:'var(--faded)' }}>{activeTeacher.name}看到后会回复你</p>
            </div>
          ) : (
            <div>
              <textarea value={msg} onChange={e=>setMsg(e.target.value)}
                placeholder={`给${activeTeacher.name}留言…`} rows={5}
                className="w-full p-4 rounded-xl text-[14px] outline-none resize-none mb-3"
                style={{ border:'1.5px solid rgba(200,180,160,0.2)',background:'var(--surface)',color:'var(--ink)',fontFamily:'inherit' }}/>
            <div className="flex gap-2 justify-end">
              <button onClick={()=>setActiveTeacher(null)} className="picture-book-btn" style={{fontSize:12}}>取消</button>
              <button onClick={sendToTeacher} disabled={!msg.trim()} className="picture-book-btn primary flex items-center gap-2" style={{fontSize:12,opacity:msg.trim()?1:0.5}}>
                <Send size={14}/>发送
              </button>
            </div>
            </div>
          )}
        </div>
      )}
    </StudentLayout>
  )
}
