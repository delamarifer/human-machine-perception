/* Day 9 helpers (owner: Shreya). Class names carry the d8l- prefix. */
(() => {
  const el = document.createElement('style'); el.id = 'd8l-style';
  el.textContent = `
  .d8l-col{ display:flex; flex-direction:column; gap:2.6vh; flex:1 1 auto; min-height:0; justify-content:center; }
  .d8l-q{ font-size:clamp(1.35rem, 2.9vw, 2.6rem); font-weight:600; line-height:1.3; text-align:center; max-width:30em; margin:0 auto; }
  .d8l-more{ display:flex; flex-direction:column; gap:1.6vh; max-width:44em; margin:0 auto; padding:0; list-style:none; }
  .d8l-more > li{ font-size:clamp(1rem, 1.85vw, 1.65rem); line-height:1.35; color:var(--mute); padding-left:1.1em; position:relative; }
  .d8l-more > li::before{ content:'→'; position:absolute; left:0; }
  .d8l-cards{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:1.6vw; align-items:stretch; }
  .d8l-card{ border:2px solid var(--ink); border-radius:12px; padding:2vh 1.2vw; display:flex; flex-direction:column; gap:1.1vh; min-width:0; }
  .d8l-card small{ font-size:clamp(.75rem, 1.05vw, 1rem); text-transform:uppercase; letter-spacing:.08em; color:var(--mute); }
  .d8l-card b{ font-size:clamp(1.05rem, 1.85vw, 1.7rem); line-height:1.2; }
  .d8l-card span{ font-size:clamp(.85rem, 1.3vw, 1.2rem); line-height:1.35; }
  .d8l-card a{ color:inherit; font-size:clamp(.85rem, 1.25vw, 1.15rem); margin-top:auto; }
  .d8l-list{ margin:0 auto; padding-left:1.4em; display:flex; flex-direction:column; gap:2vh; max-width:42em; }
  .d8l-list > li{ font-size:clamp(1.05rem, 2vw, 1.8rem); line-height:1.3; }
  .d8l-list a{ color:inherit; }
  .d8l-list .d8l-sub{ display:block; font-size:.72em; color:var(--mute); margin-top:.3vh; }
  .d8l-agenda{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:1.6vw; }
  .d8l-agenda > div{ border-top:6px solid var(--ink); padding-top:1.6vh; }
  .d8l-agenda b{ display:block; font-size:clamp(2rem, 4.4vw, 4rem); line-height:1; }
  .d8l-agenda span{ font-size:clamp(1rem, 1.9vw, 1.7rem); }
  .d8l-theories{ display:grid; grid-template-columns:repeat(2, minmax(0,1fr)); gap:1.6vh 1.6vw; }
  .d8l-theories .d8l-card{ padding:1.4vh 1.2vw; gap:.6vh; }
  .d8l-theories .d8l-card small{ text-transform:none; letter-spacing:0; }
  .d8l-card .d8l-for{ font-style:italic; }
  .d8l-vote{ text-align:center; font-size:clamp(1rem, 1.8vw, 1.6rem); color:var(--mute); }
  .d8l-claims{ margin:0 auto; padding:0; list-style:none; display:flex; flex-direction:column; gap:2.2vh; max-width:52em; width:100%; }
  .d8l-claims > li{ font-size:clamp(1.05rem, 1.95vw, 1.75rem); line-height:1.3; }
  .d8l-claims em{ display:block; padding-left:1.3em; font-style:normal; font-weight:700; font-size:.78em; margin-top:.3vh; }
  .d8l-tasks{ max-width:52em; }
  .d8l-tasks > li{ font-size:clamp(.95rem, 1.6vw, 1.45rem); }
  .d8l-form{ display:flex; align-items:center; justify-content:center; gap:4vw; }
  .d8l-form img{ height:30vh; width:auto; flex:0 0 auto; }
  .d8l-quote{ font-size:clamp(1.3rem, 2.6vw, 2.3rem); font-style:italic; text-align:center; }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .d8l-form{ flex-direction:column; }
    .d8l-cards, .d8l-agenda, .d8l-theories{ grid-template-columns:1fr; gap:1.4vh; }
  }
`;
  document.head.appendChild(el);
})();
