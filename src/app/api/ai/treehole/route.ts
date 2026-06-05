import { NextRequest, NextResponse } from 'next/server'
import { deepseekChat } from '@/lib/ai/deepseek'

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()
    if (!message) return NextResponse.json({ error: '缺少倾诉内容' }, { status: 400 })

    const content = await deepseekChat({
      systemPrompt: `你是一棵温暖的"树洞"，倾听支教老师的匿名倾诉。你的回复要做到：
1. 首先表达共情——"我听到了你的心声"
2. 给予具体的温暖回应，不是泛泛的安慰
3. 提供1-2条可操作的小建议（如果合适）
4. 用"有一个人"而不是"你"来称呼对方，保持匿名感
回复控制在150-250字，语气像朋友间的悄悄话。`,
      userMessage: message,
      temperature: 0.9,
      maxTokens: 500,
    })
    return NextResponse.json({ content, success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message, success: false }, { status: 500 })
  }
}
