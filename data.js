// 本地內建資料——沒有設定 Sheet CSV 網址時，App 會用這份資料跑。
// 之後在 config.js 填入 Google Sheet 發布連結後，App 會改讀 Sheet，這份資料只當離線備援。
const R2_BASE = "https://pub-6a9b34c4dddd40fdaaaddd5635e28628.r2.dev";

const LOCAL_WORKOUT_ROWS = [
  { day: 1, dayName: "胸", order: 0, slot: "warmup", name: "跑步機或飛輪暖身", target: "心肺/熱身", sets: "1", reps: "10分鐘", rest: 0, video: `${R2_BASE}/Day%201/0%20%E7%86%B1%E8%BA%AB%20%E8%B7%91%E6%AD%A5%E6%A9%9F%E6%88%96%E9%A3%9B%E8%BC%AA%E6%9A%96%E8%BA%AB.mp4`, notes: "強度中等，不要練到喘不過氣" },
  { day: 1, dayName: "胸", order: 1, slot: "main", name: "上斜啞鈴臥推", target: "上胸", sets: 4, reps: "8-10", rest: 90, video: `${R2_BASE}/Day%201/1%20%E4%B8%BB%E7%B7%B4%20%E4%B8%8A%E6%96%9C%E5%95%9E%E9%88%B4%E8%87%A5%E6%8E%A8.mp4`, notes: "" },
  { day: 1, dayName: "胸", order: 2, slot: "main", name: "上斜繩索夾胸", target: "上胸", sets: 3, reps: "12-15", rest: 60, video: `${R2_BASE}/Day%201/2%20%E4%B8%BB%E7%B7%B4%20%E4%B8%8A%E6%96%9C%E7%B9%A9%E7%B4%A2%E5%A4%BE%E8%83%B8.mp4`, notes: "" },
  { day: 1, dayName: "胸", order: 3, slot: "main", name: "平板槓鈴臥推", target: "中胸", sets: 4, reps: "8-10", rest: 90, video: `${R2_BASE}/Day%201/3%20%E4%B8%BB%E7%B7%B4%20%E5%B9%B3%E6%9D%BF%E6%A7%93%E9%88%B4%E8%87%A5%E6%8E%A8.mp4`, notes: "" },
  { day: 1, dayName: "胸", order: 4, slot: "main", name: "雙槓撐體", target: "下胸", sets: 4, reps: "8-10", rest: 90, video: `${R2_BASE}/Day%201/4%20%E4%B8%BB%E7%B7%B4%20%E9%9B%99%E6%A7%93%E6%92%90%E9%AB%94.mp4`, notes: "" },
  { day: 1, dayName: "胸", order: 5, slot: "main", name: "蝴蝶機夾胸", target: "中胸", sets: 3, reps: "12-15", rest: 60, video: `${R2_BASE}/Day%201/5%20%E4%B8%BB%E7%B7%B4%20%E8%9D%B4%E8%9D%B6%E6%A9%9F%E5%A4%BE%E8%83%B8.mp4`, notes: "座椅高度對齊肩關節，不然容易晃" },
  { day: 1, dayName: "胸", order: 6, slot: "core", name: "對抗式捲腹機", target: "上腹", sets: 3, reps: "15-20", rest: 45, video: `${R2_BASE}/Day%201/6%20%E6%94%B6%E5%B0%BE%20%E5%B0%8D%E6%8A%97%E5%BC%8F%E6%8D%B2%E8%85%B9%E6%A9%9F.mp4`, notes: "" },

  { day: 2, dayName: "背", order: 0, slot: "warmup", name: "跑步機或飛輪暖身", target: "心肺/熱身", sets: "1", reps: "10分鐘", rest: 0, video: `${R2_BASE}/Day%202/0%20%E7%86%B1%E8%BA%AB%20%E8%B7%91%E6%AD%A5%E6%A9%9F%E6%88%96%E9%A3%9B%E8%BC%AA%E6%9A%96%E8%BA%AB.mp4`, notes: "不要用划船機暖身，會先操到背" },
  { day: 2, dayName: "背", order: 1, slot: "main", name: "輔助引體向上機", target: "背寬", sets: 4, reps: "8-10", rest: 90, video: `${R2_BASE}/Day%202/1%20%E4%B8%BB%E7%B7%B4%20%E8%BC%94%E5%8A%A9%E5%BC%95%E9%AB%94%E5%90%91%E4%B8%8A%E6%A9%9F.mp4`, notes: "輔助重量隨進步慢慢調輕" },
  { day: 2, dayName: "背", order: 2, slot: "main", name: "槓鈴划船", target: "背厚", sets: 4, reps: "8-10", rest: 90, video: `${R2_BASE}/Day%202/2%20%E4%B8%BB%E7%B7%B4%20%E6%A7%93%E9%88%B4%E5%88%92%E8%88%B9.mp4`, notes: "" },
  { day: 2, dayName: "背", order: 3, slot: "main", name: "坐姿滑輪划船", target: "背厚", sets: 4, reps: "10-12", rest: 75, video: `${R2_BASE}/Day%202/3%20%E4%B8%BB%E7%B7%B4%20%E5%9D%90%E5%A7%BF%E6%BB%91%E8%BC%AA%E5%88%92%E8%88%B9.mp4`, notes: "" },
  { day: 2, dayName: "背", order: 4, slot: "main", name: "單臂啞鈴划船", target: "背部收縮", sets: 3, reps: "10-12", rest: 60, video: `${R2_BASE}/Day%202/4%20%E4%B8%BB%E7%B7%B4%20%E5%96%AE%E8%87%82%E5%95%9E%E9%88%B4%E5%88%92%E8%88%B9.mp4`, notes: "" },
  { day: 2, dayName: "背", order: 5, slot: "main", name: "直臂下拉", target: "背闊肌孤立", sets: 3, reps: "12-15", rest: 60, video: `${R2_BASE}/Day%202/5%20%E4%B8%BB%E7%B7%B4%20%E7%9B%B4%E8%87%82%E4%B8%8B%E6%8B%89.mp4`, notes: "" },
  { day: 2, dayName: "背", order: 6, slot: "core", name: "懸吊抬腿", target: "下腹", sets: 3, reps: "12-15", rest: 45, video: `${R2_BASE}/Day%202/6%20%E6%94%B6%E5%B0%BE%20%E6%87%B8%E5%90%8A%E6%8A%AC%E8%85%BF.mp4`, notes: "" },

  { day: 3, dayName: "肩", order: 0, slot: "warmup", name: "跑步機或飛輪暖身", target: "心肺/熱身", sets: "1", reps: "10分鐘", rest: 0, video: `${R2_BASE}/Day%203/0%20%E7%86%B1%E8%BA%AB%20%E8%B7%91%E6%AD%A5%E6%A9%9F%E6%88%96%E9%A3%9B%E8%BC%AA%E6%9A%96%E8%BA%AB.mp4`, notes: "" },
  { day: 3, dayName: "肩", order: 1, slot: "main", name: "站姿肩推", target: "前中束", sets: 4, reps: "8-10", rest: 90, video: `${R2_BASE}/Day%203/1%20%E4%B8%BB%E7%B7%B4%20%E7%AB%99%E5%A7%BF%E8%82%A9%E6%8E%A8.mp4`, notes: "" },
  { day: 3, dayName: "肩", order: 2, slot: "main", name: "啞鈴側平舉", target: "中束", sets: 3, reps: "12-15", rest: 60, video: `${R2_BASE}/Day%203/2%20%E4%B8%BB%E7%B7%B4%20%E5%95%9E%E9%88%B4%E5%81%B4%E5%B9%B3%E8%88%89.mp4`, notes: "" },
  { day: 3, dayName: "肩", order: 3, slot: "main", name: "俯身啞鈴飛鳥", target: "後束", sets: 3, reps: "12-15", rest: 60, video: `${R2_BASE}/Day%203/3%20%E4%B8%BB%E7%B7%B4%20%E4%BF%AF%E8%BA%AB%E5%95%9E%E9%88%B4%E9%A3%9B%E9%B3%A5.mp4`, notes: "" },
  { day: 3, dayName: "肩", order: 4, slot: "main", name: "啞鈴前平舉", target: "前束", sets: 3, reps: "12-15", rest: 60, video: `${R2_BASE}/Day%203/4%20%E4%B8%BB%E7%B7%B4%20%E5%95%9E%E9%88%B4%E5%89%8D%E5%B9%B3%E8%88%89.mp4`, notes: "" },
  { day: 3, dayName: "肩", order: 5, slot: "main", name: "繩索側平舉", target: "中束", sets: 3, reps: "12-15", rest: 60, video: `${R2_BASE}/Day%203/5%20%E4%B8%BB%E7%B7%B4%20%E7%B9%A9%E7%B4%A2%E5%81%B4%E5%B9%B3%E8%88%89.mp4`, notes: "" },
  { day: 3, dayName: "肩", order: 6, slot: "core", name: "棒式＋側棒式", target: "核心", sets: 3, reps: "每側30-45秒", rest: 45, video: `${R2_BASE}/Day%203/6%20%E6%94%B6%E5%B0%BE%20%E6%A3%92%E5%BC%8F%EF%BC%8B%E5%81%B4%E6%A3%92%E5%BC%8F.mp4`, notes: "" },

  { day: 4, dayName: "手臂", order: 0, slot: "warmup", name: "跑步機或飛輪暖身", target: "心肺/熱身", sets: "1", reps: "10分鐘", rest: 0, video: `${R2_BASE}/Day%204/0%20%E7%86%B1%E8%BA%AB%20%E8%B7%91%E6%AD%A5%E6%A9%9F%E6%88%96%E9%A3%9B%E8%BC%AA%E6%9A%96%E8%BA%AB.mp4`, notes: "" },
  { day: 4, dayName: "手臂", order: 1, slot: "main", name: "槓鈴彎舉", target: "二頭長頭", sets: 3, reps: "10-12", rest: 60, video: `${R2_BASE}/Day%204/1%20%E4%B8%BB%E7%B7%B4%20%E6%A7%93%E9%88%B4%E5%BD%8E%E8%88%89.mp4`, notes: "" },
  { day: 4, dayName: "手臂", order: 2, slot: "main", name: "斜托啞鈴彎舉", target: "二頭長頭", sets: 3, reps: "10-12", rest: 60, video: `${R2_BASE}/Day%204/2%20%E4%B8%BB%E7%B7%B4%20%E6%96%9C%E6%89%98%E5%95%9E%E9%88%B4%E5%BD%8E%E8%88%89.mp4`, notes: "" },
  { day: 4, dayName: "手臂", order: 3, slot: "main", name: "錘式彎舉", target: "肱肌", sets: 3, reps: "12-15", rest: 60, video: `${R2_BASE}/Day%204/3%20%E4%B8%BB%E7%B7%B4%20%E9%8C%98%E5%BC%8F%E5%BD%8E%E8%88%89.mp4`, notes: "" },
  { day: 4, dayName: "手臂", order: 4, slot: "main", name: "繩索下壓", target: "三頭外側頭", sets: 3, reps: "12-15", rest: 60, video: `${R2_BASE}/Day%204/4%20%E4%B8%BB%E7%B7%B4%20%E7%B9%A9%E7%B4%A2%E4%B8%8B%E5%A3%93.mp4`, notes: "" },
  { day: 4, dayName: "手臂", order: 5, slot: "main", name: "頭上啞鈴伸展", target: "三頭長頭", sets: 3, reps: "10-12", rest: 60, video: `${R2_BASE}/Day%204/5%20%E4%B8%BB%E7%B7%B4%20%E9%A0%AD%E4%B8%8A%E5%95%9E%E9%88%B4%E4%BC%B8%E5%B1%95.mp4`, notes: "" },
  { day: 4, dayName: "手臂", order: 6, slot: "main", name: "窄握臥推", target: "三頭整體", sets: 3, reps: "8-10", rest: 90, video: `${R2_BASE}/Day%204/6%20%E4%B8%BB%E7%B7%B4%20%E7%AA%84%E6%8F%A1%E8%87%A5%E6%8E%A8.mp4`, notes: "" },
  { day: 4, dayName: "手臂", order: 7, slot: "core", name: "反向捲腹", target: "上腹", sets: 3, reps: "15-20", rest: 45, video: `${R2_BASE}/Day%204/7%20%E6%94%B6%E5%B0%BE%20%E5%8F%8D%E5%90%91%E6%8D%B2%E8%85%B9.mp4`, notes: "" },

  { day: 5, dayName: "弱點日", order: 0, slot: "warmup", name: "跑步機或飛輪暖身", target: "心肺/熱身", sets: "1", reps: "10分鐘", rest: 0, video: `${R2_BASE}/Day%205/0%20%E7%86%B1%E8%BA%AB%20%E8%B7%91%E6%AD%A5%E6%A9%9F%E6%88%96%E9%A3%9B%E8%BC%AA%E6%9A%96%E8%BA%AB.mp4`, notes: "" },
  { day: 5, dayName: "弱點日", order: 1, slot: "main", name: "待填（4~6週後依弱點決定）", target: "待定", sets: "-", reps: "-", rest: 0, video: "", notes: "先練完幾週再回來決定加強哪個部位" },
  { day: 5, dayName: "弱點日", order: 2, slot: "core", name: "抬腿或俄羅斯轉體", target: "下腹", sets: 3, reps: "12-15", rest: 45, video: `${R2_BASE}/Day%205/2%20%E6%94%B6%E5%B0%BE%20%E4%BF%84%E7%BE%85%E6%96%AF%E8%BD%89%E9%AB%94.mp4`, notes: "" },
];
