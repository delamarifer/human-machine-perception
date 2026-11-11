/* Day 8 helpers shared by every part (owner: Shreya). Loaded by deck.html before the parts,
   so any part can be previewed alone with ?only=<part>. Class names carry the d8- prefix. */
(() => {
  const el = document.createElement('style'); el.id = 'd8-style';
  el.textContent = `
  .d8-ph{ flex:0 1 auto; border:2px dashed #94a3b8; border-radius:10px; padding:1.4vh 1.2vw;
    color:var(--mute); font-size:clamp(.9rem, 1.35vw, 1.3rem); line-height:1.4; text-align:center; }
  .d8-eq{ background:#f1f5f9; border:1px solid #cbd5e1; border-left:4px solid var(--ink); border-radius:10px;
    padding:1.2vh 1.4vw; font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
    font-size:clamp(1.1rem, 2.3vw, 2.1rem); font-weight:600; color:#0f172a; line-height:1.45; }
  .d8-code{ background:#0f172a; color:#e2e8f0; border-radius:10px; padding:1.6vh 1.6vw; margin:0;
    font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;
    font-size:clamp(.85rem, 1.35vw, 1.25rem); line-height:1.5; white-space:pre; overflow:hidden; }
  .d8-col{ display:flex; flex-direction:column; gap:2.2vh; flex:1 1 auto; min-height:0; justify-content:center; }
  .d8-cite{ font-size:clamp(.8rem, 1.12vw, 1.15rem); color:var(--mute); }
  /* entrance motions for the Google deck's own images: slide in from the side, or zoom in */
  .d8-from-left{ transform:translateX(-4vw); }
  .d8-from-right{ transform:translateX(4vw); }
  .d8-zoom{ transform:scale(.94); }
  .d8-from-left.shown, .d8-from-right.shown, .d8-zoom.shown{ transform:none; }
  /* a stack of images in one place: each new one covers the previous ones */
  .d8-stack{ position:relative; width:100%; height:42vh; flex:0 0 auto; }
  .d8-stack > .d8-f{ position:absolute; left:0; top:0; width:100%; height:100%; object-fit:contain; }
  .d8-stack > .d8-f:has(~ .d8-f.shown){ opacity:0 !important; }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){ .d8-stack{ height:30vh; } }
  /* reveal figures (d8Fig): covers, a wipe and a moving ring, on the Google deck's own images */
  .d8-figw{ display:flex; align-items:center; justify-content:center; min-width:0; min-height:0; }
  .fw .cov.d8-k{ background:#000; }                                   /* black cover, for images on black */
  .fw .cov.d8-peach{ background:rgb(252,232,212); }                   /* the lecture screenshots' background, sampled by script */
  .fw .cov.d8-wipe.b{ opacity:1; transform:none; transform-origin:right center; transition:none; }   /* stepping back resets at once */
  .fw .cov.d8-wipe.b.shown{ opacity:1; transform:scaleX(0); transition:transform 2.4s linear; }   /* reveals left to right, like a curve being drawn */
  .fw .ring.d8-one:has(~ .ring.d8-one.shown){ opacity:0 !important; } /* only the newest ring shows */
  .d8-capstack{ position:relative; height:1.6em; width:100%; text-align:center; }
  .d8-capstack > .d8-cap{ position:absolute; left:0; right:0; top:0; }
  .d8-capstack > .d8-cap:has(~ .d8-cap.shown){ opacity:0 !important; }
  .d8-math{ text-align:center; font-size:clamp(1.1rem, 2.1vw, 1.9rem); }
  .d8-math .katex-display{ margin:.4em 0; }
  .d8-math .label{ font-size:clamp(.85rem, 1.25vw, 1.15rem); }
  .d8-img{ display:block; max-width:100%; max-height:40vh; width:auto; height:auto; margin:0 auto; object-fit:contain; }
  .d8-box{ border:2px solid var(--ink); border-radius:12px; padding:2.4vh 1.6vw; text-align:center;
    font-size:clamp(1rem, 1.7vw, 1.5rem); line-height:1.35; }
  .d8-cite a{ color:var(--mute); }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .d8-ph{ font-size:clamp(.8rem, 2.6vw, 1.1rem); }
    .d8-code{ font-size:clamp(.72rem, 2.4vw, 1rem); }
  }
`;
  document.head.appendChild(el);
})();

/* A visible placeholder for content that is not built yet (source or wording still to come). */
window.d8Ph = t => `<div class="d8-ph">${t}</div>`;

/* LaTeX math, rendered with KaTeX (loaded in deck.html). Falls back to the raw TeX if KaTeX did not load. */
window.d8Tex = (tex, display = false) => {
  try { return katex.renderToString(tex, {displayMode: display, throwOnError: false}); }
  catch (e) { return `<code>${tex}</code>`; }
};

/* A figure with reveal marks, like the engine's rfig but usable inside a stack or a grid cell.
   marks: [{r:[x, y, w, h] in image fractions (detected by script), k:'cov' | 'cov d8-k' | 'cov d8-wipe d8-k' | 'ring d8-one', step}]
   opts.cls / opts.step make the whole figure a build element (e.g. 'd8-f b' inside a .d8-stack). */
window.d8Fig = (src, ar, marks = [], o = {}) => `
  <div class="d8-figw ${o.cls || ''}" ${o.step != null ? `data-step="${o.step}"` : ''} style="${o.style || ''}">
    <div class="fw" data-ar="${ar}"><img src="${src}" alt="${o.alt || ''}">
      ${marks.map(m => { const [x, y, w, h] = m.r;
        return `<div class="${m.k || 'cov'} b" ${m.step != null ? `data-step="${m.step}"` : ''}
          style="left:${x * 100}%;top:${y * 100}%;width:${w * 100}%;height:${h * 100}%"></div>`; }).join('')}
    </div>
  </div>`;

/* Section title art (Shreya, 2026-11-11: make the model title slides more interesting). One small diagram per family,
   drawn for this deck: d8TitleArt('ae' | 'vae' | 'gan' | 'ar'). Generated data is salmon, real data green, the code z yellow. */
window.d8TitleArt = kind => {
  const A = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#0f172a" stroke-width="2.5" marker-end="url(#d8tA)"/>`;
  const T = (x, y, w, h, label, narrowLeft) => { const t = h * .28;
    const pts = narrowLeft ? `${x},${y + t} ${x + w},${y} ${x + w},${y + h} ${x},${y + h - t}` : `${x},${y} ${x + w},${y + t} ${x + w},${y + h - t} ${x},${y + h}`;
    return `<polygon points="${pts}" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/><text x="${x + w / 2}" y="${y + h / 2 + 6}" font-size="17" text-anchor="middle">${label}</text>`; };
  const I = (x, y, label, fill = '#fff') => `<rect x="${x}" y="${y}" width="64" height="64" rx="6" fill="${fill}" stroke="#0f172a" stroke-width="2"/>
    <path d="M${x + 10} ${y + 52} L${x + 26} ${y + 30} L${x + 38} ${y + 42} L${x + 46} ${y + 34} L${x + 56} ${y + 52} Z" fill="#94a3b8"/><circle cx="${x + 46}" cy="${y + 18}" r="6" fill="#cbd5e1"/>
    <text x="${x + 32}" y="${y + 86}" font-size="15" text-anchor="middle">${label}</text>`;
  const Z = (cx, cy, label) => `<circle cx="${cx}" cy="${cy}" r="24" fill="#fde68a" stroke="#0f172a" stroke-width="2.5"/><text x="${cx}" y="${cy + 7}" font-size="20" text-anchor="middle" font-style="italic">z</text>
    ${label ? `<text x="${cx}" y="${cy + 44}" font-size="14" text-anchor="middle">${label}</text>` : ''}`;
  const B = (x, y, w, label, fill = '#fff', fs = 18) => `<rect x="${x}" y="${y}" width="${w}" height="40" rx="7" fill="${fill}" stroke="#0f172a" stroke-width="2"/><text x="${x + w / 2}" y="${y + 26}" font-size="${fs}" text-anchor="middle">${label}</text>`;
  const defs = `<defs><marker id="d8tA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0f172a"/></marker></defs>`;
  let body = '';
  if (kind === 'ae') body = `${I(40, 58, 'image')}${A(108, 90, 146, 90)}${T(150, 50, 120, 80, 'encoder', false)}${A(274, 90, 318, 90)}${Z(346, 90, 'small code')}${A(374, 90, 418, 90)}${T(422, 50, 120, 80, 'decoder', true)}${A(546, 90, 584, 90)}${I(588, 58, 'rebuilt image')}`;
  if (kind === 'vae') body = `${I(20, 58, 'image')}${A(88, 90, 120, 90)}${T(124, 50, 110, 80, 'encoder', false)}${A(238, 80, 262, 70)}${A(238, 100, 262, 110)}
    ${B(266, 48, 44, '<tspan font-style="italic">μ</tspan>')}${B(266, 92, 44, '<tspan font-style="italic">σ</tspan>')}${A(314, 90, 340, 90)}
    <path d="M344 120 C 370 120, 372 56, 392 56 C 412 56, 414 120, 440 120" fill="#fde68a" stroke="#0f172a" stroke-width="2"/><circle cx="402" cy="96" r="6" fill="#0f172a"/>
    <text x="392" y="146" font-size="14" text-anchor="middle">sample z</text>${A(444, 90, 470, 90)}${T(474, 50, 110, 80, 'decoder', true)}${A(588, 90, 620, 90)}${I(624, 58, 'new image')}`;
  if (kind === 'gan') body = `${Z(50, 120, 'noise')}${A(78, 120, 116, 120)}${T(120, 80, 120, 80, 'generator', true)}${A(244, 120, 282, 120)}${I(286, 88, 'fake', '#f2a08a')}
    ${I(286, 0, 'real', '#86c58b')}<path d="M354 32 C 400 32, 410 80, 444 92" fill="none" stroke="#0f172a" stroke-width="2.5" marker-end="url(#d8tA)"/>
    <path d="M354 120 C 400 120, 410 110, 444 106" fill="none" stroke="#0f172a" stroke-width="2.5" marker-end="url(#d8tA)"/>
    ${T(448, 58, 130, 80, 'discriminator', false)}${A(582, 98, 616, 98)}<text x="622" y="104" font-size="17">real or fake?</text>`;
  if (kind === 'ar') body = `${['Once', 'upon', 'a'].map((w, i) => B(20 + i * 92, 70, 84, w, '#fff', 17)).join('')}${A(300, 90, 336, 90)}
    <rect x="340" y="62" width="130" height="56" rx="8" fill="#e2e8f0" stroke="#0f172a" stroke-width="2"/><text x="405" y="96" font-size="17" text-anchor="middle">predictor</text>${A(474, 90, 510, 90)}
    ${B(514, 70, 84, 'time', '#fde68a', 17)}<path d="M556 116 C 556 170, 160 170, 160 116" fill="none" stroke="#0f172a" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#d8tA)"/>
    <text x="358" y="182" font-size="14" text-anchor="middle">append it, predict the next one</text>`;
  return `<svg viewBox="0 0 760 200" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;display:block" aria-hidden="true">${defs}<g style="font-family:var(--font)">${body}</g></svg>`;
};
