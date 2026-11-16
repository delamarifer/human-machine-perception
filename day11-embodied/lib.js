/* Day 11 helpers (owner: Shreya). Class names carry the d11- prefix. */
(() => {
  const el = document.createElement('style'); el.id = 'd11-style';
  el.textContent = `
  .d11-col{ display:flex; flex-direction:column; gap:2.6vh; flex:1 1 auto; min-height:0; justify-content:center; }
  .d11-list{ margin:0 auto; padding-left:1.4em; display:flex; flex-direction:column; gap:2.4vh; max-width:46em; }
  .d11-list > li{ font-size:clamp(1.4rem, 2.6vw, 2.4rem); line-height:1.3; }
  .d11-q{ font-size:clamp(1.69rem, 3.4vw, 3.1rem); font-weight:600; line-height:1.3; text-align:center; max-width:30em; margin:0 auto; }
  .d11-mute{ color:var(--mute); }

  /* What is an embodied agent?: the question, then two answers */
  .d11-def{ display:flex; flex-direction:column; gap:4vh; align-items:center; text-align:center; }
  .d11-def .d11-q{ font-style:italic; }
  .d11-def .d11-ans{ font-size:clamp(1.5rem, 2.8vw, 2.6rem); line-height:1.3; max-width:28em; }

  /* the class poll: one bar per answer, counted from the form */
  .d11-poll{ display:grid; grid-template-columns:auto 1fr auto; gap:1.6vh 1.4vw; align-items:center; max-width:60em; width:100%; margin:0 auto; }
  .d11-poll .d11-plab{ font-size:clamp(1.15rem, 2vw, 1.8rem); text-align:right; white-space:nowrap; }
  .d11-poll .d11-track{ height:4.6vh; background:var(--line); border-radius:6px; overflow:hidden; }
  .d11-poll .d11-bar{ height:100%; background:var(--ink); border-radius:6px; width:0; transition:width .9s ease; }
  .d11-poll.shown .d11-bar{ width:var(--w); }
  .d11-poll .d11-n{ font-size:clamp(1.1rem, 1.9vw, 1.7rem); font-variant-numeric:tabular-nums; white-space:nowrap; }
  .d11-poll .d11-n small{ color:var(--mute); font-size:.8em; }
  .d11-sum{ text-align:center; font-size:clamp(1.5rem, 2.8vw, 2.6rem); }

  /* what your answers said: a theme on the left, a short anonymous quote on the right; earlier rows fade */
  .d11-themes{ display:flex; flex-direction:column; gap:2.4vh; max-width:66em; margin:0 auto; width:100%; }
  .d11-theme{ display:grid; grid-template-columns:1fr 1.25fr; gap:2.4vw; align-items:start; }
  .d11-theme b{ font-size:clamp(1.25rem, 2.2vw, 2rem); line-height:1.25; }
  .d11-quote{ font-size:clamp(1.05rem, 1.75vw, 1.6rem); line-height:1.35; border-left:4px solid var(--ink); padding-left:1vw; }
  .d11-quote small{ display:block; color:var(--mute); font-size:.78em; margin-top:.3vh; }
  .d11-pair{ display:flex; flex-direction:column; gap:1.2vh; }
  .d11-themes > .shown.d11-dim{ opacity:.3; }

  /* What does it mean to experience?: four views as cards, then the takeaway */
  .d11-views{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:2.2vh 2vw; }
  .d11-view{ border:2px solid var(--ink); border-radius:14px; padding:1.8vh 1.4vw; display:flex; flex-direction:column; gap:.8vh; }
  .d11-view small{ font-size:clamp(.9rem, 1.25vw, 1.2rem); text-transform:uppercase; letter-spacing:.08em; color:var(--mute); }
  .d11-view b{ font-size:clamp(1.25rem, 2.1vw, 1.95rem); line-height:1.2; }
  .d11-view span{ font-size:clamp(1rem, 1.55vw, 1.45rem); line-height:1.3; }
  .d11-view i.d11-who{ font-style:normal; color:var(--mute); font-size:clamp(.9rem, 1.3vw, 1.25rem); }
  .d11-views > .shown.d11-dim{ opacity:.35; }
  .d11-know{ text-align:center; font-size:clamp(1.6rem, 3vw, 2.8rem); line-height:1.3; }
  .d11-know span{ display:block; font-size:.55em; color:var(--mute); margin-top:.6vh; }

  /* examples: two columns, physical and virtual, each with photo tiles */
  .d11-kinds{ display:grid; grid-template-columns:1fr 1fr; gap:3vw; }
  .d11-kind{ display:flex; flex-direction:column; gap:1.6vh; }
  .d11-kind h2{ margin:0; font-size:clamp(1.35rem, 2.3vw, 2.1rem); border-bottom:3px solid var(--ink); padding-bottom:.8vh; }
  .d11-tiles{ display:grid; grid-template-columns:1fr 1fr; gap:1.4vh 1vw; }
  .d11-tile{ margin:0; display:flex; flex-direction:column; gap:.6vh; }
  .d11-tile img, .d11-tile svg{ width:100%; aspect-ratio:4 / 3; object-fit:cover; border-radius:10px; display:block; background:#f1f5f9; }
  .d11-tile figcaption{ font-size:clamp(.95rem, 1.45vw, 1.35rem); text-align:center; line-height:1.25; }

  /* the video */
  .d11-video{ display:flex; flex-direction:column; align-items:center; gap:.8vh; }
  .d11-video iframe{ height:68vh; aspect-ratio:9 / 16; max-width:100%; border:0; border-radius:10px; background:#000; }   /* her clip is a portrait phone video, 900 x 1600 */

  /* Meet Rizzbot: the portrait video on the left, the questions on the right */
  .d11-rizz{ display:grid; grid-template-columns:auto 1fr; gap:4vw; align-items:center; }
  .d11-rizz-side{ display:flex; flex-direction:column; gap:4vh; }
  .d11-rizz-side .d11-q{ text-align:left; margin:0; }
  .d11-rizz-side .d11-ans{ font-size:clamp(1.3rem, 2.3vw, 2.1rem); line-height:1.35; }

  /* common problems: six numbered cards, then the takeaway */
  .d11-probs{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:4.5vh 1.6vw; }
  .d11-prob{ border-top:6px solid var(--ink); padding-top:1.2vh; display:flex; flex-direction:column; gap:.6vh; }
  .d11-prob small{ font-size:clamp(.9rem, 1.3vw, 1.25rem); color:var(--mute); letter-spacing:.06em; }
  .d11-prob b{ font-size:clamp(1.3rem, 2.3vw, 2.1rem); line-height:1.15; }
  .d11-prob span{ font-size:clamp(1rem, 1.6vw, 1.5rem); line-height:1.3; }
  .d11-take{ text-align:center; font-size:clamp(1.5rem, 2.8vw, 2.6rem); font-weight:700; }

  /* CSAIL labs: four aspects as columns, one per click */
  .d11-labs{ display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:1.8vw; }
  .d11-lab h2{ margin:0 0 1vh; font-size:clamp(1.15rem, 1.9vw, 1.75rem); border-bottom:3px solid var(--ink); padding-bottom:.6vh; }
  .d11-lab ul{ list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:1.1vh; }
  .d11-lab li{ font-size:clamp(.95rem, 1.45vw, 1.35rem); line-height:1.2; }
  .d11-lab li small{ display:block; color:var(--mute); font-size:.78em; }
  .d11-quest{ text-align:center; font-size:clamp(1.05rem, 1.7vw, 1.6rem); margin-top:1vh; }

  /* Vacuum: photo and her line, then the pipeline underneath */
  .d11-vac{ display:grid; grid-template-columns:auto 1fr; gap:3vw; align-items:center; }
  .d11-vac-fig{ margin:0; } .d11-vac-fig img{ height:30vh; width:auto; border-radius:12px; display:block; }
  .d11-vac .d11-q{ text-align:left; margin:0; }
  .d11-vac-pipe{ display:grid; grid-template-columns:1fr auto 1fr auto 1fr auto 1fr; gap:1vw; align-items:stretch; }
  .d11-vstep{ border:2px solid var(--ink); border-radius:12px; padding:1.6vh 1vw; display:flex; flex-direction:column; gap:.6vh; text-align:center; }
  .d11-vstep b{ font-size:clamp(1.25rem, 2.1vw, 1.95rem); }
  .d11-vstep span{ font-size:clamp(.95rem, 1.45vw, 1.35rem); line-height:1.25; }
  .d11-vstep small{ font-size:clamp(.8rem, 1.1vw, 1.05rem); color:var(--mute); text-transform:uppercase; letter-spacing:.05em; margin-top:auto; }
  .d11-varrow{ align-self:center; font-size:clamp(1.6rem, 2.6vw, 2.4rem); color:var(--mute); }
  .d11-vloop{ text-align:center; font-size:clamp(1.15rem, 2vw, 1.8rem); }

  /* figure on the left, steps on the right */
  .d11-split{ display:grid; grid-template-columns:1.2fr 1fr; gap:3vw; align-items:center; }
  .d11-fig{ margin:0; } .d11-fig img{ width:100%; max-height:58vh; object-fit:contain; border-radius:12px; display:block; }
  /* one figure panel at a time, each replacing the one before in the same place */
  .d11-swap{ display:grid; align-items:center; justify-items:center; }
  .d11-swap > *{ grid-area:1 / 1; }
  .d11-swap > .shown.d11-gone{ opacity:0; }
  .d11-njf{ grid-template-columns:1.9fr 1fr; gap:2vw; }
  .d11-njf .d11-fig img{ max-height:66vh; }
  .d11-duo{ display:grid; grid-template-columns:1fr 1fr; gap:2vw; max-width:62em; margin:0 auto; width:100%; }
  .d11-duo img{ width:100%; height:34vh; object-fit:cover; }
  .d11-duo figcaption{ text-align:center; margin-top:.6vh; font-size:clamp(1rem, 1.5vw, 1.4rem); }
  .d11-wide img{ height:42vh; max-height:none; width:auto; max-width:100%; object-fit:contain; margin:0 auto; }
  .d11-side{ display:flex; flex-direction:column; gap:2.4vh; }
  .d11-step{ font-size:clamp(1.25rem, 2.2vw, 2rem); line-height:1.3; }
  .d11-callout{ font-size:clamp(1.2rem, 2.1vw, 1.9rem); line-height:1.35; border-left:6px solid var(--ink); padding:.4vh 1.2vw; }
  .d11-split2{ display:grid; grid-template-columns:1fr 1fr; gap:1vw; }
  .d11-split2 > div{ border:2px solid var(--ink); border-radius:12px; padding:1.4vh 1vw; font-size:clamp(1.05rem, 1.7vw, 1.55rem); text-align:center; }
  .d11-split2 small{ display:block; font-weight:700; font-size:1.1em; margin-bottom:.4vh; }
  .d11-pair2{ display:flex; flex-direction:column; gap:2vh; max-width:52em; margin:0 auto; }

  /* the drawn robot arm and its sensor readout */
  .d11-arm{ width:100%; max-height:62vh; display:block; }
  .d11-armlab.shown.d11-gone{ opacity:0; }
  .d11-readout{ display:grid; grid-template-columns:repeat(3, auto); gap:.4vh 2vw; justify-content:start; font-variant-numeric:tabular-nums; }
  .d11-readout small{ grid-column:1 / -1; color:var(--mute); font-size:clamp(.9rem, 1.3vw, 1.2rem); text-transform:uppercase; letter-spacing:.06em; }
  .d11-readout div{ font-size:clamp(1.3rem, 2.3vw, 2.1rem); display:flex; gap:.5vw; align-items:baseline; }
  .d11-readout b{ min-width:3.2em; }

  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .d11-labs{ grid-template-columns:repeat(2, minmax(0,1fr)); }
    .d11-split, .d11-vac{ grid-template-columns:1fr; }
    .d11-vac-pipe{ grid-template-columns:1fr; } .d11-varrow{ display:none; }
  }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .d11-views, .d11-kinds, .d11-theme{ grid-template-columns:1fr; }
    .d11-probs{ grid-template-columns:repeat(2, minmax(0,1fr)); }
  }
`;
  document.head.appendChild(el);
})();

/* Lists where only the newest shown item stays at full strength: earlier ones get .d11-dim.
   A takeaway (.d11-all) shown after the list brings every item back. */
(function(){
  let busy = false;
  const sync = () => {
    if (busy) return; busy = true;
    document.querySelectorAll('.d11-themes, .d11-views').forEach(box => {
      const items = [...box.querySelectorAll(':scope > .b')];
      const shown = items.filter(l => l.classList.contains('shown'));
      const all = box.parentElement.querySelector('.d11-all.shown');
      items.forEach(l => l.classList.toggle('d11-dim', !all && shown.length > 0 && l !== shown[shown.length - 1]));
    });
    document.querySelectorAll('.d11-swap').forEach(box => {
      const items = [...box.querySelectorAll(':scope > .b')];
      const shown = items.filter(l => l.classList.contains('shown'));
      items.forEach(l => l.classList.toggle('d11-gone', shown.length > 0 && l !== shown[shown.length - 1]));
    });
    busy = false;
  };
  new MutationObserver(sync).observe(document.documentElement, { subtree:true, attributes:true, attributeFilter:['class'] });
})();

/* The drawn robot arm: at rest until the "sensors report" click, then it moves to a second pose (and back when you go
   back). The readout shows each joint's angle as it turns. */
(function(){
  const REST = [0, 0, 0], MOVED = [-28, 35, -40];
  const state = new WeakMap();
  const draw = (svg, a) => {
    ['d11-j0', 'd11-j1', 'd11-j2'].forEach((c, k) => {
      const g = svg.querySelector('.' + c), [ox, oy] = g.dataset.o.split(' ');
      g.setAttribute('transform', `rotate(${a[k].toFixed(1)} ${ox} ${oy})`);
    });
    const box = svg.closest('.slide');
    a.forEach((v, k) => { const el = box && box.querySelector('.d11-r' + k); if (el) el.textContent = `${Math.round(v)}°`; });
  };
  const sync = () => document.querySelectorAll('.d11-arm').forEach(svg => {
    const slide = svg.closest('.slide');
    const go = slide && slide.querySelector('.d11-arm-go.shown');
    const target = go ? MOVED : REST;
    svg.querySelectorAll('.d11-armlab').forEach(l => l.classList.toggle('d11-gone', !!go));   /* arrows would point at the old pose */
    const s = state.get(svg) || { a: REST.slice(), target: null };
    if (s.target === target) return;
    s.target = target; state.set(svg, s);
    const from = s.a.slice(), t0 = performance.now(), dur = 1800;
    const tick = now => {
      if (s.target !== target) return;
      const u = Math.min(1, (now - t0) / dur), e = u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;
      s.a = from.map((f, k) => f + (target[k] - f) * e); draw(svg, s.a);
      if (u < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
  new MutationObserver(sync).observe(document.documentElement, { subtree:true, attributes:true, attributeFilter:['class'] });
})();

/* Embedded videos: when a video is hidden again (going back, or leaving the slide), reload it so it stops playing. */
(function(){
  const sync = () => document.querySelectorAll('.d11-video, .d11-yt').forEach(v => {
    const f = v.querySelector('iframe'); if (!f) return;
    const slide = v.closest('.slide');
    const on = v.classList.contains('shown') && slide && slide.classList.contains('active');
    if (on) f.dataset.live = '1';
    else if (f.dataset.live) { delete f.dataset.live; f.src = f.src; }
  });
  new MutationObserver(sync).observe(document.documentElement, { subtree:true, attributes:true, attributeFilter:['class'] });
})();

/* ---------- Jacobian-field slides (Google slides 17-29) ---------- */
(() => {
  const el = document.createElement('style'); el.id = 'd11-style-2';
  el.textContent = `
  .d11-math{ font-size:clamp(1.15rem, 2vw, 1.85rem); }
  .d11-math .katex-display{ margin:.3em 0; }
  .d11-mathbig{ font-size:clamp(1.35rem, 2.5vw, 2.3rem); text-align:center; }
  .d11-note{ font-size:clamp(.95rem, 1.45vw, 1.35rem); color:var(--mute); line-height:1.3; }
  .d11-svg{ width:100%; max-height:60vh; display:block; }
  .d11-canvas{ width:100%; height:auto; display:block; }
  .d11-flip{ position:relative; }
  .d11-flip img{ width:100%; max-height:58vh; object-fit:contain; border-radius:12px; display:block; }
  .d11-flip img + img{ position:absolute; inset:0; }
  .d11-flip img.d11-off{ opacity:0; }
  .d11-yt{ display:flex; justify-content:center; }
  .d11-yt iframe{ height:56vh; aspect-ratio:16 / 9; max-width:100%; border:0; border-radius:10px; background:#000; }
  .d11-pipe{ display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:1vw; align-items:stretch; }
  .d11-pipe > div{ border:2px solid var(--ink); border-radius:12px; padding:1.4vh .8vw; text-align:center; display:flex; flex-direction:column; gap:.6vh; justify-content:center; }
  .d11-pipe b{ font-size:clamp(1.1rem, 1.9vw, 1.75rem); }
  .d11-pipe span{ font-size:clamp(.92rem, 1.4vw, 1.3rem); color:var(--mute); line-height:1.25; }
  .d11-pipe .katex{ font-size:1em; color:var(--ink); }
  .d11-loss{ display:grid; grid-template-columns:1fr 1fr; gap:2vw; }
  .d11-loss > div{ border:2px solid var(--ink); border-radius:12px; padding:1.6vh 1.2vw; display:flex; flex-direction:column; gap:.8vh; }
  .d11-loss b{ font-size:clamp(1.15rem, 2vw, 1.85rem); }
  .d11-loss .d11-math{ font-size:clamp(1.05rem, 1.8vw, 1.65rem); }
  .d11-quotes{ display:flex; flex-direction:column; gap:2.4vh; max-width:56em; margin:0 auto; }
  .d11-big{ font-size:clamp(1.4rem, 2.6vw, 2.4rem); line-height:1.3; }
  .d11-big small{ display:block; font-size:.55em; color:var(--mute); margin-top:.3vh; }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){ .d11-pipe, .d11-loss{ grid-template-columns:1fr; } }
`;
  document.head.appendChild(el);
})();

/* KaTeX, rendered when the parts are built (katex.min.js loads before lib.js in deck.html). */
const d11Tex = (tex, display = true) => {
  try { return katex.renderToString(tex, { displayMode: display, throwOnError: false }); }
  catch (e) { return `<code>${tex}</code>`; }
};

/* Animations that run while their element is shown on the active slide. Each [data-anim] element gets
   on(el) when it becomes visible and off(el) when it is hidden again (going back or leaving the slide). */
const D11_ANIM = {};
(function(){
  const sync = () => document.querySelectorAll('[data-anim]').forEach(el => {
    const a = D11_ANIM[el.dataset.anim]; if (!a) return;
    const slide = el.closest('.slide');
    const shown = !el.classList.contains('b') || el.classList.contains('shown');
    const on = shown && slide && slide.classList.contains('active');
    if (on && !el._d11on) { el._d11on = true; a.on(el); }
    else if (!on && el._d11on) { el._d11on = false; a.off && a.off(el); }
  });
  new MutationObserver(sync).observe(document.documentElement, { subtree:true, attributes:true, attributeFilter:['class'] });
})();
const d11Ease = u => u < .5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;

/* Slide "Background: Body Jacobian": a planar three-joint arm. Joint positions come from forward kinematics; the
   Jacobian columns at the tip are J_i = perpendicular of (tip - joint_i), i.e. how the tip moves if only joint i turns.
   Each arrow beat turns its joint a little and back, so the tip slides along that arrow. */
const D11_ARM = { base: [140, 380], L: [150, 130, 90], q: [-75, 65, 55] };     /* degrees, each relative to the link before */
function d11ArmFK(q){
  const [bx, by] = D11_ARM.base; const pts = [[bx, by]]; let a = 0;
  q.forEach((qi, i) => { a += qi * Math.PI / 180; const [px, py] = pts[i]; pts.push([px + D11_ARM.L[i] * Math.cos(a), py + D11_ARM.L[i] * Math.sin(a)]); });
  return pts;
}
function d11ArmDraw(svg, q){
  const p = d11ArmFK(q), tip = p[3];
  svg.querySelectorAll('.d11-link').forEach((l, i) => { l.setAttribute('x1', p[i][0]); l.setAttribute('y1', p[i][1]); l.setAttribute('x2', p[i+1][0]); l.setAttribute('y2', p[i+1][1]); });
  svg.querySelectorAll('.d11-joint').forEach((c, i) => { c.setAttribute('cx', p[i][0]); c.setAttribute('cy', p[i][1]); });
  svg.querySelectorAll('.d11-qlab').forEach((t, i) => { t.setAttribute('x', p[i][0] - 46); t.setAttribute('y', p[i][1] + 8); });
  const x = svg.querySelector('.d11-tip'); x.setAttribute('cx', tip[0]); x.setAttribute('cy', tip[1]);
  const xl = svg.querySelector('.d11-tiplab'); xl.setAttribute('x', tip[0] + 14); xl.setAttribute('y', tip[1] - 12);
}
function d11ArmArrows(svg){
  const p = d11ArmFK(D11_ARM.q), tip = p[3], s = D11_ARM.s || 0.45;
  svg.querySelectorAll('.d11-jcol').forEach(g => {
    const i = +g.dataset.k, dx = tip[0] - p[i][0], dy = tip[1] - p[i][1];
    const ex = tip[0] - dy * s, ey = tip[1] + dx * s;
    const ln = g.querySelector('line'); ln.setAttribute('x1', tip[0]); ln.setAttribute('y1', tip[1]); ln.setAttribute('x2', ex); ln.setAttribute('y2', ey);
    const t = g.querySelector('text'); t.setAttribute('x', ex + 8); t.setAttribute('y', ey + 6);
  });
}
D11_ANIM.armInit = { on(svg){ d11ArmDraw(svg, D11_ARM.q); d11ArmArrows(svg); } };
D11_ANIM.armWiggle = {
  on(g){
    const svg = g.closest('svg'), k = +g.dataset.k, t0 = performance.now(), amp = 0.45 * 180 / Math.PI;
    const tick = now => {
      if (!g._d11on) { d11ArmDraw(svg, D11_ARM.q); return; }
      const u = ((now - t0) / 2600) % 1, w = u < .4 ? d11Ease(u / .4) : u < .55 ? 1 : u < .95 ? 1 - d11Ease((u - .55) / .4) : 0;
      const q = D11_ARM.q.slice(); q[k] += amp * w; d11ArmDraw(svg, q);
      if ((now - t0) < 2600 * 2) requestAnimationFrame(tick); else d11ArmDraw(svg, D11_ARM.q);
    };
    requestAnimationFrame(tick);
  },
  off(g){ d11ArmDraw(g.closest('svg'), D11_ARM.q); },
};

/* Slide "A Jacobian field on a soft finger" (illustration): a soft finger with no joints, bent by one command u.
   Each point's Jacobian column dx/du is computed by finite differences; arrows show it at every point. On the
   "move" beat, u grows and the finger follows its arrows. */
function d11Finger(u){
  /* constant curvature: start pointing up, bend to the right as u grows (integrated in small steps) */
  const n = 15, len = 300, kappa = u * 0.0085, steps = 280, ds = len / steps, pts = [];
  let x = 150, y = 360;
  for (let k = 0; k <= steps; k++){
    if (k % (steps / (n - 1)) === 0) pts.push([x, y]);
    const th = -Math.PI / 2 + kappa * k * ds; x += Math.cos(th) * ds; y += Math.sin(th) * ds;
  }
  return pts;
}
function d11FingerDraw(cv, u, arrows){
  const c = cv.getContext('2d'), W = cv.width, H = cv.height; c.clearRect(0, 0, W, H);
  const p = d11Finger(u), q = d11Finger(u + 0.02);
  c.lineCap = 'round'; c.lineJoin = 'round';
  c.strokeStyle = '#e2e8f0'; c.lineWidth = 54; c.beginPath(); p.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke();
  c.strokeStyle = '#94a3b8'; c.lineWidth = 2; c.stroke();
  c.fillStyle = '#cbd5e1'; c.fillRect(100, 360, 100, 22);
  p.forEach(([x, y]) => { c.fillStyle = '#0f172a'; c.beginPath(); c.arc(x, y, 4.5, 0, 7); c.fill(); });
  if (arrows) p.forEach(([x, y], i) => {
    const dx = (q[i][0] - x) / 0.02 * 0.22, dy = (q[i][1] - y) / 0.02 * 0.22;
    if (Math.hypot(dx, dy) < 3) return;
    const ex = x + dx, ey = y + dy, a = Math.atan2(dy, dx);
    c.strokeStyle = '#0f172a'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(x, y); c.lineTo(ex, ey); c.stroke();
    c.fillStyle = '#0f172a'; c.beginPath(); c.moveTo(ex, ey); c.lineTo(ex - 10 * Math.cos(a - .4), ey - 10 * Math.sin(a - .4)); c.lineTo(ex - 10 * Math.cos(a + .4), ey - 10 * Math.sin(a + .4)); c.fill();
  });
}
D11_ANIM.fingerStill = { on(cv){ d11FingerDraw(cv, 0.35, false); } };
D11_ANIM.fingerField = { on(g){ const cv = g.closest('.d11-fwrap').querySelector('canvas'); d11FingerDraw(cv, 0.35, true); },
                         off(g){ const cv = g.closest('.d11-fwrap').querySelector('canvas'); if (!g.closest('.slide').querySelector('[data-anim=fingerMove].shown')) d11FingerDraw(cv, 0.35, false); } };
D11_ANIM.fingerMove = {
  on(g){
    const cv = g.closest('.d11-fwrap').querySelector('canvas'), t0 = performance.now();
    const tick = now => {
      if (!g._d11on) return;
      const u = ((now - t0) / 4000) % 1, w = u < .5 ? d11Ease(u / .5) : 1 - d11Ease((u - .5) / .5);
      d11FingerDraw(cv, 0.35 + 0.8 * w, true); requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },
  off(g){ const cv = g.closest('.d11-fwrap').querySelector('canvas'); d11FingerDraw(cv, 0.35, true); },
};

/* Slide "Scene flow and optical flow": a pinhole camera seen from the side. Each 3D point P moves by its scene-flow
   vector; its image u is where the ray from the camera center C to P crosses the image plane (computed, not drawn by hand).
   On the "move" beat the points slide along their 3D arrows and their images slide along the 2D arrows. */
const D11_CAM = { C: [300, 410], planeY: 240, pts: [[170, 120, 70, 25], [330, 80, 60, -30], [450, 170, -55, 35]] };
const d11Proj = (x, y) => { const [cx, cy] = D11_CAM.C, t = (D11_CAM.planeY - cy) / (y - cy); return cx + t * (x - cx); };
function d11CamDraw(svg, w){
  D11_CAM.pts.forEach(([x, y, dx, dy], i) => {
    const g = svg.querySelector(`.d11-p${i}`); if (!g) return;
    const X = x + dx * w, Y = y + dy * w, u0 = d11Proj(x, y), u1 = d11Proj(x + dx, y + dy), uw = d11Proj(X, Y);
    const set = (sel, a) => { const e = g.querySelector(sel); if (e) Object.entries(a).forEach(([k, v]) => e.setAttribute(k, v)); };
    set('.d11-pt', { cx: X, cy: Y }); set('.d11-f3', { x1: x, y1: y, x2: x + dx, y2: y + dy });
    set('.d11-ray', { x1: D11_CAM.C[0], y1: D11_CAM.C[1], x2: X, y2: Y });
    set('.d11-ip', { cx: uw, cy: D11_CAM.planeY }); set('.d11-f2', { x1: u0, y1: D11_CAM.planeY, x2: u1, y2: D11_CAM.planeY });
  });
}
D11_ANIM.camInit = { on(svg){ d11CamDraw(svg, 0); } };
D11_ANIM.camMove = {
  on(g){
    const svg = g.closest('svg'), t0 = performance.now();
    const tick = now => {
      if (!g._d11on) { d11CamDraw(svg, 0); return; }
      const u = ((now - t0) / 3200) % 1, w = u < .45 ? d11Ease(u / .45) : u < .6 ? 1 : u < .95 ? 1 - d11Ease((u - .6) / .35) : 0;
      d11CamDraw(svg, w); requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },
  off(g){ d11CamDraw(g.closest('svg'), 0); },
};

/* Flipbook: the frames of a figure panel shown one after another, in a loop, while the slide is on. */
D11_ANIM.flip = {
  on(box){
    const imgs = [...box.querySelectorAll('img')]; let k = 0;
    imgs.forEach((im, i) => im.classList.toggle('d11-off', i !== 0));
    box._d11t = setInterval(() => { k = (k + 1) % imgs.length; imgs.forEach((im, i) => im.classList.toggle('d11-off', i !== k)); }, 900);
  },
  off(box){ clearInterval(box._d11t); [...box.querySelectorAll('img')].forEach((im, i) => im.classList.toggle('d11-off', i !== 0)); },
};

/* Diffusion policy (illustration): an action sequence starts as random noise and is denoised, step by step, into a
   smooth path. A fixed random seed, so it looks the same every time. */
function d11Rand(seed){ return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }; }
function d11Denoise(cv, t){
  const c = cv.getContext('2d'), W = cv.width, H = cv.height, n = 28, r = d11Rand(7);
  c.clearRect(0, 0, W, H);
  const target = [], noise = [];
  for (let i = 0; i < n; i++){
    const s = i / (n - 1); target.push([80 + s * (W - 160), H / 2 + Math.sin(s * Math.PI * 1.6) * H * 0.28]);
    const g = () => (r() + r() + r() - 1.5) * 1.4; noise.push([target[i][0] + g() * 120, H / 2 + g() * H * 0.45]);
  }
  c.fillStyle = '#cbd5e1'; c.beginPath(); c.arc(target[0][0], target[0][1], 16, 0, 7); c.fill();
  c.strokeStyle = '#94a3b8'; c.lineWidth = 3; c.strokeRect(target[n-1][0] - 18, target[n-1][1] - 18, 36, 36);
  const p = target.map(([x, y], i) => [x + (noise[i][0] - x) * t, y + (noise[i][1] - y) * t]);
  c.strokeStyle = '#0f172a'; c.lineWidth = 2.5; c.beginPath(); p.forEach(([x, y], i) => i ? c.lineTo(x, y) : c.moveTo(x, y)); c.stroke();
  p.forEach(([x, y]) => { c.fillStyle = '#0f172a'; c.beginPath(); c.arc(x, y, 5, 0, 7); c.fill(); });
  c.fillStyle = '#64748b'; c.font = '22px system-ui, sans-serif';
  c.fillText(t > 0.97 ? 'pure noise' : t < 0.03 ? 'a smooth action sequence' : `denoising… ${Math.round((1 - t) * 100)}%`, 24, 34);
}
D11_ANIM.noiseStill = { on(cv){ d11Denoise(cv, 1); } };
D11_ANIM.denoise = {
  on(g){
    const cv = g.closest('.d11-fwrap').querySelector('canvas'), t0 = performance.now();
    const tick = now => {
      if (!g._d11on) return;
      const u = Math.min(1, (now - t0) / 3500); d11Denoise(cv, 1 - d11Ease(u));
      if (u < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },
  off(g){ d11Denoise(g.closest('.d11-fwrap').querySelector('canvas'), 1); },
};
/* shorter figure when an equation and a line share the slide */
(() => { const el = document.createElement('style'); el.textContent = `.d11-short img{ height:34vh; } .d11-col{ overflow:visible; }`; document.head.appendChild(el); })();
/* bigger arrows for the arm */
D11_ARM.s = 0.7;
(() => { const el = document.createElement('style'); el.textContent = `.d11-def-q{ text-align:left; margin:0; font-style:italic; font-size:clamp(1.5rem, 2.8vw, 2.6rem); }`; document.head.appendChild(el); })();

/* Fit to the screen (Shreya: "more sensitive to wide screen"). On ultrawide screens the content keeps a 16:9-ish width;
   on short screens a slide whose content is taller than the space between the title and the credit line is scaled down
   (CSS zoom), so nothing slides under the title or the credit. Hidden .b items still take their space, so one fit holds
   for every click of a slide. */
(() => { const el = document.createElement('style'); el.textContent = `
  .stage > .d11-col{ width:100%; max-width:182vh; margin-inline:auto; }
  .stage > h1.t, .stage > .cite{ max-width:182vh; }
  @media (min-aspect-ratio: 2/1){ .stage > h1.t{ margin-inline:auto; width:100%; } }
`; document.head.appendChild(el); })();
(function(){
  const fit = () => {
    const sl = document.querySelector('.slide.active'); if (!sl) return;
    sl.querySelectorAll('.d11-col').forEach(col => {
      col.style.zoom = 1;
      const cr = col.getBoundingClientRect();
      const h1 = sl.querySelector('h1.t'), cite = sl.querySelector('.cite');
      const lo = Math.max(cr.top, h1 ? h1.getBoundingClientRect().bottom + 12 : 0);
      const hi = Math.min(cr.bottom, cite ? cite.getBoundingClientRect().top - 12 : innerHeight - 8);
      const have = hi - lo;
      for (let k = 0; k < 4; k++) {
        const z = parseFloat(col.style.zoom) || 1;
        const kids = [...col.children].filter(c => c.getClientRects().length);
        if (!kids.length) return;
        const need = Math.max(...kids.map(c => c.getBoundingClientRect().bottom)) - Math.min(...kids.map(c => c.getBoundingClientRect().top));
        if (need <= have + 1) break;
        col.style.zoom = Math.max(0.55, z * have / need - 0.005).toFixed(3);
      }
    });
  };
  let t = 0; const later = () => { clearTimeout(t); t = setTimeout(fit, 0); };
  addEventListener('resize', later);
  new MutationObserver(later).observe(document.documentElement, { subtree:true, attributes:true, attributeFilter:['class'] });
  addEventListener('load', later);
})();
(() => { const el = document.createElement('style'); el.textContent = `
  .d11-view-ic{ display:grid; grid-template-columns:clamp(4.5rem, 12vh, 10rem) 1fr; column-gap:1.6vw; row-gap:.6vh; align-content:start; }
  .d11-view-ic > :not(.d11-ic){ grid-column:2; }
  .d11-view-ic > .d11-ic{ grid-column:1; grid-row:1 / span 4; align-self:center; }
  .d11-ic svg{ width:100%; display:block; }
`; document.head.appendChild(el); })();
(() => { const el = document.createElement('style'); el.textContent = `
  .d11-mary{ display:flex; align-items:center; justify-content:center; gap:1.6vw; }
  .d11-mary svg{ height:clamp(2.6rem, 8vh, 6rem); width:auto; }
`; document.head.appendChild(el); })();
/* Labs slide: the four headers share one row (subgrid), so a header that wraps to two lines no longer pushes its
   underline below the others; logos row under the list. */
(() => { const el = document.createElement('style'); el.textContent = `
  .d11-labs{ grid-template-rows:auto auto; row-gap:0; }
  .d11-lab{ display:grid; grid-template-rows:subgrid; grid-row:span 2; }
  .d11-lab h2{ align-self:end; }
  .d11-logos{ display:flex; align-items:center; justify-content:center; gap:3vw; flex-wrap:wrap; }
  .d11-logos img{ height:clamp(2rem, 6vh, 4.5rem); width:auto; filter:grayscale(1) brightness(.35); }
`; document.head.appendChild(el); })();
/* Tedrake segment */
(() => { const el = document.createElement('style'); el.textContent = `
  .d11-ted2{ display:grid; grid-template-columns:1fr 1fr; gap:3vw; }
  .d11-tedside{ border:2px solid var(--ink); border-radius:14px; padding:2vh 1.6vw; display:flex; flex-direction:column; gap:.8vh; }
  .d11-tedside small, .d11-tedcard small{ font-size:clamp(.9rem, 1.25vw, 1.2rem); text-transform:uppercase; letter-spacing:.08em; color:var(--mute); }
  .d11-tedside > b{ font-size:clamp(1.4rem, 2.4vw, 2.2rem); }
  .d11-tedside ul{ margin:.4vh 0 0; padding-left:1.2em; display:flex; flex-direction:column; gap:1vh; }
  .d11-tedside li{ font-size:clamp(1.05rem, 1.7vw, 1.6rem); line-height:1.3; }
  .d11-tedflow{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:2vw; }
  .d11-tedcard{ border:2px solid var(--ink); border-radius:14px; padding:2vh 1.4vw; display:flex; flex-direction:column; gap:.8vh; }
  .d11-tedcard b{ font-size:clamp(1.3rem, 2.1vw, 1.95rem); line-height:1.2; }
  .d11-tedcard span{ font-size:clamp(1rem, 1.55vw, 1.45rem); line-height:1.35; }
  .d11-tedpath{ display:grid; grid-template-columns:repeat(5, minmax(0,1fr)); gap:1.2vw; position:relative; }
  .d11-tedstep{ border-top:5px solid var(--ink); padding-top:1.2vh; display:flex; flex-direction:column; gap:.6vh; }
  .d11-tedstep i{ font-style:normal; font-weight:700; color:var(--mute); font-size:clamp(1rem, 1.5vw, 1.4rem); min-height:1.3em; }
  .d11-tedstep b{ font-size:clamp(1.1rem, 1.8vw, 1.7rem); line-height:1.25; }
  .d11-tedstep small{ font-size:clamp(.95rem, 1.35vw, 1.3rem); color:var(--mute); }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){ .d11-ted2, .d11-tedflow, .d11-tedpath{ grid-template-columns:1fr; } }
`; document.head.appendChild(el); })();
/* Malik segment */
(() => { const el = document.createElement('style'); el.textContent = `
  .d11-mk-three{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:2vw; }
  .d11-mk-card{ margin:0; display:flex; flex-direction:column; gap:1vh; }
  .d11-mk-card img{ width:100%; aspect-ratio:4 / 3; object-fit:cover; border-radius:12px; display:block; background:#fff; }
  .d11-mk-card img.d11-mk-contain{ object-fit:contain; border:1px solid var(--line); }
  .d11-mk-card figcaption{ display:flex; flex-direction:column; gap:.4vh; text-align:center; }
  .d11-mk-card figcaption b{ font-size:clamp(1.3rem, 2.2vw, 2rem); }
  .d11-mk-card figcaption span{ font-size:clamp(1rem, 1.5vw, 1.4rem); }
  .d11-mk-card figcaption i{ font-size:clamp(1rem, 1.5vw, 1.4rem); color:var(--mute); }
  .d11-mk-split .d11-fig img{ max-height:62vh; }
  .d11-mk-clip iframe{ height:auto; width:100%; max-height:60vh; }
  .d11-mk-data{ display:grid; grid-template-columns:auto 1fr; gap:3vw; align-items:center; max-width:60em; margin:0 auto; }
  .d11-mk-data svg{ height:clamp(12rem, 38vh, 26rem); width:auto; display:block; }
  .d11-mk-key{ display:flex; flex-direction:column; gap:2vh; font-size:clamp(1.1rem, 1.8vw, 1.7rem); line-height:1.3; }
  .d11-mk-sq{ display:inline-block; width:.8em; height:.8em; background:#cbd5e1; margin-right:.5em; vertical-align:-.05em; border-radius:2px; }
  .d11-mk-sq.d11-mk-dark{ background:#0f172a; }
  .d11-mk-levels{ display:flex; flex-direction:column; gap:1.6vh; max-width:62em; margin:0 auto; width:100%; }
  .d11-mk-level{ border:2px solid var(--ink); border-radius:14px; padding:1.4vh 1.4vw; display:grid; grid-template-columns:16em 1fr; column-gap:1.6vw; row-gap:.3vh; align-items:baseline; }
  .d11-mk-level small{ grid-row:1 / span 2; font-size:clamp(.95rem, 1.4vw, 1.3rem); text-transform:uppercase; letter-spacing:.06em; color:var(--mute); }
  .d11-mk-level b{ font-size:clamp(1.2rem, 2vw, 1.85rem); line-height:1.25; }
  .d11-mk-level span{ font-size:clamp(1rem, 1.5vw, 1.4rem); color:var(--mute); }
  .d11-mk-srccard{ border:2px solid var(--ink); border-radius:14px; padding:2vh 1.4vw; display:flex; flex-direction:column; gap:.9vh; }
  .d11-mk-srccard b{ font-size:clamp(1.3rem, 2.2vw, 2rem); }
  .d11-mk-srccard span{ font-size:clamp(1rem, 1.55vw, 1.45rem); color:var(--mute); }
  .d11-mk-srccard em{ font-style:normal; font-size:clamp(1rem, 1.6vw, 1.5rem); line-height:1.3; }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){ .d11-mk-three, .d11-mk-data{ grid-template-columns:1fr; } .d11-mk-level{ grid-template-columns:1fr; } .d11-mk-level small{ grid-row:auto; } }
`; document.head.appendChild(el); })();
