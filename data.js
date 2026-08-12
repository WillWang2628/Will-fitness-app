// 本地內建資料——沒有設定 Sheet CSV 網址時，App 會用這份資料跑。
// 之後在 config.js 填入 Google Sheet 發布連結後，App 會改讀 Sheet，這份資料只當離線備援。
const LOCAL_WORKOUT_ROWS = [
  { day: 1, dayName: "胸", order: 0, slot: "warmup", name: "跑步機或飛輪暖身", target: "心肺/熱身", sets: "1", reps: "10分鐘", rest: 0, video: "", notes: "強度中等，不要練到喘不過氣" },
  { day: 1, dayName: "胸", order: 1, slot: "main", name: "上斜啞鈴臥推", target: "上胸", sets: 4, reps: "8-10", rest: 90, video: "", notes: "" },
  { day: 1, dayName: "胸", order: 2, slot: "main", name: "上斜繩索夾胸", target: "上胸", sets: 3, reps: "12-15", rest: 60, video: "", notes: "" },
  { day: 1, dayName: "胸", order: 3, slot: "main", name: "平板槓鈴臥推", target: "中胸", sets: 4, reps: "8-10", rest: 90, video: "", notes: "" },
  { day: 1, dayName: "胸", order: 4, slot: "main", name: "雙槓撐體", target: "下胸", sets: 4, reps: "8-10", rest: 90, video: "", notes: "" },
  { day: 1, dayName: "胸", order: 5, slot: "main", name: "蝴蝶機夾胸", target: "中胸", sets: 3, reps: "12-15", rest: 60, video: "", notes: "座椅高度對齊肩關節，不然容易晃" },
  { day: 1, dayName: "胸", order: 6, slot: "core", name: "對抗式捲腹機", target: "上腹", sets: 3, reps: "15-20", rest: 45, video: "", notes: "" },

  { day: 2, dayName: "背", order: 0, slot: "warmup", name: "跑步機或飛輪暖身", target: "心肺/熱身", sets: "1", reps: "10分鐘", rest: 0, video: "", notes: "不要用划船機暖身，會先操到背" },
  { day: 2, dayName: "背", order: 1, slot: "main", name: "輔助引體向上機", target: "背寬", sets: 4, reps: "8-10", rest: 90, video: "", notes: "輔助重量隨進步慢慢調輕" },
  { day: 2, dayName: "背", order: 2, slot: "main", name: "槓鈴划船", target: "背厚", sets: 4, reps: "8-10", rest: 90, video: "", notes: "" },
  { day: 2, dayName: "背", order: 3, slot: "main", name: "坐姿滑輪划船", target: "背厚", sets: 4, reps: "10-12", rest: 75, video: "", notes: "" },
  { day: 2, dayName: "背", order: 4, slot: "main", name: "單臂啞鈴划船", target: "背部收縮", sets: 3, reps: "10-12", rest: 60, video: "", notes: "" },
  { day: 2, dayName: "背", order: 5, slot: "main", name: "直臂下拉", target: "背闊肌孤立", sets: 3, reps: "12-15", rest: 60, video: "", notes: "" },
  { day: 2, dayName: "背", order: 6, slot: "core", name: "懸吊抬腿", target: "下腹", sets: 3, reps: "12-15", rest: 45, video: "", notes: "" },

  { day: 3, dayName: "肩", order: 0, slot: "warmup", name: "跑步機或飛輪暖身", target: "心肺/熱身", sets: "1", reps: "10分鐘", rest: 0, video: "", notes: "" },
  { day: 3, dayName: "肩", order: 1, slot: "main", name: "站姿肩推", target: "前中束", sets: 4, reps: "8-10", rest: 90, video: "", notes: "" },
  { day: 3, dayName: "肩", order: 2, slot: "main", name: "啞鈴側平舉", target: "中束", sets: 3, reps: "12-15", rest: 60, video: "", notes: "" },
  { day: 3, dayName: "肩", order: 3, slot: "main", name: "俯身啞鈴飛鳥", target: "後束", sets: 3, reps: "12-15", rest: 60, video: "", notes: "" },
  { day: 3, dayName: "肩", order: 4, slot: "main", name: "啞鈴前平舉", target: "前束", sets: 3, reps: "12-15", rest: 60, video: "", notes: "" },
  { day: 3, dayName: "肩", order: 5, slot: "main", name: "繩索側平舉", target: "中束", sets: 3, reps: "12-15", rest: 60, video: "", notes: "" },
  { day: 3, dayName: "肩", order: 6, slot: "core", name: "棒式＋側棒式", target: "核心", sets: 3, reps: "每側30-45秒", rest: 45, video: "", notes: "" },

  { day: 4, dayName: "手臂", order: 0, slot: "warmup", name: "跑步機或飛輪暖身", target: "心肺/熱身", sets: "1", reps: "10分鐘", rest: 0, video: "", notes: "" },
  { day: 4, dayName: "手臂", order: 1, slot: "main", name: "槓鈴彎舉", target: "二頭長頭", sets: 3, reps: "10-12", rest: 60, video: "", notes: "" },
  { day: 4, dayName: "手臂", order: 2, slot: "main", name: "斜托啞鈴彎舉", target: "二頭長頭", sets: 3, reps: "10-12", rest: 60, video: "", notes: "" },
  { day: 4, dayName: "手臂", order: 3, slot: "main", name: "錘式彎舉", target: "肱肌", sets: 3, reps: "12-15", rest: 60, video: "", notes: "" },
  { day: 4, dayName: "手臂", order: 4, slot: "main", name: "繩索下壓", target: "三頭外側頭", sets: 3, reps: "12-15", rest: 60, video: "", notes: "" },
  { day: 4, dayName: "手臂", order: 5, slot: "main", name: "頭上啞鈴伸展", target: "三頭長頭", sets: 3, reps: "10-12", rest: 60, video: "", notes: "" },
  { day: 4, dayName: "手臂", order: 6, slot: "main", name: "窄握臥推", target: "三頭整體", sets: 3, reps: "8-10", rest: 90, video: "", notes: "" },
  { day: 4, dayName: "手臂", order: 7, slot: "core", name: "反向捲腹", target: "上腹", sets: 3, reps: "15-20", rest: 45, video: "", notes: "" },

  { day: 5, dayName: "弱點日", order: 0, slot: "warmup", name: "跑步機或飛輪暖身", target: "心肺/熱身", sets: "1", reps: "10分鐘", rest: 0, video: "", notes: "" },
  { day: 5, dayName: "弱點日", order: 1, slot: "main", name: "待填（4~6週後依弱點決定）", target: "待定", sets: "-", reps: "-", rest: 0, video: "", notes: "先練完幾週再回來決定加強哪個部位" },
  { day: 5, dayName: "弱點日", order: 2, slot: "core", name: "抬腿或俄羅斯轉體", target: "下腹", sets: 3, reps: "12-15", rest: 45, video: "", notes: "" },
];
