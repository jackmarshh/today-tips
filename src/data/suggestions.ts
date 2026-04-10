export type Situation = 'normal' | 'meetings' | 'low_energy' | 'weekend';

export interface Suggestion {
  id: string;
  title: string;
  action_text: string;
  tone_tag: string;
  priority: 'high' | 'medium' | 'low';
  category: 'work_rhythm' | 'task_dist' | 'comm' | 'recovery' | 'evening';
}

export interface DayPlan {
  judgment: string;
  suggestions: Suggestion[];
  pitfall: string;
}

export const SITUATIONS: { id: Situation; label: string; icon: string }[] = [
  { id: 'normal', label: '正常上班日', icon: 'Briefcase' },
  { id: 'meetings', label: '会很多的一天', icon: 'Users' },
  { id: 'low_energy', label: '状态很差的一天', icon: 'BatteryWarning' },
  { id: 'weekend', label: '周末', icon: 'Coffee' }
];

// Helper to get random items
const getRandom = <T>(arr: T[], n: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

export const generatePlan = (situation: Situation): DayPlan => {
  // We'll define pools for each situation and pick from them.
  const pools = {
    normal: {
      judgments: [
        "今天是个平平无奇的工作日，稳住就行。",
        "按部就班的一天，不求有功但求无过。",
        "精力一般般，把必须要做的搞定就下班。",
        "常规难度的一天，别给自己加戏。",
        "天气不错（或者很糟），但这并不影响你是一个成熟的打工人。"
      ],
      pitfalls: [
        "千万别在下午3点点高糖奶茶，晚上会睡不着。",
        "别一上来就做最麻烦的事，容易直接卡死。",
        "少管闲事，别人吵架你别去凑热闹。",
        "不要在临下班前10分钟问老板大问题。",
        "别在今天立“我要把所有遗留问题都解决”的Flag。"
      ],
      suggestions: [
        { id: 'n1', title: '小步热身', action_text: '先做20分钟内能收尾的小事，找找手感。', tone_tag: '启动法', priority: 'high', category: 'work_rhythm' },
        { id: 'n2', title: '摸鱼节点', action_text: '下午4点安排15分钟的合法放空时间，去倒杯水。', tone_tag: '节奏把控', priority: 'medium', category: 'recovery' },
        { id: 'n3', title: '大件拆解', action_text: '把今天最难的那件事，拆成3个你能看懂的步骤。', tone_tag: '防拖延', priority: 'high', category: 'task_dist' },
        { id: 'n4', title: '按时跑路', action_text: '提前想好晚饭吃什么，下班点一到直接走人。', tone_tag: '生活区', priority: 'low', category: 'evening' },
        { id: 'n5', title: '已读乱回', action_text: '不重要的群消息统一在午休前或者下班前批处理。', tone_tag: '信息流', priority: 'medium', category: 'comm' },
        { id: 'n6', title: '物理活动', action_text: '每坐1小时就站起来拉伸一下，你的颈椎很贵。', tone_tag: '健康投资', priority: 'high', category: 'recovery' },
        { id: 'n7', title: '断网时间', action_text: '找个没人打扰的时段，专注写代码/写文档45分钟。', tone_tag: '心流体验', priority: 'medium', category: 'work_rhythm' },
        { id: 'n8', title: '桌面清理', action_text: '花5分钟把桌子上没用的纸和杯子扔掉，心情会变好。', tone_tag: '轻量家务', priority: 'low', category: 'recovery' },
        { id: 'n9', title: '夸夸自己', action_text: '今天只要没闯祸，就算圆满成功。', tone_tag: '情绪价值', priority: 'low', category: 'evening' }
      ]
    },
    meetings: {
      judgments: [
        "今天你的主要工作就是开会，别想着还能写代码/写方案了。",
        "日程表全满，今天你就是一个无情的点头机器。",
        "连轴转的一天，护嗓子和保命最重要。",
        "会议室是你今天的常驻地，带好充电宝。",
        "今天是个体力活，说话说到口干舌燥的那种。"
      ],
      pitfalls: [
        "别把会排成连堂课，中间连上厕所的时间都不留。",
        "开会时别顺便答应别人的额外需求，说「会后看下」。",
        "不要在无关紧要的会上试图证明自己是对的。",
        "别忘了带笔和本子，哪怕你只是去装装样子。",
        "如果在会上被点名，千万别说“我没在听”。"
      ],
      suggestions: [
        { id: 'm1', title: '水分补给', action_text: '开会前倒满一杯水，水喝完就是你必须去洗手间的正当理由。', tone_tag: '保命招', priority: 'high', category: 'recovery' },
        { id: 'm2', title: '降低预期', action_text: '接受今天“什么正事都没干”的现实，开会也是工作的一部分。', tone_tag: '心理按摩', priority: 'high', category: 'task_dist' },
        { id: 'm3', title: '会议隐身', action_text: '如果是旁听会，关麦关视频，顺便把明天的小活干了。', tone_tag: '时间管理', priority: 'medium', category: 'comm' },
        { id: 'm4', title: '会后断联', action_text: '下班后绝对不看工作群，今天话说得够多了。', tone_tag: '强制关机', priority: 'medium', category: 'evening' },
        { id: 'm5', title: '抓大放小', action_text: '今天只处理会上的结论，不产生新的代办。', tone_tag: '防守反击', priority: 'low', category: 'work_rhythm' },
        { id: 'm6', title: '眼神交流', action_text: '如果必须发言，看着最友善的那个人说。', tone_tag: '社交技巧', priority: 'medium', category: 'comm' },
        { id: 'm7', title: '战术上厕所', action_text: '遇到争论不休的会议，假装去洗手间避避风头。', tone_tag: '逃生指南', priority: 'high', category: 'recovery' },
        { id: 'm8', title: '会前放空', action_text: '两场会议中间如果有5分钟，去窗边发个呆。', tone_tag: '脑力重置', priority: 'medium', category: 'work_rhythm' }
      ]
    },
    low_energy: {
      judgments: [
        "状态稀烂的一天，你的目标就是苟到下班。",
        "今天电量只有10%，开启省电模式吧。",
        "别挣扎了，今天允许自己做个废物。",
        "你的大脑今天罢工了，接受这个设定。",
        "今天唯一的任务就是：活着。"
      ],
      pitfalls: [
        "千万别在今天做任何重大决定，也别接新活。",
        "别因为效率低下而疯狂内耗，谁都有这几天。",
        "别在今天强迫自己去社交或者表现积极。",
        "今天别喝太多咖啡，越喝心越慌。",
        "别在今天跟任何人发生争执，你不占优势。"
      ],
      suggestions: [
        { id: 'l1', title: '只做底线', action_text: '挑出今天如果不做就会死人的唯一一件事，做完就装死。', tone_tag: '底线防御', priority: 'high', category: 'task_dist' },
        { id: 'l2', title: '物理隔离', action_text: '戴上降噪耳机，即使没放音乐也行，谢绝闲聊。', tone_tag: '省电模式', priority: 'medium', category: 'comm' },
        { id: 'l3', title: '糖分摄入', action_text: '去买杯平时觉得贵的咖啡或者甜点，今天你需要多巴胺。', tone_tag: '合法堕落', priority: 'low', category: 'recovery' },
        { id: 'l4', title: '早退预谋', action_text: '看看能不能准点甚至提前5分钟溜，晚上回家直接躺平。', tone_tag: '逃跑计划', priority: 'high', category: 'evening' },
        { id: 'l5', title: '机械运动', action_text: '去干点报销、整理文件这种完全不需要过脑子的活。', tone_tag: '低功耗', priority: 'medium', category: 'work_rhythm' },
        { id: 'l6', title: '阳光疗法', action_text: '如果外面有太阳，出去晒10分钟后背。', tone_tag: '自然充能', priority: 'medium', category: 'recovery' },
        { id: 'l7', title: '闭眼休息', action_text: '中午不管睡不睡得着，都戴上眼罩躺20分钟。', tone_tag: '系统维护', priority: 'high', category: 'recovery' },
        { id: 'l8', title: '放弃社交', action_text: '今天中午点外卖一个人吃，别去迎合别人的话题。', tone_tag: '社交静音', priority: 'low', category: 'comm' }
      ]
    },
    weekend: {
      judgments: [
        "周末啦！把工作脑扔进垃圾桶。",
        "这才是真正的生活时间，请尽情浪费。",
        "不用看老板脸色的两天，你怎么舒服怎么来。",
        "今天你是自由的，世界属于你。",
        "合法躺平时间已到达，请注意查收。"
      ],
      pitfalls: [
        "别在周末复盘工作，也别提前焦虑下周一。",
        "别为了“充实”把周末安排得比上班还累。",
        "别睡到下午三点然后因为浪费了一天而自责。",
        "别去人挤人的网红店当特种兵。",
        "别在周末处理那些你一直讨厌的琐事。"
      ],
      suggestions: [
        { id: 'w1', title: '消息静音', action_text: '把工作群直接免打扰，天塌下来有高个子顶着。', tone_tag: '结界展开', priority: 'high', category: 'comm' },
        { id: 'w2', title: '光合作用', action_text: '出门走走，不用去远方，去楼下便利店买瓶水也算。', tone_tag: '物理唤醒', priority: 'medium', category: 'recovery' },
        { id: 'w3', title: '无脑娱乐', action_text: '看一部不用动脑子的爆米花电影，或者刷两小时短视频。', tone_tag: '彻底放松', priority: 'low', category: 'evening' },
        { id: 'w4', title: '随性进食', action_text: '想吃什么吃什么，别管什么碳水循环了。', tone_tag: '快乐至上', priority: 'medium', category: 'task_dist' },
        { id: 'w5', title: '报复性补觉', action_text: '如果困就睡，睡到自然醒是周末最基本的尊重。', tone_tag: '修复系统', priority: 'high', category: 'work_rhythm' },
        { id: 'w6', title: '数字断舍离', action_text: '尝试有那么2个小时不看手机，去做点手工或者发呆。', tone_tag: '返璞归真', priority: 'medium', category: 'recovery' },
        { id: 'w7', title: '漫无目的', action_text: '坐上一辆不知道开往哪里的公交车，看看风景。', tone_tag: '随机探索', priority: 'low', category: 'recovery' },
        { id: 'w8', title: '洗个热水澡', action_text: '用你最喜欢的沐浴露，洗去一周的班味。', tone_tag: '物理净化', priority: 'medium', category: 'evening' }
      ]
    }
  } as const;

  const data = pools[situation];
  return {
    judgment: getRandom([...data.judgments], 1)[0],
    pitfall: getRandom([...data.pitfalls], 1)[0],
    suggestions: getRandom([...data.suggestions], 4)
  };
};
