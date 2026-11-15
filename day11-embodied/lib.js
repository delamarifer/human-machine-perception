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

  /* common problems: six numbered cards, then the takeaway */
  .d11-probs{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:4.5vh 1.6vw; }
  .d11-prob{ border-top:6px solid var(--ink); padding-top:1.2vh; display:flex; flex-direction:column; gap:.6vh; }
  .d11-prob small{ font-size:clamp(.9rem, 1.3vw, 1.25rem); color:var(--mute); letter-spacing:.06em; }
  .d11-prob b{ font-size:clamp(1.3rem, 2.3vw, 2.1rem); line-height:1.15; }
  .d11-prob span{ font-size:clamp(1rem, 1.6vw, 1.5rem); line-height:1.3; }
  .d11-take{ text-align:center; font-size:clamp(1.5rem, 2.8vw, 2.6rem); font-weight:700; }

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
    busy = false;
  };
  new MutationObserver(sync).observe(document.documentElement, { subtree:true, attributes:true, attributeFilter:['class'] });
})();

/* Embedded videos: when a video is hidden again (going back, or leaving the slide), reload it so it stops playing. */
(function(){
  const sync = () => document.querySelectorAll('.d11-video').forEach(v => {
    const f = v.querySelector('iframe'); if (!f) return;
    const slide = v.closest('.slide');
    const on = v.classList.contains('shown') && slide && slide.classList.contains('active');
    if (on) f.dataset.live = '1';
    else if (f.dataset.live) { delete f.dataset.live; f.src = f.src; }
  });
  new MutationObserver(sync).observe(document.documentElement, { subtree:true, attributes:true, attributeFilter:['class'] });
})();
