const SLOT_LABEL = { warmup: "熱身", main: "主練", core: "收尾" };
const SLOT_ALIAS = { "熱身": "warmup", "主練": "main", "收尾": "core", warmup: "warmup", main: "main", core: "core" };

const state = {
  days: [],
  activeDay: 1,
  activeIndex: 0, // index into flattened [warmup, ...main, core] for the active day
  timer: null,
};

function parseCSV(text) {
  const rows = [];
  const lines = text.replace(/\r/g, "").split("\n").filter((l) => l.length > 0);
  if (lines.length === 0) return rows;
  const headers = splitCSVLine(lines[0]).map((h) => h.trim());
  for (let i = 1; i < lines.length; i++) {
    const cols = splitCSVLine(lines[i]);
    if (cols.every((c) => c.trim() === "")) continue;
    const obj = {};
    headers.forEach((h, idx) => (obj[h] = (cols[idx] || "").trim()));
    rows.push({
      day: Number(obj.Day),
      dayName: obj.DayName || "",
      order: Number(obj.Order) || 0,
      slot: SLOT_ALIAS[obj.Slot] || "main",
      name: obj.ExerciseName || "",
      target: obj.Target || "",
      sets: obj.Sets || "",
      reps: obj.Reps || "",
      rest: Number(obj.RestSec) || 0,
      video: obj.VideoURL || "",
      notes: obj.Notes || "",
    });
  }
  return rows;
}

function splitCSVLine(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') { cur += '"'; i++; }
      else if (ch === '"') inQuotes = false;
      else cur += ch;
    } else {
      if (ch === '"') inQuotes = true;
      else if (ch === "\t" || ch === ",") { out.push(cur); cur = ""; }
      else cur += ch;
    }
  }
  out.push(cur);
  return out;
}

function groupByDay(rows) {
  const byDay = {};
  rows.forEach((r) => {
    if (!byDay[r.day]) byDay[r.day] = { day: r.day, dayName: r.dayName, items: [] };
    if (r.dayName) byDay[r.day].dayName = r.dayName;
    byDay[r.day].items.push(r);
  });
  return Object.values(byDay)
    .sort((a, b) => a.day - b.day)
    .map((d) => ({ ...d, items: d.items.sort((a, b) => a.order - b.order) }));
}

async function loadRows() {
  const url = (typeof SHEET_CSV_URL !== "undefined" ? SHEET_CSV_URL : "").trim();
  if (url) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("fetch failed: " + res.status);
      const text = await res.text();
      const rows = parseCSV(text);
      if (rows.length > 0) {
        localStorage.setItem("workoutRows", JSON.stringify(rows));
        return rows;
      }
    } catch (err) {
      console.warn("讀取 Sheet 失敗，改用離線快取:", err);
    }
    const cached = localStorage.getItem("workoutRows");
    if (cached) return JSON.parse(cached);
  }
  return LOCAL_WORKOUT_ROWS;
}

function parseDurationToSeconds(text) {
  if (!text) return 0;
  const min = text.match(/(\d+(?:\.\d+)?)\s*分/);
  if (min) return Math.round(parseFloat(min[1]) * 60);
  const sec = text.match(/(\d+)\s*秒/);
  if (sec) return parseInt(sec[1], 10);
  return 0;
}

function extractYouTubeId(url) {
  if (!url) return null;
  const patterns = [
    /youtu\.be\/([\w-]{6,})/,
    /youtube\.com\/watch\?v=([\w-]{6,})/,
    /youtube\.com\/embed\/([\w-]{6,})/,
    /youtube\.com\/shorts\/([\w-]{6,})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  if (/^[\w-]{6,}$/.test(url.trim())) return url.trim();
  return null;
}

function renderDayPicker() {
  const nav = document.getElementById("dayPicker");
  nav.innerHTML = "";
  state.days.forEach((d) => {
    const btn = document.createElement("button");
    btn.className = "day-btn" + (d.day === state.activeDay ? " active" : "");
    btn.textContent = `Day${d.day} ${d.dayName}`;
    btn.onclick = () => selectDay(d.day);
    nav.appendChild(btn);
  });
}

function selectDay(day) {
  stopTimer();
  state.activeDay = day;
  state.activeIndex = 0;
  renderDayPicker();
  renderDay();
}

function currentDayItems() {
  const d = state.days.find((d) => d.day === state.activeDay);
  return d ? d.items : [];
}

function renderDay() {
  const items = currentDayItems();
  const container = document.getElementById("cardList");
  container.innerHTML = "";
  items.forEach((item, idx) => {
    container.appendChild(renderCard(item, idx));
  });
  scrollToActive();
}

function renderCard(item, idx) {
  const card = document.createElement("div");
  const isActive = idx === state.activeIndex;
  card.className = "card slot-" + item.slot + (isActive ? " active" : "");
  card.id = "card-" + idx;

  const header = document.createElement("div");
  header.className = "card-header";
  header.innerHTML = `
    <span class="slot-tag">${SLOT_LABEL[item.slot]}</span>
    <span class="card-title">${item.name}</span>
    <span class="card-target">${item.target}</span>
  `;
  header.onclick = () => {
    state.activeIndex = idx;
    stopTimer();
    renderDay();
  };
  card.appendChild(header);

  if (isActive) {
    const body = document.createElement("div");
    body.className = "card-body";

    const meta = document.createElement("div");
    meta.className = "card-meta";
    meta.textContent = `${item.sets} 組 × ${item.reps}${item.rest ? "　休息 " + item.rest + "秒" : ""}`;
    body.appendChild(meta);

    if (item.notes) {
      const notes = document.createElement("div");
      notes.className = "card-notes";
      notes.textContent = "備註：" + item.notes;
      body.appendChild(notes);
    }

    const videoBox = document.createElement("div");
    videoBox.className = "video-box";
    const ytId = extractYouTubeId(item.video);
    if (ytId) {
      videoBox.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&mute=1&playsinline=1&rel=0" title="示範影片" allow="autoplay; encrypted-media" frameborder="0"></iframe>`;
    } else {
      videoBox.innerHTML = `<div class="video-placeholder">尚無影片<br><span>之後在 Sheet 補上連結會自動出現</span></div>`;
    }
    body.appendChild(videoBox);

    let timerSeconds = item.rest;
    if (!timerSeconds && item.slot === "warmup") {
      timerSeconds = parseDurationToSeconds(item.reps);
    }

    if (timerSeconds > 0) {
      const timerRow = document.createElement("div");
      timerRow.className = "timer-row";
      timerRow.innerHTML = `
        <button class="btn-timer" id="timerBtn">開始</button>
        <span class="timer-display" id="timerDisplay">${formatTime(timerSeconds)}</span>
      `;
      body.appendChild(timerRow);
    }

    const navRow = document.createElement("div");
    navRow.className = "nav-row";
    const prevBtn = document.createElement("button");
    prevBtn.className = "btn-nav";
    prevBtn.textContent = "上一動作";
    prevBtn.disabled = idx === 0;
    prevBtn.onclick = () => { state.activeIndex = Math.max(0, idx - 1); stopTimer(); renderDay(); };
    const nextBtn = document.createElement("button");
    nextBtn.className = "btn-nav";
    nextBtn.textContent = "下一動作";
    const items = currentDayItems();
    nextBtn.disabled = idx === items.length - 1;
    nextBtn.onclick = () => goToNext(idx);
    navRow.appendChild(prevBtn);
    navRow.appendChild(nextBtn);
    body.appendChild(navRow);

    card.appendChild(body);

    if (timerSeconds > 0) {
      requestAnimationFrame(() => bindTimer(timerSeconds, idx));
    }
  }

  return card;
}

function goToNext(idx) {
  const items = currentDayItems();
  stopTimer();
  if (idx < items.length - 1) {
    state.activeIndex = idx + 1;
    renderDay();
  }
}

function bindTimer(seconds, idx) {
  const btn = document.getElementById("timerBtn");
  const display = document.getElementById("timerDisplay");
  if (!btn || !display) return;

  let remaining = seconds;
  let running = false;

  const tick = () => {
    stopTimer();
    state.timer = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        stopTimer();
        running = false;
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
        goToNext(idx);
      } else {
        display.textContent = formatTime(remaining);
      }
    }, 1000);
  };

  btn.onclick = () => {
    if (!running) {
      running = true;
      btn.textContent = "暫停";
      tick();
    } else {
      running = false;
      btn.textContent = "繼續";
      stopTimer();
    }
  };

  display.onclick = () => {
    stopTimer();
    running = false;
    remaining = seconds;
    btn.textContent = "開始";
    display.textContent = formatTime(remaining);
  };
}

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function stopTimer() {
  if (state.timer) {
    clearInterval(state.timer);
    state.timer = null;
  }
}

function scrollToActive() {
  const el = document.getElementById("card-" + state.activeIndex);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

async function init() {
  const rows = await loadRows();
  state.days = groupByDay(rows);
  renderDayPicker();
  renderDay();
}

init();

// 開發階段先關閉離線快取，避免每次改版都被舊快取卡住；等畫面/流程定案後再重新啟用。
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((r) => r.unregister());
  });
  caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
}
