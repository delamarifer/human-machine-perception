/* PART: papers (Day 2). Owner: to decide. Plan: 5 min "how to read a paper" + 10 min paper review (moved to
   the end of class). How to read: Keshav's three passes (S. Keshav, How to Read a Paper, ACM SIGCOMM CCR, 2007).
   Paper: the reading on homework.html, Pizlo 2001. Discussion questions are drafts (feedback/_day.md). */
{
section('Research and papers');

/* Keshav's passes, drawn on a schematic paper (not a real one): each pass is one full drawing of the page, stacked
   on the one before, so a click shows what that pass reads (dark), skips (hatched) and leaves for later (light).
   Only Keshav's own times are on screen: pass 1 5-10 min, pass 2 up to an hour; pass 3 has no time. */
const PAGE = [
  ['title', 'Title', 1], ['abstract', 'Abstract', 1], ['h', '1  Introduction', 1], ['text', '', 1],
  ['h', '2  Method', 1], ['text', '', 2], ['proof', 'Proof', 3], ['fig', 'Figure', 2],
  ['h', '3  Results', 1], ['fig', 'Figure', 2], ['text', '', 2], ['h', '4  Conclusions', 1], ['text', '', 1]];
const page = pass => `<div class="papers-page">${PAGE.map(([k, t, p]) => {
  const s = p <= pass ? 'read' : (k === 'proof' && pass === 2 ? 'skip' : 'later');
  return `<div class="papers-blk papers-${k} papers-${s}">${t}</div>`; }).join('')}</div>`;
st(`
  <h1 class="t">Read a paper efficiently</h1>
  <div class="label papers-outcome"><b>By the end, you can</b> · read a research paper efficiently</div>
  <div class="papers-wrap">
    <div class="papers-stack">
      ${[1, 2, 3].map(p => `<div class="papers-layer b" data-step="${p}">${page(p)}</div>`).join('')}
    </div>
    <div class="papers-passes">
      <div class="papers-pass b" data-step="1"><div class="papers-n">1</div><div><b>5–10 min</b> · what kind of paper, what it claims
        <div class="label papers-mute">Title, abstract, introduction, headings, conclusions</div></div></div>
      <div class="papers-pass b" data-step="2"><div class="papers-n">2</div><div><b>Up to an hour</b> · the figures and the argument
        <div class="label papers-mute">Skip the proofs</div></div></div>
      <div class="papers-pass b" data-step="3"><div class="papers-n">3</div><div><b>Re-implement it in your head</b>
        <div class="label papers-mute">Same assumptions as the authors: what would you do differently?</div></div></div>
      <div class="papers-resp b" data-step="4"><b>Response paper</b> · one high-level question about the paper
        <div class="label papers-mute">By hand, at the start of class · a good pass 2 is enough</div></div>
    </div>
  </div>
  <div class="label papers-key b" data-step="1"><span class="papers-sw papers-read"></span>read <span class="papers-sw papers-skip"></span>skipped <span class="papers-sw papers-later"></span>not yet</div>
  ${cite('S. Keshav, How to Read a Paper, ACM SIGCOMM Computer Communication Review, 2007 · the page is a schematic')}
  <style>
    .papers-outcome{ color:var(--mute); } .papers-outcome b{ color:var(--ink); }
    .papers-mute{ color:var(--mute); }
    .papers-wrap{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:auto minmax(0, 1fr); gap:4vw; align-items:center; }
    .papers-stack{ position:relative; height:100%; aspect-ratio:.72; max-height:58vh; }
    .papers-layer{ position:absolute; inset:0; }
    .papers-page{ height:100%; background:#fff; border:2px solid var(--ink); border-radius:6px; padding:2.2vh 1.6vw;
      display:flex; flex-direction:column; gap:.9vh; box-shadow:6px 6px 0 var(--line); }
    .papers-blk{ border-radius:3px; font-size:clamp(.7rem, 1vw, .95rem); font-weight:700; padding:0 .4vw; display:flex; align-items:center;
      transition:background .4s ease, color .4s ease; }
    .papers-title{ height:3.2vh; font-size:clamp(.85rem, 1.25vw, 1.15rem); justify-content:center; }
    .papers-abstract{ height:4.6vh; margin:0 1.2vw; justify-content:center; }
    .papers-h{ height:2vh; width:60%; }
    .papers-text{ flex:1 1 0; min-height:1.2vh; }
    .papers-fig{ height:6vh; margin:0 2vw; justify-content:center; }
    .papers-proof{ height:4vh; justify-content:center; }
    .papers-read.papers-blk, .papers-sw.papers-read{ background:var(--ink); color:#fff; }
    .papers-later.papers-blk, .papers-sw.papers-later{ background:#e8edf3; color:#94a3b8; }
    .papers-skip.papers-blk, .papers-sw.papers-skip{ background:repeating-linear-gradient(135deg, #fff 0 5px, #cbd5e1 5px 7px); color:var(--mute);
      border:1px dashed #94a3b8; }
    .papers-sw{ display:inline-block; width:1.1em; height:1.1em; border-radius:3px; vertical-align:-.15em; margin:0 .35em 0 1.2em; }
    .papers-key{ position:absolute; left:6vw; bottom:9.5vh; color:var(--mute); }
    .papers-key .papers-sw:first-child{ margin-left:0; }
    .papers-passes{ display:flex; flex-direction:column; gap:2vh; }
    .papers-pass{ display:grid; grid-template-columns:auto 1fr; gap:1.2vw; align-items:start; font-size:clamp(1.3rem, 2.1vw, 1.9rem); line-height:1.3; }
    .papers-n{ width:1.7em; height:1.7em; border-radius:50%; border:2px solid var(--ink); display:flex; align-items:center; justify-content:center; font-weight:700; }
    .papers-resp{ margin-top:1vh; padding:1.2vh 1.2vw; border-left:4px solid var(--ink); background:#f8fafc; border-radius:0 8px 8px 0;
      font-size:clamp(1.2rem, 1.9vw, 1.7rem); }
  </style>
`, { notes: [
  "(draft) How to read a research paper efficiently. One method we like has three passes, from S. Keshav.",
  "(draft) Pass one, five to ten minutes: read the title, the abstract and the introduction, the section headings, and the conclusions. Skip everything else. You should know what kind of paper it is and what it claims. Often that is enough to decide whether to read on.",
  "(draft) Pass two, up to an hour for an experienced reader: read carefully, look hard at the figures, and follow the argument, but skip details like proofs.",
  "(draft) Pass three, for the papers that matter most to you: virtually re-implement the paper, making the same assumptions as the authors, and see where you would have done something different.",
  "(draft) Each daily response paper starts with one high-level question about the day's paper. You write it by hand, in the first few minutes of class, so there is nothing to submit online. A good second pass is enough for that."
]});

/* Pizlo, with today's lab as the picture: one image (our box world, cropped from simple-system/world.png), the
   many scenes that fit it (a schematic: three boxes on one line of sight, sized to fill the same two rays), then
   the constraints the system brings and the one scene it recovers (simple-system/recovered-front.png). That the
   missing information comes from a priori constraints is from Pizlo's own list of contributions; the slide says
   nothing else about the paper. */
const rays = (() => {
  const cx = 20, cy = 110, k = 0.28;                                   // eye, and the rays' slope
  const box = (x, s) => { const h = k * (x - cx); return `<rect x="${x}" y="${cy - h}" width="${s}" height="${2 * h}" rx="3"/>`; };
  return `<svg class="papers-rays" viewBox="0 0 340 220" aria-hidden="true">
    <line x1="${cx}" y1="${cy}" x2="335" y2="${cy - k * 315}"/><line x1="${cx}" y1="${cy}" x2="335" y2="${cy + k * 315}"/>
    <line class="papers-plane" x1="55" y1="${cy - 22}" x2="55" y2="${cy + 22}"/>
    <g class="papers-boxes">${box(105, 14)}${box(185, 24)}${box(280, 36)}</g>
    <circle cx="${cx}" cy="${cy}" r="7"/>
    <text x="55" y="${cy + 44}">image</text><text x="${cx}" y="${cy - 16}">eye</text>
  </svg>`; })();
st(`
  <h1 class="t">Perception as an inverse problem</h1>
  <div class="label papers-outcome"><b>By the end, you can</b> · discuss a paper: perception as an inverse problem</div>
  <div class="lead b" data-step="1">Pizlo, Vision Research, 2001</div>
  <div class="papers-inv">
    <div class="papers-q b" data-step="2"><span class="papers-n">1</span>Why is perception an inverse problem?</div>
    <div class="papers-q b" data-step="3"><span class="papers-n">2</span>Where does the missing information come from?</div>
    <div class="papers-q b" data-step="4"><span class="papers-n">3</span>Which constraints did our simple system use?</div>
    <figure class="papers-cell b" data-step="2"><img src="assets/research/world-crop.png" alt=""><figcaption class="label">One image</figcaption></figure>
    <div class="papers-arrow b" data-step="2">→</div>
    <figure class="papers-cell b" data-step="2">${rays}<figcaption class="label">Many 3D scenes fit it</figcaption></figure>
    <div class="papers-arrow b" data-step="3">→</div>
    <figure class="papers-cell b" data-step="3"><div class="papers-con"><b>+ constraints</b><span class="label">brought a priori</span>
      <span class="papers-ours b" data-step="4">Ours: ?</span></div><figcaption class="label">&nbsp;</figcaption></figure>
    <div class="papers-arrow b" data-step="3">→</div>
    <figure class="papers-cell b" data-step="3"><img src="assets/simple-system/recovered-front.png" alt=""><figcaption class="label">One 3D scene</figcaption></figure>
  </div>
  ${cite('Z. Pizlo, Perception viewed as an inverse problem, Vision Research 41, 3145–3161, 2001 · Images: our simple vision system lab')}
  <style>
    .papers-inv{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1.1fr auto 1.3fr auto .8fr auto 1.1fr;
      grid-template-rows:auto auto auto 1fr; gap:1vh 1vw; align-items:center; }
    .papers-q{ grid-column:1 / -1; font-size:clamp(1.3rem, 2.1vw, 1.9rem); display:flex; align-items:center; gap:1vw; }
    .papers-q .papers-n{ font-size:.8em; flex:0 0 auto; }
    .papers-cell{ min-height:0; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:.8vh; }
    .papers-cell img, .papers-rays{ width:100%; max-height:26vh; object-fit:contain; }
    .papers-cell img{ border-radius:6px; }
    .papers-cell figcaption{ font-weight:700; text-align:center; }
    .papers-arrow{ font-size:clamp(1.6rem, 2.6vw, 2.4rem); color:var(--mute); }
    .papers-rays line{ stroke:var(--mute); stroke-width:1.5; stroke-dasharray:5 4; }
    .papers-rays .papers-plane{ stroke:var(--ink); stroke-width:3; stroke-dasharray:none; }
    .papers-rays rect{ fill:none; stroke:var(--ink); stroke-width:2.5; }
    .papers-rays circle{ fill:var(--ink); }
    .papers-rays text{ font:17px var(--font); fill:var(--mute); text-anchor:middle; }
    .papers-con{ width:100%; border:2px solid var(--ink); border-radius:14px; padding:2vh .8vw; display:flex; flex-direction:column; align-items:center; gap:.6vh;
      text-align:center; font-size:clamp(1.1rem, 1.7vw, 1.5rem); }
    .papers-ours{ margin-top:.6vh; padding:.3vh .8vw; border:1.5px dashed var(--ink); border-radius:8px; font-weight:700; }
  </style>
`, { notes: [
  "(draft) Now the paper you read.",
  "(draft) Zygmunt Pizlo, Perception viewed as an inverse problem, in Vision Research, 2001.",
  "(draft) First question, in pairs: why is perception an inverse problem? Think back to Day 1's line drawing that fits infinitely many 3D shapes. Here is our own box world: one image, and along each line of sight a small near box, or a bigger one further away, would make the same picture.",
  "(draft) Second: if the image is not enough, where does the missing information come from? Pizlo argues that constraints the visual system brings, a priori, matter at least as much as the image itself. With them, one image gives one 3D scene, like the one our system recovered today.",
  "(draft) Third: which constraints did our simple vision system use today? Flat floor, objects resting on it, generic view, flat faces. And what happened to the floating box?"
]});
}
