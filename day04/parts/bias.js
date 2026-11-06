/* PART: bias (Day 4). Owner: Fernanda · Shreya.
   PART III: Dataset Bias and Distribution Shift.
   Primary resources:
   - MIT Vision Book, Chapters 35–37: Bias and Shift (https://visionbook.mit.edu/bias_and_shift.html)
   - Gapminder Dollar Street (https://www.gapminder.org/dollar-street) */
{
section('3. Bias & Shift');

st(`
  <h1 class="t">Part III · Dataset Bias &amp; Distribution Shift</h1>
  <div class="d4-cols">
    <div style="display:flex;flex-direction:column;gap:1vh">
      <div class="d4-card b" data-step="1">
        <div class="lead"><b>Taxonomy of dataset biases (MIT Vision Book, Ch. 35–37)</b></div>
        <div class="label">• <b>Sampling &amp; representation bias:</b> Who, which countries, and which environments are included vs. omitted?</div>
        <div class="label">• <b>Collection &amp; photographer bias:</b> Centered canonical views, good lighting, web-search query bias</div>
        <div class="label">• <b>Annotation &amp; labeling bias:</b> Crowdworker assumptions, single-label forcing, cultural category definitions</div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:1vh">
      <div class="d4-code b" data-step="2">
        # Distribution shift (train P_train != deployment P_deploy):<br>
        P_train(x, y)  !=  P_deploy(x, y)<br><br>
        # Spurious correlation / shortcut learning:<br>
        P_train(y="cow" | bg="alpine_grass") = 0.94<br>
        P_deploy(y="cow" | bg="sandy_beach") → model predicts "seal / driftwood"!
      </div>
      <div class="d4-card b" data-step="3">
        <div class="label"><b>Out-of-distribution (OOD) generalization:</b> When <code class="m">P(x|y)</code> shifts at deployment (weather, geography, sensor, income level), shortcut features flip from helpful to harmful.</div>
      </div>
    </div>
  </div>
  ${cite('MIT Vision Book, Ch. 35–37: Bias and Shift — https://visionbook.mit.edu/bias_and_shift.html')}
`, { notes: [
  "(draft) Part III examines how datasets shape—and distort—what vision models learn, following Chapters 35 to 37 of the MIT Vision Book.",
  "(draft) First, distinguish the sources of dataset bias: sampling and representation bias (which geographies, income levels, and lighting conditions enter the dataset), collection and capture bias (photographers center objects in canonical views), and annotation bias (how crowdworkers label ambiguous scenes).",
  "(draft) Second, look at the formal definition of distribution shift and spurious correlation in the code block: when P_train(x, y) differs from P_deploy(x, y), a correlation like P(cow | grass) or P(boat | water) that held in the training set breaks down out-of-distribution.",
  "(draft) Let's look at concrete visual examples of contextual shortcuts on the next slide, and then explore Gapminder's Dollar Street."
]});

/* Visual examples of spurious correlations: Cows on grass vs beach, Boats on water vs trailer */
st(`
  <h1 class="t">Spurious correlations: when context overrides the object</h1>
  <div class="d4-grid4 b" data-step="1">
    <div class="d4-card" style="align-items:center;text-align:center;padding:1vh .8vw">
      <canvas id="bias-cow-grass" width="140" height="105" style="width:100%;aspect-ratio:4/3;border-radius:6px;border:1px solid var(--line)"></canvas>
      <div class="label"><b>Cow on green pasture</b><br><code class="m">In-distribution</code><br>Top-1: <b>"ox / cow" (0.94)</b></div>
    </div>
    <div class="d4-card" style="align-items:center;text-align:center;padding:1vh .8vw">
      <canvas id="bias-cow-beach" width="140" height="105" style="width:100%;aspect-ratio:4/3;border-radius:6px;border:1px solid var(--line)"></canvas>
      <div class="label"><b>Same cow on sandy beach</b><br><code class="m">Context shift</code><br>Fails: <b>"sea lion / dog"</b></div>
    </div>
    <div class="d4-card" style="align-items:center;text-align:center;padding:1vh .8vw">
      <canvas id="bias-boat-water" width="140" height="105" style="width:100%;aspect-ratio:4/3;border-radius:6px;border:1px solid var(--line)"></canvas>
      <div class="label"><b>Boat on blue water</b><br><code class="m">In-distribution</code><br>Top-1: <b>"speedboat" (0.97)</b></div>
    </div>
    <div class="d4-card" style="align-items:center;text-align:center;padding:1vh .8vw">
      <canvas id="bias-water-only" width="140" height="105" style="width:100%;aspect-ratio:4/3;border-radius:6px;border:1px solid var(--line)"></canvas>
      <div class="label"><b>Empty water waves (no boat)</b><br><code class="m">Spurious trigger</code><br>False positive: <b>"boat / pier"</b></div>
    </div>
  </div>
  <div class="d4-card b" data-step="2">
    <div class="label"><b>Why does this happen? (Beery et al., 2018; Geirhos et al., 2020):</b> Green grass texture and blue water ripples occupy 70–85% of the pixels in "cow" and "boat" training images. Gradient descent latches onto the easiest high-area cue unless forced to experience the object across diverse backgrounds.</div>
  </div>
  ${cite('Beery, Van Horn &amp; Perona (ECCV 2018), "Recognition in Terra Incognita" · MIT Vision Book Ch. 35–37')}
`, { notes: [
  "(draft) Look at these four concrete cases from the robustness literature, notably Beery, Van Horn, and Perona (2018).",
  "(draft) When a cow is photographed on green alpine pasture (Panel 1), a standard CNN classifies it with high confidence. Place the exact same cow silhouette on a sandy beach by the ocean (Panel 2), and accuracy plummets—models frequently predict sea lion, dog, or rock. Similarly, boats almost always co-occur with water (Panel 3), to the point that wavy water alone (Panel 4) can trigger boat detections.",
  "(draft) Why? Because grass and water cover most of the image area and have simple, linearly separable color and texture statistics. Now let's see how this same bias plays out globally across human households on Dollar Street."
]});

/* Dollar Street interactive visual discussion */
st(`
  <h1 class="t">Interactive Activity · Gapminder Dollar Street &amp; Geographic Bias</h1>
  <div class="d4-grid4 b" data-step="1">
    <div class="d4-card" style="align-items:center;text-align:center;padding:1vh .8vw">
      <canvas id="ds-stove-1" width="140" height="100" style="width:100%;aspect-ratio:140/100;border-radius:6px;border:1px solid var(--line)"></canvas>
      <div class="label"><b>"Stove / Cooking" · $35/mo</b><br>Three-stone open wood fire<br>CNN top-5: <i>"campfire / rock"</i> (miss)</div>
    </div>
    <div class="d4-card" style="align-items:center;text-align:center;padding:1vh .8vw">
      <canvas id="ds-stove-2" width="140" height="100" style="width:100%;aspect-ratio:140/100;border-radius:6px;border:1px solid var(--line)"></canvas>
      <div class="label"><b>"Stove / Cooking" · $250/mo</b><br>Charcoal / kerosene brazier<br>CNN top-5: <i>"bucket / pot"</i> (miss)</div>
    </div>
    <div class="d4-card" style="align-items:center;text-align:center;padding:1vh .8vw">
      <canvas id="ds-stove-3" width="140" height="100" style="width:100%;aspect-ratio:140/100;border-radius:6px;border:1px solid var(--line)"></canvas>
      <div class="label"><b>"Stove / Cooking" · $1,200/mo</b><br>Countertop 2-burner gas stove<br>CNN top-5: <i>"stove" (0.58)</i></div>
    </div>
    <div class="d4-card" style="align-items:center;text-align:center;padding:1vh .8vw">
      <canvas id="ds-stove-4" width="140" height="100" style="width:100%;aspect-ratio:140/100;border-radius:6px;border:1px solid var(--line)"></canvas>
      <div class="label"><b>"Stove / Cooking" · $4,500/mo</b><br>Stainless induction range<br>CNN top-5: <i>"stove / oven" (0.93)</i></div>
    </div>
  </div>
  <div class="d4-cols" style="margin-top:.4vh">
    <div class="d4-card b" data-step="2">
      <div class="lead"><b>Empirical finding (DeVries et al., 2019; Shankar et al., 2017)</b></div>
      <div class="label">• Web-scraped datasets (ImageNet, OpenImages, COCO) draw <b>&gt;75% of images from North America &amp; Europe</b></div>
      <div class="label">• Off-the-shelf classifiers show a <b>15–30% accuracy drop</b> on Dollar Street households in lower-income brackets (<a href="https://www.gapminder.org/dollar-street">gapminder.org/dollar-street</a>)</div>
    </div>
    <div class="d4-card b" data-step="3">
      <div class="lead"><b>Class discussion prompts</b></div>
      <div class="label">1. Whose homes and objects define "standard" categories like <i>soap, toothbrush, stove, bed, spice</i>?</div>
      <div class="label">2. How do English web-search queries &amp; platform access shape what enters training sets?</div>
      <div class="label">3. How does background context (outdoor courtyard vs. tiled kitchen) alter predictions?</div>
    </div>
  </div>
  ${cite('Gapminder Dollar Street: https://www.gapminder.org/dollar-street · DeVries et al. (2019), "Does Object Recognition Work for Everyone?"')}
`, { notes: [
  "(draft) Let's make this interactive using Gapminder's Dollar Street project (https://www.gapminder.org/dollar-street), which photographed 264 families across 50+ countries sorted by monthly consumption income.",
  "(draft) Look at the category 'stove / cooking' across four income levels: from a three-stone firewood hearth ($35/month) and a charcoal brazier ($250/month) to a countertop gas stove ($1,200/month) and a stainless built-in range ($4,500/month). All four perform the exact same human function in a kitchen.",
  "(draft) Yet as DeVries et al. (2019) demonstrated when evaluating ImageNet-trained classifiers on Dollar Street, models trained on Western web photos fail systematically on lower-income households—calling a cooking stove a 'rock' or 'bucket', or failing on 'soap', 'toothbrush', and 'spices' when they don't come in Western commercial packaging.",
  "(draft) Take 4 minutes to discuss the three prompts on the bottom-right with the class: (1) Whose homes are represented? (2) How does querying Flickr/Google in English bias the visual distribution? (3) If you deploy a vision model in healthcare, agriculture, or assistive tech in Africa or South Asia, why can't you trust ImageNet validation accuracy?"
]});

setTimeout(() => {
  function drawScene(id, fn){
    const el = document.getElementById(id); if(!el) return;
    const ctx = el.getContext('2d'); fn(ctx, el.width, el.height);
  }
  function drawCow(ctx, x, y){
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(x, y, 42, 24); // body
    ctx.fillRect(x + 36, y - 8, 16, 16); // head
    ctx.fillRect(x + 4, y + 24, 6, 14); ctx.fillRect(x + 32, y + 24, 6, 14); // legs
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(x + 10, y + 4, 14, 10); ctx.fillRect(x + 26, y + 8, 8, 8); // white patches
  }
  drawScene('bias-cow-grass', (ctx, W, H) => {
    ctx.fillStyle = '#bae6fd'; ctx.fillRect(0, 0, W, 45);
    ctx.fillStyle = '#16a34a'; ctx.fillRect(0, 45, W, H - 45);
    drawCow(ctx, 42, 46);
  });
  drawScene('bias-cow-beach', (ctx, W, H) => {
    ctx.fillStyle = '#38bdf8'; ctx.fillRect(0, 0, W, 38);
    ctx.fillStyle = '#0284c7'; ctx.fillRect(0, 38, W, 22);
    ctx.fillStyle = '#fde68a'; ctx.fillRect(0, 60, W, H - 60);
    drawCow(ctx, 42, 50);
  });
  drawScene('bias-boat-water', (ctx, W, H) => {
    ctx.fillStyle = '#bae6fd'; ctx.fillRect(0, 0, W, 42);
    ctx.fillStyle = '#0369a1'; ctx.fillRect(0, 42, W, H - 42);
    ctx.strokeStyle = '#7dd3fc'; ctx.lineWidth = 1.5;
    for(let y = 52; y < H; y += 12){ ctx.beginPath(); ctx.moveTo(8, y); ctx.lineTo(W - 8, y); ctx.stroke(); }
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath(); ctx.moveTo(32, 62); ctx.lineTo(108, 62); ctx.lineTo(94, 78); ctx.lineTo(44, 78); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.moveTo(68, 22); ctx.lineTo(68, 60); ctx.lineTo(92, 54); ctx.closePath(); ctx.fill();
  });
  drawScene('bias-water-only', (ctx, W, H) => {
    ctx.fillStyle = '#bae6fd'; ctx.fillRect(0, 0, W, 36);
    ctx.fillStyle = '#0369a1'; ctx.fillRect(0, 36, W, H - 36);
    ctx.strokeStyle = '#e0f2fe'; ctx.lineWidth = 2;
    for(let y = 46; y < H; y += 10){
      ctx.beginPath();
      for(let x = 6; x < W - 6; x += 16){ ctx.moveTo(x, y); ctx.quadraticCurveTo(x + 8, y - 4, x + 14, y); }
      ctx.stroke();
    }
  });
  // Dollar Street schematics
  drawScene('ds-stove-1', (ctx, W, H) => {
    ctx.fillStyle = '#78350f'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#57534e';
    ctx.beginPath(); ctx.arc(44, 74, 14, 0, 7); ctx.arc(96, 74, 14, 0, 7); ctx.arc(70, 62, 13, 0, 7); ctx.fill();
    ctx.fillStyle = '#f97316'; ctx.beginPath(); ctx.moveTo(56, 72); ctx.lineTo(70, 42); ctx.lineTo(84, 72); ctx.closePath(); ctx.fill();
  });
  drawScene('ds-stove-2', (ctx, W, H) => {
    ctx.fillStyle = '#d6d3d1'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#44403c'; ctx.beginPath(); ctx.moveTo(42, 36); ctx.lineTo(98, 36); ctx.lineTo(86, 86); ctx.lineTo(54, 86); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#dc2626'; ctx.fillRect(50, 30, 40, 6);
  });
  drawScene('ds-stove-3', (ctx, W, H) => {
    ctx.fillStyle = '#e2e8f0'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#cbd5e1'; ctx.fillRect(22, 44, 96, 38);
    ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(48, 56, 12, 0, 7); ctx.stroke();
    ctx.beginPath(); ctx.arc(92, 56, 12, 0, 7); ctx.stroke();
  });
  drawScene('ds-stove-4', (ctx, W, H) => {
    ctx.fillStyle = '#f1f5f9'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#334155'; ctx.fillRect(28, 22, 84, 74);
    ctx.fillStyle = '#0f172a'; ctx.fillRect(34, 44, 72, 42);
    ctx.strokeStyle = '#38bdf8'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(52, 28, 7, 0, 7); ctx.arc(88, 28, 7, 0, 7); ctx.stroke();
  });
}, 60);
}
