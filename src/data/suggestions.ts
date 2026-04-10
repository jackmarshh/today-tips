export type Situation = "normal" | "meetings" | "low_energy" | "weekend";

export interface Suggestion {
  id: string;
  title: string;
  action_text: string;
  tone_tag: string;
  priority: "high" | "medium" | "low";
  category: "work_rhythm" | "task_dist" | "comm" | "recovery" | "evening";
}

export interface DayPlan {
  judgment: string;
  suggestions: Suggestion[];
  pitfall: string;
}

interface SuggestionPool {
  judgments: string[];
  pitfalls: string[];
  suggestions: Suggestion[];
}

const TARGET_SUGGESTION_POOL_SIZE = 96;

export const SITUATIONS: { id: Situation; label: string; icon: string }[] = [
  { id: "normal", label: "正常上班日", icon: "Briefcase" },
  { id: "meetings", label: "会很多的一天", icon: "Users" },
  { id: "low_energy", label: "状态很差的一天", icon: "BatteryWarning" },
  { id: "weekend", label: "周末", icon: "Coffee" },
];

type ScenarioTemplateConfig = {
  titlePrefixes: string[];
  titleCores: string[];
  actionCores: string[];
  actionTails: string[];
  toneTags: string[];
  categories: Suggestion["category"][];
};

const getRandom = <T>(arr: T[], n: number): T[] => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

const pickByCycle = <T>(arr: T[], index: number): T => arr[index % arr.length];

const priorityByIndex = (index: number): Suggestion["priority"] => {
  if (index % 5 === 0 || index % 7 === 0) {
    return "high";
  }
  if (index % 2 === 0) {
    return "medium";
  }
  return "low";
};

function buildSuggestions(
  scenarioId: string,
  config: ScenarioTemplateConfig,
  total = TARGET_SUGGESTION_POOL_SIZE,
): Suggestion[] {
  const list: Suggestion[] = [];

  for (let i = 0; i < total; i += 1) {
    const prefix = pickByCycle(config.titlePrefixes, Math.floor(i / config.titleCores.length));
    const core = pickByCycle(config.titleCores, i);
    const actionCore = pickByCycle(config.actionCores, i);
    const actionTail = pickByCycle(config.actionTails, Math.floor(i / config.actionCores.length));
    const title = `${prefix}${core}`;

    list.push({
      id: `${scenarioId}${i + 1}`,
      title,
      action_text: `${actionCore}${actionTail}`,
      tone_tag: pickByCycle(config.toneTags, i),
      priority: priorityByIndex(i),
      category: pickByCycle(config.categories, i),
    });
  }

  return list;
}

const normalConfig: ScenarioTemplateConfig = {
  titlePrefixes: ["稳住 ", "轻盈 ", "利落 ", "不慌 ", "清爽 ", "顺手 ", "准点 ", "好节奏 "],
  titleCores: [
    "开工",
    "主线推进",
    "消息整队",
    "会议预热",
    "任务拆分",
    "专注冲刺",
    "午后保电",
    "节奏回正",
    "沟通降噪",
    "收工铺路",
    "复盘一下",
    "边界守住",
  ],
  actionCores: [
    "先挑一件 20 分钟内能收尾的小事热身，",
    "把今天最重要的 1-2 件事写在最上面，",
    "即时消息按整点批量处理，",
    "会前先写下目标和底线，",
    "卡住 25 分钟就先切换到次要任务，",
    "午饭后先做轻任务找回手感，",
    "给自己留 45 分钟不被打断时段，",
    "沟通前先写三行结论，",
    "有人插单时先问优先级，",
    "下班前把明早第一步写好，",
    "每坐一小时起来活动一下，",
    "收工前记一条今天做对的决定，",
  ],
  actionTails: [
    "你会明显更快进入状态。",
    "这样今天不容易被临时消息带跑。",
    "省下来的脑力留给真正要紧的事。",
    "今天走稳扎稳打路线，反而更省心。",
    "别追求一口吃完，能持续推进就赢了。",
    "把“忙”变成“有产出”，班味会轻很多。",
    "先把节奏抓住，再考虑花活。",
    "让今天看起来像你在掌控，而不是在救火。",
  ],
  toneTags: ["稳推进", "防跑偏", "省脑力", "小胜利", "通勤脑友好", "收工友好", "反内耗", "清爽感"],
  categories: ["work_rhythm", "task_dist", "comm", "recovery", "evening"],
};

const meetingsConfig: ScenarioTemplateConfig = {
  titlePrefixes: ["开会 ", "控场 ", "高效 ", "会后 ", "低耗 ", "冷静 ", "轻负担 ", "保嗓 "],
  titleCores: [
    "破冰",
    "目标对齐",
    "发言提速",
    "三行记录",
    "待办归位",
    "结论落地",
    "时间守门",
    "会间回血",
    "无效会议止损",
    "边界表达",
    "信息同步",
    "下班断联",
  ],
  actionCores: [
    "开会前先确认这场会要输出什么，",
    "发言先结论后理由，",
    "每场会只记结论、负责人和时间点，",
    "会中跑偏时主动拉回议题，",
    "临时新任务先说“我评估后回复”，",
    "两场会之间给自己留 5 分钟呼吸，",
    "能文档同步就别额外拉会，",
    "会后 10 分钟内发简要总结，",
    "高密度会议日只保一个专注时段，",
    "中午给嗓子和脑子都留静音时间，",
    "把会后待办按优先级分层，",
    "晚上非紧急消息统一延后处理，",
  ],
  actionTails: [
    "这样这场会才有“收口”而不只是热闹。",
    "你会发现沟通时间直接减半。",
    "避免会后大家各回各的平行宇宙。",
    "今天会多，重点是清晰，不是全程高能。",
    "少承诺一步，能少返工一圈。",
    "把精力花在关键会，剩下都轻量化。",
    "你不是会议机器，留点电给真正产出。",
    "稳住节奏，今天照样可以体面下班。",
  ],
  toneTags: ["会前buff", "控场感", "会后闭环", "少返工", "省时术", "打工人友好", "保命招", "高效会风"],
  categories: ["comm", "work_rhythm", "task_dist", "recovery", "evening"],
};

const lowEnergyConfig: ScenarioTemplateConfig = {
  titlePrefixes: ["省电 ", "温柔 ", "低耗 ", "慢启动 ", "兜底 ", "轻量 ", "回血 ", "稳住 "],
  titleCores: [
    "开机",
    "底线任务",
    "脑力止损",
    "沟通简化",
    "任务减重",
    "午间回血",
    "节奏放缓",
    "焦虑降温",
    "边界提醒",
    "收工兜底",
    "身体优先",
    "心态保护",
  ],
  actionCores: [
    "先锁定今天唯一不能掉的任务，",
    "把大任务切成 15 分钟小块，",
    "沟通尽量用模板句减少临场耗能，",
    "能异步沟通就尽量异步，",
    "先做不费脑的小任务热机，",
    "中午闭眼 20 分钟强制休整，",
    "状态发木时先起身走两分钟，",
    "待办列表只留 3 件关键项，",
    "不确定的事延后到清醒时段，",
    "提前同步今天交付边界，",
    "晚上早点切换到恢复模式，",
    "今天做到 70 分就先给自己过关，",
  ],
  actionTails: [
    "电量低的时候，先保底线就是高明策略。",
    "你不是懒，是在做正确的能量管理。",
    "别硬拼状态，顺势安排更有效率。",
    "今天要的是稳，不是赢麻了。",
    "减少决策次数，脑子会轻很多。",
    "慢一点并不丢脸，翻车才最费电。",
    "把自己照顾好，任务反而更稳。",
    "先不内耗，今天就已经赢一半。",
  ],
  toneTags: ["省电模式", "温柔执行", "反内耗", "低耗过关", "稳住先", "回血中", "心态兜底", "慢慢来"],
  categories: ["task_dist", "work_rhythm", "comm", "recovery", "evening"],
};

const weekendConfig: ScenarioTemplateConfig = {
  titlePrefixes: ["周末 ", "快乐 ", "松弛 ", "轻松 ", "散养 ", "慢悠悠 ", "生活味 ", "充电 "],
  titleCores: [
    "开场",
    "消息静音",
    "出门透气",
    "小事治愈",
    "社交减负",
    "生活整理",
    "随性进食",
    "数字断连",
    "晚间放松",
    "焦虑卸载",
    "周一缓冲",
    "快乐收尾",
  ],
  actionCores: [
    "先把工作消息静音半天，",
    "今天至少出门走 15 分钟，",
    "安排一件纯喜欢且不讲效率的事，",
    "周末清单最多留 3 项，",
    "不想去的局可以礼貌改天，",
    "花 15 分钟整理一个小角落，",
    "给自己一顿真正想吃的饭，",
    "挑两小时不刷短视频，",
    "傍晚留一段慢节奏发呆时间，",
    "如果开始焦虑周一，写下 3 件可控小事，",
    "睡前准备明早第一步，",
    "允许计划临时变动，",
  ],
  actionTails: [
    "周末先把心情充满，再谈计划。",
    "恢复感比“完成感”更重要。",
    "你不是在摆烂，是在给下周蓄能。",
    "今天不赶 KPI，轻松反而更有生活味。",
    "把时间花在真正让你开心的地方。",
    "周末的主线是舒服，不是高产。",
    "少一点任务感，多一点人味儿。",
    "今天的你可以只负责开心一点点。",
  ],
  toneTags: ["快乐优先", "松弛感", "周末友好", "生活感", "治愈向", "散养派", "轻负担", "慢享受"],
  categories: ["recovery", "comm", "work_rhythm", "task_dist", "evening"],
};

const pools: Record<Situation, SuggestionPool> = {
  normal: {
    judgments: [
      "今天是常规难度，稳扎稳打比激情爆发更有用。",
      "不用演年度冲刺，把该做的做实就已经很体面。",
      "这是一个适合慢启动快收尾的正常工作日。",
      "今天不拼天赋，拼节奏，先把优先级排顺。",
      "整体风平浪静，别自己制造暴风雨。",
      "你今天的胜利标准很简单：别乱、别拖、别加戏。",
      "能量中等偏上，适合打完几场小胜仗。",
      "今天不是做英雄的一天，是做靠谱队友的一天。",
      "先把可交付做出来，其他灵感晚点再聊。",
      "今天关键词是：稳，别急着证明自己是超人。",
      "有条不紊比临时爆种更可靠。",
      "今天别追求完美，追求清晰就很强。",
      "少一点多线程，质量会更好看。",
      "把主线守住，今天就算赢面很大。",
      "事情不一定少，但可以做得更顺。",
      "今天适合走“先完成再优化”的路线。",
      "只要节奏不乱，今天不会太难。",
      "别跟焦虑比速度，先跟计划对齐。",
      "稳稳交付就是最硬的能力。",
      "今天可以不耀眼，但一定要靠谱。",
      "任务再多也别慌，先拿下第一件。",
      "按优先级走，今天不会亏。",
      "今天是管理注意力的一天，不是管理情绪的一天。",
      "能稳住节奏的人，最容易把今天过好。",
    ],
    pitfalls: [
      "别一上来先开邮箱，容易半小时后还在回昨天的消息。",
      "下午犯困时别立宏愿，先把手头任务切小。",
      "不要把“优化一下”变成三小时无底洞。",
      "别在临下班前接一个“很快就能做完”的新需求。",
      "别让群消息决定你今天的主线剧情。",
      "不要为了显得忙，把简单事做得很复杂。",
      "午休后别直接开最难的任务，先热身 15 分钟。",
      "别把别人的焦虑接过来当自己的 KPI。",
      "今天不适合翻旧账，尤其是技术债老故事。",
      "别把所有沟通都攒到晚上，晚点你会更不想回。",
      "别把待办越写越长，重点只会越来越糊。",
      "不要一口气开太多分支，容易颗粒无收。",
      "别为了回得快牺牲交付质量。",
      "不必逢会必发言，关键点说清更值钱。",
      "不要让拖延伪装成“再想想”。",
      "别把简单问题讨论成哲学问题。",
      "不要把补救当默认流程，预防更省力。",
      "别把所有事都当紧急，真的会把紧急搞丢。",
      "别等能量见底才想起休息。",
      "不要把今天过成“被通知牵着走”。",
      "别硬扛到下班，适时求助更聪明。",
      "不要在情绪上头时发关键消息。",
      "别把白天的坑拖到晚上填。",
      "别把“等等再做”变成“明天再说”。",
    ],
    suggestions: buildSuggestions("n", normalConfig),
  },
  meetings: {
    judgments: [
      "今天会多，主线是保住注意力和嗓子，不是硬拼产出。",
      "你今天是会议副本玩家，目标是高效通关而不是全程发光。",
      "日程表很满，先保证关键会质量，其他会尽量轻量化。",
      "今天会有点吵，记得给自己留几段安静时间回血。",
      "今天不是做很多事的一天，是做对几件事的一天。",
      "会议密度偏高，别焦虑，先当一个清醒的记录员。",
      "你的核心任务是把会开明白，而不是把人都说服。",
      "今天要少承诺、多确认，防止会后任务爆炸。",
      "保持耐心，很多会看起来像绕圈，其实是组织在对齐。",
      "把会当项目管理工具，不要当情绪马拉松。",
      "今天关键是收口，不是输出时长。",
      "会多不可怕，没结论才可怕。",
      "你要做的是提炼重点，不是接住所有球。",
      "先守住关键会，再救可选会。",
      "今天以清晰为王，语速不用赢。",
      "每场会拿一点结果，就算高分。",
      "会多的一天更要做减法。",
      "别当全场翻译机，做结论提炼器就够了。",
      "控节奏比控情绪更重要。",
      "今天的你是“会议闭环工程师”。",
      "先做对齐，再做推进。",
      "把发言变短，效率会变高。",
      "保持稳定表达，胜过情绪高燃。",
      "今天的目标是“说得清、收得住、走得掉”。",
    ],
    pitfalls: [
      "别把会排成连堂课，至少留 5-10 分钟喘气窗口。",
      "不要在会上顺口答应新活，先问优先级再承接。",
      "别为了证明自己懂，抢着回答每个问题。",
      "不要带着空电量参会，设备和你都会先掉线。",
      "会前不看议程，会上就容易被动点头。",
      "别在讨论发散时默默崩溃，直接提议回到目标。",
      "不要把会后待办全记脑子里，晚上会全部失忆。",
      "别把每场会都当决策会，有些只是信息同步。",
      "会后立刻切下个会前，容易把刚刚结论弄丢。",
      "不要把“我会后补充”说太多次，信用会被透支。",
      "别把全部注意力花在礼貌上，信息准确更重要。",
      "不要在争论里追求赢，追求结论才划算。",
      "别让会议情绪延续到下一场。",
      "不要每个问题都现场解完，拆分更高效。",
      "别只听谁说得大声，要盯谁负责落地。",
      "不要把同一件事开三次会。",
      "别忽略会后同步，这一步最关键。",
      "不要边开会边回十个群，最后谁都没听清。",
      "别把“再讨论”当成默认结论。",
      "不要为了显得积极而接超载任务。",
      "别把午休也献祭给会议。",
      "不要临下班再开新的长会。",
      "别让会议占满你所有专注时间。",
      "不要对低优先级会投入过高情绪。",
    ],
    suggestions: buildSuggestions("m", meetingsConfig),
  },
  low_energy: {
    judgments: [
      "今天电量偏低，目标是稳住基本盘，不是冲高难度。",
      "状态一般没关系，先做能做的，别和自己硬刚。",
      "今天请用省电模式：少切换、少社交、少内耗。",
      "你今天不需要证明很强，只需要保持在线。",
      "允许自己慢一点，稳定比爆发更重要。",
      "今天的胜利是守住底线，不是刷爆进度条。",
      "脑子有点转不动很正常，先把任务颗粒度切小。",
      "今天建议走简化路线，减少不必要决策。",
      "状态差不是失败，是系统提醒你该降档了。",
      "今天先求不崩，再求有产出，顺序别反。",
      "电量低时，策略比意志力更重要。",
      "先把自己照顾好，效率自然会上来。",
      "今天别追求硬核，追求稳态。",
      "你不是不行，只是需要低耗版本。",
      "先把坑绕开，比硬冲更聪明。",
      "慢一点是为了不翻车。",
      "今天走“少而精”路线最划算。",
      "今天的你适合守城，不适合攻塔。",
      "先把情绪降温，执行会更顺。",
      "今天可以温柔一点，不影响你靠谱。",
      "先稳住心跳，再稳住任务。",
      "每推进一点都算数，不必一口吃完。",
      "低能量日最怕硬拼，最强的是会调度。",
      "今天是保电日，不是拼命日。",
    ],
    pitfalls: [
      "别在低能量日接复杂新活，容易越做越乱。",
      "不要靠狂喝咖啡硬撑，心慌会比效率先到。",
      "别一边自责一边工作，这会同时损耗两份电量。",
      "今天尽量少做高风险决定，把拍板留给清醒时段。",
      "别把午休让给刷手机，醒来会更像没睡。",
      "不要把自己塞进高密度社交场，今天不划算。",
      "别对每条消息秒回，你不是客服机器人。",
      "不要为了弥补效率低而无限加班，明天会更难。",
      "今天别挑战极限多线程，单线程更靠谱。",
      "别把“我应该更努力”当成唯一策略，你现在更需要节能。",
      "别把小失误放大成自我否定。",
      "不要让焦虑驱动排期，结果会更乱。",
      "别在疲惫时和人硬碰硬。",
      "不要拿高能量日标准要求今天的自己。",
      "别跳过吃饭和补水，身体会先抗议。",
      "不要把所有难题都压到今天处理。",
      "别为了看起来努力而选择最难做法。",
      "不要在低电量时做长时间深度沟通。",
      "别把恢复动作当成可有可无。",
      "不要让待办列表压住你的呼吸感。",
      "别拖到晚上才开始关键任务。",
      "不要忽略身体报警信号。",
      "别让“再坚持一下”变成持续透支。",
      "不要把休息当成罪恶感来源。",
    ],
    suggestions: buildSuggestions("l", lowEnergyConfig),
  },
  weekend: {
    judgments: [
      "周末主线是恢复，不是把自己排得比上班还满。",
      "今天请把紧绷感放下，做点让你真放松的事。",
      "周末到了，允许自己慢一点、散一点、开心一点。",
      "今天适合补充生活感，不适合补全世界待办。",
      "这是你的自由时段，安排可以有，但不用卷。",
      "周末不求高产，求有趣，求身心都松下来。",
      "今天做点喜欢的小事，效率不是唯一指标。",
      "先把工作脑静音，再决定今天去哪儿。",
      "周末 KPI 是恢复电量，不是打卡数量。",
      "今天可以当一会儿快乐普通人，不必时刻在线。",
      "慢下来不是浪费，是回血。",
      "今天不用证明什么，舒服就行。",
      "周末就该有点“随便都行”的自由。",
      "给自己一点留白，生活感会回来。",
      "今天适合把快乐颗粒度调小调细。",
      "周末别太满，松弛才是主菜。",
      "你可以不高产，但可以很快乐。",
      "恢复比完成更值得优先。",
      "今天就做让你心情变好的事。",
      "把班味洗掉，周一才不窒息。",
      "今天是生活频道，不是绩效频道。",
      "少一点计划焦虑，多一点当下体验。",
      "周末请温柔对待自己。",
      "给自己一个不用赶路的日子。",
    ],
    pitfalls: [
      "别在周末一醒来就刷工作群，情绪会瞬间返工。",
      "不要把“放松”排成 8 个任务，那还是在上班。",
      "别为了不浪费时间把自己逼成特种兵行程。",
      "不要熬到太晚又责怪自己白天没精神。",
      "别把周末全交给碎片刷屏，结束时会空落落。",
      "不要因为懒得出门就一直躺到心情更闷。",
      "别在周末进行大型人生反省，容易越想越累。",
      "不要勉强参加消耗型社交，今天你可以有选择权。",
      "别想着把一周遗憾一次补齐，会把快乐压没。",
      "不要把明天焦虑提前到今天下午。",
      "别让外界节奏绑架你的休息方式。",
      "不要把吃饭也做成任务打卡。",
      "别因为“应该充实”而忽略身体感受。",
      "不要把周末当另一种形式的工作日。",
      "别把所有约都塞进同一天。",
      "不要只刷内容不做体验，结束会更空。",
      "别为了省事一直点外卖忽略饮食感受。",
      "不要在夜里做重大人生决策。",
      "别把周日晚上过成灾难预演。",
      "不要用社交媒体定义你的周末好坏。",
      "别因为怕麻烦就放弃小快乐。",
      "不要把休息时间都献给“等会儿再说”。",
      "别让罪恶感偷走你的放松感。",
      "不要把周末末尾安排得太刺激。",
    ],
    suggestions: buildSuggestions("w", weekendConfig),
  },
};

export function getSuggestionPool(situation: Situation): SuggestionPool {
  return pools[situation];
}

export function pickSuggestions(
  suggestions: Suggestion[],
  count: number,
  avoidSuggestionIds: string[] = [],
): Suggestion[] {
  const blocked = new Set(avoidSuggestionIds);
  const preferredPool = suggestions.filter((item) => !blocked.has(item.id));

  if (preferredPool.length >= count) {
    return getRandom(preferredPool, count);
  }

  return getRandom(suggestions, count);
}

export const generatePlan = (
  situation: Situation,
  options?: { avoidSuggestionIds?: string[] },
): DayPlan => {
  const data = getSuggestionPool(situation);
  return {
    judgment: getRandom(data.judgments, 1)[0],
    pitfall: getRandom(data.pitfalls, 1)[0],
    suggestions: pickSuggestions(data.suggestions, 4, options?.avoidSuggestionIds),
  };
};
