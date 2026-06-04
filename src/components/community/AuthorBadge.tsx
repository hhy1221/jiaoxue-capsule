'use client'
import { CommunityAuthor } from '@/types'
import { CheckCircle } from 'lucide-react'

/**
 * 社区作者头像组件 — 统一处理真实图片 vs emoji 头像
 * 在 questions/stories/recruit 三页中共享，消除 4 处重复代码
 */
export default function AuthorBadge({
  author,
  size = 'sm',
  showBadge = true,
  showName = true,
}: {
  author: CommunityAuthor
  size?: 'xs' | 'sm' | 'md'
  showBadge?: boolean
  showName?: boolean
}) {
  const dims = { xs: 20, sm: 28, md: 36 }
  const textSizes = { xs: 'text-[9px]', sm: 'text-[11px]', md: 'text-[13px]' }
  const dim = dims[size]
  const isImage = typeof author.avatar === 'string' && author.avatar.startsWith('/')

  return (
    <div className="flex items-center gap-2">
      {isImage ? (
        <div
          className="rounded-full overflow-hidden flex-shrink-0"
          style={{
            width: dim,
            height: dim,
            border: '1.5px solid #fff',
            outline: '1px solid rgba(180,150,120,0.25)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <img src={author.avatar} alt={author.name} className="w-full h-full object-cover" />
        </div>
      ) : (
        <span className="flex-shrink-0 text-base w-5 text-center">{author.avatar}</span>
      )}
      {showName && (
        <span className={`font-medium text-[var(--ink-soft)] ${textSizes[size]}`}>
          {author.name}
        </span>
      )}
      {showBadge && author.verified && (
        <CheckCircle size={10} style={{ color: '#4a8a4a' }} />
      )}
      {showBadge && author.badge && (
        <span className="text-[9px]" style={{ color: 'var(--faded)' }}>
          {author.badge}
        </span>
      )}
    </div>
  )
}
