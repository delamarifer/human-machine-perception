/* Day 8 part B: shared code for the toy 2D scenes (owner: Fernanda).
   Everything drawn in these scenes is COMPUTED, not sketched. The data is a spiral built as a chain of 64 small Gaussians
   (the toy dataset idea follows the Welch Labs video for 3Blue1Brown, 2025; the numbers here are our own), so the noisy
   distribution at every noise level, its score, the ideal denoiser and the flow matching velocity all have exact closed
   forms. A "perfect network" here means the exact answer a trained network is trying to learn.
   Random numbers come from a fixed seed, so the pictures are the same on every load.

   Conventions
   - Diffusion (DDPM): x_t = a x0 + s eps with a = sqrt(abar_t), s = sqrt(1 - abar_t). Schedule: beta linear from 0.1/N to 20/N
     over N steps, which for N = 1000 is exactly the schedule in Ho et al. 2020 (1e-4 to 0.02). t = 0 is data, t = N is noise.
   - Flow matching: X_t = (1 - t) X0 + t X1, X0 ~ N(0, I) noise, X1 ~ data. t = 0 is noise, t = 1 is data
     (the NeurIPS 2024 tutorial's convention).
   Both are "x = alpha * data + sigma * noise", so one posterior routine serves both. */

/* ---------- random numbers (seeded) ---------- */
function d8Rng(seed){
  let a = seed >>> 0;
  const u = () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const n = () => { let x = 0; while(x === 0) x = u(); return Math.sqrt(-2 * Math.log(x)) * Math.cos(2 * Math.PI * u()); };
  return {u, n};
}

/* ---------- the data: a Gaussian mixture ---------- */
const D8_RING = (k = 8, r = 2.4) => Array.from({length: k}, (_, i) => [r * Math.cos(2 * Math.PI * i / k + Math.PI / 8), r * Math.sin(2 * Math.PI * i / k + Math.PI / 8)]);
/* K centers spaced evenly by arc length along an Archimedean spiral, then shifted so their mean is zero
   (models rescale pixel values to be centered at zero too). */
const D8_SPIRAL = (K = 64, turns = 1.55, r0 = 0.45, r1 = 2.75) => {
  const M = 3000, raw = [], L = [0];
  for(let i = 0; i <= M; i++){ const q = i / M, th = 2 * Math.PI * turns * q + .6, r = r0 + (r1 - r0) * q;
    raw.push([r * Math.cos(th), r * Math.sin(th)]); if(i) L.push(L[i - 1] + Math.hypot(raw[i][0] - raw[i - 1][0], raw[i][1] - raw[i - 1][1])); }
  const pts = []; let j = 0;
  for(let k = 0; k < K; k++){ const target = L[M] * k / (K - 1); while(j < M && L[j] < target) j++; pts.push(raw[j]); }
  const mx = pts.reduce((a, p) => a + p[0], 0) / K, my = pts.reduce((a, p) => a + p[1], 0) / K;
  return pts.map(p => [p[0] - mx, p[1] - my]);
};
function d8Mix(mu = D8_SPIRAL(), tau = 0.11){ return {mu, tau, w: mu.map(() => 1 / mu.length)}; }
function d8SampleData(mix, n, rng){
  return Array.from({length: n}, () => { const k = Math.min(mix.mu.length - 1, Math.floor(rng.u() * mix.mu.length));
    return [mix.mu[k][0] + mix.tau * rng.n(), mix.mu[k][1] + mix.tau * rng.n()]; });
}
const d8SampleNoise = (n, rng) => Array.from({length: n}, () => [rng.n(), rng.n()]);

/* Posterior for x = al * data + sg * noise, data ~ mix, noise ~ N(0, I).
   Returns E[data | x], E[noise | x], the score grad log p(x), and the density p(x). */
function d8Post(mix, x, al, sg){
  const t2 = mix.tau * mix.tau, K = mix.mu.length;
  const lw = new Array(K), v = al * al * t2 + sg * sg;
  let mx = -Infinity;
  for(let k = 0; k < K; k++){
    const dx = x[0] - al * mix.mu[k][0], dy = x[1] - al * mix.mu[k][1];
    lw[k] = Math.log(mix.w[k]) - (dx * dx + dy * dy) / (2 * v); if(lw[k] > mx) mx = lw[k];
  }
  let Z = 0; for(let k = 0; k < K; k++){ lw[k] = Math.exp(lw[k] - mx); Z += lw[k]; }
  const E1 = [0, 0], E0 = [0, 0], sc = [0, 0];
  for(let k = 0; k < K; k++){
    const w = lw[k] / Z, rx = x[0] - al * mix.mu[k][0], ry = x[1] - al * mix.mu[k][1];
    E1[0] += w * (mix.mu[k][0] + al * t2 / v * rx); E1[1] += w * (mix.mu[k][1] + al * t2 / v * ry);
    E0[0] += w * (sg / v * rx);                      E0[1] += w * (sg / v * ry);
    sc[0] -= w * rx / v;                             sc[1] -= w * ry / v;
  }
  const dens = Z * Math.exp(mx) / (2 * Math.PI * v);
  return {E1, E0, score: sc, dens};
}

/* ---------- DDPM schedule ---------- */
function d8Sched(N){
  const beta = [0], abar = [1];
  for(let t = 1; t <= N; t++){ beta[t] = .1 / N + (19.9 / N) * (t - 1) / Math.max(1, N - 1); abar[t] = abar[t - 1] * (1 - beta[t]); }
  return {N, beta, abar, as: t => [Math.sqrt(abar[t]), Math.sqrt(1 - abar[t])]};
}
const D8_S100 = d8Sched(100);

/* Forward noising of fixed (x0, eps) pairs straight to step t (the one-jump formula). */
const d8Noised = (x0s, eps, t, S = D8_S100) => { const [a, s] = S.as(t); return x0s.map((p, i) => [a * p[0] + s * eps[i][0], a * p[1] + s * eps[i][1]]); };
/* Forward noising step by step: the random walk. paths[i][t] is point i after t steps. */
function d8Walks(x0s, rng, S = D8_S100){
  return x0s.map(p => { let x = p.slice(); const tr = [x.slice()];
    for(let t = 1; t <= S.N; t++){ const c = Math.sqrt(1 - S.beta[t]), d = Math.sqrt(S.beta[t]); x = [c * x[0] + d * rng.n(), c * x[1] + d * rng.n()]; tr.push(x.slice()); }
    return tr; });
}
/* One reverse step from t to t-1 with the exact denoiser.
   mode 'ddpm': the DDPM update plus fresh noise (Ho et al., Algorithm 2). 'mean': the same update with the noise line deleted.
   Returns {m, x}: m = the point after the model's move, x = after the random step (equal to m for 'mean'). */
function d8Step(mix, x, t, mode, rng, S = D8_S100){
  const [a, s] = S.as(t), al = 1 - S.beta[t], eps = d8Post(mix, x, a, s).E0;
  const m = [(x[0] - S.beta[t] / s * eps[0]) / Math.sqrt(al), (x[1] - S.beta[t] / s * eps[1]) / Math.sqrt(al)];
  if(mode === 'mean' || t === 1) return {m, x: m};
  const sd = Math.sqrt(S.beta[t]); return {m, x: [m[0] + sd * rng.n(), m[1] + sd * rng.n()]};
}
/* Reverse runs from t = N down to 0; traj[i][j] is particle i after j steps. mode 'ddpm' or 'mean'. */
function d8Reverse(mix, xT, mode, rng, S = D8_S100){
  return xT.map(p => { let x = p.slice(); const tr = [x.slice()];
    for(let t = S.N; t >= 1; t--){ x = d8Step(mix, x, t, mode, rng, S).x; tr.push(x.slice()); }
    return tr; });
}
/* DDIM (eta = 0) on `steps` evenly spaced steps of the schedule: deterministic. traj[i][j] after j of those steps. */
function d8Ddim(mix, xT, steps, S = D8_S100){
  const ts = Array.from({length: steps + 1}, (_, k) => Math.round(S.N * (steps - k) / steps));
  return xT.map(p => { let x = p.slice(); const tr = [x.slice()];
    for(let k = 0; k < steps; k++){ const t = ts[k], tp = ts[k + 1], [a, s] = S.as(t), [ap, sp] = S.as(tp), P = d8Post(mix, x, a, s);
      x = [ap * P.E1[0] + sp * P.E0[0], ap * P.E1[1] + sp * P.E0[1]]; tr.push(x.slice()); }
    return tr; });
}

/* ---------- flow matching ---------- */
/* Exact marginal velocity u_t(x) = E[X1 - X0 | X_t = x] for X_t = (1 - t) X0 + t X1. */
const d8Vel = (mix, x, t) => { const P = d8Post(mix, x, t, 1 - t); return [P.E1[0] - P.E0[0], P.E1[1] - P.E0[1]]; };
/* Euler integration from t = 0 to 1 in n steps; returns trajectories with every step recorded. */
function d8Euler(mix, x0s, n){
  return x0s.map(p => { let x = p.slice(); const tr = [x.slice()];
    for(let j = 0; j < n; j++){ const t = j / n, u = d8Vel(mix, x, t); x = [x[0] + u[0] / n, x[1] + u[1] / n]; tr.push(x.slice()); }
    return tr; });
}
/* A sample of X1 from p(X1 | X_t = x): pick a component by posterior weight, then the component posterior. */
function d8PostSample(mix, x, t, rng){
  const al = t, sg = 1 - t, t2 = mix.tau * mix.tau, v = al * al * t2 + sg * sg;
  const lw = mix.mu.map((m, k) => { const dx = x[0] - al * m[0], dy = x[1] - al * m[1]; return Math.log(mix.w[k]) - (dx * dx + dy * dy) / (2 * v); });
  const mx = Math.max(...lw), w = lw.map(l => Math.exp(l - mx)), Z = w.reduce((a, b) => a + b, 0);
  let r = rng.u() * Z, k = 0; while(k < w.length - 1 && (r -= w[k]) > 0) k++;
  const m = mix.mu[k], g = al * t2 / v, sdp = Math.sqrt(t2 * sg * sg / v);
  return [m[0] + g * (x[0] - al * m[0]) + sdp * rng.n(), m[1] + g * (x[1] - al * m[1]) + sdp * rng.n()];
}

/* ---------- drawing ---------- */
function d8Canvas(cv, R = 3.8){
  const ctx = cv.getContext('2d');
  const V = {ctx, R, w: 0, h: 0, k: 1, cx: 0, cy: 0};
  V.fit = () => { const d = devicePixelRatio || 1, r = cv.getBoundingClientRect();
    cv.width = Math.max(1, r.width * d); cv.height = Math.max(1, r.height * d);
    V.w = cv.width; V.h = cv.height; V.k = Math.min(V.w, V.h) / (2 * R); V.cx = V.w / 2; V.cy = V.h / 2; V.px = d; };
  V.P = p => [V.cx + p[0] * V.k, V.cy - p[1] * V.k];
  /* zoom: show the square of half-width r around point c (call after fit, before drawing) */
  V.zoom = (c, r) => { V.k = Math.min(V.w, V.h) / (2 * r); V.cx = V.w / 2 - c[0] * V.k; V.cy = V.h / 2 + c[1] * V.k; };
  V.clear = () => ctx.clearRect(0, 0, V.w, V.h);
  V.dots = (pts, col, r = 2.6, alpha = 1) => { ctx.globalAlpha = alpha; ctx.fillStyle = col;
    pts.forEach(p => { const [X, Y] = V.P(p); ctx.beginPath(); ctx.arc(X, Y, r * V.px, 0, 7); ctx.fill(); }); ctx.globalAlpha = 1; };
  V.line = (pts, col, wd = 1.2, alpha = 1, dash = null) => { if(pts.length < 2) return; ctx.globalAlpha = alpha; ctx.strokeStyle = col; ctx.lineWidth = wd * V.px;
    ctx.setLineDash(dash ? dash.map(d => d * V.px) : []); ctx.beginPath(); pts.forEach((p, i) => { const [X, Y] = V.P(p); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1; };
  V.arrow = (p, d, col, wd = 1.6, alpha = 1, head = 7) => { const [X, Y] = V.P(p), [X2, Y2] = V.P([p[0] + d[0], p[1] + d[1]]);
    const L = Math.hypot(X2 - X, Y2 - Y); if(L < 1) return; const ux = (X2 - X) / L, uy = (Y2 - Y) / L, hh = Math.min(head * V.px, L * .45);
    ctx.globalAlpha = alpha; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = wd * V.px;
    ctx.beginPath(); ctx.moveTo(X, Y); ctx.lineTo(X2 - ux * hh * .8, Y2 - uy * hh * .8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(X2, Y2); ctx.lineTo(X2 - ux * hh - uy * hh * .5, Y2 - uy * hh + ux * hh * .5); ctx.lineTo(X2 - ux * hh + uy * hh * .5, Y2 - uy * hh - ux * hh * .5); ctx.fill(); ctx.globalAlpha = 1; };
  /* grayscale density image: f(x) returns a density; drawn as a light wash */
  V.density = (f, n = 140, gamma = .6, col = [79, 109, 154], maxA = .55) => {
    const nx = n, ny = Math.max(1, Math.round(n * V.h / V.w));
    const img = ctx.createImageData(nx, ny); let mx = 0; const vals = new Float64Array(nx * ny);
    for(let j = 0; j < ny; j++) for(let i = 0; i < nx; i++){
      const x = [((i + .5) / nx * V.w - V.cx) / V.k, (V.cy - (j + .5) / ny * V.h) / V.k]; const v = f(x); vals[j * nx + i] = v; if(v > mx) mx = v; }
    for(let q = 0; q < nx * ny; q++){ const a = Math.pow(vals[q] / mx, gamma); img.data[4 * q] = col[0]; img.data[4 * q + 1] = col[1]; img.data[4 * q + 2] = col[2]; img.data[4 * q + 3] = 255 * maxA * a; }
    const off = document.createElement('canvas'); off.width = nx; off.height = ny; off.getContext('2d').putImageData(img, 0, 0);
    ctx.imageSmoothingEnabled = true; ctx.drawImage(off, 0, 0, V.w, V.h); };
  return V;
}
const d8Lerp = (A, B, p) => A.map((a, i) => [a[0] + (B[i][0] - a[0]) * p, a[1] + (B[i][1] - a[1]) * p]);
const d8Ease = p => p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
/* point j*p along each trajectory (fractional), and the trail up to it */
const d8At = (tr, p) => { const f = p * (tr.length - 1), j = Math.floor(f), r = f - j; if(j >= tr.length - 1) return tr[tr.length - 1];
  return [tr[j][0] + (tr[j + 1][0] - tr[j][0]) * r, tr[j][1] + (tr[j + 1][1] - tr[j][1]) * r]; };
const d8Trail = (tr, p) => { const f = p * (tr.length - 1), j = Math.floor(f); return tr.slice(0, j + 1).concat([d8At(tr, p)]); };

/* ---------- the scene controller ----------
   cfg = {name, nb, draw(V, beat, p), anim: {beat: ms}}: draw paints the whole canvas for a beat; p runs 0 → 1 while a
   forward click animates that beat (only when the click asks for it: nothing moves by itself), and is 1 otherwise.
   Elements with data-from / data-to show on those beats; elements with data-hl="2,4" get class hl on those beats. */
function d8Scene(cfg){
  const cv = document.querySelector('canvas.d8s-cv'), V = d8Canvas(cv, cfg.R || 3.8);
  let beat = 0, raf = 0;
  const paint = p => { V.fit(); V.clear(); cfg.draw(V, beat, p); };
  function go(n, animate){
    beat = n; cancelAnimationFrame(raf);
    document.querySelectorAll('[data-from]').forEach(e => { const f = +e.dataset.from, t = e.dataset.to ? +e.dataset.to : cfg.nb; e.classList.toggle('on', n >= f && n <= t); });
    /* data-hl="2,4": highlight (class hl) on exactly those beats, e.g. an equation term while the animation shows it */
    document.querySelectorAll('[data-hl]').forEach(e => e.classList.toggle('hl', e.dataset.hl.split(',').map(Number).includes(n)));
    const ms = cfg.anim && cfg.anim[n];
    if(animate && ms){ const t0 = performance.now(); const tick = now => { const p = Math.min(1, (now - t0) / ms); paint(d8Ease(p)); if(p < 1) raf = requestAnimationFrame(tick); }; raf = requestAnimationFrame(tick); }
    else paint(1);
  }
  const ctl = {
    advance(){ if(beat < cfg.nb) go(beat + 1, true); },
    back(){ if(beat > 0) go(beat - 1, false); },
    atStart: () => beat === 0, atEnd: () => beat === cfg.nb,
    reset(){ go(0, false); }, resetToEnd(){ go(cfg.nb, false); }, getBeat: () => beat,
  };
  window[cfg.name] = ctl;
  addEventListener('resize', () => { cancelAnimationFrame(raf); paint(1); });
  if(window.parent === window){
    addEventListener('keydown', e => { if(['ArrowRight', ' ', 'Enter'].includes(e.key)) ctl.advance(); if(e.key === 'ArrowLeft') ctl.back(); });
    addEventListener('click', () => ctl.advance());
  }
  go(0, false);
  return ctl;
}

/* ---------- a tiny image dataset with an exact denoiser ----------
   Twelve "astronaut riding a horse" images (assets/horses, public domain or CC0), in gray levels, n x n, pixel values in [-1, 1].
   For a dataset this small the ideal denoiser has a closed form: E[x0 | x_t] is a softmax-weighted average of the 12 images.
   So the image runs below are real DDPM / DDIM runs, but with a "perfect network" for 12 images, which can only end on one of
   its 12 training images (it memorizes). A trained network learns a smoothed version of this and can make new images. */
const D8_HORSES = Array.from({length: 12}, (_, i) => `../assets/horses/h${String(i + 1).padStart(2, '0')}.${[1, 2, 3, 4, 5].includes(i + 1) ? 'png' : (i + 1 === 10 ? 'jpg' : 'webp')}`);
function d8LoadImages(urls, n = 80){
  return Promise.all(urls.map(u => new Promise((res, rej) => { const im = new Image(); im.onload = () => {
    const c = document.createElement('canvas'); c.width = c.height = n; const x = c.getContext('2d'), m = Math.min(im.width, im.height);
    x.drawImage(im, (im.width - m) / 2, (im.height - m) / 2, m, m, 0, 0, n, n);
    const d = x.getImageData(0, 0, n, n).data, g = new Float32Array(n * n);
    for(let i = 0; i < n * n; i++) g[i] = 2 * (.299 * d[4 * i] + .587 * d[4 * i + 1] + .114 * d[4 * i + 2]) / 255 - 1;
    res(g); }; im.onerror = rej; im.src = u; })));
}
function d8ImgPost(set, x, a, s){
  const K = set.length, D = x.length, lw = new Float64Array(K);
  for(let k = 0; k < K; k++){ let q = 0; const y = set[k]; for(let i = 0; i < D; i++){ const r = x[i] - a * y[i]; q += r * r; } lw[k] = -q / (2 * s * s); }
  const mx = Math.max(...lw); let Z = 0; for(let k = 0; k < K; k++){ lw[k] = Math.exp(lw[k] - mx); Z += lw[k]; }
  const E1 = new Float32Array(D);
  for(let k = 0; k < K; k++){ const w = lw[k] / Z; if(w < 1e-9) continue; const y = set[k]; for(let i = 0; i < D; i++) E1[i] += w * y[i]; }
  const E0 = new Float32Array(D); for(let i = 0; i < D; i++) E0[i] = (x[i] - a * E1[i]) / s;
  return {E1, E0};
}
/* frames[j] = image after j steps. mode 'ddpm' (with the random step), 'mean' (random step deleted), or 'ddim' with `steps` steps. */
function d8ImgRun(set, xT, mode, rng, S = D8_S100, steps = S.N){
  let x = Float32Array.from(xT); const fr = [x], D = x.length;
  if(mode === 'ddim'){
    const ts = Array.from({length: steps + 1}, (_, k) => Math.round(S.N * (steps - k) / steps));
    for(let k = 0; k < steps; k++){ const [a, s] = S.as(ts[k]), [ap, sp] = S.as(ts[k + 1]), P = d8ImgPost(set, x, a, s);
      const y = new Float32Array(D); for(let i = 0; i < D; i++) y[i] = ap * P.E1[i] + sp * P.E0[i]; x = y; fr.push(x); }
    return fr;
  }
  for(let t = S.N; t >= 1; t--){
    const [a, s] = S.as(t), al = 1 - S.beta[t], P = d8ImgPost(set, x, a, s), sd = (mode === 'ddpm' && t > 1) ? Math.sqrt(S.beta[t]) : 0;
    const y = new Float32Array(D); for(let i = 0; i < D; i++) y[i] = (x[i] - S.beta[t] / s * P.E0[i]) / Math.sqrt(al) + (sd ? sd * rng.n() : 0);
    x = y; fr.push(x);
  }
  return fr;
}
/* forward noising, step by step (the random walk of every pixel at once) */
function d8ImgWalk(x0, rng, S = D8_S100){
  let x = Float32Array.from(x0); const fr = [x];
  for(let t = 1; t <= S.N; t++){ const c = Math.sqrt(1 - S.beta[t]), d = Math.sqrt(S.beta[t]); const y = new Float32Array(x.length); for(let i = 0; i < x.length; i++) y[i] = c * x[i] + d * rng.n(); x = y; fr.push(x); }
  return fr;
}
/* draw an image in [-1, 1] into a square inside canvas cv, with a caption under it */
function d8ImgPaint(cv, x, caption = ''){
  const d = window.devicePixelRatio || 1, R = cv.getBoundingClientRect(); cv.width = Math.max(1, R.width * d); cv.height = Math.max(1, R.height * d);
  const ctx = cv.getContext('2d'); ctx.clearRect(0, 0, cv.width, cv.height); if(!x) return;
  const n = Math.round(Math.sqrt(x.length)), off = document.createElement('canvas'); off.width = off.height = n;
  const id = off.getContext('2d').createImageData(n, n);
  for(let i = 0; i < n * n; i++){ const g = Math.max(0, Math.min(255, Math.round(127.5 * (x[i] + 1)))); id.data[4 * i] = id.data[4 * i + 1] = id.data[4 * i + 2] = g; id.data[4 * i + 3] = 255; }
  off.getContext('2d').putImageData(id, 0, 0);
  const f = Math.max(12 * d, cv.height / 14), side = Math.min(cv.width, cv.height - f * 1.6), x0 = (cv.width - side) / 2;
  ctx.imageSmoothingEnabled = true; ctx.drawImage(off, x0, 0, side, side);
  ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 1.5 * d; ctx.strokeRect(x0, 0, side, side);
  if(caption){ ctx.font = `${f}px Calibri, Carlito, Arial, sans-serif`; ctx.fillStyle = '#0f172a'; ctx.textAlign = 'center'; ctx.fillText(caption, cv.width / 2, side + f * 1.2); }
}
