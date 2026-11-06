/* Day 5 (Plan B) scene helper. Owner: day05-planb. Used only by day05-planb/scenes/*.html.
   Each scene calls planbScene(name, {notes, caps, draw, durs}). The deck drives the scene through
   window[name] = {advance, back, atStart, atEnd, reset, resetToEnd, getBeat, notes}.
   Beat 0 is the title alone. Moving forward plays that beat's build once (no motion advances a beat
   by itself); moving back jumps to the end state of the previous beat. */
const PB = {
  FONT: "Calibri, Carlito, 'Helvetica Neue', Arial, sans-serif",
  INK: '#0f172a', MUTE: '#64748b', LINE: '#cbd5e1', SOFT: '#f1f5f9',
  ACC: '#4f6d9a', ACC_L: '#c9d5e8',          /* embeddings and the highlighted patch (deck --accent) */
  CLS: '#0f172a',                            /* the class token: solid ink */
  RGB: ['#c0392b', '#2e8b57', '#2f6db5'],    /* the three color channels, used only for R, G, B */
  clamp: (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)),
  ease: p => p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2,
  lerp: (a, b, t) => a + (b - a) * t,
  font(px, w = 400){ return `${w} ${Math.round(px)}px ${this.FONT}`; },
  /* progress of a sub-step that runs from time a to time b (in ms after the click) */
  seg(t, a, b){ return this.ease(this.clamp((t - a) / (b - a))); },
  /* seeded shuffle (mulberry32), so every run shows the same order */
  shuffle(n, seed = 7){
    let s = seed >>> 0; const r = () => { s = (s + 0x6D2B79F5) >>> 0; let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
    const a = [...Array(n).keys()];
    for(let i = n - 1; i > 0; i--){ const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  },
};

/* The photo (copied from day05/assets/cnn-limits, square crop): a 64 x 64 pixel version for the numbers,
   and the 512 x 512 file for display. */
PB.cat = new Promise(ok => {
  const im = new Image();
  im.onload = () => {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const g = c.getContext('2d'); g.drawImage(im, 0, 0, 64, 64);
    const d = g.getImageData(0, 0, 64, 64).data;
    const px = (x, y) => { const i = 4 * (y * 64 + x); return [d[i], d[i + 1], d[i + 2]]; };
    ok({im, small: c, px});
  };
  im.src = '../assets/planb-cat-512.jpg';
});
PB.CREDIT = 'Photo: Keith Kissel, “June odd-eyed-cat” (cropped), CC BY 2.0, via Wikimedia Commons';
PB.EYE = {col: 5, row: 4};   /* the patch holding the blue eye, from planb-cat-512.jpg by script (centroid 41.2, 33.3 px at 64 x 64) */

/* 8 x 8 grid helpers on a square at (x, y) of side s */
PB.cellRect = (x, y, s, n, k) => { const c = s / n; return [x + (k % n) * c, y + Math.floor(k / n) * c, c]; };
PB.drawImageSquare = (ctx, src, x, y, s, pixelated = true) => {
  ctx.save(); ctx.imageSmoothingEnabled = !pixelated; ctx.drawImage(src, x, y, s, s); ctx.restore(); };
PB.grid = (ctx, x, y, s, n, color = '#fff', lw = 1.5, p = 1) => {
  ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = lw; ctx.beginPath();
  for(let k = 1; k < n; k++){
    const u = x + k * s / n, v = y + k * s / n;
    ctx.moveTo(u, y); ctx.lineTo(u, y + s * p);
    ctx.moveTo(x, v); ctx.lineTo(x + s * p, v);
  }
  ctx.stroke(); ctx.restore();
};
PB.text = (ctx, str, x, y, px, {w = 400, color = PB.INK, align = 'center', base = 'middle', alpha = 1} = {}) => {
  ctx.save(); ctx.globalAlpha *= alpha; ctx.fillStyle = color; ctx.font = PB.font(px, w);
  ctx.textAlign = align; ctx.textBaseline = base; ctx.fillText(str, x, y); ctx.restore();
};
PB.arrow = (ctx, x1, y1, x2, y2, color = PB.MUTE, lw = 2, head = 9) => {
  ctx.save(); ctx.strokeStyle = ctx.fillStyle = color; ctx.lineWidth = lw;
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
  const a = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath(); ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - head * Math.cos(a - .45), y2 - head * Math.sin(a - .45));
  ctx.lineTo(x2 - head * Math.cos(a + .45), y2 - head * Math.sin(a + .45));
  ctx.closePath(); ctx.fill(); ctx.restore();
};
PB.box = (ctx, x, y, w, h, {fill = null, stroke = PB.INK, lw = 1.5, r = 6, alpha = 1} = {}) => {
  ctx.save(); ctx.globalAlpha *= alpha; ctx.beginPath();
  if(ctx.roundRect) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h);
  if(fill){ ctx.fillStyle = fill; ctx.fill(); }
  if(stroke){ ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); }
  ctx.restore();
};
/* the 192 numbers of patch k (row-major in an 8 x 8 grid), channel by channel: R block, G block, B block */
PB.patchVector = (cat, k) => {
  const c0 = (k % 8) * 8, r0 = Math.floor(k / 8) * 8, v = [];
  for(let ch = 0; ch < 3; ch++) for(let y = 0; y < 8; y++) for(let x = 0; x < 8; x++) v.push(cat.px(c0 + x, r0 + y)[ch]);
  return v;
};
PB.chanColor = (ch, v, a = 1) => {           /* value 0..255 in channel ch as a tint of that channel color */
  const t = v / 255, base = [[192, 57, 43], [46, 139, 87], [47, 109, 181]][ch];
  const c = base.map(b => Math.round(255 + (b - 255) * t));
  return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
};
/* sinusoidal position code (Vaswani et al., 2017): value in -1..1 for position pos, dimension i of d */
PB.posCode = (pos, i, d) => { const k = Math.floor(i / 2), w = 1 / Math.pow(10000, 2 * k / d);
  return i % 2 ? Math.cos(pos * w) : Math.sin(pos * w); };

/* All 64 flattened patches as one small image: column k = patch k, row j = value j of its 192
   (R block, G block, B block), each drawn as a tint of its channel color. Drawn scaled, pixelated. */
PB.colsCanvas = cat => {
  if(cat._cols) return cat._cols;
  const c = document.createElement('canvas'); c.width = 64; c.height = 192;
  const g = c.getContext('2d'), im = g.createImageData(64, 192);
  for(let k = 0; k < 64; k++){
    const v = PB.patchVector(cat, k);
    for(let j = 0; j < 192; j++){
      const ch = Math.floor(j / 64), t = v[j] / 255, base = [[192, 57, 43], [46, 139, 87], [47, 109, 181]][ch];
      const i = 4 * (j * 64 + k);
      base.forEach((b, q) => { im.data[i + q] = Math.round(255 + (b - 255) * t); }); im.data[i + 3] = 255;
    }
  }
  g.putImageData(im, 0, 0); return (cat._cols = c);
};
/* position code as a small image: column k = position k (0 = class token slot), row i = dimension i */
PB.posCanvas = (n = 65, d = 48) => {
  const c = document.createElement('canvas'); c.width = n; c.height = d;
  const g = c.getContext('2d'), im = g.createImageData(n, d);
  for(let k = 0; k < n; k++) for(let i = 0; i < d; i++){
    const v = Math.round(128 + 110 * PB.posCode(k, i, d)), j = 4 * (i * n + k);
    im.data[j] = im.data[j + 1] = im.data[j + 2] = v; im.data[j + 3] = 255;
  }
  g.putImageData(im, 0, 0); return c;
};
/* a row of n vertical token slots inside rect r = {x, y, w, h}; returns slot k as [x, y, w, h] */
PB.slot = (r, k, n = 64, gapFrac = .22) => { const s = r.w / n, g = s * gapFrac; return [r.x + k * s + g / 2, r.y, s - g, r.h]; };
PB.ROWX = [.12, .98];   /* token rows span this share of the width; their names sit to the left */
PB.rowLabel = (ctx, W, r, str, px) => PB.text(ctx, str, W * .005, r.y + r.h / 2, px, {w: 700, align: 'left'});

function planbScene(name, cfg){
  const N = cfg.notes.length - 1;
  const cv = document.getElementById('cv'), ctx = cv.getContext('2d');
  const cap = document.getElementById('cap'), dots = document.getElementById('dots');
  if(dots) dots.innerHTML = cfg.notes.slice(1).map(() => '<i></i>').join('');
  let beat = 0, t0 = -1e9, W = 0, H = 0, data = null;
  PB.cat.then(c => { data = c; });
  function size(){
    const r = cv.getBoundingClientRect(), d = devicePixelRatio || 1;
    if(Math.round(r.width * d) !== cv.width || Math.round(r.height * d) !== cv.height){
      cv.width = Math.round(r.width * d); cv.height = Math.round(r.height * d); }
    W = r.width; H = r.height; ctx.setTransform(d, 0, 0, d, 0, 0);
  }
  function go(b, instant){
    beat = b; t0 = instant ? -1e9 : performance.now();
    document.body.classList.toggle('planb-at0', b === 0);
    if(cap){ cap.innerHTML = (cfg.caps && cfg.caps[b]) || ''; }
    if(dots) [...dots.children].forEach((d, k) => d.classList.toggle('on', k < b));
  }
  function frame(){
    size(); ctx.clearRect(0, 0, W, H);
    const t = performance.now() - t0, dur = (cfg.durs && cfg.durs[beat]) || 1200;
    if(beat > 0 && (data || cfg.noImage)){
      try{ cfg.draw({ctx, W, H, beat, t, p: PB.clamp(t / dur), e: PB.ease(PB.clamp(t / dur)), cat: data}); }
      catch(err){ console.error(err); }
    }
    requestAnimationFrame(frame);
  }
  const api = window[name] = {
    advance(){ if(beat < N) go(beat + 1); },
    back(){ if(beat > 0) go(beat - 1, true); },
    atStart: () => beat === 0,
    atEnd: () => beat === N,
    reset(){ go(0, true); },
    resetToEnd(){ go(N, true); },
    getBeat: () => beat,
    notes: cfg.notes,
  };
  if(window.parent === window){   /* standalone: drive it yourself */
    addEventListener('keydown', e => { if(['ArrowRight', ' ', 'Enter'].includes(e.key)) api.advance(); if(e.key === 'ArrowLeft') api.back(); });
    addEventListener('click', () => api.advance());
  }
  go(0, true); requestAnimationFrame(frame);
  if(location.hash === '#end') api.resetToEnd();
  return api;
}
