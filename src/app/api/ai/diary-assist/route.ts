import { NextRequest, NextResponse } from 'next/server'
import { deepseekChat } from '@/lib/ai/deepseek'

export async function POST(req: NextRequest) {
  try {
    const { input, studentName } = await req.json()
    if (!input) return NextResponse.json({ error: '缺少输入内容' }, { status: 400 })

    const content = await deepseekChat({
      systemPrompt: '你是一位经验丰富的支教老师。根据老师简短的观察描述，扩写成一段100-200字的完整评语。评语要具体、有画面感、体现孩子的个性。适当加入对学生未来发展的积极建议。用"今天"开头，语言亲切自然。',
      userMessage: `学生：${studentName || '学生'}\n观察到的内容：${input}\n\n请扩写成一段完整的评语，并给出2-3个适合该学生的成长标签（如"乐于助人""专注力好""有责任心"等）。`,
      temperature: 0.9,
      maxTokens: 500,
    })
    return NextResponse.json({ content, success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message, success: false }, { status: 500 })
  }
}
