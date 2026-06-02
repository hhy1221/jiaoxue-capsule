// ═══════════════════════════════════════
// 支教社区 · 海量模拟数据 v2
// ═══════════════════════════════════════

import {
  CommunityQuestion, CommunityRecruit, CommunityStory,
  StudentSocialPost, InterestGroup, OfficialAccount,
} from '@/types'

// ── 社区图片路径映射 ──
const IMG = (name: string) => `/images/community/${name}.webp`
const AV = (name: string) => `/images/avatars/${name}-1.webp`

// ═══════════════════════════════════════
// 作者库（12位，用于各模块）
// ═══════════════════════════════════════

export const AUTHORS = {
  // 支教志愿者
  zhang: { id:'v1',name:'小张老师',avatar:IMG('author-volunteer-zhang'),role:'volunteer' as const,verified:true,badge:'凡星支教队',teamName:'凡星支教队',location:'四川筠连'},
  jie: { id:'v2',name:'阿杰',avatar:'杰',role:'volunteer' as const,verified:true,badge:'星辰支教队·队长',teamName:'星辰支教队',location:'贵州毕节'},
  zhou: { id:'v3',name:'小周',avatar:'周',role:'volunteer' as const,verified:true,badge:'阳光支教队',teamName:'阳光支教队',location:'四川凉山'},
  chen: { id:'v4',name:'小陈',avatar:'陈',role:'volunteer' as const,verified:true,badge:'启明星支教队',teamName:'启明星支教队',location:'甘肃定西'},
  han: { id:'u1',name:'黄寒阳',avatar:AV('liuxiaoyu'),role:'volunteer' as const,verified:true,badge:'凡星支教队·队长',teamName:'凡星支教队',location:'四川筠连'},

  // 教师
  li: { id:'t1',name:'李老师',avatar:'李',role:'teacher' as const,verified:true,badge:'小学数学·15年教龄',location:'四川成都'},
  wang: { id:'t2',name:'王老师',avatar:'王',role:'teacher' as const,verified:true,badge:'小学特级教师',location:'重庆'},
  liu: { id:'t3',name:'刘老师',avatar:'刘',role:'teacher' as const,verified:true,badge:'中学物理教师',location:'贵州贵阳'},
  yang: { id:'t5',name:'杨老师',avatar:'杨',role:'teacher' as const,verified:true,badge:'乡村美术教师',location:'四川泸州'},
  zhao: { id:'t4',name:'赵老师',avatar:'赵',role:'teacher' as const,verified:true,badge:'国家二级心理咨询师',location:'陕西西安'},
  zhouTeacher: { id:'t6',name:'周老师',avatar:'周',role:'teacher' as const,verified:true,badge:'小学语文教研员',location:'四川宜宾'},
  ma: { id:'t7',name:'马老师',avatar:'马',role:'teacher' as const,verified:true,badge:'中学英语教师·10年教龄',location:'甘肃兰州'},

  // 官方/政府
  junlian: { id:'g1',name:'筠连县团委',avatar:'🏛️',role:'govt' as const,verified:true,badge:'四川宜宾筠连县团委',location:'四川筠连'},
  yuanyang: { id:'g2',name:'元阳县教育局',avatar:'🏫',role:'govt' as const,verified:true,badge:'云南红河元阳县教育局',location:'云南红河'},
  leishan: { id:'g3',name:'雷山县教育局',avatar:'🏫',role:'govt' as const,verified:true,badge:'贵州黔东南雷山县教育局',location:'贵州黔东南'},

  // 公众
  lin: { id:'p1',name:'小林同学',avatar:'林',role:'public' as const,verified:false,badge:'西南大学·数学系大二',location:'四川成都'},
  wu: { id:'p2',name:'热心网友小吴',avatar:'吴',role:'public' as const,verified:false,location:'广东深圳'},
}

// ═══════════════════════════════════════
// 教学问答（12条）
// ═══════════════════════════════════════

export const QUESTIONS: CommunityQuestion[] = [
  {
    id:'q1',title:'如何在数学课上让三年级的孩子们保持注意力？',status:'answered',
    content:'我教的三年级数学课，孩子们上课到一半就开始走神。试过讲笑话、拍桌子，但效果不持久。有没有什么小游戏或者教学技巧能让40分钟的课堂一直保持活力？\n\n主要问题：\n1. 前半节课效果好，25分钟后就开始涣散\n2. 后排几个男生特别容易交头接耳\n3. 教室没有多媒体，只能用黑板和粉笔\n\n求实用的课堂管理技巧！',
    author:AUTHORS.zhang,subject:'math',gradeRange:'2-4年级',region:'西南',
    tags:['课堂管理','注意力','游戏教学','小学数学'],
    answers:[
      {id:'a1',content:'试试"数字接龙"游戏！每讲10分钟，停下来玩一轮。规则：老师说一个数字，学生站起来接龙（+3或×2）。错了就坐下，最后站着的得一颗星。\n\n补充几个具体方法：\n1. "站立计算"：全班起立，老师出题，算出答案的坐下，最慢的三个要表演节目（唱歌也行）\n2. "小黑板竞赛"：两人一组共用一块小黑板，老师出题后同时写答案，互相检查\n3. "我是小老师"：请最先算出的同学到黑板前给大家讲解\n\n我教了三年农村小学，这些方法在无多媒体条件下效果最好',author:AUTHORS.li,likes:28,isAccepted:true,createdAt:'2026-07-22'},
      {id:'a2',content:'农村孩子注意力容易分散很正常。建议把40分钟拆成4段：5分钟复习+10分钟新课+5分钟游戏+10分钟新课+5分钟练习+5分钟总结。中间穿插身体律动，像"站起/坐下"指令游戏。\n\n另外可以试试"暗号系统"：当你发现有人走神时，不说名字，而是敲两下黑板，全班一起做一个特定动作（比如拍手两下），这样既不伤自尊又能拉回注意力。',author:AUTHORS.wang,likes:15,isAccepted:false,createdAt:'2026-07-23'},
    ],views:342,likes:24,createdAt:'2026-08-04',
  },
  {
    id:'q2',title:'语文写作课：怎么引导孩子写出真情实感？',status:'open',
    content:'班上有个孩子小雨，每次作文都是"今天很开心""今天天气很好"。她其实内心很细腻，但一到动笔就不会表达。有没有什么好的写作引导方法？\n\n背景：小雨是留守儿童，和爷爷奶奶住，妈妈在广东打工。她的信里写"妈妈你别太累了"让我们所有老师都流泪，但写作文就是干巴巴的。',
    author:AUTHORS.zhouTeacher,subject:'chinese',gradeRange:'1-3年级',region:'西南',
    tags:['写作教学','情感表达','小学语文','留守儿童'],
    answers:[],views:156,likes:12,createdAt:'2026-07-23',
  },
  {
    id:'q3',title:'科学课没有实验器材怎么办？替代方案求助',status:'answered',
    content:'我们在贵州毕节支教，学校没有任何实验器材。这周要讲"水的三态变化"，没有酒精灯和烧杯。求低成本替代方案！\n\n学校现有：黑板、粉笔、水龙头、一个电水壶、学生自带的水杯。',
    author:AUTHORS.jie,subject:'science',gradeRange:'3-6年级',region:'西南',
    tags:['实验器材','低成本','替代方案','动手科学'],
    answers:[
      {id:'a3',content:'用矿泉水瓶代替烧杯，蜡烛代替酒精灯，冰块从村里小卖部买。讲"蒸发"时在黑板上用湿抹布写字，让孩子看字迹慢慢消失——这个实验零成本但孩子们记得最牢。\n\n具体方案：\n1. 蒸发：用粉笔蘸水在黑板上画画，3分钟就干了→引入"蒸发"概念\n2. 凝结：电水壶烧开水，让孩子用不锈钢杯盖接在壶嘴上方→看到水滴凝结\n3. 沸腾：观察水壶里的水从冒小泡到翻滚→讲解"沸点"\n4. 凝固：提前一晚在小卖部买的冰棍，课上拿出来让它融化→讲解"熔点"\n\n所有实验总成本不到5块钱！',author:AUTHORS.liu,likes:42,isAccepted:true,createdAt:'2026-07-24'},
    ],views:489,likes:56,createdAt:'2026-07-24',
  },
  {
    id:'q4',title:'体育课场地太小，如何设计60人的运动项目？',status:'open',
    content:'学校操场只有半个篮球场大，但有60个学生。之前分两组轮流，但等的那组就会闹。求小场地的体育课设计方案！',
    author:AUTHORS.zhou,subject:'pe',gradeRange:'1-6年级',region:'西南',
    tags:['体育课','小场地','大班额','运动游戏'],
    answers:[],views:203,likes:18,createdAt:'2026-07-25',
  },
  {
    id:'q5',title:'心理课：怎么跟留守儿童聊"想爸爸妈妈"这件事？',status:'answered',
    content:'班上超过一半的孩子父母在外打工。有个孩子上课突然哭起来说想妈妈了。我手足无措，不知道怎么安慰。求心理辅导技巧。',
    author:AUTHORS.chen,subject:'psychology',gradeRange:'1-6年级',region:'西北',
    tags:['留守儿童','心理辅导','情感支持'],
    answers:[
      {id:'a4',content:'不要急着转移注意力或说"别哭了"。先蹲下来抱抱他，等他哭完。然后可以跟他一起画一张"全家福"——画着画着，他会把思念变成画面。也可以让他写一封信给爸爸妈妈，你说你会帮忙寄出去。关键是给思念一个出口。',author:AUTHORS.zhao,likes:67,isAccepted:true,createdAt:'2026-07-25'},
    ],views:603,likes:89,createdAt:'2026-07-25',
  },
  {
    id:'q6',title:'美术课材料费太贵，有没有用本地自然材料的方案？',status:'resolved',
    content:'支教经费有限，买的画纸和颜料很快就用完了。我们附近有很多树叶、石头、泥土。有没有课程设计能就地取材？',
    author:AUTHORS.zhang,subject:'art',gradeRange:'1-6年级',region:'西南',
    tags:['美术课','自然材料','低成本','环保'],
    answers:[
      {id:'a5',content:'树叶拓印课！带孩子捡不同形状的叶子涂颜料印在纸上。石头画课捡圆石头画动物/人脸，成本几乎为零。泥土可以做陶艺——虽然不能烧制但捏泥人本身是最好的美术体验。\n\n筠连当地还有竹子和棕榈叶，可以教孩子做竹编小篮子或棕榈叶蜻蜓，既是美术课也是手工课，顺便介绍本地非遗文化。',author:AUTHORS.yang,likes:35,isAccepted:true,createdAt:'2026-07-26'},
    ],views:278,likes:31,createdAt:'2026-07-26',
  },
  {
    id:'q7',title:'英语零基础的农村孩子，怎么开口说第一句英语？',status:'open',
    content:'我们支教地三年级才开始接触英语。孩子们很害羞，连"Hello"都不敢说出口。试过跟读，但他们只是在嘴里咕哝。有没有什么破冰方法？',
    author:AUTHORS.zhou,subject:'english',gradeRange:'3-4年级',region:'西南',
    tags:['英语启蒙','开口说','零基础','破冰游戏'],
    answers:[],views:127,likes:8,createdAt:'2026-07-27',
  },
  {
    id:'q8',title:'音乐课只有一个破手风琴，怎么上出效果？',status:'answered',
    content:'学校唯一的乐器是一台80年代的旧手风琴，一半的键按下去弹不回来。但孩子们特别喜欢音乐课。求创意音乐课方案，不需要任何专业器材的那种。',
    author:AUTHORS.jie,subject:'music',gradeRange:'1-6年级',region:'西南',
    tags:['音乐课','无器材','创意教学','节奏感'],
    answers:[
      {id:'a8',content:'身体就是最好的乐器！\n1. 拍手+跺脚+拍桌子的"身体打击乐"——用三种声音代表三种节奏，全班一起演奏\n2. 用矿泉水瓶装不同高度的水做"水瓶琴"\n3. 教他们当地的苗族山歌——孩子比你会唱，你只需要组织\n4. "声音接龙"：每人模仿一种自然声音（鸟叫/水流/风声）串成一段"自然交响乐"\n5. 敲击不同长度的竹筒做竹筒琴\n\n我在筠连就是这样教了一周，最后孩子们自己编了一首"筠连之歌"！',author:AUTHORS.yang,likes:21,isAccepted:true,createdAt:'2026-07-27'},
    ],views:189,likes:27,createdAt:'2026-07-27',
  },
  {
    id:'q9',title:'支教时间太短（13天），怎么最大化教学效果？',status:'answered',
    content:'我们是13天的暑期支教，感觉刚跟孩子们混熟就要走了。怎么设计课程才能让这13天的价值最大化？是教知识重要还是培养兴趣重要？',
    author:AUTHORS.chen,subject:'general',gradeRange:'1-6年级',region:'西北',
    tags:['短期支教','课程设计','教学效果','支教理念'],
    answers:[
      {id:'a9',content:'13天支教的核心不是"教多少知识"而是"点燃什么"。\n\n建议把13天分成三个阶段：\n- Day1-3：破冰+打开——通过各种游戏建立信任，发现每个孩子的兴趣点\n- Day4-9：体验+探索——围绕兴趣设计项目式学习（比如5天做一个科学项目）\n- Day10-13：展示+告别——让孩子们展示自己的成果，建立自信\n\n最忌讳的是：试图把一学期的课本塞进13天。不如只教一个主题但教透。比如只教"水"——科学课讲三态变化、语文课写关于水的作文、美术课画水彩画、音乐课唱水的儿歌。\n\n还有一点很重要：建立长期联系。离开后定期写信或视频，让13天变成一辈子的联结。',author:AUTHORS.wang,likes:53,isAccepted:true,createdAt:'2026-07-28'},
    ],views:410,likes:44,createdAt:'2026-07-28',
  },
  {
    id:'q10',title:'一年级孩子上课老往教室外跑怎么办？安全问题头疼',status:'open',
    content:'班上有个一年级的男孩，课上一半就会突然跑出教室。追出去他在操场玩，说"我坐不住了"。跟他讲道理他点头答应但过一天又跑。家长说在家也这样。这是多动症吗？怎么处理？',
    author:AUTHORS.zhang,subject:'psychology',gradeRange:'1年级',region:'西南',
    tags:['行为管理','一年级','安全问题','注意力缺陷'],
    answers:[],views:95,likes:6,createdAt:'2026-07-28',
  },
  {
    id:'q11',title:'如何给农村孩子讲价值观？比如诚信、尊重、感恩',status:'open',
    content:'想上一节关于"尊重"的品德课。但用PPT讲道理他们肯定听不进去。有没有好玩的授课形式？比如情景剧、游戏之类的？',
    author:AUTHORS.zhou,subject:'general',gradeRange:'1-6年级',region:'西南',
    tags:['品德教育','价值观','游戏化教学','情景剧'],
    answers:[],views:72,likes:9,createdAt:'2026-07-29',
  },
  {
    id:'q12',title:'支教结束之后怎么和孩子们保持联系？',status:'answered',
    content:'还有几天就要离开了。孩子们问我"老师你还会回来吗"，我不知道怎么回答。我想保持联系但山里没有手机信号，孩子们也没有微信。支教过的前辈们有什么经验？',
    author:AUTHORS.han,subject:'general',gradeRange:'不限',region:'西南',
    tags:['支教结束','保持联系','情感联结','后续跟进'],
    answers:[
      {id:'a12',content:'写信！这是最有效的方式。\n\n我们凡星支教队有一个传统：支教结束后每个老师给自己负责的学生写一封长信，附上回信地址和邮票。第一年我们收到了14个孩子的回信。虽然邮路很慢（有时候一封信要走半个月），但每次收到孩子们歪歪扭扭的字迹，比收到微信消息开心一万倍。\n\n另外可以做：\n1. 留下一个"班级信箱"——用鞋盒做一个信箱放在学校，定期写信寄过去，老师帮忙分发\n2. 跟当地老师建立联系，通过学校办公室的电话定期通话\n3. 下一年争取再来——很多支教队都有延续传统，同一批人去同一所学校\n4. 记住他们的生日——提前写好12张卡片交给班主任，每月寄出一张\n\n形式不重要，重要的是让他们知道：老师的离开不是结束。',author:AUTHORS.li,likes:78,isAccepted:true,createdAt:'2026-07-29'},
    ],views:521,likes:96,createdAt:'2026-07-29',
  },
]

// ═══════════════════════════════════════
// 招募广场（8条）
// ═══════════════════════════════════════

export const RECRUITS: CommunityRecruit[] = [
  {
    id:'r1',type:'team_recruit',status:'active',
    title:'凡星支教队2027暑期队员招募 — 13天·四川筠连',
    content:'电子科技大学凡星支教队招募2027年暑期支教队员。\n\n【支教地】四川宜宾筠连县，城南社区+玉壶社区\n【时间】2027年7月，13天\n【对象】约60名6-10岁小学生\n【招募人数】15-20人\n【要求】在读本科生/研究生，有责任心，能完成完整周期\n【优先】有教学经验、艺术特长（音乐/美术/舞蹈）、会摄影/视频制作、能带特色课程\n\n我们连续12年深耕筠连，课程涵盖五育并举。欢迎加入，把知识和温暖带到四川大山里！\n\n面试时间：2027年5月\n面试形式：试讲10分钟+问答',
    author:{...AUTHORS.han,role:'official',badge:'凡星支教队·队长'},region:'四川宜宾筠连县',
    tags:['暑期支教','大学生','13天','筠连','五育并举'],deadline:'2027-06-15',
    contact:'微信: fanxing_team / 邮箱: fanxing@uestc.edu.cn / 公众号: 凡星支教',views:1203,createdAt:'2026-08-03',
  },
  {
    id:'r2',type:'volunteer_wanted',status:'active',
    title:'云南红河州元阳县急需暑期支教队伍（提供住宿）',
    content:'元阳县牛角寨镇中心小学急需固定的支教队伍对接。\n\n【学校情况】海拔1800米山区小学，120名学生，12名教师\n【设施】提供教师宿舍（4人间）和食堂，交通方便（距县城40分钟车程）\n【课程需求】英语启蒙、科学实验、音乐、美术、体育\n【希望队伍规模】15-25人\n【时长建议】10-15天\n\n学校有标准教室、篮球场、多媒体设备（最近刚装！），教学条件在周边算不错的。主要缺的是有活力的年轻人来打开孩子们的视野。\n\n欢迎随时联系实地考察！',
    author:AUTHORS.yuanyang,region:'云南红河州元阳县',
    tags:['招募支教队','小学','120名学生','提供住宿','多媒体设备'],deadline:'2027-06-30',
    contact:'电话: 0873-XXXXXXX / 联系人: 李书记 / 工作日9:00-17:00',views:856,createdAt:'2026-07-20',
  },
  {
    id:'r3',type:'material_request',status:'active',
    title:'甘肃定西岷县支教点紧急募集图书和体育器材',
    content:'启明星支教队在岷县马坞镇支教，学校图书室现状堪忧。\n\n【急需】\n- 小学课外读物（绘本、科普、文学、历史）200册以上\n- 体育器材：跳绳20根、足球5个、羽毛球拍10副、乒乓球拍10副\n- 美术用品：蜡笔、水彩笔、画纸、安全剪刀\n\n【学校现状】\n- 图书室仅200本书（90%是90年代旧书，不适合小学生阅读）\n- 体育器材：2个破篮球、1根断了半截的跳绳\n- 美术课：全校只有一盒用到只剩一小截的蜡笔\n\n可以邮寄到岷县教育局转交，或联系我们上门取。每一本书都会直接送到孩子手里。',
    author:{...AUTHORS.chen,role:'official',badge:'启明星支教队'},region:'甘肃定西岷县',
    tags:['图书','体育器材','美术用品','物资求助','甘肃'],deadline:'2026-08-15',
    contact:'邮箱: qimingxing@163.com / 微信: qimingxing_team / 收件地址请联系获取',views:634,createdAt:'2026-07-22',
  },
  {
    id:'r4',type:'self_recommend',status:'active',
    title:'大二数学系学生，暑期想去任何支教地！',
    content:'西南大学数学系大二，男生，身体健康。\n\n【能教】数学（本专业）、体育（会篮球/足球/围棋）、简单科学实验\n【性格】温和有耐心，被室友评价为"永远不会发火的人"\n【语言】普通话标准，会一点四川话\n【时间】2027年7月-8月均可，可以全程参与\n【地域】四川境内优先，但其他省份也愿意去\n\n没有什么特殊技能，但有一颗真诚的心。愿意做任何需要做的事情，包括后勤、拍照、写通讯稿。',
    author:{...AUTHORS.lin,role:'public',verified:false},region:'四川境内（可协商）',
    tags:['志愿者','大学生','数学系','篮球','围棋'],contact:'微信: lin_math2026 / 邮箱: lin2024@swu.edu.cn',views:245,createdAt:'2026-07-26',
  },
  {
    id:'r5',type:'volunteer_wanted',status:'closed',
    title:'贵州黔东南雷山县支教队招募（已满员）',
    content:'雷山县方祥乡民族小学（苗族聚居区）暑期支教队伍已招募完毕。感谢关注！',
    author:AUTHORS.leishan,region:'贵州黔东南雷山县',
    tags:['已结束','苗族','小学'],deadline:'2026-06-01',contact:'已结束',views:412,createdAt:'2026-05-15',
  },
  {
    id:'r6',type:'team_recruit',status:'active',
    title:'青苗助学计划2027暑期志愿者招募 — 西部四省',
    content:'"青苗助学计划"现面向全国高校招募2027暑期志愿者。\n\n【服务地区】甘肃、青海、宁夏、陕西四省10个支教点\n【时间】7月中旬-8月初，15-20天\n【招募对象】全国各地大学生（不限于北京）\n【招募人数】50人（分配到10个支教点）\n\n【特色项目】\n- 读书计划：每个志愿者带20本书去，留给当地孩子\n- 科学盒子：我们提供标准化科学实验套件\n- 摄影日记：志愿者每天记录，最后做成支教画册\n\n我们是全国性的志愿者组织，会提供出发前培训（线上）、保险、和住宿安排。机票/火车票自理。',
    author:{id:'oa5',name:'青苗助学计划',avatar:'🌱',role:'official',verified:true,badge:'全国性公益组织',location:'北京'},
    region:'甘肃/青海/宁夏/陕西',tags:['暑期支教','西部','50人','配科学盒子','跨省招募'],deadline:'2027-05-31',
    contact:'公众号: 青苗助学计划 / 官网报名: qingmiao.org.cn / 邮箱: volunteer@qingmiao.org.cn',views:892,createdAt:'2026-07-24',
  },
  {
    id:'r7',type:'material_request',status:'active',
    title:'四川凉山美姑县支教点募集冬衣和学习用品',
    content:'凉山州美姑县位于高海拔地区，冬季气温可低至零下10度。我们在当地支教发现很多孩子冬天只穿单衣或破旧的薄棉袄。\n\n【募集物品】\n- 6-12岁儿童冬衣/棉袄/羽绒服（干净、无破损）\n- 保暖内衣、厚袜子、手套、帽子\n- 书包（新旧均可，干净即可）\n- 文具（铅笔、橡皮、练习本）\n\n我们会在2026年10月前统一运送到美姑县各支教点。所有捐赠物品都会拍照反馈给捐赠人。\n\n【注意】不需要捐款！只需要物品！我们不碰钱！',
    author:{...AUTHORS.zhou,role:'official',badge:'阳光支教队·物资负责人'},region:'四川凉山美姑县',
    tags:['冬衣','书包','文具','高寒地区','凉山'],deadline:'2026-10-01',
    contact:'微信: sunshine_zhou / 电话: 183XXXX1234 / 收件地址请私信获取',views:378,createdAt:'2026-07-27',
  },
  {
    id:'r8',type:'self_recommend',status:'active',
    title:'退休工人，想用木工手艺帮支教学校修桌椅',
    content:'我是杭州退休木工，64岁，身体健康。去支教可能年纪大了点，但修东西我在行。如果哪个支教点的学校桌椅坏了、门窗需要修理、书架要做，我可以去帮忙。\n\n自带工具，自带生活费，只需要解决住宿（教室打地铺也行）。\n\n时间灵活，7-8月都可以，时长不限。最好是气候温和的地方（年纪大了怕太热）。交通我自理。希望能用我的手艺帮孩子们改善学习条件。',
    author:{id:'p3',name:'老张师傅',avatar:'张',role:'public',verified:false,badge:'退休木工·64岁',location:'浙江杭州'},
    region:'不限（温和气候优先）',tags:['木工','修理','退休志愿者','桌椅维修'],contact:'手机: 135XXXX5678 / 儿子微信: zhang_woodworker',views:567,createdAt:'2026-07-28',
  },
]

// ═══════════════════════════════════════
// 支教故事（8篇）
// ═══════════════════════════════════════

export const STORIES: CommunityStory[] = [
  {
    id:'s1',title:'一个纸箱恐龙，让我看到孩子的无限创造力',likes:89,
    content:'今天手工课的主题是"变废为宝"。我抱了一堆废纸箱进教室，说大家可以做任何想做的东西——没有限制，没有模板。小宇花了整整一节课，用三个纸箱拼出了一只霸王龙——牙签做的牙齿、树叶贴的鳞片、尾巴还能摆动。\n\n他站在讲台上展示时全班自发鼓掌。更让我触动的是课后他悄悄问我："老师，这个可以送给我在成都的朋友吗？我想告诉他我也会做很厉害的东西。"\n\n支教的意义，不是我们带来了什么，而是他们发现了自己本有的光。\n\n（图为小宇专注做手工的瞬间）',
    author:AUTHORS.han,images:[IMG('story-1-making')],teamName:'凡星支教队',location:'四川筠连',
    tags:['手工课','创造力','学生故事','感动'],
    comments:[
      {id:'sc1',content:'这就是支教的意义所在！每一个孩子都是未被发现的宝藏。',author:AUTHORS.li,createdAt:'2026-07-23'},
      {id:'sc2',content:'纸箱做恐龙也太有创意了吧！这个孩子以后可以当设计师！🦕',author:AUTHORS.wu,createdAt:'2026-07-23'},
      {id:'sc3',content:'看到最后一句泪目了。他们只是想告诉外面的世界"我也会做很厉害的东西"',author:AUTHORS.zhao,createdAt:'2026-07-24'},
    ],createdAt:'2026-08-02',
  },
  {
    id:'s2',title:'一个二年级女孩的信，读哭了三个老师',likes:156,
    content:'陈小雨是个文静的女孩，父母在广东打工，她和爷爷奶奶住。\n\n语文课我们教写信。她用了整整一节课，用拼音和汉字混合写了人生第一封给父母的信："爸爸妈妈，我在学校里hen好，老师们对我hen好。我学会了写自己的名字，还学会了画画。你们在外面不yao太lei，我会好好读书的。"\n\n不到8岁的孩子，不抱怨父母的缺席，反而担心他们太累了。\n\n我们三个老师传阅这张纸的时候，没有一个人说话。后来数学老师说"我出去一下"，去了很久才回来。\n\n有些懂事，是让人心疼的。\n\n（图为小雨专注写信的瞬间）',
    author:AUTHORS.han,images:[IMG('story-2-girl-writing')],teamName:'凡星支教队',location:'四川筠连',
    tags:['写信','留守儿童','感人','父母'],
    comments:[
      {id:'sc4',content:'看到"你们不要太累"这几个字眼泪就下来了。',author:AUTHORS.liu,createdAt:'2026-07-24'},
      {id:'sc5',content:'我教了25年书，最感动的永远是留守儿童的信。他们想要的从来不是物质，是陪伴。',author:AUTHORS.wang,createdAt:'2026-07-24'},
      {id:'sc6',content:'请问可以分享更多孩子们的来信吗？想做一个关于留守儿童书信的专题。',author:AUTHORS.ma,createdAt:'2026-07-25'},
    ],createdAt:'2026-08-05',
  },
  {
    id:'s3',title:'运动会上的"小队长"：10岁男孩的蜕变',likes:67,
    content:'浩然是我们班最有"江湖气"的男生。第一天就带领男生把隔壁班挑衅了个遍，我对他的第一印象是"麻烦制造机"。\n\n运动会分组那天，我随口说"浩然你当方阵组长"，没想到他愣住了，然后用力点头："保证完成任务！"\n\n接下来三天，他每天提前半小时到操场练习口令。嗓子喊哑了也坚持。更意外的是：他看到一个一年级小朋友摔倒了，第一个跑过去扶起来。\n\n支教不是为了找到完美的孩子，而是让孩子发现自己可以成为更好的人。\n\n浩然，你注定是个领袖。',
    author:AUTHORS.han,images:['🏃'],teamName:'凡星支教队',location:'四川筠连',
    tags:['运动会','成长','领导力','责任'],
    comments:[{id:'sc7',content:'每个"问题学生"背后都是一颗等待被发现的心。',author:AUTHORS.zhao,createdAt:'2026-07-25'}],
    createdAt:'2026-07-24',
  },
  {
    id:'s4',title:'支教地没有多媒体？我们用粉笔上了最生动的一课',likes:134,
    content:'学校只有一块黑板和一盒粉笔。\n\n语文老师用彩色粉笔画出了《望庐山瀑布》的场景——紫烟、飞瀑、银河，孩子们看呆了。数学老师用粉笔头教孩子们玩"跳数轴"游戏。美术老师在黑板上用粉笔末"吹画"——吹一口气，粉末散开就是一棵树的形状。\n\n这些最原始的教学工具，反而激发了最纯粹的创造力。多媒体能做到的，粉笔不一定做不到；但粉笔能做到的——那种老师一抬手就用一支笔创造出一个世界的感觉——任何屏幕都给不了。\n\n（图为粉笔画的数学课板书）',
    author:AUTHORS.jie,images:['🖍️'],teamName:'星辰支教队',location:'贵州毕节',
    tags:['粉笔艺术','无多媒体','创意教学','黑板'],
    comments:[
      {id:'sc8',content:'"用一支笔创造出一个世界"这句话太美了。教育的本质就是创造力。',author:AUTHORS.li,createdAt:'2026-07-25'},
    ],createdAt:'2026-07-25',
  },
  {
    id:'s5',title:'苗族小女孩教会我的一支舞',likes:98,
    content:'周小雅是我们支教点年龄最小的苗族学生，今年9岁。音乐课那天我放了《最炫民族风》，她突然站起来开始跳舞。不是随便跳跳——那是正宗的苗族舞。每一个手势都有含义，每一个转身都有韵律。\n\n下课后她告诉我，这支舞是她奶奶教的。她们家三代人都会跳这支舞，传了上百年。\n\n那天起我明白：我们常常以为自己在"教"孩子"外面的世界"，但她们身上有更珍贵的东西——一个正在被遗忘的、只属于这片土地的文化记忆。\n\n后来我提议让她在结营仪式上教所有同学跳这支舞，她小声问我："老师，他们会不会笑我？"\n\n没有一个人笑。那天全场安静得只有她的舞步声。',
    author:AUTHORS.zhang,images:['💃'],teamName:'凡星支教队',location:'四川筠连',
    tags:['苗族文化','舞蹈','非遗','文化自信'],
    comments:[
      {id:'sc9',content:'文化传承的种子往往就是这样意外种下的。让支教也变成"被支教"。',author:AUTHORS.yang,createdAt:'2026-07-26'},
      {id:'sc10',content:'可以拍视频吗？让更多人看到孩子们的民族文化展示！',author:AUTHORS.wu,createdAt:'2026-07-26'},
    ],createdAt:'2026-07-26',
  },
  {
    id:'s6',title:'"我不会教——但我可以学"',likes:72,
    content:'出发支教前，最担心的是自己不是师范专业的——"我完全不知道怎么教书"。\n\n但到了支教地才发现：不会教的不是你一个人。所有志愿者第一天都紧张到手心出汗。\n\n但第三天开始，事情变了。\n- 不会画画的理工男，对着B站教程学了一晚上简笔画，第二天在黑板上画了全班同学的漫画头像\n- 社恐的女生，硬着头皮站上讲台唱了《小幸运》，跑了八百个调，孩子们却说"老师你唱歌好好听"\n- 从不运动的信息专业学生，带着孩子们跑了一个"迷你马拉松"，趴在操场上喘了五分钟\n\n支教让我明白：你不需要什么都会。你只需要愿意学，愿意试。孩子们不会记得你教得有多好，但会记得你有多认真地对待他们。',
    author:AUTHORS.zhang,images:['✏️'],teamName:'凡星支教队',location:'四川筠连',
    tags:['志愿者感悟','教学成长','支教体验','初心'],
    comments:[],createdAt:'2026-07-27',
  },
  {
    id:'s7',title:'离别前最后一节课，全班给我写了一封信',likes:201,
    content:'明天就要离开了。今天的作文课我没安排主题，只说"想写什么就写什么吧"。\n\n结果全班42个人，全班写了同一个主题："给老师的信"。\n\n不是同一个人写的。每个人都在自己纸上写下了对我说的话。\n\n- "老师你走了我会想你的，但我不会哭的"\n- "你上次说我写字进步了，我把那张纸贴在了床头"\n- "老师说每个人都是星星，那你是最亮的那颗"（然后画了一颗歪歪扭扭的星星）\n\n我把这42张纸全部收进了我的行李。它们比任何证书都重。\n\n支教结束不是故事的终点——是故事的开始。',
    author:AUTHORS.han,images:['✉️'],teamName:'凡星支教队',location:'四川筠连',
    tags:['离别','学生来信','感动','支教结束'],
    comments:[
      {id:'sc12',content:'42封信是最好的结业证书。',author:AUTHORS.wang,createdAt:'2026-07-28'},
      {id:'sc13',content:'把信装订成册吧，十年后拿出来看还是会哭的。',author:AUTHORS.zhao,createdAt:'2026-07-28'},
    ],createdAt:'2026-07-28',
  },
  {
    id:'s8',title:'那个最害羞的女孩，在最后一天主动抱了我',likes:55,
    content:'欣欣是我们班最安静的孩子。12天的课里，她举手次数不超过3次，每次回答声音小到需要凑近了听。\n\n我试过很多方法：鼓励、奖励、小组合作，效果都不大。有一天下课她偷偷塞给我一张小纸条，上面写着："老师我不是不想举手，我是怕说错。"\n\n后来我改变了策略。不再要求她举手，而是在每一份作业上用红笔写长长的评语。第三天，她在评语下面画了一个笑脸。第六天，她加了一句"谢谢老师"。\n\n最后一天，所有人围在一起告别。欣欣站在人群最外面。我跟每个孩子拥抱之后，她突然走过来抱了我一下，用力抱了一下，然后很快松开了，跑出教室。\n\n有些孩子不是用说的——他们用拥抱、用画画、用你回头再看她一眼时迅速低下的头来表达。作为老师，我们要学会听那些没有说出口的话。\n\n（图为教室里的日常瞬间）\n\n这句话是我送给她最后的评语，写在她最后一份作业上："欣欣，你有一整个宇宙要说，慢慢来，世界会等你。"',
    author:{...AUTHORS.chen,role:'volunteer',badge:'启明星支教队'},images:['💗'],teamName:'启明星支教队',location:'甘肃定西',
    tags:['内向学生','成长','教育理念','细腻'],
    comments:[],createdAt:'2026-07-29',
  },
]

// ═══════════════════════════════════════
// 学生天地（8条）
// ═══════════════════════════════════════

export const STUDENT_POSTS: StudentSocialPost[] = [
  {
    id:'sp1',studentName:'小宇',studentAvatar:'🌟',grade:'三年级',school:'筠连县城南小学',
    content:'今天我用废纸箱做了一只霸王龙！老师说我做得很棒，还让我上台给大家看。我想把这只恐龙送给我在成都的朋友——他会喜欢吗？',
    image:IMG('student-xiaoyu-dinosaur'),type:'artwork',likes:24,createdAt:'2026-07-22',
    verifiedBy:'凡星支教队',interestGroup:'手工创意',
  },
  {
    id:'sp2',studentName:'小雨',studentAvatar:'🌻',grade:'二年级',school:'筠连县玉壶小学',
    content:'我画了一幅画，是向日葵。因为老师说向日葵总是追着太阳，就像我们要一直追着梦想。我还想交一个喜欢画画的朋友！',
    image:'🌻',type:'artwork',likes:31,createdAt:'2026-07-23',
    verifiedBy:'凡星支教队',interestGroup:'小画家',
  },
  {
    id:'sp3',studentName:'浩然',studentAvatar:'🚀',grade:'四年级',school:'筠连县城南小学',
    content:'今天运动会上我当上了方阵组长！带着一年级的弟弟妹妹们喊口号，嗓子都喊哑了。我觉得领导力就是——让别人和自己一起变得更好！',
    image:'🏃',type:'story',likes:18,createdAt:'2026-07-24',
    verifiedBy:'凡星支教队',interestGroup:'运动小将',
  },
  {
    id:'sp4',studentName:'欣怡',studentAvatar:'🦋',grade:'一年级',school:'筠连县玉壶小学',
    content:'今天老师教我们唱歌，我唱得最大声！我长大了想当一个歌手，给全世界的孩子们唱歌。',
    image:'🎵',type:'greeting',likes:22,createdAt:'2026-07-25',
    verifiedBy:'凡星支教队',interestGroup:'音乐之声',
  },
  {
    id:'sp5',studentName:'大勇',studentAvatar:'🦁',grade:'四年级',school:'筠连县城南小学',
    content:'教室里的风扇坏了，我用螺丝刀把它修好了！老师说我以后可以当工程师。工程师是做什么的呀？',
    image:'🔧',type:'question',likes:15,createdAt:'2026-07-26',
    verifiedBy:'凡星支教队',interestGroup:'科学探索',
  },
  {
    id:'sp6',studentName:'子涵',studentAvatar:'📖',grade:'三年级',school:'筠连县玉壶小学',
    content:'今天科学课我们观察了树叶的脉络！我画下了三种不同树叶的样子。老师说每片叶子都不一样，就像每个小朋友都有自己的特别之处。🌟',
    image:'🍃',type:'artwork',likes:12,createdAt:'2026-07-27',
    verifiedBy:'凡星支教队',interestGroup:'科学探索',
  },
  {
    id:'sp7',studentName:'萌萌',studentAvatar:'🐰',grade:'二年级',school:'筠连县城南小学',
    content:'我用树叶和花瓣做了一张书签，要送给我的奶奶。奶奶每天来接我放学，很辛苦。\n\n书签上我写了"好好学习"，因为奶奶最喜欢听我说这四个字。',
    image:'🌸',type:'artwork',likes:20,createdAt:'2026-07-28',
    verifiedBy:'凡星支教队',interestGroup:'手工创意',
  },
  {
    id:'sp8',studentName:'小雅',studentAvatar:'🎀',grade:'三年级',school:'筠连县玉壶小学',
    content:'今天教同学们跳了我们苗族的舞蹈！一开始很紧张怕他们笑话我，但是没有人笑，他们都很认真地在学。\n\n我觉得最开心的事就是和大家分享我喜欢的东西。老师说这叫"文化自信"。\n\n我想问其他小朋友：你们家乡有没有什么好玩的舞蹈呀？',
    image:'💃',type:'story',likes:35,createdAt:'2026-07-29',
    verifiedBy:'凡星支教队',interestGroup:'音乐之声',
  },
]

// ═══════════════════════════════════════
// 兴趣小组 / 官方账号
// ═══════════════════════════════════════

export const INTEREST_GROUPS: InterestGroup[] = [
  {id:'g1',name:'手工创意',emoji:'✂️',description:'废纸箱、树叶、黏土…用双手创造世界',memberCount:15},
  {id:'g2',name:'小画家',emoji:'🎨',description:'用画笔记录看到的每一个美好瞬间',memberCount:22},
  {id:'g3',name:'运动小将',emoji:'⚽',description:'奔跑、跳跃、挥洒汗水的小运动员们',memberCount:18},
  {id:'g4',name:'科学探索',emoji:'🔬',description:'对世界充满好奇，用实验寻找答案',memberCount:12},
  {id:'g5',name:'音乐之声',emoji:'🎵',description:'唱歌、跳舞、演奏，用节奏表达自己',memberCount:20},
  {id:'g6',name:'故事大王',emoji:'📚',description:'爱读书、爱讲故事的小伙伴们',memberCount:16},
]

export const OFFICIAL_ACCOUNTS: OfficialAccount[] = [
  {id:'oa1',name:'凡星支教队',avatar:'⭐',type:'team',verified:true,description:'电子科技大学·连续12年深耕四川乡村教育',memberCount:15,location:'四川成都',activeSince:'2015'},
  {id:'oa2',name:'星辰支教队',avatar:'✨',type:'team',verified:true,description:'贵州大学·专注黔东南山区教育',memberCount:20,location:'贵州贵阳',activeSince:'2018'},
  {id:'oa3',name:'筠连县团委',avatar:'🏛️',type:'govt',verified:true,description:'共青团筠连县委员会',memberCount:5,location:'四川宜宾筠连县',activeSince:'2020'},
  {id:'oa4',name:'元阳县教育局',avatar:'🏫',type:'govt',verified:true,description:'云南省红河州元阳县教育局',memberCount:8,location:'云南红河',activeSince:'2019'},
  {id:'oa5',name:'青苗助学计划',avatar:'🌱',type:'team',verified:true,description:'专注西部乡村教育的中学生志愿者组织',memberCount:30,location:'北京',activeSince:'2016'},
  {id:'oa6',name:'启明星支教队',avatar:'⭐',type:'team',verified:true,description:'西北师范大学·扎根甘肃定西',memberCount:12,location:'甘肃兰州',activeSince:'2017'},
  {id:'oa7',name:'阳光支教队',avatar:'☀️',type:'team',verified:true,description:'西南民族大学·服务凉山彝区',memberCount:18,location:'四川凉山',activeSince:'2019'},
  {id:'oa8',name:'雷山县教育局',avatar:'🏫',type:'govt',verified:true,description:'贵州黔东南雷山县教育局',memberCount:8,location:'贵州黔东南',activeSince:'2020'},
  {id:'oa9',name:'筑梦支教团',avatar:'🏗️',type:'team',verified:true,description:'西安交通大学·六年深耕陕甘宁',memberCount:22,location:'陕西西安',activeSince:'2016'},
  {id:'oa10',name:'甘南州教育局',avatar:'🏫',type:'govt',verified:true,description:'甘肃省甘南藏族自治州教育局',memberCount:10,location:'甘肃甘南',activeSince:'2018'},
  {id:'oa11',name:'彩云之南志愿队',avatar:'🌈',type:'team',verified:true,description:'云南大学·专注边疆少数民族教育',memberCount:25,location:'云南昆明',activeSince:'2017'},
  {id:'oa12',name:'凉山州团委',avatar:'🏛️',type:'govt',verified:true,description:'共青团凉山彝族自治州委员会',memberCount:6,location:'四川凉山',activeSince:'2019'},
]

// ═══════════════════════════════════════
// 扩展数据：全国性规模 v3
// ═══════════════════════════════════════

const A2 = {
  xueli: { id:'v5',name:'雪莉',avatar:'莉',role:'volunteer' as const,verified:true,badge:'彩云之南志愿队',teamName:'彩云之南志愿队',location:'云南西双版纳'},
  dapeng: { id:'v6',name:'大鹏',avatar:'鹏',role:'volunteer' as const,verified:true,badge:'筑梦支教团·副队长',teamName:'筑梦支教团',location:'宁夏固原'},
  fang: { id:'v7',name:'小方',avatar:'方',role:'volunteer' as const,verified:true,badge:'青苗助学·甘肃区',teamName:'青苗助学计划',location:'甘肃天水'},
  ting: { id:'v8',name:'婷婷',avatar:'婷',role:'volunteer' as const,verified:true,badge:'阳光支教队·宣传组长',teamName:'阳光支教队',location:'四川美姑'},
  huang2: { id:'t8',name:'黄老师',avatar:'黄',role:'teacher' as const,verified:true,badge:'中学化学教师·20年教龄',location:'湖北武汉'},
  sun: { id:'t9',name:'孙老师',avatar:'孙',role:'teacher' as const,verified:true,badge:'小学科学教研员',location:'江苏南京'},
  chen2: { id:'t10',name:'陈老师',avatar:'陈',role:'teacher' as const,verified:true,badge:'特殊教育教师·10年',location:'广东广州'},
  zhang2: { id:'t11',name:'张校长',avatar:'张',role:'teacher' as const,verified:true,badge:'乡村小学校长·25年',location:'河南信阳'},
}

// ── 防 HMR 重复添加 ──
interface CommunityGlobal { __communityDataInit?: boolean }
const _initialized = (typeof globalThis !== 'undefined' ? (globalThis as CommunityGlobal).__communityDataInit : false)
if (!_initialized) {
  if (typeof globalThis !== 'undefined') (globalThis as CommunityGlobal).__communityDataInit = true

  // 追加问答（8条新）
  QUESTIONS.push(
    { id:'q13',title:'西北干旱地区怎么开展自然观察课？',status:'open', content:'我们支教地在宁夏固原，属于黄土高原，植被很少。想做自然观察课但实在没什么可看的…', author:A2.dapeng,subject:'science',gradeRange:'3-6年级',region:'西北', tags:['自然观察','干旱地区','黄土高原','户外教学'], answers:[], views:67, likes:5,createdAt:'2026-07-30'},
    { id:'q14',title:'少数民族地区语言不通怎么教语文？',status:'answered', content:'在云南西双版纳支教，很多傣族孩子汉语水平很低，上课听不懂我在说什么。', author:A2.xueli,subject:'chinese',gradeRange:'1-3年级',region:'西南', tags:['少数民族','语言障碍','双语教学','语文启蒙'], answers:[{ id:'a14',content:'不要硬教课本！先从"生活汉语"开始。每天第一节用10分钟做"今天的话题"——用实物、图片、动作配合简单的汉语句子。让孩子们当你的傣语老师——你学一句傣语，他们学一句汉语。', author:AUTHORS.ma,likes:19,isAccepted:true,createdAt:'2026-07-30'}], views:89,likes:11,createdAt:'2026-07-30'},
    { id:'q15',title:'高海拔地区（3000米+）支教注意什么？',status:'open', content:'下个月去青海玉树的一个支教点，海拔3800米。求高原支教的经验和注意事项！', author:{ id:'v9',name:'追光者支教队-小吴',avatar:'吴',role:'volunteer' as const,verified:true,badge:'追光者支教队',teamName:'追光者支教队',location:'青海玉树'},subject:'general',gradeRange:'1-6年级',region:'西北', tags:['高海拔','高原反应','青海','安全'], answers:[], views:134,likes:15,createdAt:'2026-07-30'},
    { id:'q16',title:'支教课堂上孩子玩手机怎么办？没收？不管？',status:'open', content:'我们支教地有几个孩子带了智能手机来上课。上课在桌子底下刷短视频。没收怕伤自尊，不管又影响课堂。怎么处理？', author:A2.ting,subject:'general',gradeRange:'3-6年级',region:'西南', tags:['手机管理','课堂纪律','电子产品','留守儿童'], answers:[], views:78,likes:7,createdAt:'2026-07-31'},
    { id:'q17',title:'英语发音不准的老师（我）怎么教孩子？',status:'answered', content:'我高考英语还不错，但发音确实不太好。我怕教坏了孩子的基础发音。', author:A2.fang,subject:'english',gradeRange:'3-6年级',region:'西北', tags:['英语教学','发音','非母语教师','替代方案'], answers:[{ id:'a17',content:'发音不标准完全不影响做一个好英语老师！重点教阅读和写作。用英文儿歌/动画片做听力材料。诚实告诉孩子"老师的发音不太好，我们一起来学标准的"——这本身就是最好的教育。', author:AUTHORS.ma,likes:31,isAccepted:true,createdAt:'2026-07-31'}], views:112,likes:19,createdAt:'2026-07-31'},
    { id:'q18',title:'怎么判断一个支教队是否靠谱？求鉴别方法',status:'answered', content:'我想参加暑期支教但看到好多"支教旅游""支教镀金"的负面新闻。怎么判断一个支教队是认真做事的还是去拍照打卡的？', author:{ id:'p4',name:'想支教的阿明',avatar:'明',role:'public' as const,verified:false,badge:'大三学生',location:'上海'},subject:'general',gradeRange:'不限',region:'不限', tags:['支教队选择','鉴别','支教质量','避坑指南'], answers:[{ id:'a18',content:'靠谱支教队的特征：1.有固定支教点持续3年以上 2.有出发前培训至少3次 3.支教时长10天以上 4.有往届成员公开分享 5.经费透明。避雷信号：宣传语用"改变命运""拯救"这类词；照片以自拍为主；没有教学计划说"到了再安排"；报名费高但不透明。问他们"如果今年没有新队员，你们还去吗？"——如果回答"当然去"，那是真支教。', author:AUTHORS.wang,likes:89,isAccepted:true,createdAt:'2026-07-31'}], views:567,likes:102,createdAt:'2026-07-31'},
    { id:'q19',title:'特殊儿童在支教班里怎么照顾？有个孩子有轻度自闭',status:'open', content:'班上有个8岁男孩有轻度自闭。他不跟其他孩子玩，但特别喜欢画画，可以一个人画一整天。我想帮他但不知道怎么帮。', author:A2.ting,subject:'psychology',gradeRange:'2年级',region:'西南', tags:['特殊教育','自闭症','融合教育','美术治疗'], answers:[], views:45,likes:8,createdAt:'2026-08-01'},
    { id:'q20',title:'支教队内部矛盾：备课组长和宣传组长吵起来了…怎么办',status:'open', content:'队里备课组长觉得宣传组花太多时间拍照，影响了课堂节奏。宣传组长说"不记录怎么展示支教成果"。两人越吵越凶……', author:A2.dapeng,subject:'general',gradeRange:'不限',region:'西北', tags:['团队管理','内部矛盾','沟通','支教运营'], answers:[], views:92,likes:4,createdAt:'2026-08-01'},
  )
  // 追加故事（8篇新）
  STORIES.push(
    { id:'s9',title:'玉树高原上的第一堂天文课',likes:76, content:'在海拔3800米的青海玉树，晚上带着孩子们躺在操场上用肉眼认星座。城里孩子要看天文馆，这里的孩子什么都不需要——抬头就是整个银河。', author:A2.dapeng,images:['🌟'],teamName:'筑梦支教团',location:'青海玉树', tags:['天文','高原','星空','哲学'], comments:[],createdAt:'2026-07-30'},
    { id:'s10',title:'和傣族孩子学做"毫崩"（傣族年糕）',likes:52, content:'手工课那天，班里傣族孩子们的奶奶们主动来到学校教大家做"毫崩"——一种用糯米和芭蕉叶包的传统食物。整个教室变成了厨房。', author:A2.xueli,images:['🍚'],teamName:'彩云之南志愿队',location:'云南西双版纳', tags:['傣族文化','手工课','家校互动','传统文化'], comments:[],createdAt:'2026-07-31'},
    { id:'s11',title:'"老师，这是我用一个月攒的钱买的"',likes:133, content:'结营前一天，一个叫阿木的彝族男孩塞给我一个塑料袋。打开一看，是一支崭新的钢笔，标价18元。他每天上学走5公里山路，把每天2元零花钱攒了一个月。那支钢笔现在还放在我的书桌上，我没有用过一次。', author:A2.ting,images:['🖊️'],teamName:'阳光支教队',location:'四川美姑', tags:['彝族','学生礼物','感动','贫困'], comments:[{ id:'sc21',content:'看哭了。这些孩子给你的东西比任何东西都重。',author:AUTHORS.zhao,createdAt:'2026-08-01'}],createdAt:'2026-08-01'},
    { id:'s12',title:'用一部老式胶片相机记录下的支教12天',likes:98, content:'带去了一台理光胶片相机。一卷36张，每天只拍3张。胶卷洗出来的时候我哭了——因为那36帧里，没有一张是我自己的自拍。每一张都是他们。', author:A2.fang,images:['📷'],teamName:'青苗助学计划',location:'甘肃天水', tags:['胶片摄影','记录','离别','12天'], comments:[],createdAt:'2026-08-01'},
    { id:'s13',title:'"老师，你能教我写自己的名字吗？"',likes:188, content:'支教第3天才发现班里有个女孩不认识自己的名字。我花了整整一节课教她。当她说"老师，这个名字真好看"的时候——那是我第一次，让她看见了自己的名字。', author:A2.ting,images:['✍️'],teamName:'阳光支教队',location:'四川美姑', tags:['识字','彝族','名字'], comments:[{ id:'sc22',content:'让她看见了自己的名字——这句话太有力量了。',author:AUTHORS.zhao,createdAt:'2026-08-02'}],createdAt:'2026-07-28'},
    { id:'s14',title:'我们不是来"帮助"的——我们是来"学习"的',likes:67, content:'支教结束后很多人问我帮助了多少孩子。我回答不上来。是孩子教我怎么用树叶吹出鸟叫声。是11岁男孩告诉我"读书不是为了离开山里"。他们教会我的，远比我教给他们的多。', author:A2.xueli,images:['🌿'],teamName:'彩云之南志愿队',location:'云南西双版纳', tags:['支教反思','双向成长','公益理念','初心'], comments:[],createdAt:'2026-07-28'},
    { id:'s15',title:'一年后，收到了支教学生的来信',likes:215, content:'支教结束一周年那天，收到了7封信。一封封打开：有人考了98分，有人学会了用电脑，有人问"你什么时候回来"。支教结束了365天，但好像从来没有真正离开过。', author:AUTHORS.han,images:['✉️'],teamName:'凡星支教队',location:'四川筠连', tags:['一年后','学生来信','成长','联结'], comments:[{ id:'sc24',content:'我也收到了！！去年支教的孩子们给我寄了明信片，哭了一下午。',author:A2.xueli,createdAt:'2026-08-03'}],createdAt:'2026-07-29'},
    { id:'s16',title:'乡村小学的第一场"科技节"',likes:104, content:'用瓶盖、吸管、橡皮筋和纸板给全校办了一场科技节。纸杯传声筒、吸管火箭、橡皮筋动力车……没有3D打印，没有Arduino，但孩子们的眼睛比任何一个科技馆里的城里孩子都亮。', author:A2.dapeng,images:['🔬'],teamName:'筑梦支教团',location:'宁夏固原', tags:['科技节','科学教育','低成本','创造力'], comments:[],createdAt:'2026-07-29'},
  )
  // 追加招募（7条新）
  RECRUITS.push(
    { id:'r9',type:'volunteer_wanted',status:'active', title:'青海海东市民和县急需中学生支教队', content:'海东市民和县官亭镇中心学校急需支教队伍。初中+小学共800名学生，40%为回族和土族。提供教师周转房。需求：英语、数学、物理、体育。', author:{ id:'g4',name:'民和县教育局',avatar:'🏫',role:'govt',verified:true,badge:'青海海东民和县教育局',location:'青海海东'},region:'青海海东市民和县', tags:['青海','回族','土族','800名学生'],deadline:'2027-06-20', contact:'电话: 0972-XXXXXXX',views:234,createdAt:'2026-08-01'},
    { id:'r10',type:'team_recruit',status:'active', title:'筑梦支教团2027暑期招募—6年深耕陕甘宁', content:'西安交通大学筑梦支教团招募2027暑期队员。服务地：宁夏固原、甘肃天水、陕西商洛。时长15-18天。招募25-30人。特色课程：AI启蒙、科技制作、历史故事、书法。', author:{...A2.dapeng,role:'official',badge:'筑梦支教团·副队长'},region:'宁夏固原/甘肃天水/陕西商洛', tags:['西安交大','陕甘宁','6年','25-30人'],deadline:'2027-05-31', contact:'公众号: 筑梦支教团',views:234,createdAt:'2026-08-01'},
    { id:'r11',type:'material_request',status:'active', title:'青海玉树称多县支教点急需保暖物资', content:'玉树称多县海拔4200米，8月份晚上温度只有5度左右，冬季可达-25度。急需保暖睡袋×30、羽绒服×30（6-12岁）、加厚棉被×20、保温杯×50。', author:{ id:'v10',name:'追光者支教队',avatar:'💫',role:'official',verified:true,badge:'追光者支教队·物资组',location:'青海玉树'},region:'青海玉树称多县', tags:['高寒','保暖物资','睡袋','羽绒服','青海'],deadline:'2026-08-15', contact:'微信: zhuiguangzhe_team',views:189,createdAt:'2026-08-02'},
    { id:'r12',type:'volunteer_wanted',status:'active', title:'西藏日喀则市南木林县招募首个支教队伍', content:'南木林县目前还没有任何支教队伍对接。完全小学600名学生，80%藏族。有藏语基础的优先，会唱歌跳舞的优先（藏族孩子特别喜欢文艺活动）。', author:{ id:'g5',name:'日喀则市教育局',avatar:'🏛️',role:'govt',verified:true,badge:'西藏日喀则市教育局',location:'西藏日喀则'},region:'西藏日喀则南木林县', tags:['西藏','藏族','首个支教队','600名学生'],deadline:'2027-06-01', contact:'电话: 0892-XXXXXXX',views:432,createdAt:'2026-07-29'},
    { id:'r13',type:'self_recommend',status:'active', title:'美术专业毕业生，想用画笔记录100个支教瞬间', content:'中国美术学院插画专业应届毕业生，女，24岁。我想去支教队里做"随队画家"——每天用画笔记录课堂上的孩子们。最后做成绘本《100个山里孩子的笑脸》。自带画材，自理交通。', author:{ id:'p5',name:'小美',avatar:'美',role:'public',verified:false,badge:'中国美术学院·插画专业',location:'浙江杭州'},region:'不限', tags:['画家','记录','绘本','艺术'], contact:'微信: xiaomei_art2026',views:756,createdAt:'2026-07-29'},
    { id:'r14',type:'team_recruit',status:'active', title:'彩云之南志愿队2027招募—边疆少数民族教育', content:'云南大学彩云之南志愿队招募2027暑期队员。服务地：西双版纳（傣族）、怒江（傈僳族）、迪庆（藏族）。特色项目：民族文化传承、边疆地理科普、东南亚语兴趣课。', author:{...A2.xueli,role:'official',badge:'彩云之南志愿队·队长'},region:'云南西双版纳/怒江/迪庆', tags:['云南','少数民族','傣族','藏族','边疆'],deadline:'2027-05-15', contact:'公众号: 彩云之南志愿队',views:312,createdAt:'2026-07-27'},
    { id:'r15',type:'material_request',status:'active', title:'河南信阳乡村小学募集教学一体机', content:'信阳市商城县汪桥镇中心小学唯一的投影仪用了12年坏掉了。希望能募集到1-2台闲置的教学一体机（带触摸屏那种），新旧均可。', author:{...A2.zhang2,role:'official',badge:'汪桥镇中心小学校长'},region:'河南信阳商城县', tags:['教学设备','一体机','河南','600人','多媒体'],deadline:'2026-09-01', contact:'手机: 136XXXX2345',views:201,createdAt:'2026-07-30'},
  )
}


