/* PART: human-vs-machine (Day 4). Owner: Fernanda · Shreya.
   PART IV: Shape Bias, Texture Bias, and Human Vision.
   Primary resources:
   - Geirhos et al. (ICLR 2019): https://arxiv.org/abs/1811.12231
   - Model-vs-Human benchmark: https://github.com/bethgelab/model-vs-human
   - Mooney faces & Cross-race effect analogy */
{
section('4. Shape vs Texture');

sc('cueConflict', 'scenes/cue-conflict.html');

/* Mooney faces, Cross-race effect analogy, and Model-vs-Human benchmark */
st(`
  <h1 class="t">Human perceptual organization &amp; the Model-vs-Human benchmark</h1>
  <div class="d4-cols">
    <div style="display:flex;flex-direction:column;gap:1.1vh">
      <div class="d4-card b" data-step="1" style="padding:1.1vh 1.2vw">
        <div class="lead"><b>1. Mooney Faces (Mooney, 1957): Top-down holistic shape</b></div>
        <div style="display:flex;gap:1.2vw;align-items:center;margin-top:.4vh">
          <div style="text-align:center">
            <canvas id="mooney-two" width="96" height="96" style="width:min(8vw,12vh);aspect-ratio:1;border-radius:6px;border:1px solid var(--line)"></canvas>
            <div class="label">Two-tone Mooney</div>
          </div>
          <div style="text-align:center">
            <canvas id="mooney-gray" width="96" height="96" style="width:min(8vw,12vh);aspect-ratio:1;border-radius:6px;border:1px solid var(--line)"></canvas>
            <div class="label">Original grayscale</div>
          </div>
          <div class="label" style="flex:1">Local edges are ambiguous shadows; once humans see the face, global 3D shape locks in permanently—whereas local texture-biased CNNs struggle.</div>
        </div>
      </div>
      <div class="d4-card b" data-step="2" style="padding:1.1vh 1.2vw">
        <div class="lead"><b>2. Experience-dependent tuning: Cross-race effect analogy</b></div>
        <div class="label">• Human face recognition is tuned by visual diet: observers show higher sensitivity for face groups they experience most frequently during development (Tanaka, Kiefer &amp; Bukach, 2004).</div>
        <div class="label">• <b>Analogy &amp; boundary:</b> Illustrates how exposure statistics shape representation resolution—without equating human social/developmental perception to machine dataset bias.</div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:1.1vh">
      <div class="d4-card b" data-step="3" style="padding:1.2vh 1.3vw">
        <div class="lead"><b>3. Model-vs-Human Benchmark (Geirhos et al., NeurIPS 2021)</b></div>
        <div class="label">Tests models vs. human psychophysics across <b>17 out-of-distribution conditions</b> (eidolon, stylized, sketch, silhouette, phase noise, high-pass, uniform noise):</div>
        <div class="d4-code" style="margin-top:.5vh;padding:.9vh 1vw">
          # Metrics tracked in github.com/bethgelab/model-vs-human:<br>
          1. OOD Accuracy Gap:  Acc_human(c) - Acc_model(c)<br>
          2. Shape Bias:        P(choose_shape | cue_conflict)<br>
          3. Error Consistency: Cohen's kappa (do they fail on the same images?)
        </div>
        <div class="label" style="margin-top:.4vh"><b>Discussion:</b> Are humans and CNNs solving the same recognition problem? Is clean test accuracy enough to claim "human-level vision"?</div>
      </div>
    </div>
  </div>
  ${cite('Geirhos et al. (2019, 2021) · Model-vs-Human: https://github.com/bethgelab/model-vs-human')}
`, { notes: [
  "(draft) Let's connect Geirhos et al.'s texture-bias finding to three broader comparisons between human and machine vision.",
  "(draft) First, Mooney faces (Craig Mooney, 1957): look at the thresholded two-tone black-and-white image on the left. Every local patch is just a sharp black-white boundary with zero surface texture. Once you see the grayscale reference beside it—eyes in shadow, nose lit from the top-left, mouth below—your visual system reorganizes those fragments into a coherent 3D face.",
  "(draft) Second, the cross-race effect in human psychophysics: humans are more accurate at individuating faces from demographic groups they have had extensive visual experience with. We use this strictly as an analogy for how the statistics of visual experience tune feature space resolution—while being careful not to conflate human developmental and social cognition with machine dataset curation.",
  "(draft) Third, the Model-vs-Human benchmark from the Bethge lab (https://github.com/bethgelab/model-vs-human): compares models against human observers across 17 parametric image distortions, measuring not only out-of-distribution accuracy and shape bias, but also error consistency (Cohen's kappa)—whether models make errors on the same individual images as humans."
]});

setTimeout(() => {
  const S = 96;
  function renderFace(id, thresholded){
    const el = document.getElementById(id); if(!el) return;
    const c = document.createElement('canvas'); c.width = c.height = S;
    const g = c.getContext('2d');
    g.fillStyle = '#1e293b'; g.fillRect(0, 0, S, S);
    // Lit forehead & cheek from top-left
    const grad = g.createRadialGradient(34, 34, 6, 46, 48, 42);
    grad.addColorStop(0, '#f8fafc'); grad.addColorStop(0.65, '#94a3b8'); grad.addColorStop(1, '#0f172a');
    g.fillStyle = grad; g.beginPath(); g.ellipse(48, 48, 30, 38, 0, 0, 7); g.fill();
    // Eye sockets in shadow
    g.fillStyle = '#0f172a';
    g.beginPath(); g.ellipse(36, 42, 8, 5, 0, 0, 7); g.fill();
    g.beginPath(); g.ellipse(60, 42, 8, 5, 0, 0, 7); g.fill();
    // Nose bridge highlight + shadow
    g.fillStyle = '#f8fafc'; g.beginPath(); g.moveTo(46, 40); g.lineTo(42, 58); g.lineTo(50, 58); g.closePath(); g.fill();
    g.fillStyle = '#0f172a'; g.beginPath(); g.ellipse(50, 61, 7, 3.5, 0, 0, 7); g.fill();
    // Mouth shadow & chin highlight
    g.fillStyle = '#0f172a'; g.fillRect(37, 70, 22, 4);
    g.fillStyle = '#e2e8f0'; g.beginPath(); g.arc(46, 79, 6, 0, 7); g.fill();

    const d = g.getImageData(0, 0, S, S);
    if(thresholded){
      for(let i = 0; i < d.data.length; i += 4){
        const v = d.data[i] > 126 ? 250 : 15;
        d.data[i] = d.data[i+1] = d.data[i+2] = v;
      }
    }
    el.getContext('2d').putImageData(d, 0, 0);
  }
  renderFace('mooney-two', true);
  renderFace('mooney-gray', false);
}, 60);
}
