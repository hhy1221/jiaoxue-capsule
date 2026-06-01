'use client'

import InnerLayout from '@/components/layout/InnerLayout'
import { useSkin } from '@/lib/skin-context'
import { PRESET_SKINS } from '@/types'
import { useState } from 'react'
import { RotateCcw, Check } from 'lucide-react'

const COLOR_LABELS: Record<string, string> = {
  background: '页面背景', surface: '卡片表面', surfaceHover: '表面悬停',
  primary: '主色调', primaryHover: '主色悬停', text: '主文字',
  textSecondary: '次要文字', textMuted: '弱化文字', border: '边框',
  accent1: '强调色①', accent2: '强调色②',
}

export default function SettingsPage() {
  const { skin, setSkin, resetSkin, isCustom } = useSkin()
  const [customColors, setCustomColors] = useState({ ...skin.colors })

  return (
    <InnerLayout>
      <header className="flex items-center justify-between pb-[22px] mb-5 flex-wrap gap-3 relative"
        style={{ borderBottom: '1.5px solid rgba(180,160,130,0.25)' }}>
        <div>
          <h1 className="text-[19px] font-semibold tracking-[0.03em] text-[var(--ink)]"
            style={{ fontFamily: "var(--font-serif)" }}>🎨 皮肤设置</h1>
          <p className="text-[11px] mt-0.5 tracking-[0.06em]" style={{ color: 'var(--faded)' }}>
            5套预设皮肤 + 11色自定义取色
          </p>
        </div>
        {isCustom && (
          <button onClick={resetSkin} className="picture-book-btn" style={{ fontSize: 12 }}>
            <RotateCcw size={14} /> 恢复默认
          </button>
        )}
        <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 text-[7px] tracking-[7px] whitespace-nowrap"
          style={{ color: 'rgba(180,160,130,0.5)' }}>· · · · · · · · · · · ·</div>
      </header>

      {/* 预设皮肤 */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 mb-8">
        {PRESET_SKINS.map((preset, i) => {
          const isActive = skin.id === preset.id && !isCustom
          return (
            <div key={preset.id} className="picture-book-card p-5 cursor-pointer"
              style={{
                transform: `rotate(${(i % 2 === 0 ? -0.3 : 0.2)}deg)`,
                ...(isActive ? {
                  borderColor: 'rgba(160,130,100,0.6)',
                  boxShadow: 'var(--shadow-md)',
                } : {}),
              }}
              onClick={() => setSkin(preset)}>
              {/* 色块预览 */}
              <div className="flex gap-1 mb-4">
                {[preset.colors.background, preset.colors.primary, preset.colors.accent1, preset.colors.text].map((c, ci) => (
                  <div key={ci} className="flex-1 h-8 rounded-lg border" style={{ background: c, borderColor: 'rgba(0,0,0,0.06)' }} />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[14px] font-semibold tracking-[0.04em] text-[var(--ink)]">{preset.name}</h3>
                  <p className="text-[10px] mt-0.5 tracking-[0.06em]" style={{ color: 'var(--faded)' }}>{preset.description}</p>
                </div>
                {isActive && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: 'var(--primary-skin)' }}>
                    <Check size={14} className="text-white" />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* 自定义取色 */}
      <div className="picture-book-card p-6 mb-6" style={{ transform: 'rotate(-0.1deg)' }}>
        <h3 className="text-[14px] font-semibold tracking-[0.04em] mb-4 text-[var(--ink)]"
          style={{ fontFamily: "var(--font-serif)" }}>🎛️ 自定义配色</h3>
        <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
          {(Object.keys(customColors) as Array<keyof typeof customColors>).map(key => (
            <div key={key} className="flex items-center gap-3 p-3 rounded-md"
              style={{ background: 'rgba(245,240,230,0.3)', border: '1px solid rgba(200,180,160,0.15)' }}>
              <label className="relative cursor-pointer flex-shrink-0">
                <div className="w-10 h-10 rounded-lg border-2 shadow-sm transition-transform hover:scale-105"
                  style={{ borderColor: 'rgba(180,160,140,0.3)', background: customColors[key] }} />
                <input type="color" value={customColors[key]}
                  onChange={e => setCustomColors(p => ({ ...p, [key]: e.target.value }))}
                  className="absolute inset-0 opacity-0 cursor-pointer" />
              </label>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-medium tracking-[0.06em] text-[var(--ink)]">{COLOR_LABELS[key] || key}</p>
                <input type="text" value={customColors[key]}
                  onChange={e => setCustomColors(p => ({ ...p, [key]: e.target.value }))}
                  className="w-full mt-0.5 px-2 py-1 text-[10px] font-mono rounded border outline-none transition-colors"
                  style={{
                    borderColor: 'rgba(200,180,160,0.25)',
                    background: 'var(--surface)',
                    color: 'var(--ink-soft)',
                  }}
                  onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'var(--primary-skin)'}
                  onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(200,180,160,0.25)'}
                />
              </div>
            </div>
          ))}
        </div>

        {/* 实时预览 */}
        <div className="mt-5 p-4 rounded-md flex items-center gap-2 flex-wrap"
          style={{ background: customColors.background, border: '1px solid rgba(200,180,160,0.15)' }}>
          <span className="text-[10px] tracking-[0.06em] px-2 py-0.5 rounded-full" style={{ background: customColors.primary, color: '#fff' }}>主色预览</span>
          <span className="text-[10px] tracking-[0.06em]" style={{ color: customColors.text }}>文字预览</span>
          <span className="text-[10px] tracking-[0.06em]" style={{ color: customColors.textSecondary }}>次要文字</span>
          <span className="text-[10px] tracking-[0.06em]" style={{ color: customColors.textMuted }}>弱文字</span>
        </div>

        <button onClick={() => setSkin({ ...skin, id: 'custom', name: '自定义', description: '手动调色', colors: customColors })}
          className="picture-book-btn primary w-full mt-4" style={{ justifyContent: 'center', fontSize: 13 }}>
          ✅ 应用自定义配色
        </button>
      </div>
    </InnerLayout>
  )
}
