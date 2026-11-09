/* PART: llm-eval (Day 6 reduced). Google deck p45-47. Evaluating LLMs is the one place two HTML slides are allowed (her comment on p45).
   p45 scenes: main ideas of The LLM Evaluation Guidebook (OpenEvals, Hugging Face), read from the Space's own repository files.
   p46: her "Baseline… etc." expanded with the item names of the checklist in day06/parts/eval-models.js, Baseline first; names and glyphs only (review B5, C6). The drawings are glyphs, not data.
   p47: her screenshot of the first page of arXiv:2502.16238, with the PDF viewer's gray band cropped off. No speaker notes. */
{
section('Evaluating the model');

/* ---------- p45: Evaluating LLMs, two slides ---------- */
sc('llmEvalWhat', 'scenes/llm-eval-what.html');
sc('llmEvalBenchmarks', 'scenes/llm-eval-benchmarks.html', { sub: false });

/* ---------- p46: checklist, built item by item. Glyphs are 96 x 48 drawings of each idea. ---------- */
const leBar = (x, h, f = 'var(--ink)') => `<rect x="${x}" y="${44 - h}" width="14" height="${h}" fill="${f}"/>`;
const leGlyph = (inner, labels = []) => `<svg class="llmeval-glyph" viewBox="0 0 96 ${labels.length ? 58 : 48}" aria-hidden="true"><line x1="0" y1="44.5" x2="96" y2="44.5" stroke="#94a3b8" stroke-width="1.5"/>${inner}${labels.map(([x, t]) => `<text x="${x}" y="55" text-anchor="middle" font-size="8.5" fill="var(--ink)">${t}</text>`).join('')}</svg>`;
const LE_ITEMS = [
  ['Baseline', leGlyph(leBar(26, 16, '#94a3b8') + leBar(56, 36), [[33, 'simple'], [63, 'yours']])],
  ['Split', `<svg class="llmeval-glyph" viewBox="0 0 96 48" aria-hidden="true"><g fill="var(--ink)">${[8,20,32].flatMap(x => [12,24,36].map(y => `<circle cx="${x}" cy="${y}" r="4"/>`)).join('')}</g><line x1="48" y1="4" x2="48" y2="44" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 3"/><g fill="#fff" stroke="var(--ink)" stroke-width="2">${[64,76,88].flatMap(x => [12,24,36].map(y => `<circle cx="${x}" cy="${y}" r="4"/>`)).join('')}</g></svg>`],
  ['Report three numbers', leGlyph(leBar(18, 38) + leBar(42, 32) + leBar(66, 18), [[25, 'train'], [49, 'test'], [73, 'shifted']])],
  ['Report the worst group', leGlyph(leBar(14, 30) + leBar(36, 34) + leBar(58, 10, '#94a3b8') + `<line x1="4" y1="20" x2="92" y2="20" stroke="var(--ink)" stroke-width="2" stroke-dasharray="4 3"/>`)],
  ['Error bars', leGlyph(leBar(41, 26) + `<path d="M48,8 V32 M42,8 H54 M42,32 H54" stroke="#64748b" stroke-width="2.5" fill="none"/>`)],
  ['Unknown inputs', `<svg class="llmeval-glyph" viewBox="0 0 96 48" aria-hidden="true"><circle cx="48" cy="24" r="19" fill="#fff" stroke="var(--ink)" stroke-width="2.5"/><text x="48" y="33" text-anchor="middle" font-size="26" font-weight="700" fill="var(--ink)">?</text></svg>`],
];
st(`
  <style>
    .llmeval-rows{ flex:1 1 auto; min-height:0; display:grid; grid-template-columns:1fr 1fr; grid-template-rows:repeat(3, 1fr); grid-auto-flow:column; gap:2vh 3vw; align-items:center; }
    .llmeval-row{ display:grid; grid-template-columns:13vw 1fr; gap:1.8vw; align-items:center; }
    .llmeval-row .lead{ line-height:1.2; }
    .llmeval-glyph{ width:100%; height:auto; display:block; }
    @media (max-width: 820px), (max-aspect-ratio: 1/1){ .llmeval-rows{ grid-template-columns:1fr; grid-template-rows:repeat(6, 1fr); } .llmeval-row{ grid-template-columns:14vw 1fr; gap:2vw; } }
  </style>
  <h1 class="t">Checklist for your project’s results</h1>
  <div class="llmeval-rows">
    ${LE_ITEMS.map(([nm, glyph], i) => `<div class="llmeval-row b" data-step="${i + 1}">${glyph}<div class="lead"><b>${nm}</b></div></div>`).join('')}
  </div>
`);

/* ---------- p47: the paper's first page, whole, on the first click. Her image; only the viewer band is cropped. ---------- */
st(`
  <h1 class="t" style="font-size:clamp(1.6rem, 3.25vw, 2.85rem)">Brain-Model Evaluations Need the NeuroAI Turing Test</h1>
  <div class="b" data-step="1" style="flex:1 1 auto;min-height:0"><img class="d6-img" src="assets/llm-eval/neuroai-turing-test-p1.jpg" alt="First page of the paper Brain-Model Evaluations Need the NeuroAI Turing Test"></div>
  ${rdCite('Feather, Khosla, Murty and Nayebi (2025), ' + d6Link('https://arxiv.org/abs/2502.16238', 'arXiv:2502.16238'))}
`);
}
