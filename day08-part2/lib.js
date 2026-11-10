/* Day 8 part B helpers shared by every part (owner: Fernanda). Loaded by deck.html before the parts,
   so any part can be previewed alone with ?only=<part>. Styles go into the page head once; every class starts with d8-. */
(() => {
  const el = document.createElement('style'); el.id = 'd8-style';
  el.textContent = `
  .stage{ padding:7.2vh 5.2vw 9.5vh; gap:1.8vh; }
  .stage > .cite{ position:static; margin-top:auto; padding-top:.8vh; font-size:clamp(.8rem, 1.12vw, 1.15rem); color:var(--mute); }
  .stage > .cite a{ color:var(--mute); }
  .d8-body{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:2.6vh; }
  .d8-cols{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1fr; gap:3vw; align-items:center; }
  .d8-eq{ font-family:'Cambria Math', 'STIX Two Math', 'Latin Modern Math', Cambria, Georgia, serif;
    font-size:clamp(1.5rem, 2.55vw, 2.4rem); line-height:1.5; text-align:center; padding:1.2vh 1.6vw;
    background:#f8fafc; border:1px solid var(--line); border-radius:12px; }
  .d8-eq i{ font-style:italic; }
  .d8-eq sub, .d8-eq sup{ font-size:.62em; }
  .d8-eq .d8-bold{ font-weight:700; font-style:normal; }
  .d8-row{ display:grid; grid-template-columns:minmax(9em, 22%) 1fr; gap:2vw; align-items:center; }
  .d8-row > .label{ font-weight:700; }
  .d8-algo{ font-family:'Cambria Math', 'STIX Two Math', Cambria, Georgia, serif; font-size:clamp(1.3rem, 2.15vw, 2.05rem); line-height:1.55;
    background:#f8fafc; border:1px solid var(--line); border-left:4px solid var(--ink); border-radius:10px; padding:1.4vh 1.8vw; }
  .d8-algo > div{ padding-left:calc(var(--in, 0) * 2.2em); }
  .d8-algo .d8-kw{ font-family:var(--font); font-weight:700; }
  .d8-note{ font-size:clamp(1.1rem, 1.6vw, 1.5rem); color:var(--ink); }
  @media (max-width: 820px), (max-aspect-ratio: 1/1){
    .stage{ padding:6vh 4vw 6.5vh; gap:1vh; }
    .stage h1.t{ font-size:clamp(1.18rem, 4vw, 1.7rem); }
    .stage .statement{ font-size:clamp(1rem, 3.2vw, 1.4rem); }
    .stage .lead{ font-size:clamp(.9rem, 2.6vw, 1.2rem); line-height:1.26; }
    .d8-eq{ font-size:clamp(.95rem, 3vw, 1.3rem); }
    .d8-algo{ font-size:clamp(.85rem, 2.6vw, 1.15rem); }
    .d8-cols, .d8-row{ grid-template-columns:1fr; gap:1vh; }
  }
`;
  document.head.appendChild(el);
})();
window.d8Link = (href, t) => `<a href="${href}" target="_blank" rel="noopener" onclick="event.stopPropagation()" style="color:inherit">${t}</a>`;
/* Math shorthands for the equation boxes: v('x','t') is an italic x with subscript t. */
window.d8v = (s, sub = '', sup = '') => `<i>${s}</i>${sub !== '' ? `<sub>${sub}</sub>` : ''}${sup !== '' ? `<sup>${sup}</sup>` : ''}`;
/* The four references every part cites. */
window.D8_REF = {
  ddpm: d8Link('https://arxiv.org/abs/2006.11239', 'Ho, Jain and Abbeel, Denoising Diffusion Probabilistic Models, NeurIPS 2020'),
  cvpr: d8Link('https://cvpr2022-tutorial-diffusion-models.github.io/', 'Kreis, Gao and Vahdat, CVPR 2022 tutorial'),
  sde: d8Link('https://arxiv.org/abs/2011.13456', 'Song et al., Score-Based Generative Modeling through SDEs, ICLR 2021'),
  fm: d8Link('https://arxiv.org/abs/2210.02747', 'Lipman et al., Flow Matching for Generative Modeling, ICLR 2023'),
  fmtut: d8Link('https://neurips.cc/virtual/2024/tutorial/99531', 'Lipman, Chen and Ben-Hamu, NeurIPS 2024 tutorial'),
  coin: d8Link('https://diffusionflow.github.io/', 'Gao et al., Diffusion Meets Flow Matching, ICLR 2025 blog post'),
  tri: d8Link('https://arxiv.org/abs/2112.07804', 'Xiao, Kreis and Vahdat, Tackling the Generative Learning Trilemma, ICLR 2022'),
};
