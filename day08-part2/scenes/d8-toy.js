/* Day 8 part B: shared code for the toy 2D scenes (owner: Fernanda).
   Everything drawn in these scenes is COMPUTED, not sketched: the data is a mixture of 8 small Gaussians on a ring,
   so the noisy distribution at every noise level, its score, the ideal denoiser and the flow matching velocity all
   have exact closed forms. A "perfect network" here means the exact answer a trained network is trying to learn.
   Random numbers come from a fixed seed, so the pictures are the same on every load.

   Conventions
   - Diffusion (DDPM): x_t = a x0 + s eps with a = sqrt(abar_t), s = sqrt(1 - abar_t); linear beta from 1e-4 to 0.02,
     T = 1000 (the schedule in Ho et al. 2020). t = 0 is data, t = T is noise.
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
function d8Mix(mu = D8_RING(), tau = 0.16){ return {mu, tau, w: mu.map(() => 1 / mu.length)}; }
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
const D8_T = 1000;
const D8_BETA = Array.from({length: D8_T + 1}, (_, t) => t === 0 ? 0 : 1e-4 + (0.02 - 1e-4) * (t - 1) / (D8_T - 1));
const D8_ABAR = (() => { const a = [1]; for(let t = 1; t <= D8_T; t++) a[t] = a[t - 1] * (1 - D8_BETA[t]); return a; })();
const d8AS = t => [Math.sqrt(D8_ABAR[t]), Math.sqrt(1 - D8_ABAR[t])];

/* Forward noising of fixed (x0, eps) pairs to step t. */
const d8Noised = (x0s, eps, t) => { const [a, s] = d8AS(t); return x0s.map((p, i) => [a * p[0] + s * eps[i][0], a * p[1] + s * eps[i][1]]); };

/* Reverse runs with the exact denoiser. Returns trajectories: traj[i][j] is particle i after j recorded steps,
   recorded every `every` steps from t = T down to t = 0. stochastic: DDPM ancestral (SDE); else DDIM, eta = 0 (ODE). */
function d8Reverse(mix, xT, stochastic, rng, every = 5){
  const traj = xT.map(p => [p.slice()]);
  let xs = xT.map(p => p.slice());
  for(let t = D8_T; t >= 1; t--){
    const [a, s] = d8AS(t), [ap, sp] = d8AS(t - 1), al = 1 - D8_BETA[t];
    xs = xs.map(x => {
      const P = d8Post(mix, x, a, s), eps = P.E0;
      if(stochastic){
        const m = [(x[0] - D8_BETA[t] / s * eps[0]) / Math.sqrt(al), (x[1] - D8_BETA[t] / s * eps[1]) / Math.sqrt(al)];
        const sd = t > 1 ? Math.sqrt(D8_BETA[t]) : 0;
        return [m[0] + sd * rng.n(), m[1] + sd * rng.n()];
      }
      const x0 = P.E1; return [ap * x0[0] + sp * eps[0], ap * x0[1] + sp * eps[1]];
    });
    if((D8_T - t + 1) % every === 0) xs.forEach((x, i) => traj[i].push(x.slice()));
  }
  return traj;
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
   Elements with data-from / data-to show on those beats. */
function d8Scene(cfg){
  const cv = document.querySelector('canvas.d8s-cv'), V = d8Canvas(cv, cfg.R || 3.8);
  let beat = 0, raf = 0;
  const paint = p => { V.fit(); V.clear(); cfg.draw(V, beat, p); };
  function go(n, animate){
    beat = n; cancelAnimationFrame(raf);
    document.querySelectorAll('[data-from]').forEach(e => { const f = +e.dataset.from, t = e.dataset.to ? +e.dataset.to : cfg.nb; e.classList.toggle('on', n >= f && n <= t); });
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
