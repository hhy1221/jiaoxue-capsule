'use client'

// ═══════════════════════════════════════
// 皮肤系统 — React Context
// ═══════════════════════════════════════

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { SkinConfig, PRESET_SKINS } from '@/types'

interface SkinContextType {
  skin: SkinConfig
  setSkin: (skin: SkinConfig) => void
  resetSkin: () => void
  isCustom: boolean
}

const SkinContext = createContext<SkinContextType>({} as SkinContextType)

export function SkinProvider({ children }: { children: React.ReactNode }) {
  const [skin, setSkinState] = useState<SkinConfig>(PRESET_SKINS[0])
  const [isCustom, setIsCustom] = useState(false)

  // 初始化：尝试从 localStorage 读取
  useEffect(() => {
    try {
      const saved = localStorage.getItem('capsule-skin')
      if (saved) {
        const parsed = JSON.parse(saved) as SkinConfig & { isCustom?: boolean }
        setIsCustom(parsed.isCustom ?? false)
        setSkinState(parsed)
      }
    } catch {}
  }, [])

  // ═══ 应用全部 CSS 变量 — 覆盖 :root 默认值，让皮肤切换全面生效 ═══
  useEffect(() => {
    const root = document.documentElement
    const c = skin.colors

    // ─ 绘本设计系统核心变量（全站页面通过这些变量取色）
    root.style.setProperty('--bg', c.background)
    root.style.setProperty('--cream', c.background)
    root.style.setProperty('--surface', c.surface)
    root.style.setProperty('--warm-white', c.surface)
    root.style.setProperty('--surface-hover', c.surfaceHover)
    // ─ 主色调
    root.style.setProperty('--primary-skin', c.primary)
    root.style.setProperty('--primary-hover-skin', c.primaryHover)
    root.style.setProperty('--primary', c.primary)
    root.style.setProperty('--primary-hover', c.primaryHover)
    // ─ 文本色 — 覆盖 :root 的 ink/faded 硬编码
    root.style.setProperty('--ink', c.text)
    root.style.setProperty('--text-skin', c.text)
    root.style.setProperty('--text', c.text)
    root.style.setProperty('--foreground', c.text)
    root.style.setProperty('--ink-soft', c.textSecondary)
    root.style.setProperty('--text-secondary-skin', c.textSecondary)
    root.style.setProperty('--text-secondary', c.textSecondary)
    root.style.setProperty('--ink-faint', c.textMuted)
    root.style.setProperty('--text-muted-skin', c.textMuted)
    root.style.setProperty('--text-muted', c.textMuted)
    root.style.setProperty('--faded', c.textMuted)
    // ─ 边框
    root.style.setProperty('--border-skin', c.border)
    root.style.setProperty('--border', c.border)
    root.style.setProperty('--border-color', c.border)
    // ─ 强调色（侧边栏背景微调、accent标记等）
    root.style.setProperty('--accent1', c.accent1)
    root.style.setProperty('--accent2', c.accent2)
  }, [skin])

  const setSkin = useCallback((newSkin: SkinConfig) => {
    const isPreset = PRESET_SKINS.some(s => s.id === newSkin.id)
    setIsCustom(!isPreset)
    setSkinState(newSkin)
    try {
      localStorage.setItem('capsule-skin', JSON.stringify({ ...newSkin, isCustom: !isPreset }))
    } catch {}
  }, [])

  const resetSkin = useCallback(() => {
    setIsCustom(false)
    setSkinState(PRESET_SKINS[0])
    try { localStorage.removeItem('capsule-skin') } catch {}
  }, [])

  return (
    <SkinContext.Provider value={{ skin, setSkin, resetSkin, isCustom }}>
      {children}
    </SkinContext.Provider>
  )
}

export const useSkin = () => useContext(SkinContext)
