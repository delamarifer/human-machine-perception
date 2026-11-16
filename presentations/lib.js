/* Final presentations helpers (owner: Shreya). Class names carry the pr- prefix. */
(() => {
  const el = document.createElement('style'); el.id = 'pr-style';
  el.textContent = `
  .pr-col{ display:flex; flex-direction:column; gap:2.4vh; flex:1 1 auto; min-height:0; justify-content:center; }
  .pr-list{ margin:0 auto; padding-left:1.4em; display:flex; flex-direction:column; gap:2.2vh; max-width:48em; }
  .pr-list > li{ font-size:clamp(1.31rem, 2.4vw, 2.2rem); line-height:1.3; }
  .pr-list a{ color:inherit; font-weight:700; }
  .pr-sub{ display:block; font-size:.72em; color:var(--mute); margin-top:.3vh; }
  .pr-todo{ display:inline-block; border:2px dashed var(--mute); border-radius:8px; padding:.1em .5em; color:var(--mute); font-size:.85em; }

  /* cards: the two things you hand in */
  .pr-cards{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:2vw; max-width:72em; margin:0 auto; width:100%; }
  .pr-card{ border:2px solid var(--ink); border-radius:14px; padding:2.6vh 1.8vw; display:flex; flex-direction:column; gap:1vh; }
  .pr-card small{ font-size:clamp(.95rem, 1.3vw, 1.25rem); text-transform:uppercase; letter-spacing:.08em; color:var(--mute); }
  .pr-card b{ font-size:clamp(1.6rem, 2.8vw, 2.6rem); line-height:1.15; }
  .pr-card span{ font-size:clamp(1.1rem, 1.7vw, 1.6rem); line-height:1.3; }
  .pr-big{ font-size:clamp(2.4rem, 5vw, 4.4rem); font-weight:700; line-height:1; }

  /* numbered outline: step, then its cue */
  .pr-steps{ list-style:none; margin:0 auto; padding:0; display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:2.2vh 1.6vw; width:100%; }
  .pr-steps > li{ border-top:6px solid var(--ink); padding-top:1.2vh; display:flex; flex-direction:column; gap:.6vh; }
  .pr-steps b{ font-size:clamp(1.3rem, 2.3vw, 2.1rem); line-height:1.15; }
  .pr-steps b em{ font-style:normal; font-weight:400; color:var(--mute); margin-right:.3em; }
  .pr-steps span{ font-size:clamp(1rem, 1.55vw, 1.45rem); line-height:1.3; color:var(--mute); }
  .pr-w{ float:right; font-weight:700; color:var(--ink); font-size:.8em; }

  /* tables: weights, and the two tracks side by side */
  .pr-tbl{ width:100%; max-width:62em; margin:0 auto; border-collapse:collapse; font-size:clamp(1.05rem, 1.8vw, 1.65rem); line-height:1.3; }
  .pr-tbl th{ text-align:left; padding:.7vh .8vw; border-bottom:2px solid var(--ink); }
  .pr-tbl td{ padding:1vh .8vw; border-bottom:1px solid var(--line); vertical-align:top; }
  .pr-tbl td:first-child{ font-weight:700; }
  .pr-tbl tr.b{ transform:none; }
  .pr-num{ text-align:right; white-space:nowrap; font-weight:700; width:5em; }
  .pr-bar{ height:1.1em; background:var(--accent); border-radius:4px; }
  .pr-total td{ border-bottom:none; border-top:2px solid var(--ink); }

  /* examples: a paper mapped onto the write-up parts */
  .pr-ex{ display:grid; grid-template-columns:minmax(9em, .9fr) 3fr; gap:1.6vh 1.6vw; max-width:64em; margin:0 auto; width:100%; }
  .pr-ex > div{ font-size:clamp(1.05rem, 1.8vw, 1.65rem); line-height:1.3; }
  .pr-ex > .pr-part{ font-weight:700; border-left:5px solid var(--ink); padding-left:.7vw; }
  .pr-ask{ font-style:italic; }
  /* an example paper embedded beside its parts */
  .pr-paperwrap{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1.25fr); gap:2.4vw; align-items:center; }
  .pr-paperwrap .pr-ex{ grid-column:2; grid-row:1; grid-template-columns:minmax(7em,.7fr) 3fr; gap:1.3vh 1.2vw; }
  .pr-paperwrap .pr-ex > div{ font-size:clamp(.95rem, 1.5vw, 1.4rem); }
  .pr-paper{ grid-column:1; grid-row:1; display:flex; flex-direction:column; gap:.6vh; align-items:center; }
  .pr-paper iframe{ width:100%; height:64vh; border:1px solid var(--line); border-radius:8px; background:#fff; }
  .pr-paper a{ font-size:clamp(.9rem, 1.2vw, 1.1rem); color:var(--mute); }
  `;
  document.head.appendChild(el);
})();
