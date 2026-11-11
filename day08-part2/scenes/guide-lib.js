/* Day 8 part B, guidance part: helpers for the guide-*.html scenes (owner: Fernanda; loaded after d8-toy.js).
   Everything is exact: the spiral (64 small Gaussians, D8_SPIRAL) is split into three classes by position along the spiral,
   as in the Welch Labs video (inner part people, middle dogs, outer cats). The class-conditioned field is the exact field of
   that class's sub-mixture (d8Post on its components), the unconditioned field is the exact field of the whole spiral.
   Guidance (Ho and Salimans 2022, in the form Wan 2.1's code uses): eps = eps_base + alpha * (eps_cond - eps_base), where
   eps_base is the unconditioned field, or, for a negative prompt, the field of what we do not want. alpha = 1 gives eps_cond. */
const G_MIX = d8Mix(), G_K = G_MIX.mu.length, G_S = D8_S100;
const G_CLASS = k => k < 21 ? 0 : (k < 43 ? 1 : 2);
const G_NAMES = ['people', 'dogs', 'cats'];
const G_COL = ['#7a5c9e', '#b0782a', '#2f7f6f'];          /* data colors for the three classes, always with a swatch next to a black label */
const G_INK = '#0f172a', G_GREY = '#94a3b8', G_MUTE = '#64748b', G_DOT = '#4f6d9a';
const gSub = f => { const idx = [...Array(G_K).keys()].filter(f); return {mu: idx.map(k => G_MIX.mu[k]), tau: G_MIX.tau, w: idx.map(() => 1 / idx.length), idx}; };
const G_SUB = [0, 1, 2].map(c => gSub(k => G_CLASS(k) === c));
/* the "blurry" spiral: same centers, clusters three times wider (the toy stand-in for "blurry details, worst quality") */
const G_BLUR = {mu: G_MIX.mu, tau: 3 * G_MIX.tau, w: G_MIX.w};

const gEps = (m, x, t) => { const [a, s] = G_S.as(t); return d8Post(m, x, a, s).E0; };
/* the guided noise prediction: base + alpha (cond - base) */
const gGuided = (x, t, cond, base, al) => { const u = gEps(base, x, t), c = gEps(cond, x, t); return [u[0] + al * (c[0] - u[0]), u[1] + al * (c[1] - u[1])]; };
/* DDIM (eta = 0) with every step of the 100-step schedule, using the guided prediction. traj[i][j] = point i after j steps. */
function gDdim(starts, cond, base, al){
  return starts.map(p => { let x = p.slice(); const tr = [x.slice()];
    for(let t = G_S.N; t >= 1; t--){ const [a, s] = G_S.as(t), [ap, sp] = G_S.as(t - 1), e = gGuided(x, t, cond, base, al);
      const x0 = [(x[0] - s * e[0]) / a, (x[1] - s * e[1]) / a]; x = [ap * x0[0] + sp * e[0], ap * x0[1] + sp * e[1]]; tr.push(x.slice()); }
    return tr; });
}
/* which of the 64 parts of the spiral a point is closest to */
const gPart = p => { let b = 1e9, bk = 0; for(let k = 0; k < G_K; k++){ const d = Math.hypot(p[0] - G_MIX.mu[k][0], p[1] - G_MIX.mu[k][1]); if(d < b){ b = d; bk = k; } } return bk; };
/* distance to the spiral curve itself (a dense version of the same spiral) */
const G_CURVE = D8_SPIRAL(2000);
const gCurveDist = p => { let b = 1e9; for(const q of G_CURVE){ const d = Math.hypot(p[0] - q[0], p[1] - q[1]); if(d < b) b = d; } return b; };
const gRms = a => Math.sqrt(a.reduce((s, v) => s + v * v, 0) / a.length);
/* summary of a set of generated points: share per class, parts of class c reached, rms distance to the curve, share far off (> 3 cluster widths) */
function gStats(pts, c){
  const ks = pts.map(gPart), d = pts.map(gCurveDist);
  return { share: [0, 1, 2].map(q => ks.filter(k => G_CLASS(k) === q).length / pts.length),
    parts: c == null ? new Set(ks).size : new Set(ks.filter(k => G_CLASS(k) === c)).size, nparts: c == null ? G_K : G_SUB[c].idx.length,
    rms: gRms(d), far: d.filter(v => v > 3 * G_MIX.tau).length / pts.length };
}

/* drawing: the data dots colored by class; a labelled arrow (optionally dashed); text on the canvas */
const G_DATA = d8SampleData(G_MIX, 600, d8Rng(3)).map(p => ({p, c: G_CLASS(gPart(p))}));
function gDataDots(V, alpha = .35, only = null, r = 2){ [0, 1, 2].forEach(c => { if(only != null && only !== c) return; V.dots(G_DATA.filter(d => d.c === c).map(d => d.p), G_COL[c], r, alpha); }); }
function gArrow(V, p, d, col, wd = 3, dash = null, head = 13){
  const ctx = V.ctx, [X, Y] = V.P(p), [X2, Y2] = V.P([p[0] + d[0], p[1] + d[1]]), L = Math.hypot(X2 - X, Y2 - Y); if(L < 1) return;
  const ux = (X2 - X) / L, uy = (Y2 - Y) / L, hh = Math.min(head * V.px, L * .45);
  ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = wd * V.px; ctx.setLineDash(dash ? dash.map(v => v * V.px) : []);
  ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(X2 - ux * hh * .8, Y2 - uy * hh * .8); ctx.stroke(); ctx.setLineDash([]);
  ctx.beginPath(); ctx.moveTo(X2, Y2); ctx.lineTo(X2 - ux * hh - uy * hh * .5, Y2 - uy * hh + ux * hh * .5); ctx.lineTo(X2 - ux * hh + uy * hh * .5, Y2 - uy * hh - ux * hh * .5); ctx.fill();
}
function gText(V, s, x, y, {size = 24, bold = true, align = 'left', col = G_INK, bg = true} = {}){
  const ctx = V.ctx, f = Math.max(12 * V.px, Math.min(size * V.px, V.h / 16));
  ctx.font = `${bold ? 'bold ' : ''}${f}px Calibri, Carlito, Arial, sans-serif`; ctx.textAlign = align; ctx.textBaseline = 'middle';
  if(bg){ const w = ctx.measureText(s).width, x0 = align === 'left' ? x : align === 'right' ? x - w : x - w / 2; ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fillRect(x0 - f * .25, y - f * .62, w + f * .5, f * 1.24); }
  ctx.fillStyle = col; ctx.fillText(s, x, y); ctx.textBaseline = 'alphabetic';
  return f;
}
/* text next to a point given in data coordinates, pushed off by (dx, dy) in units of the font size */
const gLabel = (V, s, p, dx, dy, o = {}) => { const [X, Y] = V.P(p), f = Math.max(12 * V.px, Math.min((o.size || 22) * V.px, V.h / 16)); gText(V, s, X + dx * f, Y + dy * f, o); };
/* a field of arrows on a grid: f(x) gives the vector; drawn as directions of a common length */
function gField(V, f, col, step = .45, len = .3, wd = 1.6, alpha = .9, R = 3.2){
  for(let i = -R; i <= R + 1e-9; i += step) for(let j = -R; j <= R + 1e-9; j += step){ const g = f([i, j]), L = Math.hypot(g[0], g[1]) || 1e-9;
    V.arrow([i, j], [g[0] / L * len, g[1] / L * len], col, wd, alpha, 6); }
}
