'use client'

import { SkinProvider } from '@/lib/skin-context'
import { ToastProvider } from '@/components/animations/Toast'
import HeroCurtain from '@/components/layout/HeroCurtain'
import Ribbon from '@/components/layout/Ribbon'
import SpotlightSearch from '@/components/search/SpotlightSearch'

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SkinProvider>
      <ToastProvider>
        <HeroCurtain />
        <Ribbon />
        {children}
        <SpotlightSearch />
      </ToastProvider>
    </SkinProvider>
  )
}
