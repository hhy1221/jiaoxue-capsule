import { NextRequest, NextResponse } from 'next/server'
import { tongyiGenerateImage } from '@/lib/ai/tongyi-image'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.prompt) return NextResponse.json({ error: '缺少图片描述' }, { status: 400 })

    const style = body.style || 'illustration'
    const urls = await tongyiGenerateImage({
      prompt: body.prompt,
      style,
      n: body.n || 1,
      size: body.size || '1024*1024',
    })

    return NextResponse.json({ urls, style, success: true })
  } catch (e: any) {
    console.error('通义万相图片生成失败:', e.message)
    return NextResponse.json({
      error: e.message || '生成失败',
      success: false,
      fallback: true, // 前端可据此使用 Canvas 降级
    }, { status: 500 })
  }
}
