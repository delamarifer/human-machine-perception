/* Paste this into the browser console with the deck open, or run it after any edit to a part.
   It measures how many words are actually ON SCREEN per slide, excluding the title and the citation line,
   and it reports where those words live. Run: checkSlides()

   Why it exists. Fernanda has said twice that the slides are too text-heavy. The first measurement, on
   2026-11-16, found a median of 51 on-screen words per slide, and - the surprise - that 43 percent of all
   on-screen words were INSIDE the SVG figures, as labels in boxes. Adding "visuals" had made the problem
   worse, because our visuals were diagrams built out of labelled rectangles, and a sentence in a rectangle is
   still a sentence. The house rule is cues on screen, full sentences in the notes.

   The budget below is the working target, not a law of nature. Argue with it in feedback/_day.md. */
const SLIDE_BUDGET = { perSlide: 25, perFigureLabel: 6, quoteWords: 15, quotesPerPart: 1 };

function checkSlides(budget = SLIDE_BUDGET){
  const words = el => ((el && el.textContent) || '').trim().split(/\s+/).filter(Boolean).length;
  const rows = [...document.querySelectorAll('#root .stage')].map((st, i) => {
    const clone = st.cloneNode(true);
    clone.querySelectorAll('.cite, h1.t').forEach(e => e.remove());
    const inSvg = [...clone.querySelectorAll('svg')].reduce((a, s) => a + words(s), 0);
    const longLabels = [...clone.querySelectorAll('svg text, svg foreignObject')]
      .map(e => ({ n: words(e), s: (e.textContent || '').trim().slice(0, 40) }))
      .filter(x => x.n > budget.perFigureLabel);
    return { i, sec: (window.deck && deck.S[i].sec) || '', title: (window.deck && deck.titleOf(i)) || '(title)',
             words: words(clone), inSvg, longLabels };
  });
  const over = rows.filter(r => r.words > budget.perSlide).sort((a, b) => b.words - a.words);
  const sorted = [...rows].map(r => r.words).sort((a, b) => a - b);
  const report = {
    slides: rows.length,
    totalWords: rows.reduce((a, r) => a + r.words, 0),
    median: sorted[Math.floor(sorted.length / 2)],
    worstSlide: over[0] || null,
    overBudget: over.length,
    percentInsideFigures: Math.round(rows.reduce((a, r) => a + r.inSvg, 0) / Math.max(1, rows.reduce((a, r) => a + r.words, 0)) * 100),
    labelsOverBudget: rows.flatMap(r => r.longLabels.map(l => ({ slide: r.i, title: r.title, words: l.n, text: l.s }))).slice(0, 20),
    table: over.slice(0, 15).map(r => `${r.i} [${r.sec}] ${r.title} — ${r.words} words (${r.inSvg} in figures)`)
  };
  console.table(report.table);
  return report;
}
if(typeof window !== 'undefined') window.checkSlides = checkSlides;
