/* PART: llm-eval (Day 6 reduced). Google deck p45-47. Evaluating LLMs is the one place two HTML slides are allowed (her comment on p45).
   p45 scenes: main ideas of The LLM Evaluation Guidebook (OpenEvals, Hugging Face), read from the Space's own repository files.
   p46: her "Baseline… etc." expanded with the checklist in day06/parts/eval-models.js, Baseline first. The small drawings are glyphs, not data.
   p47: her screenshot of the first page of arXiv:2502.16238, with the PDF viewer's gray band cropped off. No speaker notes. */
{
section('Evaluating the model');

/* ---------- p45: Evaluating LLMs, two slides ---------- */
sc('llmEvalWhat', 'scenes/llm-eval-what.html');
sc('llmEvalBenchmarks', 'scenes/llm-eval-benchmarks.html', { sub: false });

/* ---------- p46: checklist, built item by item. Glyphs are 96 x 48 drawings of each idea. ---------- */
const leBar = (x, h, f = 'var(--ink)') => `<rect x="${x}" y="${44 - h}" width="14" height="${h}" fill="${f}"/>`;
const leGlyph = inner => `<svg class="llmeval-glyph" viewBox="0 0 96 48" aria-hidden="true"><line x1="0" y1="44.5" x2="96" y2="44.5" stroke="#94a3b8" stroke-width="1.5"/>${inner}</svg>`;
const LE_ITEMS = [
  ['Baseline', 'a simple model to compare with', leGlyph(leBar(26, 16, '#94a3b8') + leBar(56, 36))],
  ['Split', 'by person, place, camera or video; check for copies', `<svg class="llmeval-glyph" viewBox="0 0 96 48" aria-hidden="true"><g fill="var(--ink)">${[8,20,32].flatMap(x => [12,24,36].map(y => `<circle cx="${x}" cy="${y}" r="4"/>`)).join('')}</g><line x1="48" y1="4" x2="48" y2="44" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3"/><g fill="#fff" stroke="var(--ink)" stroke-width="2">${[64,76,88].flatMap(x => [12,24,36].map(y => `<circle cx="${x}" cy="${y}" r="4"/>`)).join('')}</g></svg>`],
  ['Report three numbers', 'training, same-kind test, and a shifted or corrupted test', leGlyph(leBar(18, 38) + leBar(42, 32) + leBar(66, 18))],
  ['Report the worst group', 'not just the average', leGlyph(leBar(14, 30) + leBar(36, 34) + leBar(58, 10, '#94a3b8') + `<line x1="4" y1="20" x2="92" y2="20" stroke="var(--ink)" stroke-width="2" stroke-dasharray="4 3"/>`)],
  ['Error bars', '', leGlyph(leBar(41, 26) + `<path d="M48,8 V32 M42,8 H54 M42,32 H54" stroke="#64748b" stroke-width="2.5" fill="none"/>`)],
  ['Unknown inputs', 'what the model does when it should say “I don’t know”', `<svg class="llmeval-glyph" viewBox="0 0 96 48" aria-hidden="true"><circle cx="48" cy="24" r="19" fill="#fff" stroke="var(--ink)" stroke-width="2.5"/><text x="48" y="33" text-anchor="middle" font-size="26" font-weight="700" fill="var(--ink)">?</text></svg>`],
];
st(`
  <style>
    .llmeval-rows{ flex:1 1 auto; min-height:0; display:flex; flex-direction:column; justify-content:center; gap:2.4vh; }
    .llmeval-row{ display:grid; grid-template-columns:9vw minmax(11em, 25vw) 1fr; gap:1.6vw; align-items:center; }
    .llmeval-row .lead{ font-size:clamp(1.15rem, 2.05vw, 1.9rem); line-height:1.2; }
    .llmeval-glyph{ width:100%; height:auto; display:block; }
    @media (max-width: 820px), (max-aspect-ratio: 1/1){ .llmeval-row{ grid-template-columns:14vw 1fr; gap:.3vh 2vw; } .llmeval-row > :last-child{ grid-column:2; } }
  </style>
  <h1 class="t">Checklist for your project’s results</h1>
  <div class="llmeval-rows">
    ${LE_ITEMS.map(([nm, detail, glyph], i) => `<div class="llmeval-row b" data-step="${i + 1}">${glyph}<div class="lead"><b>${nm}</b></div><div class="lead">${detail}</div></div>`).join('')}
  </div>
`);

/* ---------- p47: the paper's first page, whole, on the first click. Her image; only the viewer band is cropped. ---------- */
st(`
  <h1 class="t" style="font-size:clamp(1.6rem, 3.25vw, 2.85rem)">Brain-Model Evaluations Need the NeuroAI Turing Test</h1>
  <div class="b" data-step="1" style="flex:1 1 auto;min-height:0"><img class="d6-img" src="assets/llm-eval/neuroai-turing-test-p1.jpg" alt="First page of the paper Brain-Model Evaluations Need the NeuroAI Turing Test"></div>
  ${rdCite('Feather, Khosla, Murty and Nayebi (2025), ' + d6Link('https://arxiv.org/abs/2502.16238', 'arXiv:2502.16238'))}
`);
}
