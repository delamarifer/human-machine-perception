/* Day 6 reduced, part metrics. Shared toy data and drawing helpers for scenes/metrics-*.html.
   Every number these scenes show is computed here or in the scene from stated toy inputs (marked "example" on the slide).
   Seeds were picked so the examples read clearly: emails 226, regression 29, folds 32. Same seed on every slide, so the same
   emails and points return when a later slide reuses them. */
window.MK = (() => {
  const INK = '#0f172a', MID = '#94a3b8', SOFT = '#e2e8f0', FONT = "Calibri, Carlito, 'Helvetica Neue', Arial, sans-serif";

  function rng(seed){ return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  const gaussOf = R => () => { let u = 0; while(!u) u = R(); const v = R(); return Math.sqrt(-2*Math.log(u)) * Math.cos(2*Math.PI*v); };
  const sig = z => 1/(1 + Math.exp(-z));
  const mean = v => v.reduce((a, b) => a + b, 0)/v.length;
  const sd = v => { const m = mean(v); return Math.sqrt(v.reduce((a, b) => a + (b - m)**2, 0)/(v.length - 1)); };
  const clamp01 = v => Math.max(0, Math.min(1, v));
  const ease = p => p < .5 ? 2*p*p : 1 - Math.pow(-2*p + 2, 2)/2;
  const lerp = (a, b, p) => a + (b - a)*p;

  /* ---- 40 toy emails, 12 spam. score = what the fancy model outputs; x = one weak feature (for logistic regression). ---- */
  function emailData(){
    const R = rng(226), g = gaussOf(R), em = [];
    for(let i = 0; i < 40; i++){ const spam = i < 12; const z = (spam ? 1 : -1)*.8 + g(); em.push({i, spam, score: sig(1.8*z), x: z + .55*g()}); }
    const P = em.filter(e => e.spam).length, N = em.length - P;
    const counts = (t, sc = e => e.score) => { let TP = 0, FP = 0, FN = 0, TN = 0; for(const e of em){ const pr = sc(e) >= t; if(e.spam && pr) TP++; else if(e.spam) FN++; else if(pr) FP++; else TN++; } return {TP, FP, FN, TN}; };
    /* logistic regression on x alone, gradient descent, fixed step and iterations */
    let a = 0, b = 0; for(let it = 0; it < 4000; it++){ let ga = 0, gb = 0; for(const e of em){ const p = sig(a*e.x + b), y = e.spam ? 1 : 0; ga += (p - y)*e.x; gb += p - y; } a -= .02*ga; b -= .02*gb; }
    const logScore = e => sig(a*e.x + b);
    /* ROC / PR curves. mul = how many times each not-spam email counts (10 = same model, 10x more not spam). */
    const curves = mul => { const s = [...em].sort((p, q) => q.score - p.score); let tp = 0, fp = 0; const NN = N*mul;
      const roc = [[0, 0, 1.01]], pr = [];
      for(const e of s){ if(e.spam) tp++; else fp += mul; roc.push([fp/NN, tp/P, e.score]); pr.push([tp/P, tp ? tp/(tp + fp) : 1, e.score]); }
      let ra = 0; for(let i = 1; i < roc.length; i++) ra += (roc[i][0] - roc[i-1][0])*(roc[i][1] + roc[i-1][1])/2;
      let pa = 0, prev = 0; for(const [r, p] of pr){ pa += (r - prev)*p; prev = r; }
      return {roc, pr, rocAuc: ra, prAuc: pa}; };
    return {em, P, N, counts, logScore, base: curves(1), rare: curves(10)};
  }

  /* ---- 8 toy points y = 2 + 0.5 x + noise; ordinary least squares fit; one outlier added later. ---- */
  function regData(){
    const R = rng(29), g = gaussOf(R), xs = [1, 3, 5, 7, 9, 11, 13, 15];
    const pts = xs.map(x => ({x, y: 2 + .5*x + .9*g()}));
    const mx = mean(pts.map(p => p.x)), my = mean(pts.map(p => p.y));
    let sxy = 0, sxx = 0; for(const p of pts){ sxy += (p.x - mx)*(p.y - my); sxx += (p.x - mx)**2; }
    const b = sxy/sxx, a = my - b*mx, f = x => a + b*x;
    const out = {x: 12, y: f(12) + 4.5};
    const met = list => { const r = list.map(p => p.y - f(p.x)), mse = mean(r.map(v => v*v)); return {r, mse, rmse: Math.sqrt(mse), mae: mean(r.map(Math.abs))}; };
    const ssr = pts.reduce((s, p) => s + (p.y - f(p.x))**2, 0), sst = pts.reduce((s, p) => s + (p.y - my)**2, 0);
    return {pts, out, f, my, clean: met(pts), withOut: met([...pts, out]), ssr, sst, r2: 1 - ssr/sst, mseMean: sst/pts.length};
  }

  /* ---- two models, 10 folds, same splits: shared fold effect + each model's own noise. ---- */
  function foldData(){
    const R = rng(32), g = gaussOf(R), A = [], B = [];
    for(let i = 0; i < 10; i++){ const fold = 2.4*g(); A.push(86 + fold + .5*g()); B.push(85.4 + fold + .5*g()); }
    const n = 10, t = 2.262;   /* t quantile, 97.5%, df = 9 */
    const sum = v => { const m = mean(v), s = sd(v), se = s/Math.sqrt(n); return {m, s, se, ci: t*se}; };
    const d = A.map((a, i) => a - B[i]);
    return {A, B, d, n, t, a: sum(A), b: sum(B), diff: sum(d)};
  }

  /* ---- canvas helpers ---- */
  function txt(c, t, x, y, sz, bold, align = 'center', base = 'middle', a = 1){ c.globalAlpha *= a; c.fillStyle = INK; c.font = `${bold ? 700 : 400} ${sz}px ${FONT}`; c.textAlign = align; c.textBaseline = base; c.fillText(t, x, y); c.globalAlpha /= a; }
  function dot(c, x, y, r, filled, a = 1){ if(a <= 0) return; c.globalAlpha *= a; c.beginPath(); c.arc(x, y, r, 0, 7); if(filled){ c.fillStyle = INK; c.fill(); } else { c.fillStyle = '#fff'; c.fill(); c.strokeStyle = INK; c.lineWidth = Math.max(1.6, r*.32); c.stroke(); } c.globalAlpha /= a; }
  function frac(c, top, bot, x, y, sz, a = 1){ c.globalAlpha *= a; const w = Math.max(c.measureText ? (c.font = `400 ${sz}px ${FONT}`, c.measureText(top).width) : 0, c.measureText(bot).width) + 8;
    c.fillStyle = INK; c.textAlign = 'center'; c.textBaseline = 'alphabetic'; c.fillText(top, x, y - 5); c.fillText(bot, x, y + sz + 3); c.strokeStyle = INK; c.lineWidth = 1.5; c.beginPath(); c.moveTo(x - w/2, y); c.lineTo(x + w/2, y); c.stroke(); c.globalAlpha /= a; return w; }

  /* The confusion matrix used by the classification slide and the baselines slide. rows: 0 actual not spam, 1 actual spam;
     columns: 0 predicted not spam, 1 predicted spam. cell(row, col) returns {x, y, w, h} and the name of the cell. */
  function matrixGeom(x, y, w, h){ const cw = w/2, ch = h/2; const names = [['TN', 'FP'], ['FN', 'TP']], words = [['true negative', 'false positive'], ['false negative', 'true positive']];
    const cell = (r, c) => ({x: x + c*cw, y: y + r*ch, w: cw, h: ch, name: names[r][c], word: words[r][c]});
    return {cell, x, y, w, h, cw, ch}; }
  function slots(rc, n, r, pad = 30){ const sp = r*2 + 5, cols = Math.max(1, Math.floor((rc.w - 16)/sp)), out = []; for(let i = 0; i < n; i++){ out.push({x: rc.x + 8 + r + (i % cols)*sp, y: rc.y + pad + r + Math.floor(i/cols)*sp}); } return out; }
  function drawMatrix(c, g, fs, opts){ const {shade, showNames = true, short = false, a = 1} = opts;
    c.save(); c.globalAlpha = a;
    for(const r of [0, 1]) for(const k of [0, 1]){ const rc = g.cell(r, k), lv = shade ? shade(rc.name) : 0;
      if(lv){ c.fillStyle = lv === 2 ? MID : SOFT; c.globalAlpha = a*.75; c.fillRect(rc.x, rc.y, rc.w, rc.h); c.globalAlpha = a; }
      c.strokeStyle = '#475569'; c.lineWidth = 1.5; c.strokeRect(rc.x, rc.y, rc.w, rc.h);
      if(showNames){ txt(c, rc.name, rc.x + 8, rc.y + 16, fs*1.05, true, 'left', 'middle'); if(!short) txt(c, rc.word, rc.x + 8 + fs*2.1, rc.y + 16, fs*.82, false, 'left', 'middle'); } }
    c.restore(); }
  function matrixHeads(c, g, fs, a = 1){ c.save(); c.globalAlpha = a;
    txt(c, 'predicted not spam', g.x + g.cw/2, g.y - 14, fs*.95, true); txt(c, 'predicted spam', g.x + g.cw*1.5, g.y - 14, fs*.95, true);
    const lx = g.x - 8; txt(c, 'actual', lx, g.y + g.ch/2 - fs*.6, fs*.95, true, 'right'); txt(c, 'not spam', lx, g.y + g.ch/2 + fs*.6, fs*.95, true, 'right');
    txt(c, 'actual', lx, g.y + g.ch*1.5 - fs*.6, fs*.95, true, 'right'); txt(c, 'spam', lx, g.y + g.ch*1.5 + fs*.6, fs*.95, true, 'right'); c.restore(); }

  /* The regression plot: equal pixels per unit on both axes, so a square residual really is square. */
  function regGeom(x0, y0, w, h, xr = 16, yr = 14){ const u = Math.min(w/xr, h/yr), px0 = x0 + 4, py1 = y0 + yr*u;
    return {X: x => px0 + x*u, Y: y => py1 - y*u, u, x0: px0, x1: px0 + xr*u, y0: py1 - yr*u, y1: py1}; }
  function regAxes(c, g, fs, a = 1){ c.save(); c.globalAlpha = a; c.strokeStyle = MID; c.lineWidth = 1.5; c.beginPath(); c.moveTo(g.x0, g.y0); c.lineTo(g.x0, g.y1); c.lineTo(g.x1, g.y1); c.stroke();
    txt(c, 'x', g.x1 + 8, g.y1, fs, true, 'left'); txt(c, 'y', g.x0 + 8, g.y0 + fs*.55, fs, true, 'left', 'middle'); c.restore(); }
  function line(c, x1, y1, x2, y2, col = INK, lw = 2, dash = []){ c.save(); c.strokeStyle = col; c.lineWidth = lw; c.setLineDash(dash); c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); c.restore(); }
  function poly(c, pts, col = INK, lw = 2.5, dash = []){ if(pts.length < 2) return; c.save(); c.strokeStyle = col; c.lineWidth = lw; c.setLineDash(dash); c.lineJoin = 'round'; c.beginPath(); pts.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke(); c.restore(); }

  /* Beat controller for a canvas scene. draw({ctx, W, H, beat, p, raw, A}) is called each frame; A(b) is 0 before beat b,
     eases in during it, 1 after. A forward click tweens, back jumps straight to the finished previous state. */
  function scene(name, NB, draw, opts = {}){
    const cv = document.getElementById('cv'), ctx = cv.getContext('2d'), dur = b => (opts.dur && opts.dur(b)) || 900;
    const dotsEl = document.getElementById('dots'), citeEl = document.getElementById('cite');
    let beat = 0, t0 = 0, W = 0, H = 0;
    function go(b, jump){ beat = b; t0 = performance.now() - (jump ? 1e9 : 0);
      if(dotsEl) dotsEl.innerHTML = [...Array(NB)].map((_, i) => `<i class="${i < b ? 'on' : ''}"></i>`).join('');
      if(citeEl) citeEl.style.opacity = b ? 1 : 0;
      cv.style.opacity = b ? 1 : 0; }
    function size(){ const k = devicePixelRatio || 1; W = cv.clientWidth; H = cv.clientHeight; cv.width = W*k; cv.height = H*k; ctx.setTransform(k, 0, 0, k, 0, 0); }
    function frame(now){ if(cv.clientWidth !== W || cv.clientHeight !== H) size();
      const raw = Math.min(1, (now - t0)/dur(beat)), p = ease(raw), A = b => beat > b ? 1 : beat === b ? p : 0;
      ctx.clearRect(0, 0, W, H); draw({ctx, W, H, beat, p, raw, A}); requestAnimationFrame(frame); }
    window[name] = { advance(){ if(beat < NB) go(beat + 1); }, back(){ if(beat > 0) go(beat - 1, true); }, atStart: () => beat === 0, atEnd: () => beat === NB, reset(){ go(0, true); }, resetToEnd(){ go(NB, true); }, getBeat: () => beat };
    if(window.parent === window){ addEventListener('keydown', e => { if(['ArrowRight', ' ', 'Enter'].includes(e.key)) window[name].advance(); if(e.key === 'ArrowLeft') window[name].back(); }); addEventListener('click', () => window[name].advance()); }
    go(0, true); requestAnimationFrame(frame);
    return window[name];
  }

  return {INK, MID, SOFT, FONT, rng, gaussOf, sig, mean, sd, clamp01, ease, lerp, emailData, regData, foldData, txt, dot, frac, matrixGeom, slots, drawMatrix, matrixHeads, regGeom, regAxes, line, poly, scene};
})();
