import { NextRequest, NextResponse } from 'next/server'
import { deepseekChat } from '@/lib/ai/deepseek'

export async function POST(req: NextRequest) {
  try {
    const { studentName, tags, personality, journalMoments } = await req.json()
    if (!studentName) return NextResponse.json({ error: '缺少学生姓名' }, { status: 400 })

    const momentsText = journalMoments?.length
      ? journalMoments.slice(0, 5).map((m: string, i: number) => `${i + 1}. ${m}`).join('\n')
      : '暂无记录'
    const tagsText = tags?.length ? tags.join('、') : '可爱'

    const systemPrompt = `你是一位支教纪录片的导演。根据学生的个人信息和夏令营关键瞬间，创作一个30-60秒的成长纪念视频分镜脚本。

格式要求（严格按照这个格式输出）：
【视频标题】一句话，温暖感人
【总时长】XX秒
【建议配乐】一首歌名
---脚本---
| 时间段 | 画面描述 | 文字/字幕 | 转场 |
（每个场景一行）

画面描述要具体、有画面感。文字要简洁动人，适合做字幕。`
    const content = await deepseekChat({
      systemPrompt,
      userMessage: `学生姓名：${studentName}\n性格：${personality || '可爱活泼'}\n标签：${tagsText}\n\n夏令营关键瞬间：\n${momentsText}\n\n请生成视频分镜脚本。`,
      temperature: 0.9,
      maxTokens: 800,
    })

    return NextResponse.json({ content, success: true })
  } catch (e: any) {
    return NextResponse.json({ error: e.message, success: false }, { status: 500 })
  }
}
