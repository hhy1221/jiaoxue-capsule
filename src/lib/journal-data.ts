/**
 * 成长日志 — 课堂/活动为单位的 timeline 记忆系统
 * 教师 + 学生双视角，为临别信和宣传稿提供素材支撑
 */
export interface JournalEntry {
  id: string
  dayNum: number
  date: string
  timeSlot: string
  courseName: string
  courseEmoji: string
  courseColor: string
  teacher: string
  location: string
  // 教师视角
  teacherReflection: string
  teacherPhotos: string[]
  teachingHighlight: string // 教学亮点——这节课最成功的瞬间
  // 学生视角
  studentReflections: { studentName: string; studentAvatar: string; content: string; createdAt: string }[]
  studentPhotos: string[] // 学生上传的照片/作品
  // 关键瞬间（可标记为"值得写进临别信"）
  keyMoments: { content: string; author: string; type: 'teacher' | 'student'; forLetter?: boolean }[]
  // 标签
  tags: string[]
}

// ── Mock 数据：13天夏令营中的精选课堂日志 ──
export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id:'j1',dayNum:1,date:'2026-07-19',timeSlot:'8:00-9:00',courseName:'出发！开营仪式',courseEmoji:'🚌',courseColor:'#d4855e',
    teacher:'黄老师',location:'大巴车上→城南社区',
    teacherReflection:'早上6点集合，大家都兴奋得睡不着。大巴车驶出成都的时候天刚亮，窗外的山慢慢多起来。到筠连的时候孩子们已经在校门口等着了。开营仪式上，我们让每个孩子在签名墙上写下自己的名字——有个女孩写得很慢很认真，写完抬头看我笑了一下。那一刻我知道，这13天会不一样。',
    teacherPhotos:[],teachingHighlight:'签名墙——孩子们第一次写下自己的名字时的认真表情',
    studentReflections:[
      {studentName:'小宇',studentAvatar:'🌟',content:'今天认识了新老师！他们说会和我们玩13天',createdAt:'7/19'},
    ],
    studentPhotos:[],
    keyMoments:[{content:'孩子们在校门口等了一上午，看到大巴车时全都跑过来',author:'黄老师',type:'teacher',forLetter:true}],
    tags:['开营','Day1','出发'],
  },
  {
    id:'j2',dayNum:2,date:'2026-07-20',timeSlot:'9:15-10:15',courseName:'安全知识小课堂',courseEmoji:'🛡️',courseColor:'#f39c12',
    teacher:'周老师',location:'教室B',
    teacherReflection:'今天讲防溺水和居家安全。我们用角色扮演的方式——让孩子们分两组，一组演"危险的场景"，另一组演"正确的做法"。浩然演得特别投入，假装掉进河里然后大声呼救，全班都记住了"不要自己去救人，要叫大人"。课后好几个孩子跑来说"老师我知道不能去河边玩了"。',
    teacherPhotos:[],teachingHighlight:'角色扮演——浩然逼真的"溺水呼救"让全班记住了安全知识',
    studentReflections:[
      {studentName:'浩然',studentAvatar:'🚀',content:'今天我演了掉河里的人！老师说我演得很好',createdAt:'7/20'},
      {studentName:'小雨',studentAvatar:'🌻',content:'我知道了不能一个人去河边玩',createdAt:'7/20'},
    ],
    studentPhotos:[],
    keyMoments:[{content:'浩然说"原来筠连也有英雄"——课后跑去问老师赵一曼是不是筠连人',author:'周老师',type:'teacher',forLetter:true}],
    tags:['安全教育','Day2','角色扮演'],
  },
  {
    id:'j3',dayNum:2,date:'2026-07-20',timeSlot:'10:30-11:30',courseName:'云上山歌——苗族大唢呐赏析',courseEmoji:'🎨',courseColor:'#7a9a5a',
    teacher:'周老师',location:'多功能厅',
    teacherReflection:'这是最让我惊喜的一节课。我们本来只打算放几段山歌录音，讲一讲苗族文化。没想到小雅站起来说"老师我会唱"——然后她就站在讲台上，用苗语唱了一整首。她的声音很轻，但教室里安静得能听见窗外的鸟叫。唱完之后全班鼓掌鼓了整整一分钟。',
    teacherPhotos:[],teachingHighlight:'小雅主动站起来用苗语唱了一整首民歌——全班自发鼓掌一分钟',
    studentReflections:[
      {studentName:'小雅',studentAvatar:'🎀',content:'我有点紧张但是很开心！同学们都说我唱得好听',createdAt:'7/20'},
    ],
    studentPhotos:[],keyMoments:[{content:'小雅用苗语唱歌的时候教室安静得能听见鸟叫',author:'周老师',type:'teacher',forLetter:true}],
    tags:['美育','苗族文化','Day2','音乐'],
  },
  {
    id:'j4',dayNum:3,date:'2026-07-21',timeSlot:'8:00-9:00',courseName:'碳足迹侦探营（上）',courseEmoji:'🌍',courseColor:'#27ae60',
    teacher:'周老师',location:'教室B',
    teacherReflection:'今天讲碳排放和环保。分组讨论"我的碳足迹"时，浩然举手说"我们这里有很多风，可以发电"。我当时非常惊讶——一个四年级的孩子能把家乡的自然条件和清洁能源联系起来。课后我专门找他聊了聊，他说是看新闻学的。这个孩子的求知欲让人感动。',
    teacherPhotos:[],teachingHighlight:'浩然说"我们这里有很多风可以发电"——四年级孩子把家乡与清洁能源联系起来',
    studentReflections:[{studentName:'浩然',studentAvatar:'🚀',content:'老师说我很有想法！风真的可以发电吗？我回去问我爸',createdAt:'7/21'}],
    studentPhotos:[],keyMoments:[{content:'浩然主动连接家乡资源与环保概念',author:'周老师',type:'teacher',forLetter:true}],
    tags:['智育','环保','Day3'],
  },
  {
    id:'j5',dayNum:4,date:'2026-07-22',timeSlot:'14:30-15:30',courseName:'绘画小课堂：画出家乡的风景',courseEmoji:'🎨',courseColor:'#9b59b6',
    teacher:'王老师',location:'教室A',
    teacherReflection:'今天让孩子们画"心中的家乡"。结果让人非常惊喜——有人画了山和梯田，有人画了奶奶家的老房子，有人画了学校门口的大树。小雨画了一大片向日葵田，她说"因为我觉得家乡应该是金色的"。我们把画贴在走廊里，下课的时候孩子们都围着看，指着画说"这是我家""这条河我认识"。',
    teacherPhotos:[],teachingHighlight:'走廊变身画廊——孩子们指着画说"这是我家"，自豪感溢于言表',
    studentReflections:[
      {studentName:'小雨',studentAvatar:'🌻',content:'我画了向日葵！因为向日葵总是追着太阳，就像我们要一直追着梦想',createdAt:'7/22'},
      {studentName:'大勇',studentAvatar:'🦁',content:'我画了我们家后面的山，老师说我画得像真的一样',createdAt:'7/22'},
    ],
    studentPhotos:[],keyMoments:[{content:'小雨说"家乡应该是金色的"',author:'王老师',type:'teacher',forLetter:true}],
    tags:['美育','绘画','Day4','家乡'],
  },
  {
    id:'j6',dayNum:5,date:'2026-07-23',timeSlot:'10:30-11:30',courseName:'家乡的叶子——茶叶与茶文化',courseEmoji:'🍵',courseColor:'#27ae60',
    teacher:'周老师',location:'多功能厅',
    teacherReflection:'今天的茶文化课特别接地气。我带了红茶让孩子们闻、看、摸，然后讲本地茶的历史。有个孩子举手说"我爷爷就是种茶的"——全班一下子就热闹了，每个人都在分享家里的故事。我突然意识到，这些孩子身上有太多我们不知道的知识和故事。',
    teacherPhotos:[],teachingHighlight:'孩子们争先恐后分享家里的故事——"我爷爷就是种茶的"',
    studentReflections:[{studentName:'子涵',studentAvatar:'📖',content:'原来我们每天喝的红茶是世界名茶！我爷爷说我们家的茶最好喝',createdAt:'7/23'}],
    studentPhotos:[],keyMoments:[{content:'从茶文化聊到每个孩子家里的故事——课堂变成了分享会',author:'周老师',type:'teacher',forLetter:true}],
    tags:['劳育','茶文化','Day5'],
  },
  {
    id:'j7',dayNum:6,date:'2026-07-24',timeSlot:'14:30-15:30',courseName:'趣味运动会',courseEmoji:'🏃',courseColor:'#6aaa50',
    teacher:'黄老师',location:'操场',
    teacherReflection:'今天的运动会把我们带回了童年——纸飞机大赛、麻袋跳、运水接力。没有标准跑道和器材，但孩子们的笑声比任何一场运动会都响。最让我触动的是"两人三足"——当两个平时不说话的孩子被绑在一起，他们必须合作。比赛结束后他们还拉着手，原来友谊可以这么简单。',
    teacherPhotos:[],teachingHighlight:'两人三足结束后的握手——平时不说话的孩子变成了朋友',
    studentReflections:[
      {studentName:'浩然',studentAvatar:'🚀',content:'我当上了方阵组长！带着一年级的弟弟妹妹喊口号，嗓子都喊哑了',createdAt:'7/24'},
      {studentName:'大勇',studentAvatar:'🦁',content:'纸飞机我飞了最远！',createdAt:'7/24'},
    ],
    studentPhotos:[],keyMoments:[{content:'两人三足让陌生孩子变成朋友',author:'黄老师',type:'teacher',forLetter:true}],
    tags:['体育','运动会','Day6'],
  },
  {
    id:'j8',dayNum:7,date:'2026-07-25',timeSlot:'15:45-16:45',courseName:'溶洞里的为什么——喀斯特地貌科普',courseEmoji:'🪨',courseColor:'#d4855e',
    teacher:'周老师',location:'多功能厅',
    teacherReflection:'讲本地溶洞的时候，孩子们的反应完全超出预期——"我去过！""我家后面就有一个！"他们知道的比我还多。我干脆把课反过来上——让孩子们来讲溶洞里有什么、怎么形成的。结果他们七嘴八舌地讲了一个小时，我在旁边做笔记。所谓支教，其实是双向的学习。',
    teacherPhotos:[],teachingHighlight:'孩子们反客为主——讲溶洞知识比老师还专业',
    studentReflections:[{studentName:'小雅',studentAvatar:'🎀',content:'我家后面的山洞里有钟乳石！我爸爸带我去看过',createdAt:'7/25'}],
    studentPhotos:[],keyMoments:[{content:'支教是双向的学习——孩子们对家乡的了解远超我们想象',author:'周老师',type:'teacher',forLetter:true}],
    tags:['智育','地质','Day7','本地'],
  },
  {
    id:'j9',dayNum:10,date:'2026-07-28',timeSlot:'10:30-11:30',courseName:'红色文化：赵一曼的故事',courseEmoji:'🇨🇳',courseColor:'#e74c3c',
    teacher:'黄老师',location:'多功能厅',
    teacherReflection:'今天讲赵一曼。当我讲到她是宜宾人、是"我们的老乡"时，孩子们的眼睛亮了起来。课后浩然跑来问我："老师，筠连也有英雄对不对？"我说是的，你们每个人以后都可以成为英雄。他使劲点了点头跑开了。',
    teacherPhotos:[],teachingHighlight:'浩然课后追问"筠连也有英雄对不对"——对家乡的自豪感被点燃了',
    studentReflections:[{studentName:'浩然',studentAvatar:'🚀',content:'赵一曼是我们的老乡！我以后也要做一个勇敢的人',createdAt:'7/28'}],
    studentPhotos:[],keyMoments:[{content:'浩然说"赵一曼是我们的老乡"——他眼中那种骄傲，是最好的教育成果',author:'黄老师',type:'teacher',forLetter:true}],
    tags:['德育','红色教育','Day10'],
  },
  {
    id:'j10',dayNum:11,date:'2026-07-29',timeSlot:'14:30-15:30',courseName:'绣山绣水——苗族文化与山歌',courseEmoji:'🎵',courseColor:'#9b59b6',
    teacher:'周老师',location:'多功能厅',
    teacherReflection:'小雅今天穿来了苗族服装。是她奶奶一针一线绣的——红色的底、金色的线、蝴蝶和花朵的图案。她穿着这套衣服站在讲台上给大家跳了一段苗族舞。跳完之后全班安静了几秒，然后爆发出的掌声比任何一节课都响。这是最不需要备课的课——因为孩子们自己就是最好的教材。',
    teacherPhotos:[],teachingHighlight:'小雅穿奶奶绣的苗族服装跳舞——最美的文化自信课',
    studentReflections:[{studentName:'小雅',studentAvatar:'🎀',content:'今天穿奶奶做的衣服跳舞了！一开始很紧张怕他们笑话我，但是没有人笑，他们都很认真地看。老师说这叫文化自信，我好像懂了。',createdAt:'7/29'}],
    studentPhotos:[],keyMoments:[{content:'小雅的苗族舞——最美的文化自信课，不需要备课',author:'周老师',type:'teacher',forLetter:true},{content:'小雅说"老师，我好像懂了什么叫文化自信"',author:'小雅',type:'student',forLetter:true}],
    tags:['美育','苗族文化','Day11','文化自信'],
  },
  {
    id:'j11',dayNum:12,date:'2026-07-30',timeSlot:'14:30-15:30',courseName:'合作项目——小组搭建纸塔',courseEmoji:'🏗️',courseColor:'#e8a040',
    teacher:'黄老师',location:'教室A',
    teacherReflection:'最后一个动手课。我给每组一叠报纸和一卷胶带，要求搭"最高的塔"。最初孩子们各自为战，塔倒了三四次。后来浩然站出来说"我来画图纸，你们按我说的搭"。一个四年级的孩子就这样成了项目经理。最终那座塔不是最高的，但每一层都有一个人的名字——他们学会了合作。',
    teacherPhotos:[],teachingHighlight:'浩然主动当起"项目经理"——四年级孩子学会了领导与合作',
    studentReflections:[{studentName:'浩然',studentAvatar:'🚀',content:'我是小组长！我们搭的塔虽然没有最高，但是每个人的名字都在上面',createdAt:'7/30'}],
    studentPhotos:[],keyMoments:[{content:'塔的每一层都有一个人的名字——合作让每个人都被看见',author:'黄老师',type:'teacher',forLetter:true}],
    tags:['劳育','合作','Day12'],
  },
  {
    id:'j12',dayNum:13,date:'2026-07-31',timeSlot:'17:00-18:00',courseName:'结营仪式——做更好的小朋友',courseEmoji:'🌈',courseColor:'#d4855e',
    teacher:'黄老师',location:'多功能厅',
    teacherReflection:'最后一天。我们给每个孩子发了"成长证书"——不是分数和排名，而是写着他们这13天最闪光的一句话。给小宇的写着"最有创意的恐龙制造者"，给小雅的写着"最美的文化传承人"。发证书的时候大勇哭了——他是全班个子最高的男孩，平时从来不哭。他说"老师你们明年还来吗"。我说"来，一定来"。',
    teacherPhotos:[],teachingHighlight:'每个孩子都收到了一份专属的"成长证书"',
    studentReflections:[
      {studentName:'小宇',studentAvatar:'🌟',content:'我收到了"最有创意的恐龙制造者"证书！我要拿回家给妈妈看',createdAt:'7/31'},
      {studentName:'大勇',studentAvatar:'🦁',content:'我今天哭了。老师说明年还来。我不舍得他们走。',createdAt:'7/31'},
      {studentName:'小雨',studentAvatar:'🌻',content:'老师走的时候我给了他们一人一朵向日葵——我自己画的。',createdAt:'7/31'},
    ],
    studentPhotos:[],keyMoments:[{content:'大勇哭了——全班最高的男孩第一次在外人面前流泪',author:'黄老师',type:'teacher',forLetter:true},{content:'小雨给每个老师送了一朵手绘的向日葵',author:'小雨',type:'student',forLetter:true}],
    tags:['结营','Day13','告别','证书'],
  },
]
