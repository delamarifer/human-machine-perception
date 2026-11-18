/* PART: lifecycle (Day 12, owner: Shreya). Built 2026-11-18. The ML / computer vision lifecycle, with one running
   example: deep learning for diabetic retinopathy screening.
   Sources:
   - Gulshan et al., "Development and validation of a deep learning algorithm for detection of diabetic retinopathy
     in retinal fundus photographs", JAMA 2016: images graded several times by ophthalmologists; high sensitivity and
     specificity on held-out test sets (no numbers on the slides).
   - Beede et al., "A Human-Centered Evaluation of a Deep Learning System Deployed in Clinics for the Detection of
     Diabetic Retinopathy", CHI 2020 (read 2026-11-18, dl.acm.org/doi/fullHtml/10.1145/3313831.3376718): interviews and
     observation in eleven clinics in Thailand; of 1838 images in the first six months, 393 (21%) did not meet the
     system's standard for grading; low quality mostly from photos taken in rooms that were not darkened; on slow
     connections some uploads took 60-90 seconds.
   - Compounding errors and distribution shift: Physical Intelligence, pi*0.6 post (Nov 2025).
   The loop diagram is a drawing of the process, not data. No speaker notes. */
{
section('The ML lifecycle');

/* Seven steps on a circle, one per click; positions computed, arrows run between neighbours. */
const D12_STEPS = [
  ['Problem', 'who decides what?'], ['Data', 'collect, label'], ['Model', 'train, tune'], ['Evaluation', 'does it work for users?'],
  ['Deployment', 'in the real setting'], ['Monitoring', 'is it still working?'], ['Maintenance', 'fix, retrain, update'],
];
const d12Cycle = (() => {
  const cx = 600, cy = 270, R = 215, rx = 150, ry = 230 / 1, w = 200, h = 64, n = D12_STEPS.length;
  const P = D12_STEPS.map((_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return [cx + 1.7 * R * Math.cos(a) * 0.82, cy + R * Math.sin(a)]; });
  const edge = (p, q) => { /* shorten the segment p->q so it starts and ends outside the boxes */
    const dx = q[0] - p[0], dy = q[1] - p[1], L = Math.hypot(dx, dy);
    const t = s => Math.min((w / 2 + 8) / Math.abs(dx / L * s || 1e-9), (h / 2 + 8) / Math.abs(dy / L * s || 1e-9));
    const k = Math.min(t(1), L / 2 - 4);
    return `M${(p[0] + dx / L * k).toFixed(1)} ${(p[1] + dy / L * k).toFixed(1)} L ${(q[0] - dx / L * k).toFixed(1)} ${(q[1] - dy / L * k).toFixed(1)}`;
  };
  return `
  <svg class="d12-cycle" viewBox="0 0 1200 540" aria-label="The machine learning lifecycle as a loop: problem, data, model, evaluation, deployment, monitoring, maintenance, and back to the problem">
    <defs><marker id="d12-chead" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="#0f172a"/></marker></defs>
    ${D12_STEPS.map(([t, s], i) => `
      <g class="b">
        ${i ? `<path class="d12-carrow" d="${edge(P[i - 1], P[i])}" marker-end="url(#d12-chead)"/>` : ''}
        <rect class="d12-cnode" x="${P[i][0] - w / 2}" y="${P[i][1] - h / 2}" width="${w}" height="${h}" rx="12"/>
        <text class="d12-ct" x="${P[i][0]}" y="${P[i][1] - 4}" text-anchor="middle">${t}</text>
        <text class="d12-cs" x="${P[i][0]}" y="${P[i][1] + 20}" text-anchor="middle">${s}</text>
        ${i === n - 1 ? `<path class="d12-carrow" d="${edge(P[n - 1], P[0])}" marker-end="url(#d12-chead)"/>` : ''}
      </g>`).join('')}
    <text class="d12-center b" x="${cx}" y="${cy + 8}" text-anchor="middle">The model is one step of seven</text>
  </svg>`;
})();
st(`
  <h1 class="t">The lifecycle is a loop, not a line</h1>
  <div class="d12-col">${d12Cycle}</div>
`);

d12Bul('Start with the problem, then the data', [
  '<b>Example:</b> diabetes can cause blindness, and screening needs eye specialists, who are scarce',
  '<b>The decision:</b> send this patient to a specialist, or not?',
  '<b>The cost of errors:</b> a missed case can mean lost sight; a false alarm costs a trip to the hospital',
  '<b>The data:</b> retinal photos, each graded by several ophthalmologists, because experts disagree',
], null,
'Gulshan et al., JAMA 2016 · Beede et al., CHI 2020');

d12Bul('Evaluation: the metric is not the goal', [
  '<b>In the paper:</b> high sensitivity and specificity on held-out test photos',
  '<b>In eleven clinics in Thailand:</b> 393 of 1,838 photos (21%) were rejected as too poor to grade',
  '<b>Report by group:</b> clinic, camera, patient age, not one average',
  '<b>With few test cases,</b> report a confidence interval: 40/50 vs 35/50 may be no difference at all',
], null,
'Gulshan et al., JAMA 2016 · Beede et al., CHI 2020 (first six months of use)');

d12Bul('Deployment, monitoring, maintenance', [
  '<b>The room:</b> clinics were not dark, so many photos came out too poor to grade',
  '<b>The network:</b> on slow connections, one upload took 60–90 seconds while patients waited',
  '<b>The world drifts:</b> new cameras, new patients, new procedures; small errors compound',
  '<b>Close the loop:</b> log failures, collect them, retrain, as Walden does with interventions',
], null,
'Beede et al., CHI 2020 · Physical Intelligence, π*0.6 (Nov 2025) · Walden, LBM 2.0 (Nov 2026)');
}
