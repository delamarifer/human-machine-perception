/* PART: lifecycle (Day 12, owner: Shreya). Built 2026-11-18. The ML / computer vision lifecycle as one loop diagram.
   The three retinopathy slides (problem and data, evaluation, deployment) were removed on 2026-11-18 at Shreya's
   request; they are in git history (commit 256046d). Their sources are kept below for reference.
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
}
