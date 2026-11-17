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

  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .d12-cards, .d12-qs{ grid-template-columns:1fr; }
    .d12-table{ grid-template-columns:1fr; } .d12-table .d12-head:first-child{ display:none; }
  }
`;
  document.head.appendChild(el);
})();
