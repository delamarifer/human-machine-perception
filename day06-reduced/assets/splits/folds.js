/* PART: splits (Day 6 reduced). Shared drawing and toy-data code for scenes/splits-*.html, so the
   cross-validation animation and the leakage animation are the same drawing. Everything here is seeded and
   computed: 30 toy points, 2 classes, 1-nearest-neighbor. Colors: dark = train, grey = validation,
   outlined = test, red = a leak. Runs in the browser and under node (for picking the seed). */
(function(g){
const FONT = "Calibri, Carlito, 'Helvetica Neue', Arial, sans-serif";
const INK = '#0f172a', MUTE = '#64748b', VAL = '#94a3b8', EMPTY = '#e2e8f0', LEAK = '#b91c1c';

function rng(seed){ return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
  t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const gaussOf = R => () => { let u = 0; while(!u) u = R(); return Math.sqrt(-2*Math.log(u)) * Math.cos(2*Math.PI*R()); };
const shuffled = (a, R) => { a = a.slice(); for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(R()*(i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const ease = p => p < .5 ? 2*p*p : 1 - Math.pow(-2*p + 2, 2)/2;
const lerp = (a, b, p) => a + (b - a)*p;

const N = 30, K = 5, FOLD = 6;           /* 30 points, 5 folds of 6 */
const PATIENTS = 'ABCDE';

/* Toy data: class 0 (20 points, dots) around (0,0), class 1 (10 points, crosses) around (SEP,0.5*SEP). Six points per patient, five patients. */
function makeData(seed, SEP = 1.55){
  const R = rng(seed), G = gaussOf(R);
  const ys = shuffled([...Array(N)].map((_, i) => i < 20 ? 0 : 1), R);
  const pts = ys.map((y, i) => ({ id: i, y, x1: (y ? SEP : 0) + G(), x2: (y ? SEP*.5 : 0) + G(), patient: Math.floor(i/FOLD) }));
  const base = shuffled(pts.map(p => p.id), R);                      /* random folds */
  /* stratified: deal the two classes into folds, four dots and two crosses each */
  const c0 = shuffled(pts.filter(p => !p.y).map(p => p.id), R), c1 = shuffled(pts.filter(p => p.y).map(p => p.id), R);
  const strat = []; for(let f = 0; f < K; f++) strat.push(...shuffled([...c0.slice(f*4, f*4 + 4), ...c1.slice(f*2, f*2 + 2)], R));
  const group = [...pts].sort((a, b) => a.patient - b.patient || a.id - b.id).map(p => p.id);  /* whole patients together */
  return { pts, base, strat, group };
}

/* 1-nearest-neighbor accuracy; train and test are arrays of {x1,x2,y} (extra features allowed through key()) */
function knnAcc(train, test, key = p => [p.x1, p.x2]){
  let ok = 0;
  for(const t of test){ let best = Infinity, by = 0; const a = key(t);
    for(const r of train){ const b = key(r); let d = 0; for(let i = 0; i < a.length; i++) d += (a[i] - b[i])**2; if(d < best){ best = d; by = r.y; } }
    if(by === t.y) ok++; }
  return ok/test.length;
}
const foldIds = (order, f) => order.slice(f*FOLD, f*FOLD + FOLD);
function foldScore(D, order, f, key){ const te = new Set(foldIds(order, f)); return knnAcc(D.pts.filter(p => !te.has(p.id)), D.pts.filter(p => te.has(p.id)), key); }
const foldScores = (D, order, key) => [...Array(K)].map((_, f) => foldScore(D, order, f, key));
const mean = a => a.reduce((s, v) => s + v, 0)/a.length;

/* Least squares polynomial of degree d in the Chebyshev basis, tiny ridge, Gaussian elimination */
function polyFit(P, d, lam = 1e-8){
  const n = d + 1, A = [...Array(n)].map(() => Array(n + 1).fill(0));
  const basis = x => { const b = [1, x]; for(let i = 2; i <= d; i++) b[i] = 2*x*b[i - 1] - b[i - 2]; return b.slice(0, n); };
  for(const {x, y} of P){ const b = basis(x); for(let i = 0; i < n; i++){ A[i][n] += b[i]*y; for(let j = 0; j < n; j++) A[i][j] += b[i]*b[j]; } }
  for(let i = 0; i < n; i++) A[i][i] += lam;
  for(let i = 0; i < n; i++){ let m = i; for(let r = i + 1; r < n; r++) if(Math.abs(A[r][i]) > Math.abs(A[m][i])) m = r; [A[i], A[m]] = [A[m], A[i]];
    for(let r = 0; r < n; r++) if(r !== i){ const f = A[r][i]/A[i][i]; for(let c = i; c <= n; c++) A[r][c] -= f*A[i][c]; } }
  const w = A.map((row, i) => row[n]/row[i]);
  return x => { const b = basis(x); return b.reduce((s, v, i) => s + v*w[i], 0); };
}
const rmse = (P, f) => Math.sqrt(P.reduce((s, {x, y}) => s + (f(x) - y)**2, 0)/P.length);

/* ---------- drawing ---------- */
const ROLE = { train: [15, 23, 42], val: [148, 163, 184], test: [255, 255, 255], none: [241, 245, 249] };
const rgb = c => `rgb(${c.map(Math.round).join(',')})`;
const mixRole = (a, b, p) => [0, 1, 2].map(i => lerp(ROLE[a][i], ROLE[b][i], p));
const dark = c => (c[0]*.3 + c[1]*.59 + c[2]*.11) < 120;

/* the strip geometry both scenes share (fractions of the canvas), so the slides look the same */
function strip(W, H){
  const cw = Math.round(W*.0205), gap = Math.round(W*.009);
  return { x: W*.03, y0: H*.13, cw, ch: Math.round(cw*1.75), gap, rowGap: Math.round(H*.026),
    width: 30*cw + 4*gap, fs: Math.max(16, W*.0165) };
}
const cellX = (S, pos) => S.x + pos*S.cw + Math.floor(pos/FOLD)*S.gap;
const rowY = (S, r) => S.y0 + r*(S.ch + S.rowGap);

function txt(ctx, t, x, y, sz, bold, align = 'left', base = 'middle', color = INK){
  ctx.fillStyle = color; ctx.font = `${bold ? 700 : 400} ${sz}px ${FONT}`; ctx.textAlign = align; ctx.textBaseline = base; ctx.fillText(t, x, y);
}
function drawCell(ctx, S, x, y, roleColor, stroke, lw){
  ctx.fillStyle = rgb(roleColor); ctx.fillRect(x + .5, y + .5, S.cw - 1, S.ch - 1);
  ctx.strokeStyle = stroke || INK; ctx.lineWidth = lw || (stroke ? 2.5 : 1.3); ctx.strokeRect(x + .5, y + .5, S.cw - 1, S.ch - 1);
}
function drawMark(ctx, S, x, y, kind, value, roleColor, alpha){
  if(alpha <= 0) return; const cx = x + S.cw/2, cy = y + S.ch/2, r = S.cw*.28, c = dark(roleColor) ? '#fff' : INK;
  ctx.save(); ctx.globalAlpha *= alpha; ctx.strokeStyle = c; ctx.fillStyle = c; ctx.lineWidth = 2.2;
  if(kind === 'class'){ if(value){ ctx.beginPath(); ctx.moveTo(cx - r, cy - r); ctx.lineTo(cx + r, cy + r); ctx.moveTo(cx + r, cy - r); ctx.lineTo(cx - r, cy + r); ctx.stroke(); }
    else { ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.fill(); } }
  else if(kind === 'patient'){ txt(ctx, value, cx, cy + 1, S.cw*.72, true, 'center', 'middle', c); }
  ctx.restore();
}
/* one layout = {rows:[{order, role: pos -> 'train'|'test'|'val'|'none', a?: alpha}], marks:'class'|'patient'|null}.
   p is the tween progress from prev to next; rows that are new fade in, one after another when stagger is on. */
function renderRows(ctx, S, D, prev, next, p, stagger){
  const R = Math.max(prev.rows.length, next.rows.length);
  for(let r = 0; r < R; r++){
    const a = prev.rows[r], b = next.rows[r];
    const q = !a || !b ? ease(Math.min(1, Math.max(0, stagger ? (p*(R + 1) - r) : p))) : ease(p);
    const posOf = (row, id) => row.order.indexOf(id);
    const rA = a ? 1 : 0, rB = b ? 1 : 0, rowA = lerp(rA, rB, q);
    const base = b || a, y = rowY(S, r);
    for(const id of base.order){
      const pa = a ? posOf(a, id) : posOf(b, id), pb = b ? posOf(b, id) : posOf(a, id);
      const x = lerp(cellX(S, pa), cellX(S, pb), q);
      const ra = a ? a.role(pa) : (b ? b.role(pb) : 'none'), rb = b ? b.role(pb) : ra;
      const col = mixRole(ra, rb, q);
      ctx.save(); ctx.globalAlpha = rowA; drawCell(ctx, S, x, y, col, ra === 'none' && rb === 'none' ? '#cbd5e1' : undefined, ra === 'none' && rb === 'none' ? 1 : undefined);
      const pt = D.pts[id];
      for(const [L, al] of [[prev, 1 - q], [next, q]]) if(L.marks){ const v = L.marks === 'class' ? pt.y : PATIENTS[pt.patient]; drawMark(ctx, S, x, y, L.marks, v, col, al); }
      ctx.restore();
    }
  }
}
/* legend swatches: words stay ink-black, with a swatch beside them */
function legend(ctx, S, x, y, items){
  const s = Math.round(S.fs*.95); let cx = x;
  for(const [role, t] of items){
    if(role === 'leak'){ ctx.strokeStyle = LEAK; ctx.lineWidth = 3; ctx.strokeRect(cx, y - s/2, s, s); }
    else { ctx.fillStyle = rgb(ROLE[role]); ctx.fillRect(cx, y - s/2, s, s); ctx.strokeStyle = INK; ctx.lineWidth = 1.3; ctx.strokeRect(cx, y - s/2, s, s); }
    txt(ctx, t, cx + s + 7, y, S.fs, false); ctx.font = `400 ${S.fs}px ${FONT}`; cx += s + 7 + ctx.measureText(t).width + 26;
  }
}
function arrow(ctx, x0, y0, x1, y1, color = INK, lw = 3){
  ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
  const ang = Math.atan2(y1 - y0, x1 - x0), h = 10; ctx.beginPath(); ctx.moveTo(x1, y1);
  ctx.lineTo(x1 - h*Math.cos(ang - .45), y1 - h*Math.sin(ang - .45)); ctx.lineTo(x1 - h*Math.cos(ang + .45), y1 - h*Math.sin(ang + .45)); ctx.closePath(); ctx.fill();
}
function wrap(ctx, t, x, y, maxw, lh){ const words = t.split(' '); let line = '', yy = y;
  for(const w of words){ const test = line ? line + ' ' + w : w; if(ctx.measureText(test).width > maxw && line){ ctx.fillText(line, x, yy); line = w; yy += lh; } else line = test; }
  ctx.fillText(line, x, yy); return yy; }

/* the deck's beat controller: nothing moves unless a click sets a new beat; back jumps instantly */
function controller(name, NB, onBeat){
  let beat = 0, prev = 0, t0 = -1e12;
  const go = (b, jump) => { prev = beat; beat = b; t0 = jump ? -1e12 : (g.performance ? performance.now() : 0); if(onBeat) onBeat(b); };
  const api = g[name] = {
    advance(){ if(beat < NB) go(beat + 1); }, back(){ if(beat > 0) go(beat - 1, true); },
    atStart: () => beat === 0, atEnd: () => beat === NB, reset(){ go(0, true); }, resetToEnd(){ go(NB, true); }, getBeat: () => beat };
  if(g.window && g.window.parent === g.window){
    addEventListener('keydown', e => { if(['ArrowRight', ' ', 'Enter'].includes(e.key)) api.advance(); if(e.key === 'ArrowLeft') api.back(); });
    addEventListener('click', () => api.advance());
  }
  return { get beat(){ return beat; }, get prev(){ return prev; }, get t0(){ return t0; }, go };
}
function dots(NB, b){ const el = document.getElementById('dots'); if(el) el.innerHTML = [...Array(NB)].map((_, i) => `<i class="${i < b ? 'on' : ''}"></i>`).join(''); }

g.SPLITS = { FONT, INK, MUTE, VAL, EMPTY, LEAK, N, K, FOLD, PATIENTS, ROLE, rng, gaussOf, shuffled, ease, lerp, makeData, knnAcc, foldIds, foldScore, foldScores, mean,
  polyFit, rmse, strip, cellX, rowY, txt, drawCell, drawMark, renderRows, legend, arrow, wrap, rgb, mixRole, controller, dots };
})(typeof window !== 'undefined' ? window : globalThis);

/* Three methods on the same folds, for "which method?": 1-nearest-neighbor (above), logistic regression and a linear SVM.
   Both linear models: full-batch gradient descent from zero, no randomness, fitted on the training folds only. */
(function(g){
const S = g.SPLITS;
function linFit(train, loss, steps = 3000, lr = .05, l2 = .01){
  let w = [0, 0, 0];
  const feat = p => [p.x1, p.x2, 1];
  for(let t = 0; t < steps; t++){ const G = [0, 0, 0];
    for(const p of train){ const x = feat(p), s = p.y ? 1 : -1, m = s*(w[0]*x[0] + w[1]*x[1] + w[2]*x[2]), d = loss(m);
      for(let i = 0; i < 3; i++) G[i] += -d*s*x[i]/train.length; }
    for(let i = 0; i < 3; i++) w[i] -= lr*(G[i] + (i < 2 ? l2*w[i] : 0)); }
  return w;
}
const logistic = m => 1/(1 + Math.exp(m)), hinge = m => m < 1 ? 1 : 0;
const linAcc = (train, test, loss) => { const w = linFit(train, loss); return test.filter(p => ((w[0]*p.x1 + w[1]*p.x2 + w[2]) > 0 ? 1 : 0) === p.y).length/test.length; };
const METHODS = [
  {name: 'neighbors', acc: (tr, te) => S.knnAcc(tr, te)},
  {name: 'logistic', acc: (tr, te) => linAcc(tr, te, logistic)},
  {name: 'SVM', acc: (tr, te) => linAcc(tr, te, hinge)},
];
S.METHODS = METHODS;
S.methodScores = (D, order, m) => [...Array(S.K)].map((_, f) => { const te = new Set(S.foldIds(order, f)); return m.acc(D.pts.filter(p => !te.has(p.id)), D.pts.filter(p => te.has(p.id))); });
})(typeof window !== 'undefined' ? window : globalThis);
