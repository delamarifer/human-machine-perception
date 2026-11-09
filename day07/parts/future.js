/* PART: future (Day 6 reduced). Google deck p55-59 (as of Round 2), one HTML slide each. No speaker notes.
   Figures in assets/future/: ColorizeBot (Foundations of Computer Vision Fig. 35.2, CC BY-NC-ND 4.0, whole);
   CLEAR Fig. 1 (project page: CC BY); DROID, Open X-Embodiment, RoboCasa (arXiv: CC BY 4.0, cropped);
   hand photo (John Beans, Wikimedia Commons, CC BY 2.0, cropped). Crop boxes were measured by script from each image. */
{
section('Transfer Learning');  // end of the Transfer Learning section (Shreya, 2026-11-09)

const fuA = (href, t) => d6Link(href, t);

/* p56: her line, then two examples, a figure each. */
st(`
  <style>
    .future-ex{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1.7fr; gap:2vw; align-items:center; }
    .future-excol{ display:flex; flex-direction:column; gap:1vh; min-height:0; height:100%; justify-content:center; }
    .future-excol img{ width:100%; min-height:0; object-fit:contain; display:block; }
    .future-excol .label{ text-align:center; }
    .future-center{ flex:1 1 auto; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; gap:4vh; }
    .future-qs{ flex:1 1 auto; display:flex; flex-direction:column; justify-content:center; gap:4.5vh; }
  </style>
  <h1 class="t">Thinking about future data or uses</h1>
  <div class="lead b" data-step="1">Retroactively, as you build, can you predict forward?</div>
  <div class="future-ex">
    <div class="future-excol b" data-step="2">
      <img src="assets/future/colorizebot_examples.jpg" alt="ColorizeBot outputs on an 1849 photo of Chopin and a 1933 photo of a thylacine, both mostly sepia">
      <div class="label">ColorizeBot: ImageNet photos in training, old photographs in use</div>
    </div>
    <div class="future-excol b" data-step="3">
      <img src="assets/future/clear_teaser.jpg" alt="CLEAR: computers, cameras and cosplay changing in Flickr photos from 2004 to 2014">
      <div class="label">CLEAR: Flickr, 2004 to 2014</div>
    </div>
  </div>
  ${rdCite(fuA('https://visionbook.mit.edu/bias_and_shift.html', 'Foundations of Computer Vision, Ch. 35, Fig. 35.2'), 2)}
  <div class="cite b" data-step="3" style="margin-top:0;padding-top:0">${fuA('https://arxiv.org/abs/2201.06289', 'Lin et al., CLEAR (2021), Fig. 1')}, CC BY</div>
`);

/* p57: transition, her words. */
st(`
  <h1 class="t">Can research combat the need for real-data?</h1>
  <div class="future-center"><div class="statement b" data-step="1">Discussion</div></div>
`);

/* p57 (new in her deck, Round 2): RL Environments. Her comment: "include short line of main claim here". The claim is a direct quote
   from the Scale post (under 15 words). The loop is our drawing of the standard agent-environment loop (the post's figure is Scale's
   artwork, not reused); one arrow per click. */
const FU_RL = `<svg class="future-rl" viewBox="0 0 900 380" role="img" aria-label="An agent sends an action to an environment; the environment returns an observation and a reward">
  <defs><marker id="fuRL" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#0f172a"/></marker></defs>
  <g class="b" data-step="2">
    <circle cx="150" cy="190" r="78" fill="#e2e8f0" stroke="#0f172a" stroke-width="4"/>
    <text x="150" y="200" font-size="32" font-weight="700" text-anchor="middle">Agent</text>
    <rect x="636" y="112" width="210" height="150" rx="12" fill="#fff" stroke="#0f172a" stroke-width="4"/>
    <rect x="656" y="132" width="170" height="92" rx="4" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>
    ${[0, 1, 2].map(i => `<rect x="${670 + i * 34}" y="160" width="26" height="26" rx="4" fill="#94a3b8"/>`).join('')}
    <path d="M 790 168 l 0 30 l 8 -8 l 10 16 l 6 -4 l -10 -15 l 12 -2 z" fill="#0f172a"/>
    <text x="741" y="304" font-size="30" font-weight="700" text-anchor="middle">Environment</text>
    <line x1="236" y1="190" x2="626" y2="190" stroke="#0f172a" stroke-width="4" marker-end="url(#fuRL)"/>
    <text x="431" y="178" font-size="26" text-anchor="middle">action</text>
  </g>
  <g class="b" data-step="3">
    <path d="M 700 104 C 600 10, 280 10, 196 112" fill="none" stroke="#0f172a" stroke-width="4" marker-end="url(#fuRL)"/>
    <text x="431" y="84" font-size="26" text-anchor="middle">observation</text>
  </g>
  <g class="b" data-step="4">
    <path d="M 640 266 C 560 370, 280 370, 196 268" fill="none" stroke="#0f172a" stroke-width="4" stroke-dasharray="12 8" marker-end="url(#fuRL)"/>
    <text x="425" y="318" font-size="26" font-weight="700" text-anchor="middle">reward</text>
  </g>
</svg>`;
st(`
  <style>
    .future-rl{ flex:1 1 auto; min-height:0; width:100%; display:block; }
    .future-rl text{ font-family:var(--font); fill:var(--ink); }
  </style>
  <h1 class="t">RL Environments</h1>
  <div class="lead b" data-step="1" style="text-align:center">“Frontier models increasingly need to learn through trial and error in realistic simulated environments”</div>
  ${FU_RL}
  ${rdCite(fuA('https://scale.com/blog/rl-environments', 'Chetan Rane, The Next Frontier of Data Training: RL Environments, Scale AI blog (2026)') + ' · loop: our drawing')}
`);

/* p58: scene. Scale quotes, human vs robot hands, the gaps. */
sc('futureGap', 'scenes/future-gap.html');

/* p59: discussion, one question per click. Question wording is a draft for Fernanda. */
st(`
  <h1 class="t">Extending it to the physical world</h1>
  <div class="future-qs">
    <div class="statement b" data-step="1">Discussion</div>
    <div class="question b" data-step="1">How would you collect the data robots are missing, and what would your method still fail to cover?</div>
    <div class="question b" data-step="2">What new algorithm could let a robot learn a skill from a handful of examples, without big data at all?</div>
  </div>
`);
}
