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

  /* who he is: bullets and a portrait */
  .d10-who{ display:grid; grid-template-columns:1.4fr 1fr; gap:4vw; align-items:center; }
  .d10-who .d10-list{ margin:0; }
  .d10-portrait{ width:100%; max-height:58vh; object-fit:cover; border-radius:14px; }
  /* image tiles with a title under each */
  .d10-tile{ margin:0; display:flex; flex-direction:column; gap:.8vh; align-items:center; }
  .d10-tile img{ width:100%; aspect-ratio:16 / 9; object-fit:cover; border-radius:10px; }
  .d10-tile figcaption{ font-size:clamp(1rem, 1.5vw, 1.4rem); text-align:center; }
  .d10-gallery + .d10-gallery{ margin-top:1vh; }
  /* one large piece at a time, each replacing the one before (same place on the slide) */
  .d10-stack{ display:grid; justify-items:center; align-items:center; flex:1 1 auto; min-height:0; }
  .d10-stack > .d10-one{ grid-area:1 / 1; }
  .d10-stack img, .d10-stack .d10-video iframe{ height:62vh; width:auto; max-width:100%; aspect-ratio:16 / 9; object-fit:cover; }
  .d10-stack figcaption, .d10-stack .d10-cap{ font-size:clamp(1.4rem, 2.6vw, 2.4rem); font-weight:700; }
  .d10-stack .d10-cap small{ font-weight:400; font-size:.62em; margin-top:.3vh; }
  .d10-stack > .d10-one > .d10-video iframe{ height:56vh; }
  .d10-one.shown.d10-gone{ opacity:0; pointer-events:none; }
  /* machine hallucination: two questions and answers, with two images */
  .d10-hall{ display:grid; grid-template-columns:1.3fr 1fr; gap:3vw; align-items:center; }
  .d10-qa{ display:flex; flex-direction:column; gap:1.4vh; }
  .d10-qq{ font-size:clamp(1.35rem, 2.4vw, 2.15rem); font-weight:700; line-height:1.25; }
  .d10-qans{ font-size:clamp(1.15rem, 2vw, 1.8rem); line-height:1.35; padding-left:1em; border-left:4px solid var(--ink); margin-bottom:1.6vh; }
  .d10-hall-imgs{ display:flex; flex-direction:column; gap:1.6vh; width:100%; }
  .d10-hall-imgs img{ width:100%; max-height:27vh; object-fit:cover; border-radius:10px; }
  .d10-hall .d10-stack img{ height:auto; aspect-ratio:auto; }      /* the stack rule sizes big single pieces; not these */
  /* a made-up chat: the question on the right, the confident wrong answer on the left */
  .d10-chat{ display:flex; flex-direction:column; gap:1.4vh; width:100%; }
  .d10-msg{ padding:1.2vh 1.1vw; border-radius:14px; font-size:clamp(1.1rem, 1.9vw, 1.7rem); line-height:1.3; max-width:92%; }
  .d10-user{ align-self:flex-end; background:#e2e8f0; }
  .d10-bot{ align-self:flex-start; border:2px solid var(--ink); }
  .d10-truth{ font-size:clamp(1rem, 1.6vw, 1.45rem); color:var(--mute); font-style:italic; }
  /* discussion topics: the topic in bold, its question underneath */
  .d10-topics{ max-width:60em; gap:2.2vh; }
  .d10-topics > li{ font-size:clamp(1.45rem, 2.6vw, 2.4rem); line-height:1.25; }
  .d10-topics .d10-sub{ display:block; font-size:.8em; color:var(--mute); margin-top:.3vh; }

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
    .d10-who, .d10-hall{ grid-template-columns:1fr; }
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
    const on = v.classList.contains('shown') && slide && slide.classList.contains('active') && !v.closest('.d10-gone');
    if (on) f.dataset.live = '1';
    else if (f.dataset.live) { delete f.dataset.live; f.src = f.src; }
  });
  new MutationObserver(sync).observe(document.documentElement, { subtree:true, attributes:true, attributeFilter:['class'] });
})();

/* Swap slides (the one-pipeline slide, "What does he actually make?"): only the newest shown item stays visible;
   earlier ones get .d10-gone. */
(function(){
  let busy = false;
  const sync = () => {
    if (busy) return; busy = true;
    [['.d10-layers', ':scope > .d10-layer'], ['.d10-stack', ':scope > .d10-one']].forEach(([boxSel, itemSel]) =>
      document.querySelectorAll(boxSel).forEach(box => {
        const items = [...box.querySelectorAll(itemSel)];
        const shown = items.filter(l => l.classList.contains('shown'));
        items.forEach(l => l.classList.toggle('d10-gone', shown.length > 0 && l !== shown[shown.length - 1]));
      }));
    busy = false;
  };
  new MutationObserver(sync).observe(document.documentElement, { subtree:true, attributes:true, attributeFilter:['class'] });
})();

/* A Vimeo player. dnt=1: no tracking cookies. */
const d10Vimeo = (id, title, cap = '', step = '') =>
  `<div class="d10-video b" ${step ? `data-step="${step}"` : ''}><iframe src="https://player.vimeo.com/video/${id}?dnt=1&title=0&byline=0&portrait=0" title="${title}" allow="fullscreen; picture-in-picture" allowfullscreen></iframe>${cap ? `<div class="d10-cap">${cap}</div>` : ''}</div>`;
