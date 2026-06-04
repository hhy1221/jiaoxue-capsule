'use client'
import StudentLayout from '@/components/layout/StudentLayout'
import { STUDENT_POSTS } from '@/lib/community-data'
import { useState } from 'react'
import { Heart, MessageCircle, Camera, Send, Plus, Smile, Image, X } from 'lucide-react'

const MOCK_CURRENT = 'sp1'
const myPosts = STUDENT_POSTS.filter(p => p.id === MOCK_CURRENT)

export default function StudentWorksPage() {
  const [showCreate, setShowCreate] = useState(false)
  const [newPost, setNewPost] = useState('')
  const [liked, setLiked] = useState<Set<string>>(new Set())

  const publish = () => {
    if (!newPost.trim()) return
    setShowCreate(false)
    setNewPost('')
  }

  return (
    <StudentLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-bold text-[var(--ink)] flex items-center gap-2" style={{ fontFamily:'var(--font-serif)' }}>
            🎨 我的作品
          </h1>
          <p className="text-[13px] mt-1" style={{ color:'var(--faded)' }}>分享你的创作，让更多人看到你的才华</p>
        </div>
        <button onClick={()=>setShowCreate(!showCreate)} className="picture-book-btn primary flex items-center gap-2" style={{fontSize:13,padding:'8px 18px'}}>
          <Plus size={15}/>发布作品
        </button>
      </div>

      {/* 发布区 */}
      {showCreate && (
        <div className="picture-book-card p-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[15px] font-bold text-[var(--ink)] flex items-center gap-2" style={{ fontFamily:'var(--font-serif)' }}>✨ 发布新作品</h3>
            <button onClick={()=>setShowCreate(false)} className="bg-transparent border-none cursor-pointer" style={{ color:'var(--faded)' }}><X size={18}/></button>
          </div>
          <textarea value={newPost} onChange={e=>setNewPost(e.target.value)}
            placeholder="写下你想分享的内容…比如今天做了什么手工、画了什么画" rows={4}
            className="w-full p-4 rounded-xl text-[14px] outline-none resize-none mb-3" style={{ border:'1.5px solid rgba(200,180,160,0.2)',background:'var(--surface)',color:'var(--ink)',fontFamily:'inherit' }}/>
          <div className="flex items-center gap-2">
            <button className="picture-book-btn flex items-center gap-1" style={{fontSize:11}}><Image size={13}/>添加图片</button>
            <button className="picture-book-btn flex items-center gap-1" style={{fontSize:11}}><Smile size={13}/>表情</button>
            <div className="flex-1"/>
            <button onClick={publish} className="picture-book-btn primary flex items-center gap-1" style={{fontSize:12,padding:'6px 18px'}} disabled={!newPost.trim()}>
              <Send size={13}/>发布
            </button>
          </div>
        </div>
      )}

      {/* 作品列表 */}
      <div className="columns-2 gap-4 max-md:columns-1">
        {myPosts.map((p,i)=>{
          const isLiked = liked.has(p.id)
          return (
            <div key={p.id} className="picture-book-card break-inside-avoid mb-4 overflow-hidden"
              style={{ transform:`rotate(${i%2===0?'-0.3deg':'0.2deg'})` }}>
              {p.image.startsWith('/') ? (
                <div style={{ height:200,overflow:'hidden' }}>
                  <img src={p.image} alt="" className="w-full h-full object-cover" loading="lazy"/>
                </div>
              ) : (
                <div className="flex items-center justify-center p-8" style={{ background:'linear-gradient(180deg,rgba(240,235,220,0.4),transparent)',fontSize:56 }}>{p.image}</div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                    style={{ background:'linear-gradient(135deg,#f5e6d0,#e8d4b8)',border:'2px solid #fff' }}>{p.studentAvatar}</div>
                  <div>
                    <p className="text-[13px] font-bold text-[var(--ink)]">{p.studentName}</p>
                    <p className="text-[10px]" style={{ color:'var(--faded)' }}>{p.grade} · {p.school}</p>
                  </div>
                </div>
                <p className="text-[14px] leading-[1.8] mb-3" style={{ color:'var(--ink-soft)' }}>{p.content}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background:'rgba(152,128,200,0.08)',color:'#8068b0',border:'1px solid rgba(152,128,200,0.2)' }}>
                    {p.type==='artwork'?'🎨 作品':'📖 故事'}
                  </span>
                  {p.interestGroup && <span className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background:'rgba(107,174,214,0.06)',color:'#5a8ab8' }}>{p.interestGroup}</span>}
                </div>
                <div className="flex items-center justify-between text-[12px]" style={{ color:'var(--faded)' }}>
                  <div className="flex items-center gap-3">
                    <button onClick={()=>setLiked(prev=>{const n=new Set(prev);n.has(p.id)?n.delete(p.id):n.add(p.id);return n})}
                      className="flex items-center gap-1 bg-transparent border-none cursor-pointer"
                      style={{ color:isLiked?'#e06050':'var(--faded)',fontSize:12,fontFamily:'inherit' }}>
                      <Heart size={14} fill={isLiked?'#e06050':'none'}/> {p.likes+(isLiked?1:0)}
                    </button>
                    <button className="flex items-center gap-1 bg-transparent border-none cursor-pointer"
                      style={{ color:'var(--faded)',fontSize:12,fontFamily:'inherit' }}>
                      <MessageCircle size={14}/>评论
                    </button>
                  </div>
                  <span>{p.createdAt}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {myPosts.length===0 && (
        <div className="text-center py-12" style={{ color:'var(--faded)' }}>
          <div className="text-6xl mb-4 opacity-30">🎨</div>
          <p className="text-[16px] font-semibold">还没有作品</p>
          <p className="text-[13px] mt-1">点击"发布作品"分享你的第一个创作吧！</p>
        </div>
      )}
    </StudentLayout>
  )
}
