import { NextRequest, NextResponse } from 'next/server'
import { deepseekChat } from '@/lib/ai/deepseek'

export async function POST(req: NextRequest) {
  try {
    const { text, dialectType } = await req.json()
    if (!text) return NextResponse.json({ error: '缺少翻译文本' }, { status: 400 })

    const dialectName = dialectType || '四川话'
    const content = await deepseekChat({
      systemPrompt: `你是中国方言翻译专家。将输入的普通话文本翻译成${dialectName}，并附上方言的文化背景注释（1-2条）。`,
      userMessage: `普通话：${text}\n请翻译成${dialectName}。同时给出1-2条方言文化注释。`,
      temperature: 0.7,
      maxTokens: 600,
    })
    return NextResponse.json({ content, success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message, success: false }, { status: 500 })
  }
}
