/* Day 13 helpers (owner: Shreya). Class names carry the d13- prefix. Grays only: no new colors enter the deck. */
(() => {
  const el = document.createElement('style'); el.id = 'd13-style';
  el.textContent = `
  .d13-col{ display:flex; flex-direction:column; gap:3vh; flex:1 1 auto; min-height:0; justify-content:center; width:100%; max-width:182vh; margin-inline:auto; }
  .d13-callout{ font-size:clamp(1.2rem, 2.1vw, 1.9rem); line-height:1.35; border-left:6px solid var(--ink); padding:.4vh 1.2vw; }
  .d13-ask{ font-size:clamp(1.15rem, 1.9vw, 1.8rem); line-height:1.3; font-weight:700; text-align:center; }
  .d13-small{ font-size:clamp(.95rem, 1.4vw, 1.3rem); color:var(--mute); }

  /* cards in a row */
  .d13-cards{ display:grid; grid-template-columns:repeat(var(--n, 3), minmax(0,1fr)); gap:2vw; }
  .d13-card{ border:2px solid var(--ink); border-radius:14px; padding:2vh 1.5vw; display:flex; flex-direction:column; gap:1.2vh; }
  .d13-card > b{ font-size:clamp(1.3rem, 2.2vw, 2rem); line-height:1.2; }
  .d13-card small{ font-size:clamp(.85rem, 1.2vw, 1.15rem); text-transform:uppercase; letter-spacing:.08em; color:var(--mute); font-weight:700; }
  .d13-card > span{ font-size:clamp(1rem, 1.6vw, 1.5rem); line-height:1.35; }
  .d13-card .d13-eg{ margin-top:auto; padding-top:1vh; border-top:2px solid var(--line); font-style:italic; }
  .d13-card .katex{ font-size:1em; }
  .d13-card .d13-math{ margin:auto 0; padding:1vh 0; font-size:clamp(1.5rem, 2.9vw, 2.7rem); }

  /* math */
  .d13-math{ font-size:clamp(1.3rem, 2.4vw, 2.2rem); text-align:center; }
  .d13-math .katex-display{ margin:.2em 0; }
  .d13-words{ font-size:clamp(1.15rem, 2vw, 1.85rem); line-height:1.35; text-align:center; max-width:40em; margin:0 auto; }
  .d13-words .katex{ font-size:1em; }

  /* diagram on the left, definitions on the right */
  .d13-split{ display:grid; grid-template-columns:minmax(0,1.05fr) minmax(0,1fr); gap:2.6vw; align-items:center; }
  .d13-defs{ display:flex; flex-direction:column; gap:1.5vh; margin:0; padding:0; list-style:none; }
  .d13-defs li{ font-size:clamp(1rem, 1.7vw, 1.6rem); line-height:1.3; display:grid; grid-template-columns:7.2em 1fr; gap:1em; }

  .d13-svg{ width:100%; max-height:60vh; display:block; }
  .d13-svg .d13-box{ fill:#fff; stroke:#0f172a; stroke-width:3; }
  .d13-svg .d13-dark{ fill:#0f172a; }
  .d13-svg .d13-soft{ fill:#e2e8f0; stroke:none; }
  .d13-svg .d13-line{ fill:none; stroke:#0f172a; stroke-width:3.5; }
  .d13-svg .d13-dash{ fill:none; stroke:#64748b; stroke-width:3; stroke-dasharray:8 7; }
  .d13-svg text{ font:400 24px system-ui, sans-serif; fill:#0f172a; }
  .d13-svg .d13-t{ font-weight:700; font-size:28px; }
  .d13-svg .d13-m{ fill:#64748b; font-size:21px; }
  .d13-svg .d13-i{ font-style:italic; font-family:'KaTeX_Math', 'Times New Roman', serif; font-size:27px; }
  .d13-svg .d13-w{ fill:#fff; }

  .d13-tight{ gap:1.6vh; }
  .d13-tight .d13-math{ font-size:clamp(1.1rem, 2vw, 1.85rem); }
  .d13-tight .d13-bars{ height:13vh; }

  /* bars (weights, Q-values) */
  .d13-bars{ display:flex; align-items:flex-end; justify-content:center; gap:1.6vw; height:22vh; }
  .d13-bars > div{ display:flex; flex-direction:column; align-items:center; gap:.6vh; height:100%; justify-content:flex-end; }
  .d13-bars i{ display:block; width:clamp(1.6rem, 3.4vw, 3.6rem); background:#94a3b8; border-radius:4px 4px 0 0; }
  .d13-bars .d13-top i{ background:var(--ink); }
  .d13-bars span{ font-size:clamp(.9rem, 1.4vw, 1.3rem); color:var(--mute); white-space:nowrap; }
  .d13-bars .d13-top span{ color:var(--ink); font-weight:700; }
  .d13-bars .katex{ font-size:1em; }

  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .d13-cards, .d13-split{ grid-template-columns:1fr; }
  }
`;
  document.head.appendChild(el);
})();

/* KaTeX, rendered when the parts are built (katex.min.js loads before lib.js in deck.html). */
const d13Tex = (tex, display = true) => {
  try { return katex.renderToString(tex, { displayMode: display, throwOnError: false }); }
  catch (e) { return `<code>${tex}</code>`; }
};
const d13t = tex => d13Tex(tex, false);

/* SVG arrowhead, one per svg (ids must be unique in the page) */
const d13Head = id => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#0f172a"/></marker></defs>`;
