/* Day 12 helpers (owner: Shreya). Class names carry the d12- prefix. */
(() => {
  const el = document.createElement('style'); el.id = 'd12-style';
  el.textContent = `
  .d12-col{ display:flex; flex-direction:column; gap:3vh; flex:1 1 auto; min-height:0; justify-content:center; width:100%; max-width:182vh; margin-inline:auto; }
  .d12-callout{ font-size:clamp(1.2rem, 2.1vw, 1.9rem); line-height:1.35; border-left:6px solid var(--ink); padding:.4vh 1.2vw; }
  .d12-small{ font-size:clamp(.95rem, 1.4vw, 1.3rem); color:var(--mute); }

  /* cards in a row: three paths, two readings */
  .d12-cards{ display:grid; grid-template-columns:repeat(var(--n, 3), minmax(0,1fr)); gap:2vw; }
  .d12-card{ border:2px solid var(--ink); border-radius:14px; padding:2vh 1.5vw; display:flex; flex-direction:column; gap:1vh; }
  .d12-card small{ font-size:clamp(.9rem, 1.25vw, 1.2rem); text-transform:uppercase; letter-spacing:.08em; color:var(--mute); }
  .d12-card b{ font-size:clamp(1.3rem, 2.2vw, 2rem); line-height:1.2; }
  .d12-card span{ font-size:clamp(1rem, 1.6vw, 1.5rem); line-height:1.35; }
  .d12-card a{ color:var(--ink); font-size:clamp(.9rem, 1.3vw, 1.25rem); word-break:break-all; }

  /* a plain list, one line per click */
  .d12-list{ margin:0 auto; padding-left:1.4em; display:flex; flex-direction:column; gap:2.4vh; max-width:52em; }
  .d12-list > li{ font-size:clamp(1.3rem, 2.3vw, 2.1rem); line-height:1.3; }

  /* compounding errors: the demonstrated path, then the robot drifting away from it */
  .d12-drift{ width:100%; max-height:52vh; display:block; }
  .d12-drift .d12-path{ fill:none; stroke-width:6; stroke-linecap:round; }
  .d12-drift .d12-demo{ stroke:#94a3b8; stroke-dasharray:14 12; }
  .d12-drift .d12-robot{ stroke:var(--ink); stroke-dasharray:1 1; stroke-dashoffset:1; transition:stroke-dashoffset 1.6s ease; }
  .d12-drift .shown .d12-robot{ stroke-dashoffset:0; }
  .d12-drift text{ font:600 22px system-ui, sans-serif; fill:var(--ink); }
  .d12-drift .d12-mute{ fill:#64748b; font-weight:400; }

  /* reading questions */
  .d12-qs{ counter-reset:q; display:grid; grid-template-columns:1fr 1fr; gap:1.6vh 2.4vw; }
  .d12-qs > div{ font-size:clamp(1.1rem, 1.9vw, 1.75rem); line-height:1.3; padding-left:2.2em; position:relative; }
  .d12-qs > div::before{ counter-increment:q; content:counter(q); position:absolute; left:0; top:-.05em; width:1.5em; height:1.5em;
    border-radius:50%; border:2px solid var(--ink); display:grid; place-items:center; font-weight:700; font-size:.85em; }

  /* side-by-side table, one row per click */
  .d12-table{ display:grid; grid-template-columns:minmax(9em, .7fr) 1fr 1fr; column-gap:2vw; }
  .d12-table > .d12-row{ display:contents; }
  .d12-table .d12-cell{ padding:1.3vh 0; border-top:2px solid var(--line); font-size:clamp(1rem, 1.6vw, 1.5rem); line-height:1.3; }
  .d12-table .d12-head{ font-weight:700; font-size:clamp(1.15rem, 1.9vw, 1.75rem); border-top:none; }
  .d12-table .d12-key{ font-weight:700; color:var(--mute); }
  .d12-table > .d12-row.b:not(.shown) .d12-cell{ opacity:0; }
  .d12-table > .d12-row .d12-cell{ transition:opacity .4s ease; }

  /* a person's path: logo steps joined by arrows, one per click */
  .d12-route{ display:grid; grid-template-columns:1fr auto 1fr auto 1fr; gap:1.4vw; align-items:stretch; }
  .d12-step{ display:flex; flex-direction:column; gap:1.2vh; border-top:5px solid var(--ink); padding-top:1.6vh; }
  .d12-logos{ height:clamp(3rem, 10vh, 6rem); display:flex; align-items:center; gap:1.4vw; }
  .d12-logos img{ height:100%; width:auto; min-width:0; max-width:100%; object-fit:contain; object-position:left center; filter:grayscale(1) brightness(.35); }
  .d12-logos img + img{ max-width:42%; }
  .d12-logos img:has(+ img){ max-width:52%; }
  .d12-logos img.d12-wide{ height:62%; }
  .d12-word{ font-weight:700; font-size:clamp(1.3rem, 2.3vw, 2.1rem); line-height:1.1; }
  .d12-step i{ font-style:normal; font-weight:700; color:var(--mute); font-size:clamp(1rem, 1.5vw, 1.4rem); }
  .d12-step b{ font-size:clamp(1.25rem, 2.1vw, 1.95rem); line-height:1.2; }
  .d12-step span{ font-size:clamp(1rem, 1.6vw, 1.5rem); line-height:1.35; }
  .d12-arrow{ align-self:center; font-size:clamp(1.8rem, 3vw, 2.8rem); color:var(--mute); }

  /* photo on the left, the path on the right */
  .d12-person{ display:grid; grid-template-columns:minmax(0,.85fr) minmax(0,2.2fr); gap:2.4vw; align-items:center; }
  .d12-photo{ margin:0; } .d12-photo img{ width:100%; aspect-ratio:3 / 4; object-fit:cover; object-position:62% 30%; border-radius:12px; display:block; }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){ .d12-person{ grid-template-columns:1fr; } .d12-photo img{ aspect-ratio:3 / 2; } }

  /* blog breakdown: a loop of steps, then result cards */
  .d12-loop{ display:grid; grid-template-columns:repeat(var(--n, 4), minmax(0,1fr)); gap:1.2vw; }
  .d12-loop > div{ border:2px solid var(--ink); border-radius:12px; padding:1.4vh 1vw; display:flex; flex-direction:column; gap:.6vh; position:relative; }
  .d12-loop small{ font-size:clamp(.85rem, 1.2vw, 1.15rem); text-transform:uppercase; letter-spacing:.06em; color:var(--mute); }
  .d12-loop b{ font-size:clamp(1.15rem, 1.95vw, 1.8rem); line-height:1.2; }
  .d12-loop span{ font-size:clamp(.95rem, 1.45vw, 1.35rem); line-height:1.3; }
  .d12-back{ text-align:right; font-size:clamp(.95rem, 1.45vw, 1.35rem); color:var(--mute); margin-top:-1.4vh; }
  .d12-nums{ display:grid; grid-template-columns:repeat(var(--n, 2), minmax(0,1fr)); gap:2vw; }
  .d12-num{ border-left:6px solid var(--ink); padding:.4vh 1.2vw; display:flex; flex-direction:column; gap:.6vh; }
  .d12-num b{ font-size:clamp(1.6rem, 3vw, 2.8rem); line-height:1.1; font-variant-numeric:tabular-nums; }
  .d12-num span{ font-size:clamp(1rem, 1.55vw, 1.45rem); line-height:1.3; }

  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .d12-route, .d12-loop, .d12-nums{ grid-template-columns:1fr; } .d12-arrow{ display:none; }
    .d12-cards, .d12-qs{ grid-template-columns:1fr; }
    .d12-table{ grid-template-columns:1fr; } .d12-table .d12-head:first-child{ display:none; }
  }
`;
  document.head.appendChild(el);
})();

/* path steps for the two people slides */
const d12Step = (logos, when, what, more) => `
  <div class="d12-step b">
    <div class="d12-logos">${logos}</div>
    <i>${when}</i><b>${what}</b><span>${more}</span>
  </div>`;
const d12Img = (n, alt, wide) => `<img src="assets/logo-${n}.svg" alt="${alt}"${wide ? ' class="d12-wide"' : ''}>`;
(() => { const el = document.createElement('style'); el.textContent = `
  .d12-why{ display:grid; grid-template-columns:minmax(0,1.1fr) minmax(0,1fr); gap:2.6vw; align-items:center; }
  .d12-why .d12-list{ margin:0; gap:2vh; }
  .d12-why .d12-list > li{ font-size:clamp(1.1rem, 1.9vw, 1.75rem); }
  .d12-photo2{ margin:0; } .d12-photo2 img{ width:100%; aspect-ratio:4 / 3; object-fit:cover; object-position:50% 40%; border-radius:12px; display:block; }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){ .d12-why{ grid-template-columns:1fr; } }
`; document.head.appendChild(el); })();

/* Videos from the blog posts, streamed from the companies' sites (not copied into the repo). Muted and looping; they
   play only while shown on the active slide, and restart from the beginning each time. */
const d12Vid = (src, poster) => `<video class="d12-vid" src="${src}"${poster ? ` poster="${poster}"` : ''} muted loop playsinline preload="metadata"></video>`;
(function(){
  const sync = () => document.querySelectorAll('video.d12-vid').forEach(v => {
    const slide = v.closest('.slide'), b = v.closest('.b');
    const on = slide && slide.classList.contains('active') && (!b || b.classList.contains('shown'));
    if (on && v.paused && !v._d12on) { v._d12on = true; v.currentTime = 0; v.play().catch(() => {}); }
    else if (!on && v._d12on) { v._d12on = false; v.pause(); }
  });
  new MutationObserver(sync).observe(document.documentElement, { subtree:true, attributes:true, attributeFilter:['class'] });
})();
(() => { const el = document.createElement('style'); el.textContent = `
  .d12-vid{ width:100%; aspect-ratio:16 / 9; object-fit:cover; border-radius:10px; background:#0f172a; display:block; }
  .d12-loop .d12-vid{ height:20vh; aspect-ratio:auto; margin-bottom:.4vh; }
  .d12-media{ display:grid; grid-template-columns:1fr 1fr; gap:2.4vw; }
  .d12-mpair{ display:grid; grid-template-columns:minmax(0,1.15fr) minmax(0,1fr); gap:1.2vw; align-items:center; }
  .d12-mpair .d12-vid{ height:22vh; aspect-ratio:auto; }
  .d12-vid.d12-contain{ object-fit:contain; }
  .d12-mpair .d12-num b{ font-size:clamp(1.2rem, 2.1vw, 2rem); white-space:nowrap; }
  .d12-mpair .d12-num span{ font-size:clamp(.9rem, 1.35vw, 1.25rem); }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){ .d12-media, .d12-mpair{ grid-template-columns:1fr; } }
`; document.head.appendChild(el); })();

/* Architecture slides: Walden's animated figure restarts each time it is shown; the redrawn RECAP diagram. */
(function(){
  let n = 0;
  const sync = () => document.querySelectorAll('img.d12-anim').forEach(img => {
    const slide = img.closest('.slide'), b = img.closest('.b');
    const on = slide && slide.classList.contains('active') && (!b || b.classList.contains('shown'));
    if (on && !img._d12on) { img._d12on = true; img.src = img.src.split('?')[0] + '?r=' + (++n); }
    else if (!on) img._d12on = false;
  });
  new MutationObserver(sync).observe(document.documentElement, { subtree:true, attributes:true, attributeFilter:['class'] });
})();
(() => { const el = document.createElement('style'); el.textContent = `
  .d12-arch{ margin:0 auto; width:100%; display:flex; justify-content:center; }
  .d12-arch img{ width:100%; max-height:64vh; object-fit:contain; display:block; }
  .d12-recap{ width:100%; max-height:64vh; display:block; }
  .d12-abox{ fill:#fff; stroke:#0f172a; stroke-width:2.5; }
  .d12-abox.d12-adark{ fill:#0f172a; }
  .d12-adark + text, .d12-adark + text + text{ fill:#fff; }
  .d12-at{ font:700 24px system-ui, sans-serif; fill:#0f172a; }
  .d12-as{ font:400 18px system-ui, sans-serif; fill:#64748b; }
  .d12-aline{ fill:none; stroke:#0f172a; stroke-width:3; }
`; document.head.appendChild(el); })();

/* ---------- ML in Industry (2026-11-18): helpers for the bullet and table slides ---------- */
/* A titled list, one bullet per click, an optional takeaway line, an optional credit. */
const d12Bul = (title, items, take, src) => st(`
  <h1 class="t">${title}</h1>
  <div class="d12-col">
    <ul class="d12-list">${items.map(t => `<li class="b">${t}</li>`).join('')}</ul>
    ${take ? `<div class="d12-callout b">${take}</div>` : ''}
  </div>
  ${src ? cite(src) : ''}
`);
/* A comparison table, one row per click. head = column titles (first may be ''), rows = arrays of cells. */
const d12Tab = (head, rows, cls = '') => `
  <div class="d12-table ${cls}" style="grid-template-columns:minmax(8em,.75fr) repeat(${head.length - 1}, minmax(0,1fr))">
    ${head.map(h => `<div class="d12-cell d12-head">${h}</div>`).join('')}
    ${rows.map(r => `<div class="d12-row b">${r.map((c, i) => `<div class="d12-cell${i ? '' : ' d12-key'}">${c}</div>`).join('')}</div>`).join('')}
  </div>`;
(() => { const el = document.createElement('style'); el.textContent = `
  .d12-table.d12-dense .d12-cell{ font-size:clamp(.9rem, 1.35vw, 1.3rem); padding:1vh 0; }
  .d12-table.d12-dense .d12-head{ font-size:clamp(1rem, 1.55vw, 1.45rem); }
  .d12-q{ font-weight:700; font-size:clamp(2rem, 4vw, 3.6rem); line-height:1.2; text-align:center; max-width:22em; }
  .d12-two{ display:grid; grid-template-columns:1fr 1fr; gap:3vw; }
  .d12-two > div{ border-top:5px solid var(--ink); padding-top:1.4vh; display:flex; flex-direction:column; gap:1.2vh; }
  .d12-two h2{ margin:0; font-size:clamp(1.3rem, 2.2vw, 2rem); }
  .d12-two ul{ margin:0; padding-left:1.2em; display:flex; flex-direction:column; gap:1.2vh; }
  .d12-two li{ font-size:clamp(1.1rem, 1.9vw, 1.75rem); line-height:1.3; }
  /* the lifecycle loop */
  .d12-cycle{ width:100%; max-height:64vh; display:block; }
  .d12-cycle .d12-cnode{ fill:#fff; stroke:#0f172a; stroke-width:2.5; }
  .d12-cycle .d12-ct{ font:700 22px system-ui, sans-serif; fill:#0f172a; }
  .d12-cycle .d12-cs{ font:400 16px system-ui, sans-serif; fill:#64748b; }
  .d12-cycle .d12-carrow{ fill:none; stroke:#0f172a; stroke-width:2.5; }
  .d12-cycle .d12-center{ font:700 26px system-ui, sans-serif; fill:#0f172a; }
  /* roles along an axis */
  .d12-axis{ display:flex; justify-content:space-between; align-items:center; gap:1vw; font-size:clamp(.95rem, 1.45vw, 1.35rem); color:var(--mute); font-weight:700; }
  .d12-axis i{ flex:1; height:3px; background:var(--mute); position:relative; }
  .d12-axis i::before, .d12-axis i::after{ content:''; position:absolute; top:-6px; border:7px solid transparent; }
  .d12-axis i::before{ left:-7px; border-right-color:var(--mute); border-left:none; }
  .d12-axis i::after{ right:-7px; border-left-color:var(--mute); border-right:none; }
  .d12-roles{ display:grid; grid-template-columns:repeat(6, minmax(0,1fr)); gap:1vw; }
  .d12-role{ border:2px solid var(--ink); border-radius:12px; padding:1.4vh .8vw; display:flex; flex-direction:column; gap:.8vh; }
  .d12-role b{ font-size:clamp(1.05rem, 1.7vw, 1.6rem); line-height:1.15; }
  .d12-role small{ font-size:clamp(.75rem, 1.05vw, 1rem); text-transform:uppercase; letter-spacing:.06em; color:var(--mute); margin-top:.4vh; }
  .d12-role span{ font-size:clamp(.88rem, 1.3vw, 1.22rem); line-height:1.3; }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){ .d12-two, .d12-roles{ grid-template-columns:1fr; } }
`; document.head.appendChild(el); })();
