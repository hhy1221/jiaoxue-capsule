// ═══════════════════════════════════════
// 支教记忆胶囊 — 完整演示假数据 v3
// ═══════════════════════════════════════
import { Student, GrowthRecord, Letter, Schedule, Classroom, ClassroomMoment, Material, TeachingNote, Conversation, Message, Review, Announcement, Album, Resource, DashboardData, PenpalMatch, TreeholeMessage, DialectEntry, VideoScript, User, Team, Semester, Notification } from '@/types'

// ── 用户 ──
export const MOCK_USER: User = { id: 'u1', name: '黄寒阳', email: 'huang@uestc.edu.cn', avatar: '黄', roles: ['captain', 'teacher'], teamId: 't1', createdAt: '2026-07-01' }
export const MOCK_TEAM: Team = { id: 't1', name: '凡星支教队', slug: 'fanxing', description: '电子科技大学计算机学院凡星支教队，连续11年深耕四川乡村教育', logo: '⭐', color: '#2E7D32', createdAt: '2015-01-01' }
export const MOCK_SEMESTER: Semester = { id: 's1', teamId: 't1', name: '2026筠连夏令营', startDate: '2026-07-19', endDate: '2026-07-31', location: '四川宜宾筠连县', isActive: true }
export const MOCK_MEMBERS: User[] = [
  MOCK_USER,
  { id: 'u2', name: '周老师', email: 'zhou@test.com', avatar: '周', roles: ['vice_captain', 'teacher'], teamId: 't1', createdAt: '2026-07-01' },
  { id: 'u3', name: '王老师', email: 'wang@test.com', avatar: '王', roles: ['teacher'], teamId: 't1', createdAt: '2026-07-01' },
  { id: 'u4', name: '李老师', email: 'li@test.com', avatar: '李', roles: ['teacher'], teamId: 't1', createdAt: '2026-07-02' },
  { id: 'u5', name: '张指导', email: 'zhang@test.com', avatar: '张', roles: ['advisor'], teamId: 't1', createdAt: '2026-07-01' },
]

// ── 学生 ──
// 头像映射: /images/avatars/{pinyin}-{n}.webp
const AV = (name:string)=>`/images/avatars/${name}-1.webp`
export const MOCK_STUDENTS: Student[] = [
  { id: '1', name: '刘小宇', nickname: '小宇', age: 9, grade: '三年级', avatar: '🌟', photo: AV('liuxiaoyu'), tags: ['开朗', '爱画画', '数学好'], personality: '活泼外向，课堂上总是第一个举手回答问题', strengths: '数学思维敏捷，画画有天赋', notes: '刚来时有点害羞，熟悉后非常活泼。特别喜欢恐龙', createdAt: '2026-07-20', teamId: 't1' },
  { id: '2', name: '陈小雨', nickname: '小雨', age: 8, grade: '二年级', avatar: '🌻', photo: AV('chenxiaoyu'), tags: ['文静', '爱读书', '写作好'], personality: '安静内敛，做事情特别认真', strengths: '作文写得好，想象力丰富', notes: '父母在外打工，和爷爷奶奶住。每次写信课都特别认真', createdAt: '2026-07-20', teamId: 't1' },
  { id: '3', name: '王浩然', nickname: '浩然', age: 10, grade: '四年级', avatar: '🚀', photo: AV('wanghaoran'), tags: ['调皮', '运动好', '有领导力'], personality: '精力充沛，是操场上的小霸王', strengths: '体育全能，有天然的号召力', notes: '需要耐心引导，用商量的方式沟通效果最好', createdAt: '2026-07-21', teamId: 't1' },
  { id: '4', name: '张欣怡', nickname: '欣怡', age: 7, grade: '一年级', avatar: '🦋', photo: AV('zhangxinyi'), tags: ['可爱', '爱唱歌', '粘人'], personality: '班上最小的孩子，特别粘老师', strengths: '唱歌好听，记歌词特别快', notes: '有点分离焦虑，需要多鼓励她独立', createdAt: '2026-07-21', teamId: 't1' },
  { id: '5', name: '李子涵', nickname: '子涵', age: 9, grade: '三年级', avatar: '📖', photo: AV('lizihan'), tags: ['聪明', '爱提问', '腼腆'], personality: '思维活跃，总是问为什么', strengths: '逻辑思维强，科学实验课表现突出', notes: '对天文特别感兴趣', createdAt: '2026-07-22', teamId: 't1' },
  { id: '6', name: '赵小萌', nickname: '萌萌', age: 8, grade: '二年级', avatar: '🐰', photo: AV('zhaoxiaomeng'), tags: ['害羞', '细心', '有爱心'], personality: '话不多但心很细，总默默帮同学收拾东西', strengths: '观察力强，手工精致', notes: '需要鼓励她多表达自己的想法', createdAt: '2026-07-20', teamId: 't1' },
  { id: '7', name: '孙大勇', nickname: '大勇', age: 10, grade: '四年级', avatar: '🦁', photo: AV('sundayong'), tags: ['勇敢', '仗义', '嗓门大'], personality: '天不怕地不怕，但最怕写作文', strengths: '动手能力强，修东西一绝', notes: '有正义感，会保护小同学', createdAt: '2026-07-21', teamId: 't1' },
  { id: '8', name: '周小雅', nickname: '小雅', age: 9, grade: '三年级', avatar: '🎀', photo: AV('zhouxiaoya'), tags: ['爱美', '舞蹈好', '乐观'], personality: '总是笑嘻嘻的，是班级的开心果', strengths: '会跳民族舞，节奏感好', notes: '筠连苗族，会跳苗族舞', createdAt: '2026-07-22', teamId: 't1' },
]

// ── 成长记录 ──
export const MOCK_RECORDS: GrowthRecord[] = [
  { id: 'r1', studentId: '1', date: '2026-07-22', type: 'milestone', title: '第一次举手发言', content: '数学课上第一个举手，上台画了标准的五角星，全班鼓掌。', tags: ['勇敢', '数学'], mood: 'happy' },
  { id: 'r2', studentId: '1', date: '2026-07-25', type: 'achievement', title: '手工比赛第一名', content: '用废纸箱做了一个恐龙模型，细节满分。', tags: ['手工', '创意'], mood: 'happy' },
  { id: 'r3', studentId: '1', date: '2026-07-28', type: 'photo', title: '帮同学讲解题目', content: '主动帮同桌讲了一道数学题，讲了三遍直到对方听懂。', tags: ['助人', '耐心'], mood: 'happy' },
  { id: 'r4', studentId: '2', date: '2026-07-23', type: 'milestone', title: '写给爸爸妈妈的信', content: '写了一封给父母的信：我会好好读书，你们在外面不要太累。读哭了三个老师。', tags: ['感动', '写作'], mood: 'normal' },
  { id: 'r5', studentId: '2', date: '2026-07-26', type: 'photo', title: '交到了第一个好朋友', content: '和欣怡成了好朋友，第一次笑得这么开心。', tags: ['朋友', '成长'], mood: 'happy' },
  { id: 'r6', studentId: '3', date: '2026-07-24', type: 'milestone', title: '当上了小组长', content: '被选为运动会方阵组长，认真教大家喊口号排队形。', tags: ['领导力', '运动会'], mood: 'happy' },
  { id: 'r7', studentId: '3', date: '2026-07-27', type: 'note', title: '主动帮小同学', content: '看到一年级小朋友摔倒了，第一个跑过去扶起来。', tags: ['善良', '助人'], mood: 'happy' },
  { id: 'r8', studentId: '4', date: '2026-07-25', type: 'achievement', title: '给大家唱歌', content: '音乐课唱了一首小燕子，声音甜甜的，大家都安静地听。', tags: ['唱歌', '自信'], mood: 'happy' },
  { id: 'r9', studentId: '5', date: '2026-07-27', type: 'achievement', title: '科学实验小能手', content: '第一个完成了火山喷发实验，还向大家解释了原理。', tags: ['科学', '进步'], mood: 'happy' },
  { id: 'r10', studentId: '5', date: '2026-07-28', type: 'milestone', title: '在大家面前讲故事', content: '主动举手讲了一个关于星星的故事，全程没有中断——巨大的进步。', tags: ['勇敢', '故事'], mood: 'happy' },
  { id: 'r11', studentId: '6', date: '2026-07-24', type: 'photo', title: '默默地帮同学', content: '下课大家都在玩，萌萌一个人帮老师把散落的彩笔都收好了。', tags: ['细心', '默默付出'], mood: 'normal' },
  { id: 'r12', studentId: '7', date: '2026-07-26', type: 'achievement', title: '修好了教室的风扇', content: '教室风扇坏了，大勇找来工具三下五除二就修好了。', tags: ['动手', '解决问题'], mood: 'happy' },
  { id: 'r13', studentId: '8', date: '2026-07-25', type: 'milestone', title: '教大家跳苗族舞', content: '音乐课上主动教同学们跳苗族舞，还解释了每个动作的含义。', tags: ['文化', '自信', '舞蹈'], mood: 'happy' },
]

// ── 临别信 ──
export const MOCK_LETTERS: Letter[] = [
  {
    id: 'l1', studentId: '1', studentName: '刘小宇', tone: 'energetic', title: '你是一颗闪亮的星星',
    content: `亲爱的小宇：\n\n还记得第一天上课，你坐在第三排靠窗的位置，眼睛亮晶晶地看着我。当问到"谁愿意上来试试"的时候，你的手举得比所有人都高，整个人都快站起来了。\n\n短短十几天，你给我太多惊喜。你用废纸箱做的恐龙模型，现在还放在我的桌上——我说要带回大学给同学们看看。你的数学卷子上，每一道题都写得整整齐齐，连草稿都一丝不苟。\n\n小宇，你要记住一件事：你的好奇心和勇气，是你最宝贵的东西。不管将来学什么、做什么，永远像现在这样，想问就问，想做就做。\n\n下次见面的时候，我想听你给我讲讲新发现的恐龙。拉钩。\n\n—— 黄老师`,
    createdAt: '2026-07-30', isRead: false,
  },
  {
    id: 'l2', studentId: '2', studentName: '陈小雨', tone: 'poetic', title: '你是一朵安静的花',
    content: `小雨：\n\n你是一朵安静的花，不在最显眼的地方开放，但一直在认真汲取阳光和水分。\n\n你的那封信，是我今年读过最动人的文字。你知道的，我说的是你写给爸爸妈妈的那一封。当你说"你们在外面不要太累"，我突然明白——你小小的心里装着的不是抱怨，而是对父母的理解和爱。\n\n小雨，读书会让你看到更大的世界。你的文笔已经比很多大孩子还要好，请一定不要停下来。写日记、写信、写故事——把你看到的一切都用文字留下来。\n\n愿你像向日葵一样，无论生长在什么样的土壤里，都永远追着光。\n\n—— 黄老师`,
    createdAt: '2026-07-30', isRead: false,
  },
  {
    id: 'l3', studentId: '3', studentName: '王浩然', tone: 'friendly', title: '给浩然兄弟的信',
    content: `浩然兄弟：\n\n哈哈，这个称呼是不是很亲切？因为我真的把你当小兄弟看。\n\n你是操场上的风，是跑道上的闪电。但让我印象最深的，不是你在球场上跑得有多快，而是你当上小组长之后的那股认真劲儿——你带着同学们喊口号的样子，让我看到了一个"大人"的影子。\n\n浩然，你有天生的领导力。但真正的领袖不只是让别人听你的，更是能理解别人、关心别人。我知道你心很软，只是不好意思表现出来。\n\n希望下一次见你的时候，你的个子能超过我——当然，这也太容易了。\n\n—— 黄老师`,
    createdAt: '2026-07-30', isRead: false,
  },
]

// ── 课表（13天） ──
function buildSchedule(): Schedule {
  const days = []
  const times = ['8:30-9:10', '9:20-10:00', '10:10-10:50', '10:50-11:20', '11:20-12:00', '14:30-15:10', '15:20-16:00', '16:10-16:50']
  const courses = [
    ['开营仪式', '认识彼此', '安全教育', '大课间', 'AI启蒙课', '体育游戏', '美术：自画像', '班级总结'],
    ['趣味数学', '诗词朗诵', '科学实验', '大课间', '英语儿歌', '手工折纸', '音乐：合唱', '班级总结'],
    ['创意写作', '趣味数学', '自然探索', '大课间', '美术：水彩', '体育：篮球', 'AI绘画', '班级总结'],
    ['诗词大会', '手工：剪纸', '科学：火山', '大课间', '英语故事', '舞蹈课', '团队游戏', '班级总结'],
    ['数学竞赛', '趣味物理', '美术：泥塑', '大课间', '读书分享', '体育：足球', 'AI写作', '班级总结'],
    ['作文分享会', '趣味化学', '音乐：乐器', '大课间', '英语戏剧', '手工：编织', '电影鉴赏', '班级总结'],
    ['数学游戏', '辩论赛', '环保课堂', '大课间', '美术：版画', '体育：田径', '才艺展示', '班级总结'],
    ['户外写生', '趣味生物', 'AI编程', '大课间', '英语演讲', '手工：模型', '心理健康', '班级总结'],
    ['社区服务', '科学：天文', '美术：陶艺', '大课间', '职业分享', '体育：武术', 'AI音乐', '班级总结'],
    ['阅读马拉松', '数学魔术', '植物标本', '大课间', '英语歌曲', '手工：拓印', '演讲比赛', '班级总结'],
    ['创意集市', '辩论决赛', '科学展', '大课间', '英语话剧', '体育：趣味赛', '戏剧排演', '班级总结'],
    ['作品展览', '科技：火箭', 'AI与未来', '大课间', '写信课', '体育：运动会', '联欢晚会', '班级总结'],
    ['结营仪式', '回顾视频', '合影留念', '', '临别信', '告别会', '', ''],
  ]
  for (let d = 0; d < 13; d++) {
    days.push({
      date: `2026-07-${String(19 + d).padStart(2, '0')}`,
      dayLabel: `Day ${d + 1}`,
      slots: courses[d].filter(c => c).map((c, i) => ({
        time: times[i] || '自由活动',
        className: c,
        teacher: ['黄老师', '周老师', '王老师', '', '李老师', '黄老师', '周老师', '黄老师'][i],
        location: ['教室A', '教室B', '实验室', '', '多功能厅', '操场', '美术室', '教室A'][i],
        notes: '',
      })),
    })
  }
  return { id: 'sch1', teamId: 't1', semesterId: 's1', theme: 'green', days }
}
export const MOCK_SCHEDULE = buildSchedule()

// ── 课堂 ──
// ═══ 生成 13 天×3-4节 = 45 节完整课堂数据 ═══
type CourseSeed = {dayNum:number;date:string;timeSlot:string;emoji:string;color:string;courseName:string;teacher:string;location:string;preNotified:boolean;matCount:number;momCount:number;noteCount:number;description:string}

const COURSE_SEEDS:CourseSeed[] = [
  // ═══ Day 1 · 开营 ═══
  {dayNum:1,date:'2026-07-19',timeSlot:'8:00-9:00',emoji:'🚌',color:'#d4855e',courseName:'出发',teacher:'黄老师',location:'—',preNotified:true,matCount:0,momCount:0,noteCount:0,description:'集合出发，前往筠连'},
  {dayNum:1,date:'2026-07-19',timeSlot:'9:15-10:15',emoji:'🎉',color:'#e74c3c',courseName:'开营仪式',teacher:'黄老师',location:'多功能厅',preNotified:true,matCount:2,momCount:2,noteCount:1,description:'60个孩子第一次聚在一起，害羞、好奇、期待'},
  {dayNum:1,date:'2026-07-19',timeSlot:'10:30-11:30',emoji:'🇨🇳',color:'#e74c3c',courseName:'红色文化教育：从宜宾人赵一曼说起',teacher:'黄老师',location:'多功能厅',preNotified:true,matCount:1,momCount:1,noteCount:0,description:'"她是我们的老乡"——本地英雄比课本上的更亲切'},

  // ═══ Day 2 ═══
  {dayNum:2,date:'2026-07-20',timeSlot:'8:00-9:00',emoji:'🤖',color:'#4a7eb5',courseName:'AI赋能营：智能科技点亮家乡生活 第一课时',teacher:'黄老师',location:'教室A',preNotified:true,matCount:2,momCount:2,noteCount:1,description:'孩子们第一次接触AI，全场"哇"声一片'},
  {dayNum:2,date:'2026-07-20',timeSlot:'9:15-10:15',emoji:'🛡️',color:'#f39c12',courseName:'安全知识小课堂：防溺水+独自在家安全',teacher:'周老师',location:'教室B',preNotified:true,matCount:1,momCount:1,noteCount:0,description:'根据筠连县实情开展安全教育'},
  {dayNum:2,date:'2026-07-20',timeSlot:'10:30-11:30',emoji:'🎨',color:'#7a9a5a',courseName:'云上山歌，听见筠连：山歌+苗族大唢呐赏析',teacher:'周老师',location:'多功能厅',preNotified:false,matCount:1,momCount:1,noteCount:0,description:'孩子们跟着山歌打节拍，小雅主动唱了一段苗族民歌'},

  // ═══ Day 3 ═══
  {dayNum:3,date:'2026-07-21',timeSlot:'8:00-9:00',emoji:'🌍',color:'#27ae60',courseName:'碳足迹侦探营：解锁低碳生活密码 第一课时',teacher:'周老师',location:'教室B',preNotified:true,matCount:2,momCount:2,noteCount:1,description:'分组讨论"我的碳足迹"，浩然说"筠连有很多风可以发电"'},
  {dayNum:3,date:'2026-07-21',timeSlot:'9:15-10:15',emoji:'🗣️',color:'#8e44ad',courseName:'小型辩论会',teacher:'黄老师',location:'教室A',preNotified:false,matCount:0,momCount:1,noteCount:0,description:'"AI会不会取代老师？"——孩子们的观点让人惊喜'},
  {dayNum:3,date:'2026-07-21',timeSlot:'10:30-11:30',emoji:'🐎',color:'#d4855e',courseName:'马蹄声里看筠连：历史小课堂',teacher:'黄老师',location:'多功能厅',preNotified:false,matCount:1,momCount:1,noteCount:0,description:'讲古驿道、马帮和筠连的千年历史'},
  {dayNum:3,date:'2026-07-21',timeSlot:'14:30-15:30',emoji:'🔬',color:'#2980b9',courseName:'科学小实验：厨房里的科学魔法',teacher:'王老师',location:'实验室',preNotified:true,matCount:1,momCount:1,noteCount:0,description:'用醋和小苏打做的"火山"，浩然第一个成功'},

  // ═══ Day 4 ═══
  {dayNum:4,date:'2026-07-22',timeSlot:'8:00-9:00',emoji:'🗺️',color:'#16a085',courseName:'走遍中国：中国地理',teacher:'周老师',location:'教室B',preNotified:true,matCount:2,momCount:1,noteCount:0,description:'从四川到全国，孩子们画了自己最想去的地方'},
  {dayNum:4,date:'2026-07-22',timeSlot:'9:15-10:15',emoji:'💻',color:'#4a7eb5',courseName:'计算机初认识：计算机发展史',teacher:'黄老师',location:'教室A',preNotified:true,matCount:1,momCount:1,noteCount:0,description:'第一次看到电脑主板的实物，孩子们轮流摸了一下CPU'},
  {dayNum:4,date:'2026-07-22',timeSlot:'10:30-11:30',emoji:'🌋',color:'#e74c3c',courseName:'科学小实验：火山喷发',teacher:'王老师',location:'实验室',preNotified:true,matCount:2,momCount:3,noteCount:2,description:'浩然第一个完成实验，子涵第一次上台讲解原理——两个里程碑'},
  {dayNum:4,date:'2026-07-22',timeSlot:'14:30-15:30',emoji:'🎨',color:'#9b59b6',courseName:'绘画小课堂：画出家乡的风景',teacher:'王老师',location:'教室A',preNotified:false,matCount:1,momCount:1,noteCount:0,description:'小组合作画"心中的筠连"，走廊变身画廊'},

  // ═══ Day 5 ═══
  {dayNum:5,date:'2026-07-23',timeSlot:'8:00-9:00',emoji:'📖',color:'#8e44ad',courseName:'读书分享会',teacher:'黄老师',location:'教室A',preNotified:true,matCount:1,momCount:2,noteCount:1,description:'小雨讲《草房子》差点哭了，浩然模仿孙悟空全班大笑'},
  {dayNum:5,date:'2026-07-23',timeSlot:'9:15-10:15',emoji:'🔬',color:'#2980b9',courseName:'厨房里的科学小魔法',teacher:'王老师',location:'实验室',preNotified:true,matCount:1,momCount:1,noteCount:0,description:'生活中的物理化学小知识'},
  {dayNum:5,date:'2026-07-23',timeSlot:'10:30-11:30',emoji:'🍵',color:'#27ae60',courseName:'家乡的叶子：茶叶与茶文化',teacher:'周老师',location:'多功能厅',preNotified:true,matCount:1,momCount:1,noteCount:0,description:'讲筠连红茶——原来我们每天都在喝"世界名茶"'},

  // ═══ Day 6 ═══
  {dayNum:6,date:'2026-07-24',timeSlot:'8:00-9:00',emoji:'🦋',color:'#27ae60',courseName:'生物知识小课堂：筠连动植物',teacher:'周老师',location:'教室B',preNotified:false,matCount:2,momCount:2,noteCount:1,description:'户外观察——孩子们比老师更懂当地植物'},
  {dayNum:6,date:'2026-07-24',timeSlot:'9:15-10:15',emoji:'📝',color:'#f39c12',courseName:'说文解字：汉字发展历程',teacher:'黄老师',location:'教室A',preNotified:true,matCount:1,momCount:1,noteCount:0,description:'从甲骨文到简体字，孩子们用毛笔写了自己的名字'},
  {dayNum:6,date:'2026-07-24',timeSlot:'10:30-11:30',emoji:'🇨🇳',color:'#e74c3c',courseName:'我与我的祖国：爱国主义教育',teacher:'黄老师',location:'多功能厅',preNotified:true,matCount:1,momCount:1,noteCount:0,description:'从神州二十三号说到"两弹一星"'},

  // ═══ Day 7 ═══
  {dayNum:7,date:'2026-07-25',timeSlot:'8:00-9:00',emoji:'🔢',color:'#4a7eb5',courseName:'生活中的数学小知识',teacher:'王老师',location:'教室A',preNotified:true,matCount:1,momCount:1,noteCount:0,description:'超市打折、球场面积——数学其实每天都在用'},
  {dayNum:7,date:'2026-07-25',timeSlot:'9:15-10:15',emoji:'🗺️',color:'#16a085',courseName:'走遍四川：四川地理文化',teacher:'周老师',location:'教室B',preNotified:true,matCount:2,momCount:1,noteCount:0,description:'从都江堰到九寨沟，孩子们画了一条"四川旅行路线"'},
  {dayNum:7,date:'2026-07-25',timeSlot:'10:30-11:30',emoji:'🎤',color:'#9b59b6',courseName:'唱响未来：唱歌及表演展示',teacher:'周老师',location:'多功能厅',preNotified:false,matCount:0,momCount:1,noteCount:0,description:'欣怡第一次在全班面前独唱，《小燕子》让所有人安静'},
  {dayNum:7,date:'2026-07-25',timeSlot:'14:30-15:30',emoji:'🏃',color:'#e74c3c',courseName:'趣味运动会',teacher:'王老师',location:'操场',preNotified:true,matCount:2,momCount:4,noteCount:1,description:'7天的高潮——浩然带队喊口号，欣怡跑最后一名但笑得最灿烂'},

  // ═══ Day 8 ═══
  {dayNum:8,date:'2026-07-26',timeSlot:'8:00-9:00',emoji:'🌿',color:'#27ae60',courseName:'低碳计划行动营：碳足迹减法',teacher:'周老师',location:'教室A',preNotified:false,matCount:1,momCount:1,noteCount:1,description:'每个人制定了"我的低碳行动计划"贴在教室墙上'},
  {dayNum:8,date:'2026-07-26',timeSlot:'9:15-10:15',emoji:'🧪',color:'#2980b9',courseName:'像科学家一样提问：思维模式',teacher:'王老师',location:'实验室',preNotified:true,matCount:1,momCount:1,noteCount:0,description:'"为什么天空是蓝色的？"——每个问题都值得认真对待'},
  {dayNum:8,date:'2026-07-26',timeSlot:'10:30-11:30',emoji:'🪨',color:'#d4855e',courseName:'溶洞里的为什么：筠州地质探秘',teacher:'周老师',location:'多功能厅',preNotified:true,matCount:2,momCount:1,noteCount:0,description:'筠连有226处溶洞——用喀斯特地貌讲地球的故事'},

  // ═══ Day 9 ═══
  {dayNum:9,date:'2026-07-27',timeSlot:'8:00-9:00',emoji:'✍️',color:'#8e44ad',courseName:'趣味作文：写出一件小事',teacher:'黄老师',location:'教室A',preNotified:true,matCount:2,momCount:2,noteCount:1,description:'"作文就是写自己经历过的事"——浩然第一次写出超过200字'},
  {dayNum:9,date:'2026-07-27',timeSlot:'9:15-10:15',emoji:'😊',color:'#f39c12',courseName:'我的情绪我做主：心理素质教育',teacher:'黄老师',location:'多功能厅',preNotified:true,matCount:1,momCount:1,noteCount:0,description:'教孩子们认识情绪、表达情绪——"生气是可以说的"'},
  {dayNum:9,date:'2026-07-27',timeSlot:'10:30-11:30',emoji:'✒️',color:'#16a085',courseName:'妙墨中国心：软笔书法小课堂',teacher:'周老师',location:'教室B',preNotified:false,matCount:1,momCount:1,noteCount:0,description:'每个孩子写了一个"家"字——歪歪扭扭但很认真'},

  // ═══ Day 10 ═══
  {dayNum:10,date:'2026-07-28',timeSlot:'8:00-9:00',emoji:'📜',color:'#d4855e',courseName:'你好！历史君 第三课时',teacher:'黄老师',location:'多功能厅',preNotified:true,matCount:1,momCount:1,noteCount:0,description:'从秦朝到现代，用时间线把历史串起来'},
  {dayNum:10,date:'2026-07-28',timeSlot:'9:15-10:15',emoji:'⚡',color:'#f39c12',courseName:'智能环保科技营：绿色能源发电大揭秘',teacher:'王老师',location:'实验室',preNotified:true,matCount:1,momCount:1,noteCount:0,description:'太阳能板+小风扇，体验"光变电"的神奇'},
  {dayNum:10,date:'2026-07-28',timeSlot:'10:30-11:30',emoji:'🇨🇳',color:'#e74c3c',courseName:'红色文化教育：赵一曼的故事',teacher:'黄老师',location:'多功能厅',preNotified:true,matCount:2,momCount:1,noteCount:1,description:'"她是我们的老乡"——浩然课后说"原来筠连也有英雄"'},

  // ═══ Day 11 ═══
  {dayNum:11,date:'2026-07-29',timeSlot:'8:00-9:00',emoji:'🏮',color:'#e74c3c',courseName:'中华传统文化宣讲',teacher:'黄老师',location:'多功能厅',preNotified:true,matCount:1,momCount:1,noteCount:0,description:'春节、端午、中秋——每个节日背后的故事'},
  {dayNum:11,date:'2026-07-29',timeSlot:'9:15-10:15',emoji:'🔍',color:'#8e44ad',courseName:'我是小侦探：常见错别字+易错音',teacher:'周老师',location:'教室A',preNotified:false,matCount:1,momCount:1,noteCount:0,description:'"以"和"已"——用故事记住易错字'},
  {dayNum:11,date:'2026-07-29',timeSlot:'10:30-11:30',emoji:'✂️',color:'#f39c12',courseName:'剪纸拼贴画制作',teacher:'王老师',location:'教室B',preNotified:true,matCount:1,momCount:1,noteCount:0,description:'用彩纸剪出"我心中的家乡"'},
  {dayNum:11,date:'2026-07-29',timeSlot:'14:30-15:30',emoji:'🎵',color:'#9b59b6',courseName:'云上山歌：筠连山歌与苗族文化',teacher:'周老师',location:'多功能厅',preNotified:true,matCount:3,momCount:3,noteCount:1,description:'小雅穿苗族服装教跳舞——最美的文化自信课'},

  // ═══ Day 12 ═══
  {dayNum:12,date:'2026-07-30',timeSlot:'8:00-9:00',emoji:'🎨',color:'#7a9a5a',courseName:'唱响未来：音乐鉴赏',teacher:'周老师',location:'多功能厅',preNotified:true,matCount:1,momCount:1,noteCount:0,description:'从古典到流行——用音乐讲情感'},
  {dayNum:12,date:'2026-07-30',timeSlot:'9:15-10:15',emoji:'🏆',color:'#f39c12',courseName:'作品展览与文艺汇演',teacher:'黄老师',location:'多功能厅',preNotified:true,matCount:2,momCount:3,noteCount:1,description:'走廊贴满12天的心血——小宇第一次独唱，紧张但坚持唱完了'},
  {dayNum:12,date:'2026-07-30',timeSlot:'10:30-11:30',emoji:'🚀',color:'#4a7eb5',courseName:'现代史科普：从两弹一星到神州二十三号',teacher:'黄老师',location:'多功能厅',preNotified:true,matCount:1,momCount:1,noteCount:0,description:'从戈壁滩到空间站——中国科技的60年'},

  // ═══ Day 13 ═══
  {dayNum:13,date:'2026-07-31',timeSlot:'9:15-10:15',emoji:'💌',color:'#e74c3c',courseName:'结营仪式：临别信分发',teacher:'黄老师',location:'多功能厅',preNotified:true,matCount:2,momCount:4,noteCount:2,description:'AI生成的信+孩子们自己写的信——教室里哭成一片'},
  {dayNum:13,date:'2026-07-31',timeSlot:'10:30-11:30',emoji:'✨',color:'#9b59b6',courseName:'结营仪式：做更好的小朋友',teacher:'黄老师',location:'多功能厅',preNotified:true,matCount:1,momCount:1,noteCount:0,description:'最后一张全班合影——这一次没有人躲在后面'},
]

// 从种子生成完整课堂对象
const SAMPLE_MATERIALS: Material[] = [
  {id:'ms',title:'教学PPT课件',type:'ppt',fileSize:'8.7MB',url:'#',uploadedAt:'2026-07-20',uploadedBy:'黄老师'},
  {id:'m2',title:'课程教案Word',type:'word',fileSize:'0.5MB',url:'#',uploadedAt:'2026-07-20',uploadedBy:'周老师'},
  {id:'m3',title:'教学参考PDF',type:'pdf',fileSize:'2.1MB',url:'#',uploadedAt:'2026-07-20',uploadedBy:'王老师'},
  {id:'m4',title:'教学演示视频',type:'video',fileSize:'45MB',url:'#',uploadedAt:'2026-07-20',uploadedBy:'黄老师'},
]
const SAMPLE_MOMENTS: ClassroomMoment[] = [
  {id:'p1',type:'photo',url:'📸',caption:'课堂精彩瞬间——孩子们积极互动',createdAt:'12:00',author:'黄老师',tags:['课堂','互动']},
  {id:'p2',type:'photo',url:'🖼️',caption:'学生作品展示',createdAt:'12:05',author:'周老师',tags:['作品']},
  {id:'p3',type:'video',url:'🎬',caption:'课堂活动视频片段',createdAt:'13:00',author:'王老师',tags:['视频']},
]
const SAMPLE_NOTES: TeachingNote[] = [
  {id:'n1',content:'课堂效果很好，孩子们参与度超出预期。有几个平时安静的学生今天也主动发言了。',author:'黄老师',mood:'惊喜',createdAt:'',tags:['参与度']},
  {id:'n2',content:'节奏稍快，下次可以留更多时间给小组讨论。个别低年级学生需要额外关注。',author:'周老师',mood:'正常',createdAt:'',tags:['改进']},
]

function buildClassrooms(): Classroom[] {
  return COURSE_SEEDS.map((s,i) => ({
    id:'class-'+s.dayNum+'-'+(i+1),
    date:s.date,dayNum:s.dayNum,timeSlot:s.timeSlot,
    courseName:s.courseName,courseEmoji:s.emoji,courseColor:s.color,
    teacher:s.teacher,location:s.location,
    preNotified:s.preNotified,
    notifiedTeachers:s.preNotified?['黄老师','周老师','王老师'].filter(()=>Math.random()>0.3):[],
    materials:SAMPLE_MATERIALS.slice(0,s.matCount).map(m=>({...m,id:'cm'+i+'-'+m.id,uploadedAt:s.date,uploadedBy:[s.teacher,'黄老师','周老师'][Math.floor(Math.random()*3)]})),
    moments:SAMPLE_MOMENTS.slice(0,s.momCount).map(m=>({...m,id:'cp'+i+'-'+m.id,createdAt:s.date+' '+m.createdAt,author:[s.teacher,'黄老师','周老师','王老师'][Math.floor(Math.random()*4)]})),
    teachingNotes:SAMPLE_NOTES.slice(0,s.noteCount).map(n=>({...n,id:'cn'+i+'-'+n.id,createdAt:s.date,author:s.teacher})),
  }))
}
export const MOCK_CLASSROOMS: Classroom[] = buildClassrooms()

// ── 消息 ──
export const MOCK_CONVERSATIONS: Conversation[] = [
  { id: 'conv1', participants: ['u1', 'u2'], lastMessage: '明天的课表我调整了一下，你看看', lastMessageAt: '2026-07-25 21:30', unread: 2, type: 'direct' },
  { id: 'conv2', participants: ['u1', 'u3', 'u4'], lastMessage: '收到，运动会方案已更新', lastMessageAt: '2026-07-25 20:15', unread: 0, type: 'group' },
  { id: 'conv3', participants: ['u1', 'u5'], lastMessage: '这届学生的表现很出色，辛苦了', lastMessageAt: '2026-07-24 18:00', unread: 0, type: 'direct' },
]
export const MOCK_MESSAGES: Record<string, Message[]> = {
  conv1: [
    { id: 'msg1', conversationId: 'conv1', senderId: 'u2', senderName: '周老师', content: '明天的课表我调整了一下，你看看行不行？美术和体育换了一下位置', createdAt: '2026-07-25 21:00' },
    { id: 'msg2', conversationId: 'conv1', senderId: 'u2', senderName: '周老师', content: '因为下午太热了，体育课放在上午比较好', createdAt: '2026-07-25 21:02' },
    { id: 'msg3', conversationId: 'conv1', senderId: 'u1', senderName: '黄寒阳', content: '好的没问题，我来改课表', createdAt: '2026-07-25 21:10' },
    { id: 'msg4', conversationId: 'conv1', senderId: 'u2', senderName: '周老师', content: '👍 辛苦了', createdAt: '2026-07-25 21:30' },
  ],
  conv2: [
    { id: 'msg5', conversationId: 'conv2', senderId: 'u1', senderName: '黄寒阳', content: '运动会方案初稿发群里了，大家看看有什么要改的', createdAt: '2026-07-25 19:00' },
    { id: 'msg6', conversationId: 'conv2', senderId: 'u3', senderName: '王老师', content: '我觉得接力赛可以多加一组，孩子们都很喜欢', createdAt: '2026-07-25 19:30' },
    { id: 'msg7', conversationId: 'conv2', senderId: 'u4', senderName: '李老师', content: '收到，运动会方案已更新', createdAt: '2026-07-25 20:15' },
  ],
}

// ── 评价 ──
export const MOCK_REVIEWS: Review[] = [
  { id: 'rv1', targetId: 'u2', targetName: '周老师', reviewerId: 'u1', rating: 5, content: '工作认真负责，课讲的特别好，孩子们都很喜欢你', createdAt: '2026-07-29' },
  { id: 'rv2', targetId: 'u3', targetName: '王老师', reviewerId: 'u1', rating: 5, content: '运动会的组织非常出色，孩子们玩得很开心', createdAt: '2026-07-29' },
]

// ── 公告 ──
export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: 'a1', teamId: 't1', title: '📢 Day 5 运动会安排', content: '明天上午8:30在操场集合，请穿运动服。分组名单已贴在教室门口。注意防晒！', author: '黄寒阳', pinned: true, createdAt: '2026-07-23' },
  { id: 'a2', teamId: 't1', title: '📝 每日评语提交提醒', content: '请在每天16:50班级总结之后提交当日学生评语，每条不少于20字。', author: '周老师', pinned: false, createdAt: '2026-07-20' },
  { id: 'a3', teamId: 't1', title: '🎒 学生物品注意事项', content: '请提醒学生每天自带水杯。发现有几位学生水杯不够，建议从支教物资中调配。', author: '王老师', pinned: false, createdAt: '2026-07-21' },
]

// ── 相册 ──
export const MOCK_ALBUMS: Album[] = [
  { id: 'alb1', teamId: 't1', title: '开营仪式', cover: '🎉', count: 45, createdAt: '2026-07-19' },
  { id: 'alb2', teamId: 't1', title: '科学实验课', cover: '🔬', count: 32, createdAt: '2026-07-22' },
  { id: 'alb3', teamId: 't1', title: '运动会', cover: '🏃', count: 78, createdAt: '2026-07-24' },
  { id: 'alb4', teamId: 't1', title: '美术作品展', cover: '🎨', count: 56, createdAt: '2026-07-27' },
]

// ── 资源库 ──
export const MOCK_RESOURCES: Resource[] = [
  { id: 'res1', teamId: 't1', title: 'AI启蒙课教案', type: 'lesson_plan', url: '#', uploadedBy: '黄寒阳', createdAt: '2026-07-18' },
  { id: 'res2', teamId: 't1', title: '火山实验步骤', type: 'worksheet', url: '#', uploadedBy: '周老师', createdAt: '2026-07-20' },
  { id: 'res3', teamId: 't1', title: '每日评语模板', type: 'template', url: '#', uploadedBy: '黄寒阳', createdAt: '2026-07-18' },
]

// ── 笔友匹配 ──
export const MOCK_PENPAL_MATCHES: PenpalMatch[] = [
  { id: 'pm1', studentAId: '1', studentBId: '5', studentAName: '刘小宇', studentBName: '李子涵', score: 89, reason: '都爱科学和画画，性格互补——小宇开朗的子涵腼腆', firstLetterSuggestion: '可以聊聊各自最喜欢的恐龙', status: 'active', letters: [
    { id: 'pl1', matchId: 'pm1', senderId: '1', content: '子涵你好！黄老师说你也喜欢恐龙？我最喜欢霸王龙，你呢？', aiAssisted: false, read: true, createdAt: '2026-07-28' },
    { id: 'pl2', matchId: 'pm1', senderId: '5', content: '小宇你好！我最喜欢三角龙，因为它有角可以保护自己。下次可以一起看恐龙的书吗？', aiAssisted: true, read: true, createdAt: '2026-07-29' },
  ], createdAt: '2026-07-28' },
  { id: 'pm2', studentAId: '2', studentBId: '4', studentAName: '陈小雨', studentBName: '张欣怡', score: 82, reason: '都爱读书和唱歌，性格相似——都是安静型但内心丰富', firstLetterSuggestion: '可以分享各自最近读的一本书', status: 'pending', letters: [], createdAt: '2026-07-29' },
]

// ── 树洞 ──
export const MOCK_TREEHOLE_MESSAGES: TreeholeMessage[] = [
  { id: 'th1', teamId: 't1', anonymousAlias: '小叶子', anonymousAvatar: '🍃', content: '今天有个孩子怎么都教不会数学题，我很沮丧。是不是我不适合当老师？', visibility: 'ai_only', reply: '你已经做得很好了。乡村教育本来就不容易，每个孩子的节奏不同。你愿意反复教他，这本身就说明你是一个好老师。', replyType: 'ai', createdAt: '2026-07-24' },
  { id: 'th2', teamId: 't1', anonymousAlias: '小山鹰', anonymousAvatar: '🦅', content: '今天运动会太开心了！看到孩子们在操场上奔跑的样子，觉得一切辛苦都值得', visibility: 'whole_team', reply: '是的！今天浩然带大家喊口号的时候我都快哭了😭', replyType: 'human', createdAt: '2026-07-25' },
]

// ── 方言词典 ──
export const MOCK_DIALECT_ENTRIES: DialectEntry[] = [
  { id: 'd1', teamId: 't1', mandarin: '要得', dialect: '要得', dialectType: '四川话', category: '日常', usage: '老师问"明天去写生好不好"，学生齐声答"要得！"' },
  { id: 'd2', teamId: 't1', mandarin: '晓得', dialect: '晓得', dialectType: '四川话', category: '日常', usage: '"你晓得这个字怎么写不？"' },
  { id: 'd3', teamId: 't1', mandarin: '安逸', dialect: '安逸', dialectType: '四川话', category: '日常', usage: '"今天吃冰粉好安逸哦"' },
  { id: 'd4', teamId: 't1', mandarin: '巴适', dialect: '巴适', dialectType: '四川话', category: '日常', usage: '"这个天气在教室里吹风扇太巴适了"' },
]

// ── 成长视频 ──
export const MOCK_VIDEO_SCRIPTS: VideoScript[] = [
  { id: 'v1', studentId: '1', title: '闪亮的星——刘小宇的12天', scenes: [
    { startSec: 0, endSec: 5, type: 'title', text: '闪亮的星', animation: 'fadeIn' },
    { startSec: 5, endSec: 15, type: 'caption', text: 'Day1：安静怕生', animation: 'slideUp' },
    { startSec: 15, endSec: 35, type: 'photo', text: '', photoIndex: 0, animation: 'fadeIn' },
    { startSec: 35, endSec: 50, type: 'caption', text: '"他装作不在意，下课偷偷跑去看了三次"', animation: 'typewriter' },
    { startSec: 50, endSec: 58, type: 'transition', text: '成长关键词：勇敢 好奇 助人', animation: 'fadeIn' },
    { startSec: 58, endSec: 60, type: 'ending', text: '凡星支教队 · 2026夏天', animation: 'fadeIn' },
  ], narration: '从怕生到闪闪发光，12天见证你的蜕变', backgroundMusic: '钢琴 - 温柔', keyWords: ['勇敢', '好奇', '助人', '成长'], duration: 60, status: 'complete', createdAt: '2026-07-30' },
]

// ── 仪表盘数据 ──
export const MOCK_DASHBOARD: DashboardData = {
  studentCount: 60, diaryCount: 128, photoCount: 342, classCount: 34, activeTrend: 12,
  recentDiaries: [
    { studentName: '刘小宇', content: '今天主动帮同桌讲解数学题，讲了三遍直到对方完全理解，非常有耐心', timeAgo: '10分钟前' },
    { studentName: '陈小雨', content: '作文写了整整两页纸，描述了和欣怡一起去摘野花的故事，细腻感人', timeAgo: '25分钟前' },
    { studentName: '王浩然', content: '运动会方阵排练时主动帮一年级的同学系鞋带，越来越有大哥的样子了', timeAgo: '1小时前' },
  ],
  tagDistribution: [
    { name: '开朗', count: 28 }, { name: '爱画画', count: 22 }, { name: '数学好', count: 16 }, { name: '乐于助人', count: 12 }, { name: '勇敢', count: 10 }, { name: '运动好', count: 8 },
  ],
  upcomingClasses: [
    { time: '明天 8:30', title: '户外写生课' }, { time: '明天 14:30', title: 'AI编程启蒙' },
  ],
}

// ── 通知 ──
export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'success', title: 'AI临别信生成完成', content: '刘小宇的临别信已生成，点击查看', read: false, createdAt: '2026-07-30' },
  { id: 'n2', type: 'info', title: '新笔友匹配', content: '陈小雨和张欣怡匹配成功，匹配度82%', read: false, createdAt: '2026-07-29' },
  { id: 'n3', type: 'warning', title: '课表调整提醒', content: '明天的体育课调到上午9:20', read: true, createdAt: '2026-07-25' },
]
