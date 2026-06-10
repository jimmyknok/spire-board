window.STS_DATA = {
  needs: [
    { id: "frontload", label: "前期伤害" },
    { id: "block", label: "稳定防御" },
    { id: "aoe", label: "群体输出" },
    { id: "draw", label: "过牌" },
    { id: "scaling", label: "成长" },
    { id: "energy", label: "能量" },
    { id: "exhaust", label: "消耗/删牌" },
    { id: "artifact", label: "反制负面" }
  ],
  characters: [
    {
      id: "ironclad",
      name: "铁甲战士",
      short: "IC",
      color: "#b73f24",
      relic: "燃烧之血",
      thesis: "用血量换节奏，先拿能赢 Act 1 的伤害，再把消耗、力量或格挡成长变成终局方案。",
      priorities: ["frontload", "block", "exhaust", "scaling"],
      watch: "不要过早拿太多慢牌。铁甲最常见的死法，是以为自己已经有后期，但还没通过本章的精英测试。"
    },
    {
      id: "silent",
      name: "静默猎手",
      short: "SI",
      color: "#5f8f4e",
      relic: "蛇之戒",
      thesis: "初始牌组防御多、输出慢，Act 1 急需高效伤害；中后期靠过牌、毒、弃牌或刀毒混合提高一致性。",
      priorities: ["frontload", "draw", "aoe", "scaling"],
      watch: "只拿防牌会被 Nob 惩罚，只拿毒会被多怪和低启动速度惩罚。"
    },
    {
      id: "defect",
      name: "故障机器人",
      short: "DF",
      color: "#408ca4",
      relic: "破损核心",
      thesis: "前期靠高数值攻击和球位过渡，中后期在集中、冰球、过牌与能量之间找闭环。",
      priorities: ["frontload", "block", "energy", "scaling"],
      watch: "能力牌很强，但 Act 1 没有即时输出时，能力牌会让你在精英战前慢一拍。"
    },
    {
      id: "watcher",
      name: "观者",
      short: "WA",
      color: "#7b4f83",
      relic: "纯水",
      thesis: "姿态转换给了最高爆发，也要求最高纪律。优先保证进出愤怒的控制，再追求无限或高频爆发。",
      priorities: ["frontload", "draw", "energy", "block"],
      watch: "观者不是缺伤害，而是缺安全退出。每次进愤怒前先问：下回合怎么活。"
    }
  ],
  cards: [
    { character: "ironclad", name: "Pommel Strike", zh: "剑柄打击", rarity: "普通", cost: 1, roles: ["frontload", "draw"], act: [1, 2], strength: 74, note: "补伤害同时循环牌组，是铁甲最舒服的早期攻击之一。" },
    { character: "ironclad", name: "Shrug It Off", zh: "耸肩无视", rarity: "普通", cost: 1, roles: ["block", "draw"], act: [1, 2, 3, 4], strength: 82, note: "稳定格挡加过牌，不挑路线，几乎任何构筑都欢迎。" },
    { character: "ironclad", name: "Anger", zh: "愤怒", rarity: "普通", cost: 0, roles: ["frontload"], act: [1], strength: 66, note: "前期抢节奏优秀，后期要小心复制污染牌组。" },
    { character: "ironclad", name: "Battle Trance", zh: "战斗专注", rarity: "罕见", cost: 0, roles: ["draw"], act: [1, 2, 3, 4], strength: 86, note: "零费大量过牌，适合把关键牌更快找出来。" },
    { character: "ironclad", name: "Uppercut", zh: "上勾拳", rarity: "罕见", cost: 2, roles: ["frontload", "artifact"], act: [1, 2], strength: 76, note: "虚弱和易伤同时解决攻防，对精英和 Boss 都有价值。" },
    { character: "ironclad", name: "Shockwave", zh: "震荡波", rarity: "罕见", cost: 2, roles: ["artifact", "scaling", "block"], act: [2, 3, 4], strength: 92, note: "一张牌改变整场战斗的易伤、虚弱和破甲质量。" },
    { character: "ironclad", name: "Offering", zh: "祭品", rarity: "稀有", cost: 0, roles: ["draw", "energy"], act: [1, 2, 3, 4], strength: 95, note: "用血量换爆发回合，特别适合铁甲的资源模型。" },
    { character: "ironclad", name: "Corruption", zh: "腐化", rarity: "稀有", cost: 3, roles: ["energy", "exhaust", "scaling"], act: [2, 3, 4], strength: 94, note: "技能零费化可以把防御变成爆发资源，需要牌组有足够技能密度。" },
    { character: "ironclad", name: "Feel No Pain", zh: "无惧疼痛", rarity: "罕见", cost: 1, roles: ["block", "exhaust", "scaling"], act: [2, 3, 4], strength: 88, note: "消耗体系的核心防御引擎，和腐化、燃烧契约、恶魔火联动极强。" },
    { character: "ironclad", name: "Immolate", zh: "燔祭", rarity: "稀有", cost: 2, roles: ["frontload", "aoe"], act: [1, 2], strength: 91, note: "极强群伤和前期数值，能显著提高 Act 2 存活率。" },
    { character: "silent", name: "Dagger Throw", zh: "匕首投掷", rarity: "普通", cost: 1, roles: ["frontload", "draw"], act: [1, 2], strength: 71, note: "补早期伤害并筛牌，是静默平滑过渡的基础件。" },
    { character: "silent", name: "Backstab", zh: "背刺", rarity: "罕见", cost: 0, roles: ["frontload"], act: [1, 2], strength: 82, note: "天生首回合爆发，专治 Act 1 输出不足。" },
    { character: "silent", name: "Leg Sweep", zh: "扫堂腿", rarity: "罕见", cost: 2, roles: ["block", "artifact"], act: [1, 2, 3, 4], strength: 88, note: "高格挡加虚弱，是静默最稳定的防守按钮。" },
    { character: "silent", name: "Crippling Cloud", zh: "致残毒云", rarity: "罕见", cost: 2, roles: ["aoe", "scaling", "artifact"], act: [2, 3, 4], strength: 84, note: "群体虚弱和毒能同时解决 Act 2 多怪压力。" },
    { character: "silent", name: "Acrobatics", zh: "杂技", rarity: "普通", cost: 1, roles: ["draw"], act: [1, 2, 3, 4], strength: 86, note: "过牌密度足够时，静默可以把强牌重复打出来。" },
    { character: "silent", name: "Calculated Gamble", zh: "精巧赌博", rarity: "罕见", cost: 0, roles: ["draw"], act: [2, 3, 4], strength: 90, note: "重洗手牌提高关键回合上限，升级后更强。" },
    { character: "silent", name: "Footwork", zh: "灵动步法", rarity: "罕见", cost: 1, roles: ["block", "scaling"], act: [1, 2, 3, 4], strength: 87, note: "敏捷让防牌变成长期资产，适合防御密度高的静默。" },
    { character: "silent", name: "Glass Knife", zh: "玻璃刀", rarity: "稀有", cost: 1, roles: ["frontload"], act: [1, 2], strength: 85, note: "高质量单体伤害，能让早期路线更敢打精英。" },
    { character: "silent", name: "Corpse Explosion", zh: "尸爆术", rarity: "稀有", cost: 2, roles: ["aoe", "scaling"], act: [2, 3, 4], strength: 93, note: "把单体击杀转成群体清场，Act 2 和 Donu Deca 表现突出。" },
    { character: "silent", name: "Adrenaline", zh: "肾上腺素", rarity: "稀有", cost: 0, roles: ["draw", "energy"], act: [1, 2, 3, 4], strength: 94, note: "零费能量和过牌，几乎没有构筑门槛。" },
    { character: "defect", name: "Ball Lightning", zh: "球状闪电", rarity: "普通", cost: 1, roles: ["frontload", "scaling"], act: [1, 2], strength: 82, note: "即时伤害加雷球，是故障前期最稳的输出补强。" },
    { character: "defect", name: "Cold Snap", zh: "寒流", rarity: "普通", cost: 1, roles: ["frontload", "block"], act: [1, 2], strength: 78, note: "攻击同时生成冰球，帮助从早期伤害过渡到防御。" },
    { character: "defect", name: "Glacier", zh: "冰川", rarity: "罕见", cost: 2, roles: ["block", "scaling"], act: [1, 2, 3, 4], strength: 91, note: "高额即时格挡加冰球，是防御体系的优质底座。" },
    { character: "defect", name: "Defragment", zh: "碎片整理", rarity: "罕见", cost: 1, roles: ["scaling", "block"], act: [1, 2, 3, 4], strength: 92, note: "集中提高所有球的质量，是故障最直接的成长。" },
    { character: "defect", name: "Coolheaded", zh: "冷静头脑", rarity: "普通", cost: 1, roles: ["block", "draw"], act: [2, 3, 4], strength: 82, note: "冰球和过牌兼具，后期稳定性很高。" },
    { character: "defect", name: "Turbo", zh: "涡轮", rarity: "普通", cost: 0, roles: ["energy"], act: [2, 3, 4], strength: 75, note: "临时能量适合爆发回合，但虚空会惩罚拖长的战斗。" },
    { character: "defect", name: "Biased Cognition", zh: "偏差认知", rarity: "稀有", cost: 1, roles: ["scaling", "artifact"], act: [1, 2, 3, 4], strength: 96, note: "巨额集中换后续衰减，配神器或快杀都很强。" },
    { character: "defect", name: "Electrodynamics", zh: "电动力学", rarity: "稀有", cost: 2, roles: ["aoe", "scaling"], act: [1, 2, 3], strength: 94, note: "把雷球变成群伤，直接解决多怪测试。" },
    { character: "defect", name: "Seek", zh: "搜寻", rarity: "稀有", cost: 0, roles: ["draw"], act: [2, 3, 4], strength: 93, note: "精准找关键牌，越到后期越接近万能答案。" },
    { character: "defect", name: "Echo Form", zh: "回响形态", rarity: "稀有", cost: 3, roles: ["scaling"], act: [2, 3, 4], strength: 89, note: "慢但上限极高，需要能活过启动回合。" },
    { character: "watcher", name: "Cut Through Fate", zh: "斩破命运", rarity: "普通", cost: 1, roles: ["frontload", "draw"], act: [1, 2, 3, 4], strength: 88, note: "输出和预见同时提高，观者最稳的普通牌之一。" },
    { character: "watcher", name: "Empty Fist", zh: "空拳", rarity: "普通", cost: 1, roles: ["frontload", "block"], act: [1, 2], strength: 79, note: "打伤害并退出姿态，给愤怒回合留安全出口。" },
    { character: "watcher", name: "Fear No Evil", zh: "无惧邪恶", rarity: "罕见", cost: 1, roles: ["frontload", "energy"], act: [1, 2, 3, 4], strength: 90, note: "在正确敌意图下进平静，是爆发和安全的连接件。" },
    { character: "watcher", name: "Tantrum", zh: "暴怒", rarity: "罕见", cost: 1, roles: ["frontload", "draw"], act: [1, 2, 3, 4], strength: 93, note: "可洗回抽牌堆的愤怒入口，和易伤、力量、发条联动都强。" },
    { character: "watcher", name: "Mental Fortress", zh: "心灵堡垒", rarity: "罕见", cost: 1, roles: ["block", "scaling"], act: [2, 3, 4], strength: 91, note: "姿态频繁转换时提供稳定格挡，是许多观者后期的防御答案。" },
    { character: "watcher", name: "Talk to the Hand", zh: "对手说话", rarity: "罕见", cost: 1, roles: ["block", "artifact"], act: [1, 2, 3, 4], strength: 92, note: "攻击转化为格挡，能显著降低多段输出的防御压力。" },
    { character: "watcher", name: "Rushdown", zh: "猛攻", rarity: "罕见", cost: 1, roles: ["draw", "scaling"], act: [1, 2, 3, 4], strength: 95, note: "愤怒入场过牌，是观者循环与无限体系核心。" },
    { character: "watcher", name: "Vault", zh: "宝库", rarity: "稀有", cost: 3, roles: ["draw", "energy"], act: [2, 3, 4], strength: 89, note: "额外回合极强，能量和手牌质量越高越离谱。" },
    { character: "watcher", name: "Lesson Learned", zh: "经验教训", rarity: "稀有", cost: 2, roles: ["frontload", "scaling"], act: [1, 2], strength: 84, note: "早拿能滚升级雪球，但不要为了触发它丢掉关键击杀节奏。" },
    { character: "watcher", name: "Scrawl", zh: "潦草急就", rarity: "稀有", cost: 1, roles: ["draw"], act: [1, 2, 3, 4], strength: 94, note: "把手牌补满，适合爆发、循环和找出口。" }
  ],
  routeTests: [
    {
      act: "Act 1",
      title: "第一章先问伤害",
      test: "能否在 Nob、Lagavulin、三哨卫前打出足够单体输出。",
      advice: "前 3-5 层优先拿高数值攻击。没有输出时，问号和火堆不如普通战斗给你补牌机会。"
    },
    {
      act: "Act 2",
      title: "第二章先问群体和防守",
      test: "多怪、飞贼、蛇花、精英连战会同时压血量和启动速度。",
      advice: "需要 AoE、虚弱、稳定格挡或强力爆发。路线里有火堆时，可以接受更激进的精英路径。"
    },
    {
      act: "Act 3",
      title: "第三章先问成长和一致性",
      test: "巨口、黑暗之子、觉醒者、甜甜圈组合会检查你的后期方案。",
      advice: "此时卡牌奖励不再看单卡强度，而看它是否提高关键牌出现率、终局成长或特定 Boss 对策。"
    },
    {
      act: "Act 4",
      title: "终章先问爆发与抗压",
      test: "矛盾双子和心脏要求你同时具备首回合抗压、持续防御、多段伤害处理和成长。",
      advice: "能量、过牌、神器、虚弱、力量/集中/敏捷成长，以及药水规划都应提前锁定。"
    }
  ]
};
