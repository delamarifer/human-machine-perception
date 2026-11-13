/* Day 10 helpers (owner: Shreya). Class names carry the d10- prefix. */
(() => {
  const el = document.createElement('style'); el.id = 'd10-style';
  el.textContent = `
  .d10-col{ display:flex; flex-direction:column; gap:2.6vh; flex:1 1 auto; min-height:0; justify-content:center; }
  .d10-list{ margin:0 auto; padding-left:1.4em; display:flex; flex-direction:column; gap:2vh; max-width:46em; }
  .d10-list > li{ font-size:clamp(1.31rem, 2.5vw, 2.25rem); line-height:1.3; }
  .d10-list a{ color:inherit; }
  .d10-q{ font-size:clamp(1.69rem, 3.4vw, 3.1rem); font-weight:600; line-height:1.3; text-align:center; max-width:30em; margin:0 auto; }
  .d10-mute{ color:var(--mute); }

  /* videos: one big, or a row of three */
  .d10-video{ display:flex; flex-direction:column; align-items:center; gap:.8vh; }
  .d10-video iframe{ height:52vh; aspect-ratio:16 / 9; max-width:100%; border:0; border-radius:10px; background:#000; }
  .d10-gallery{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:1.6vw; align-items:start; }
  .d10-gallery .d10-video iframe{ height:auto; width:100%; }
  .d10-cap{ text-align:center; font-size:clamp(1.06rem, 1.7vw, 1.56rem); line-height:1.3; }
  .d10-cap small{ display:block; color:var(--mute); font-size:.8em; }

  /* the pipeline as a question: input and output first, the middle is a question, then the six stages */
  .d10-io{ display:grid; grid-template-columns:1fr auto 1.2fr auto 1fr; align-items:center; gap:1.4vw; }
  .d10-box{ border:2px solid var(--ink); border-radius:14px; padding:2.2vh 1.2vw; text-align:center; font-size:clamp(1.2rem, 2.1vw, 1.9rem); line-height:1.3; }
  .d10-box small{ display:block; font-size:.7em; text-transform:uppercase; letter-spacing:.08em; color:var(--mute); margin-bottom:.6vh; }
  .d10-mid{ border-style:dashed; font-weight:700; }
  .d10-arrow{ font-size:clamp(1.6rem, 2.6vw, 2.4rem); color:var(--mute); }
  .d10-flow{ display:grid; grid-template-columns:repeat(6, minmax(0,1fr)); gap:1vw; }
  .d10-flow > div{ border-top:6px solid var(--ink); padding-top:1.2vh; font-size:clamp(1.15rem, 2vw, 1.8rem); font-weight:700; text-align:center; }
  .d10-flow > div span{ display:block; font-weight:400; font-size:.72em; color:var(--mute); margin-top:.4vh; }

  /* constraint cards */
  .d10-cards{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:1.8vh 1.6vw; }
  .d10-card{ border:2px solid var(--ink); border-radius:12px; padding:1.8vh 1.2vw; display:flex; flex-direction:column; gap:.8vh; min-width:0; }
  .d10-card small{ font-size:clamp(0.94rem, 1.31vw, 1.25rem); text-transform:uppercase; letter-spacing:.08em; color:var(--mute); }
  .d10-card b{ font-size:clamp(1.31rem, 2.2vw, 2rem); line-height:1.2; }
  .d10-card span{ font-size:clamp(1.02rem, 1.5vw, 1.4rem); line-height:1.3; color:var(--mute); }
  .d10-open{ text-align:center; font-size:clamp(1.25rem, 2.2vw, 2rem); }
  .d10-open a{ color:inherit; font-weight:700; }

  /* deep-dive tables */
  .d10-tbl{ width:100%; border-collapse:collapse; font-size:clamp(1.02rem, 1.65vw, 1.5rem); line-height:1.3; }
  .d10-tbl th{ text-align:left; padding:.6vh .8vw; border-bottom:2px solid var(--ink); }
  .d10-tbl td{ padding:.9vh .8vw; border-bottom:1px solid var(--line); vertical-align:top; }
  .d10-tbl td:first-child{ font-weight:700; white-space:nowrap; }
  .d10-tbl td:last-child, .d10-tbl th:last-child{ white-space:nowrap; color:var(--mute); }
  .d10-tbl tr.b{ transform:none; }

  /* one animated pipeline: six stage boxes, then layers that replace each other in the same place */
  .d10-pipe{ display:flex; flex-direction:column; gap:2.4vh; }
  .d10-pipe-head, .d10-layer-cells{ display:grid; grid-template-columns:repeat(6, minmax(0,1fr)); gap:1vw; }
  .d10-pipe-head > div{ border:2px solid var(--ink); border-radius:12px; padding:1.4vh .6vw; text-align:center; font-weight:700;
    font-size:clamp(1.15rem, 1.9vw, 1.75rem); }
  .d10-layers{ display:grid; }
  .d10-layers > .d10-layer{ grid-area:1 / 1; }
  .d10-layer.shown.d10-gone{ opacity:0; }                       /* a later build replaces the one before (set in JS below) */
  .d10-layer-name{ font-size:clamp(1.25rem, 2.2vw, 2rem); font-weight:700; margin-bottom:1.4vh; }
  .d10-layer-cells > div{ border-top:4px solid var(--ink); padding-top:1vh; font-size:clamp(1rem, 1.55vw, 1.45rem); line-height:1.3; }
  .d10-ours .d10-layer-cells > div{ border-top-style:dashed; }

  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .d10-pipe-head, .d10-layer-cells{ grid-template-columns:repeat(3, minmax(0,1fr)); }
    .d10-gallery, .d10-cards{ grid-template-columns:1fr; gap:1.4vh; }
    .d10-io{ grid-template-columns:1fr; } .d10-arrow{ display:none; }
    .d10-flow{ grid-template-columns:repeat(3, minmax(0,1fr)); }
  }
`;
  document.head.appendChild(el);
})();

/* Embedded videos: when a video is hidden again (going back, or leaving the slide), reload it so it stops playing. */
(function(){
  const sync = () => document.querySelectorAll('.d10-video').forEach(v => {
    const f = v.querySelector('iframe'); if (!f) return;
    const slide = v.closest('.slide');
    const on = v.classList.contains('shown') && slide && slide.classList.contains('active');
    if (on) f.dataset.live = '1';
    else if (f.dataset.live) { delete f.dataset.live; f.src = f.src; }
  });
  new MutationObserver(sync).observe(document.documentElement, { subtree:true, attributes:true, attributeFilter:['class'] });
})();

/* The one-pipeline slide: only the newest shown layer stays visible; earlier ones get .d10-gone. */
(function(){
  let busy = false;
  const sync = () => {
    if (busy) return; busy = true;
    document.querySelectorAll('.d10-layers').forEach(box => {
      const shown = [...box.querySelectorAll('.d10-layer.shown')];
      box.querySelectorAll('.d10-layer').forEach(l => l.classList.toggle('d10-gone', shown.length > 0 && l !== shown[shown.length - 1]));
    });
    busy = false;
  };
  new MutationObserver(sync).observe(document.documentElement, { subtree:true, attributes:true, attributeFilter:['class'] });
})();

/* A Vimeo player. dnt=1: no tracking cookies. */
const d10Vimeo = (id, title, cap = '', step = '') =>
  `<div class="d10-video b" ${step ? `data-step="${step}"` : ''}><iframe src="https://player.vimeo.com/video/${id}?dnt=1&title=0&byline=0&portrait=0" title="${title}" allow="fullscreen; picture-in-picture" allowfullscreen></iframe>${cap ? `<div class="d10-cap">${cap}</div>` : ''}</div>`;
