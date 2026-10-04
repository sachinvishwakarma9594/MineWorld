// ================================
// PERSONALIZE THIS PART ❤️
// ================================
const CONFIG = {
  herName: "My love",

  // Optional: set the date you got together to show a live counter.
  // Format: "YYYY-MM-DD" (example: "2024-02-14"). Leave null to hide it.
  startDate: null,

  memories: [
    { image: "11.jpeg", title: "where it all began ♡" },
    { image: "12.jpeg", title: "my favorite smile" },
    { image: "13.jpeg", title: "just us ♡" },
    { image: "1.jpeg",  title: "that beautiful day" },
    { image: "2.jpeg",  title: "one of my favorite memories" },
    { image: "3.jpeg",  title: "with you, always" },
    { image: "4.jpeg",  title: "a moment I would replay" },
    { image: "5.jpeg",  title: "us being silly" },
    { image: "6.jpeg",  title: "and many more to come" },
    { image: "7.jpeg",  title: "my happy place" },
    { image: "8.jpeg",  title: "little moments, big love" },
    { image: "9.jpeg",  title: "you + me" },
    { image: "10.jpeg", title: "forever kind of feeling" }
  ],

  // ---- YOUR VIDEO CLIPS (10-15 sec each) ----
  // 1) Put your video files inside the "clips" folder.
  // 2) Add one line per clip below. Use .mp4 (H.264) so it plays on every phone.
  // 3) Optional "poster" = a photo shown before play (e.g. "11.jpeg").
  clips: [
    { src: "clips/clip1.mp4", title: "this one makes me smile ♡" },
    { src: "clips/clip2.mp4", title: "your laugh, on repeat" },
    { src: "clips/clip3.mp4", title: "us being silly", poster: "14.jpeg" },
    { src: "clips/clip4.mp4", title: "my favorite moment" },
  ],

  // ---- Romantic quotes (rotates automatically) ----
  quotes: [
    { text: "Out of all the moments in my life, my favorite ones all have you in them.", by: "— for you" },
    { text: "You are the calm in my chaos and the spark in my ordinary days.", by: "— always yours" },
    { text: "I don't need a perfect love story. I just need you, in every little chapter.", by: "— me, to you" },
    { text: "Somewhere between your first smile and now, my heart quietly moved in with you.", by: "— a tiny confession" },
    { text: "With you, even silence feels like my favorite song.", by: "— forever yours" },
    { text: "If I could go back and choose again, I'd walk straight to you.", by: "— no hesitation" },
    { text: "You're the person my heart looks for in every crowd.", by: "— just you" },
    { text: "Loving you is the easiest, softest, most certain thing I've ever done.", by: "— truly" },
    { text: "Whatever my future holds, I hope it holds your hand.", by: "— my wish" }
  ],

  typedLines: [
    "you make ordinary days feel like magic ✨",
    "my heart says your name a lot ♡",
    "you're my favorite hello and hardest goodbye",
    "I'm so lucky it's you 🌸",
    "every love song finally makes sense 🎶",
    "you're my forever kind of person 💍"
  ],

  loveNotes: [
    "You are my favorite person in the whole wide world. ♡",
    "Drink some water, eat something, and know I'm proud of you. 🌷",
    "I fall for you a little more every single day.",
    "Your smile is my favorite view. Always.",
    "Whatever today looks like, I'm on your team. Forever.",
    "Imagine me hugging you right now. Tight. Very tight. 🤗",
    "You're the reason ordinary days feel special.",
    "If you're reading this, you're being loved right now. ♥",
    "I'd choose you in every lifetime.",
    "You're not just my love. You're my home. 🏡"
  ]
};

// ---------- helpers ----------
const $ = id => document.getElementById(id);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isSmall = window.matchMedia("(max-width: 600px)").matches;

// Put her name everywhere.
document.querySelectorAll("[data-name]").forEach(el => { el.textContent = CONFIG.herName; });

// ---------- hearts burst (from a point) ----------
function burstHearts(count, x, y) {
  const cx = x ?? window.innerWidth / 2;
  const cy = y ?? window.innerHeight * 0.55;
  const spread = Math.min(window.innerWidth, 500);
  for (let i = 0; i < count; i++) {
    const h = document.createElement("span");
    h.textContent = Math.random() > .2 ? "♥" : "♡";
    h.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;z-index:400;pointer-events:none;` +
      `color:${Math.random() > .5 ? "#ff7899" : "#ffd1dc"};font-size:${12 + Math.random() * 20}px;`;
    document.body.appendChild(h);
    const dx = (Math.random() - .5) * spread;
    const dy = -80 - Math.random() * 400;
    const r = (Math.random() - .5) * 720;
    const anim = h.animate([
      { transform: "translate(-50%, -50%) scale(.5) rotate(0deg)", opacity: 1 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1) rotate(${r}deg)`, opacity: 0 }
    ], { duration: 900 + Math.random() * 900, easing: "cubic-bezier(.2,.8,.2,1)" });
    anim.onfinish = () => h.remove();
  }
}

// ---------- MUSIC (fixed) ----------
const audio = $("loveAudio");
const musicBtn = $("musicBtn");
const musicText = $("musicText");
let musicWanted = false;
let clipActive = 0;        // number of video clips currently playing   // does the user want music on?

function setMusicUI(on) {
  musicBtn.classList.toggle("playing", on);
  musicBtn.setAttribute("aria-pressed", String(on));
  musicText.textContent = on ? "music on" : "music off";
}

function fadeTo(target, ms = 1200) {
  const start = audio.volume;
  const t0 = performance.now();
  (function step(now) {
    const k = Math.min(1, (now - t0) / ms);
    try { audio.volume = start + (target - start) * k; } catch {}
    if (k < 1) requestAnimationFrame(step);
  })(t0);
}

async function playMusic() {
  musicWanted = true;
  try {
    audio.volume = 0;
    audio.load && audio.readyState === 0 && audio.load();
    await audio.play();
    fadeTo(0.7);
    setMusicUI(true);
    return true;
  } catch (err) {
    // Browser refused (needs a tap). Button stays "off" so it's honest.
    setMusicUI(false);
    return false;
  }
}

function pauseMusic() {
  musicWanted = false;
  audio.pause();
  setMusicUI(false);
}

musicBtn.addEventListener("click", () => {
  if (audio.paused) playMusic(); else pauseMusic();
});

audio.addEventListener("error", () => { musicText.textContent = "no song found"; });
audio.addEventListener("pause", () => { if (audio.paused) setMusicUI(false); });
audio.addEventListener("playing", () => setMusicUI(true));

// Pause when the tab/phone screen is hidden, resume when back.
document.addEventListener("visibilitychange", () => {
  if (document.hidden) { if (!audio.paused) audio.pause(); }
  else if (musicWanted && !clipActive) audio.play().catch(() => setMusicUI(false));
});

// ---------- INTRO / ENTER ----------
const intro = $("intro");
const enterBtn = $("enterBtn");
enterBtn.addEventListener("click", () => {
  intro.classList.add("opening");
  playMusic();                       // this tap is the user gesture the browser needs
  burstHearts(22, window.innerWidth / 2, window.innerHeight / 2);
  setTimeout(() => {
    intro.classList.add("gone");
    document.body.classList.remove("locked");
    startTyping();
  }, 1100);
  setTimeout(() => intro.remove(), 2000);
});

// ---------- typewriter ----------
let typingStarted = false;
function startTyping() {
  if (typingStarted) return;
  typingStarted = true;
  const el = $("typed");
  if (reduceMotion) { el.textContent = CONFIG.typedLines[0]; return; }
  let line = 0, ch = 0, del = false;
  (function tick() {
    const text = CONFIG.typedLines[line];
    el.textContent = text.slice(0, ch);
    let wait = del ? 28 : 65;
    if (!del && ch === text.length) { del = true; wait = 1800; }
    else if (del && ch === 0) { del = false; line = (line + 1) % CONFIG.typedLines.length; wait = 400; }
    else ch += del ? -1 : 1;
    setTimeout(tick, wait);
  })();
}

// ---------- memory wall + lightbox ----------
const wall = $("memoryWall");
const tilts = [-2.2, 1.7, -1.1, 2.4, -1.7, 1.2];
CONFIG.memories.forEach((m, i) => {
  const card = document.createElement("button");
  card.type = "button";
  card.className = "memory";
  card.style.setProperty("--r", `${tilts[i % 6]}deg`);
  card.setAttribute("aria-label", `Open photo: ${m.title}`);
  card.innerHTML = `
    <div class="memory-photo">
      <img src="${m.image}" alt="${m.title}" loading="lazy" decoding="async">
      <span>♡ memory ${String(i + 1).padStart(2, "0")}</span>
    </div>
    <div class="memory-caption">${m.title}</div>`;
  // If a photo fails to load, show a soft pink fallback instead of a broken icon.
  card.querySelector("img").addEventListener("error", e => { e.target.style.display = "none"; });
  card.addEventListener("click", () => openLightbox(i));
  wall.appendChild(card);
});

const lb = $("lightbox"), lbImg = $("lbImg"), lbCap = $("lbCap");
let lbIndex = 0;
function showLb(i) {
  lbIndex = (i + CONFIG.memories.length) % CONFIG.memories.length;
  const m = CONFIG.memories[lbIndex];
  lbImg.src = m.image; lbImg.alt = m.title; lbCap.textContent = m.title;
}
function openLightbox(i) {
  showLb(i);
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}
function closeLightbox() {
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden", "true");
  if (!modal.classList.contains("open")) document.body.classList.remove("modal-open");
}
$("lbClose").addEventListener("click", closeLightbox);
$("lbPrev").addEventListener("click", () => showLb(lbIndex - 1));
$("lbNext").addEventListener("click", () => showLb(lbIndex + 1));
lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
// swipe on phones
let touchX = null;
lb.addEventListener("touchstart", e => { touchX = e.touches[0].clientX; }, { passive: true });
lb.addEventListener("touchend", e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) showLb(lbIndex + (dx < 0 ? 1 : -1));
  touchX = null;
});

// ---------- letter modal ----------
const modal = $("letterModal");
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  if (!lb.classList.contains("open")) document.body.classList.remove("modal-open");
}
$("openLetter").addEventListener("click", e => {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  burstHearts(18, e.clientX, e.clientY);
});
document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => {
  if (e.key === "Escape") { closeModal(); closeLightbox(); }
  if (lb.classList.contains("open")) {
    if (e.key === "ArrowRight") showLb(lbIndex + 1);
    if (e.key === "ArrowLeft") showLb(lbIndex - 1);
  }
});

// ---------- scroll reveal ----------
const io = "IntersectionObserver" in window
  ? new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
    }, { threshold: 0.08 })
  : null;
document.querySelectorAll(".reveal").forEach(el => io ? io.observe(el) : el.classList.add("visible"));

// ---------- progress bar ----------
const bar = $("progressBar");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}, { passive: true });

// ---------- falling petals ----------
const petals = $("petals");
const PETAL_COLORS = ["rgba(255,174,195,.8)", "rgba(255,214,224,.75)", "rgba(244,181,167,.75)", "rgba(201,167,255,.6)", "rgba(255,128,168,.7)"];
function makePetal() {
  if (document.hidden || reduceMotion) return;
  const p = document.createElement("i");
  p.className = "petal";
  const s = .7 + Math.random() * .9;
  p.style.left = `${Math.random() * 100}%`;
  p.style.width = `${10 * s}px`;
  p.style.height = `${14 * s}px`;
  p.style.setProperty("--drift", `${(Math.random() - .5) * (isSmall ? 120 : 260)}px`);
  p.style.animationDuration = `${6 + Math.random() * 6}s`;
  p.style.opacity = `${.35 + Math.random() * .55}`;
  p.style.background = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
  petals.appendChild(p);
  setTimeout(() => p.remove(), 13000);
}
setInterval(makePetal, isSmall ? 1100 : 750);
for (let i = 0; i < 8; i++) setTimeout(makePetal, i * 200);

// ---------- sparkle trail + tap hearts ----------
let lastSpark = 0;
function sparkle(x, y) {
  const s = document.createElement("span");
  s.textContent = ["✦", "♡", "✧", "♥"][Math.floor(Math.random() * 4)];
  s.style.cssText = `position:fixed;left:${x}px;top:${y}px;z-index:300;pointer-events:none;` +
    `color:#ffb3c6;font-size:${9 + Math.random() * 9}px;`;
  document.body.appendChild(s);
  s.animate([
    { transform: "translate(-50%,-50%) scale(1)", opacity: .9 },
    { transform: `translate(${(Math.random() - .5) * 40 - 50}%, 40px) scale(.3)`, opacity: 0 }
  ], { duration: 800, easing: "ease-out" }).onfinish = () => s.remove();
}
if (!reduceMotion) {
  window.addEventListener("pointermove", e => {
    if (e.pointerType !== "mouse") return;
    const now = performance.now();
    if (now - lastSpark < 60) return;
    lastSpark = now; sparkle(e.clientX, e.clientY);
  }, { passive: true });
  // tiny hearts wherever you tap (great on phones)
  window.addEventListener("pointerdown", e => {
    if (e.target.closest("button, a, .lightbox")) return;
    burstHearts(4, e.clientX, e.clientY);
  }, { passive: true });
}

// ---------- together counter ----------
if (CONFIG.startDate) {
  const start = new Date(CONFIG.startDate + "T00:00:00");
  if (!isNaN(start)) {
    $("counter").hidden = false;
    const upd = () => {
      let d = Math.max(0, Date.now() - start.getTime()) / 1000;
      $("cDays").textContent = Math.floor(d / 86400).toLocaleString();
      $("cHours").textContent = Math.floor(d % 86400 / 3600);
      $("cMins").textContent = Math.floor(d % 3600 / 60);
      $("cSecs").textContent = Math.floor(d % 60);
    };
    upd(); setInterval(upd, 1000);
  }
}

// ---------- love jar ----------
const jarBtn = $("jarBtn"), jarNote = $("jarNote");
let lastNote = -1;
jarBtn.addEventListener("click", e => {
  let n;
  do { n = Math.floor(Math.random() * CONFIG.loveNotes.length); }
  while (n === lastNote && CONFIG.loveNotes.length > 1);
  lastNote = n;
  jarBtn.classList.remove("shake"); void jarBtn.offsetWidth; jarBtn.classList.add("shake");
  jarNote.classList.remove("show"); void jarNote.offsetWidth;
  jarNote.textContent = CONFIG.loveNotes[n];
  jarNote.classList.add("show");
  const r = jarBtn.getBoundingClientRect();
  burstHearts(10, r.left + r.width / 2, r.top + r.height / 3);
});

// ---------- the question (No runs away!) ----------
const noBtn = $("noBtn"), yesBtn = $("yesBtn"), ask = $("ask");
let noTries = 0;
const noTexts = ["No", "Are you sure?", "Really? 🥺", "Think again...", "Pretty please?", "Nope, can't do it 😌"];
function dodge(e) {
  if (e) e.preventDefault();
  noTries++;
  noBtn.textContent = noTexts[Math.min(noTries, noTexts.length - 1)];
  const w = ask.clientWidth;
  const maxX = Math.max(30, Math.min(w / 2 - 60, 110));
  noBtn.style.transform = `translate(${(Math.random() * 2 - 1) * maxX}px, ${(Math.random() * 2 - 1) * 70}px)`;
  yesBtn.style.transform = `scale(${Math.min(1 + noTries * 0.08, 1.4)})`;
}
noBtn.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") dodge(); });
noBtn.addEventListener("touchstart", dodge, { passive: false });
noBtn.addEventListener("click", dodge);
yesBtn.addEventListener("click", e => {
  const r = yesBtn.getBoundingClientRect();
  burstHearts(40, r.left + r.width / 2, r.top);
  ask.querySelector(".ask-q").textContent = "Good. Because I'm not letting go. ♥";
  noBtn.style.display = "none";
  yesBtn.disabled = true;
  yesBtn.textContent = "Forever ♥";
  yesBtn.style.transform = "none";
});

// ---------- heart finale ----------
const heartButton = $("heartButton"), heartMessage = $("heartMessage");
let heartClicks = 0;
const messages = [
  "I love you. A lot. ♡",
  "Okay... you made me smile too. ♡",
  "One more reason to keep choosing you.",
  "My favorite person. Always. ♡",
  "Now come here. You owe me a hug. 🤗"
];
heartButton.addEventListener("click", () => {
  heartClicks++;
  heartButton.classList.remove("pop"); void heartButton.offsetWidth; heartButton.classList.add("pop");
  const r = heartButton.getBoundingClientRect();
  burstHearts(heartClicks === 1 ? 28 : 12, r.left + r.width / 2, r.top + r.height / 2);
  heartMessage.textContent = messages[Math.min(heartClicks - 1, messages.length - 1)];
});


// =========================================================
// VIDEO CLIPS
// =========================================================
const clipTrack = $("clipTrack");
const clipDots = $("clipDots");
const clipVideos = [];

function pauseOtherClips(except) {
  clipVideos.forEach(v => { if (v !== except && !v.paused) v.pause(); });
}
function musicDuckStart() {
  clipActive++;
  if (!audio.paused) audio.pause();         // musicWanted stays true so we can resume
}
function musicDuckEnd() {
  clipActive = Math.max(0, clipActive - 1);
  if (clipActive === 0 && musicWanted && !document.hidden) {
    audio.play().then(() => fadeTo(0.7)).catch(() => {});
  }
}

if (CONFIG.clips.length === 0) {
  $("clips").hidden = true;
} else {
  CONFIG.clips.forEach((c, i) => {
    const card = document.createElement("article");
    card.className = "clip";
    card.innerHTML = `
      <div class="clip-frame">
        <video playsinline preload="metadata" ${c.poster ? `poster="${c.poster}"` : ""}
               src="${c.src}#t=0.1"></video>
        <button class="clip-play" type="button" aria-label="Play ${c.title}"><span>▶</span></button>
        <div class="clip-missing"><b>♡</b><span>add your clip here</span><small>${c.src}</small></div>
      </div>
      <div class="clip-caption">${c.title}</div>`;
    const v = card.querySelector("video");
    const btn = card.querySelector(".clip-play");
    clipVideos.push(v);

    v.addEventListener("error", () => card.classList.add("missing"));
    v.addEventListener("play", () => {
      pauseOtherClips(v);
      musicDuckStart();
      card.classList.add("playing");
      v.controls = true;
    });
    const stopped = () => { if (card.classList.contains("playing")) { card.classList.remove("playing"); musicDuckEnd(); } };
    v.addEventListener("pause", stopped);
    v.addEventListener("ended", () => { stopped(); v.controls = false; v.currentTime = 0; burstHearts(8, btn.getBoundingClientRect().left + 40, btn.getBoundingClientRect().top + 40); });

    btn.addEventListener("click", () => { v.play().catch(() => card.classList.add("missing")); });
    clipTrack.appendChild(card);

    const dot = document.createElement("i");
    clipDots.appendChild(dot);
  });

  // dots follow the swipe
  const updateDots = () => {
    const cards = clipTrack.children;
    let best = 0, bestD = Infinity;
    const mid = clipTrack.scrollLeft + clipTrack.clientWidth / 2;
    for (let i = 0; i < cards.length; i++) {
      const d = Math.abs(cards[i].offsetLeft + cards[i].offsetWidth / 2 - mid);
      if (d < bestD) { bestD = d; best = i; }
    }
    [...clipDots.children].forEach((d, i) => d.classList.toggle("on", i === best));
  };
  clipTrack.addEventListener("scroll", () => requestAnimationFrame(updateDots), { passive: true });
  updateDots();
  if (CONFIG.clips.length < 2) clipDots.hidden = true;

  // pause clips that scroll out of view
  if ("IntersectionObserver" in window) {
    const vio = new IntersectionObserver(es => {
      es.forEach(e => { if (!e.isIntersecting && !e.target.paused) e.target.pause(); });
    }, { threshold: 0.2 });
    clipVideos.forEach(v => vio.observe(v));
  }
}

// =========================================================
// ROMANTIC QUOTE SLIDER
// =========================================================
const qText = $("quoteText"), qBy = $("quoteBy"), qDots = $("quoteDots"), qCard = $("quoteCard");
let qIndex = 0, qTimer;
CONFIG.quotes.forEach(() => qDots.appendChild(document.createElement("i")));

function showQuote(i) {
  qIndex = (i + CONFIG.quotes.length) % CONFIG.quotes.length;
  qCard.classList.add("fading");
  setTimeout(() => {
    const q = CONFIG.quotes[qIndex];
    qText.textContent = q.text;
    qBy.textContent = q.by;
    [...qDots.children].forEach((d, k) => d.classList.toggle("on", k === qIndex));
    qCard.classList.remove("fading");
  }, reduceMotion ? 0 : 350);
}
function restartQuoteTimer() {
  clearInterval(qTimer);
  qTimer = setInterval(() => { if (!document.hidden) showQuote(qIndex + 1); }, 7000);
}
qCard.addEventListener("click", e => {
  showQuote(qIndex + 1); restartQuoteTimer();
  burstHearts(6, e.clientX, e.clientY);
});
qCard.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); qCard.click(); } });
// show first quote immediately
(() => { const q = CONFIG.quotes[0]; qText.textContent = q.text; qBy.textContent = q.by; qDots.children[0].classList.add("on"); })();
restartQuoteTimer();
