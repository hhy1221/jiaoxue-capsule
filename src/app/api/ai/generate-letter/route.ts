import { NextRequest, NextResponse } from 'next/server'
import { deepseekChat } from '@/lib/ai/deepseek'

const TONE_PROMPTS: Record<string, string> = {
  poetic: '你是一位温柔诗意的支教老师。用优美、抒情的文字，像春风般温暖地给孩子写一封信。多用自然意象和比喻。',
  friendly: '你是一位支教老师，用老友聊天般亲切自然的语气给孩子写信。语言口语化但真诚，像回忆往事一样娓娓道来。',
  strict: '你是一位严中有爱的支教老师。语气稍严肃但不失温暖，像长辈一样表达期望和鞭策，同时流露真诚的关心。',
  energetic: '你是一位热情洋溢的支教老师。用热血激昂、充满力量的语言给孩子写信，鼓舞ta勇敢追梦。',
  playful: '你是一位活泼可爱的支教老师。用童趣十足的语言给孩子写信，可以适当用拟声词、感叹号，像小朋友之间的对话。',
}

/** 根据学生档案+标签+评语构建完整 Prompt */
function buildPrompt(body: {
  studentName: string
  studentAge?: string
  studentGrade?: string
  studentPersonality?: string
  studentTags?: string[]
  studentNotes?: string
  keyMoments?: string[]   // 来自成长日志的临别信素材
  tone?: string
  teacherName?: string
  teamName?: string
}) {
  const tone = TONE_PROMPTS[body.tone || 'poetic'] || TONE_PROMPTS.poetic
  const name = body.studentName
  const age = body.studentAge ? `${body.studentAge}岁` : ''
  const grade = body.studentGrade || ''
  const personality = body.studentPersonality || ''
  const tags = body.studentTags?.length ? `标签特点：${body.studentTags.join('、')}` : ''
  const notes = body.studentNotes || ''
  const moments = body.keyMoments?.length
    ? `夏令营中关于${name}的关键瞬间：\n${body.keyMoments.map((m, i) => `${i + 1}. ${m}`).join('\n')}`
    : ''
  const teacher = body.teacherName || '老师'
  const team = body.teamName || '支教队'

  const prompt = `请给一个名叫"${name}"的${grade}学生${age}写一封临别信。

写信的人是${teacher}（来自${team}）。${name}的性格：${personality}。${tags}
教师备注：${notes}
${moments}

要求：
1. 字数300-500字
2. 用"${name}"称呼孩子，用"${teacher}"署名
3. 不要用通用的祝福语，要具体提到孩子的特点和夏令营中的真实细节
4. 充满真情实感，让孩子感受到老师的不舍与期望
5. 段落分明，每段之间有自然过渡
6. 如果有关键瞬间素材，务必融入信中`

  return { system: tone, user: prompt }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    if (!body.studentName) {
      return NextResponse.json({ error: '缺少学生姓名' }, { status: 400 })
    }

    const { system, user } = buildPrompt(body)
    const content = await deepseekChat({
      systemPrompt: system,
      userMessage: user,
      temperature: 0.85,
      maxTokens: 800,
    })

    return NextResponse.json({ content, success: true })
  } catch (e: any) {
    console.error('临别信生成失败:', e)
    return NextResponse.json({ error: e.message || '生成失败', success: false }, { status: 500 })
  }
}
